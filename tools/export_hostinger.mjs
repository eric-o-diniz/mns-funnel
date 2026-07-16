import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const argument = (name) =>
  process.argv.find((value) => value.startsWith(`${name}=`))?.slice(name.length + 1);
const publicBase = (argument("--base") ?? "/mns").replace(/\/$/, "");
const outputRoot = resolve(projectRoot, argument("--output") ?? "hostinger");
const allowedOutputs = new Set([
  resolve(projectRoot, "hostinger"),
  resolve(projectRoot, "../rocksolidgocom/mns"),
]);

if (!publicBase.startsWith("/") || publicBase.includes("..")) {
  throw new Error(`Invalid public base path: ${publicBase}`);
}

if (!allowedOutputs.has(outputRoot)) {
  throw new Error(`Refusing to replace an unexpected output directory: ${outputRoot}`);
}

const staticAssetRoot = resolve(outputRoot, "funnel-assets");
const workerUrl = pathToFileURL(resolve(projectRoot, "dist/server/index.js"));
workerUrl.searchParams.set("export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

const pages = [
  ["/mns/main", "main/index.html"],
  ["/mns/up", "up/index.html"],
  ["/mns/down", "down/index.html"],
  ["/mns/nutri", "nutri/index.html"],
  ["/mns/nutri/up", "nutri/up/index.html"],
  ["/mns/nutri/down", "nutri/down/index.html"],
];

function makeStatic(html) {
  return html
    .replaceAll('href="/assets/', `href="${publicBase}/funnel-assets/assets/`)
    .replaceAll('src="/assets/', `src="${publicBase}/funnel-assets/assets/`)
    .replaceAll('href="/images/', `href="${publicBase}/funnel-assets/images/`)
    .replaceAll('src="/images/', `src="${publicBase}/funnel-assets/images/`)
    .replaceAll('href="/nutri-og.png"', `href="${publicBase}/funnel-assets/nutri-og.png"`)
    .replaceAll('content="/nutri-og.png"', `content="${publicBase}/funnel-assets/nutri-og.png"`)
    .replaceAll(
      "https://rocksolidgo.com/og.png",
      `https://rocksolidgo.com${publicBase}/funnel-assets/og.png`,
    )
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b[^>]*rel="modulepreload"[^>]*>/gi, "");
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(resolve(projectRoot, "dist/client"), staticAssetRoot, { recursive: true });

const assetDirectory = resolve(staticAssetRoot, "assets");
for (const asset of await readdir(assetDirectory)) {
  const assetPath = resolve(assetDirectory, asset);
  if (asset.endsWith(".css")) {
    const css = await readFile(assetPath, "utf8");
    await writeFile(
      assetPath,
      css
        .replaceAll('url("/images/', `url("${publicBase}/funnel-assets/images/`)
        .replaceAll("url(/images/", `url(${publicBase}/funnel-assets/images/`),
      "utf8",
    );
  } else if (asset.endsWith(".js")) {
    await rm(assetPath);
  }
}

for (const [route, output] of pages) {
  const response = await worker.fetch(
    new Request(`https://rocksolidgo.com${route}`, {
      headers: {
        accept: "text/html",
        "x-forwarded-host": "rocksolidgo.com",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );

  if (!response.ok) {
    throw new Error(`Could not export ${route}: HTTP ${response.status}`);
  }

  const target = resolve(outputRoot, output);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, makeStatic(await response.text()), "utf8");
}

const manifestPath = resolve(staticAssetRoot, ".vite/manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
if (!Object.keys(manifest).length) {
  throw new Error("Client asset manifest is empty");
}

console.log(`Exported ${pages.length} pages to ${outputRoot} for ${publicBase}`);
