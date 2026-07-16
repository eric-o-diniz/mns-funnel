import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = resolve(projectRoot, "hostinger");
const workerUrl = pathToFileURL(resolve(projectRoot, "dist/server/index.js"));
workerUrl.searchParams.set("export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

const pages = [
  ["/mns/main", "main/index.html"],
  ["/mns/up", "up/index.html"],
  ["/mns/down", "down/index.html"],
];

function makeStatic(html) {
  return html
    .replaceAll('href="/assets/', 'href="/mns/assets/')
    .replaceAll('src="/assets/', 'src="/mns/assets/')
    .replaceAll('href="/images/', 'href="/mns/images/')
    .replaceAll('src="/images/', 'src="/mns/images/')
    .replaceAll(
      "https://rocksolidgo.com/og.png",
      "https://rocksolidgo.com/mns/og.png",
    )
    .replace(/<script\\b[^>]*>[\\s\\S]*?<\\/script>/gi, "")
    .replace(/<link\\b[^>]*rel="modulepreload"[^>]*>/gi, "");
}

await rm(outputRoot, { recursive: true, force: true });
await cp(resolve(projectRoot, "dist/client"), outputRoot, { recursive: true });

const assetDirectory = resolve(outputRoot, "assets");
for (const asset of await readdir(assetDirectory)) {
  const assetPath = resolve(assetDirectory, asset);
  if (asset.endsWith(".css")) {
    const css = await readFile(assetPath, "utf8");
    await writeFile(
      assetPath,
      css
        .replaceAll('url("/images/', 'url("/mns/images/')
        .replaceAll("url(/images/", "url(/mns/images/"),
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

const redirect = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta http-equiv="refresh" content="0;url=/mns/main">
    <link rel="canonical" href="https://rocksolidgo.com/mns/main">
    <title>Missão Novos Sabores</title>
  </head>
  <body><a href="/mns/main">Abrir Missão Novos Sabores</a></body>
</html>
`;

await writeFile(resolve(outputRoot, "index.html"), redirect, "utf8");

const manifestPath = resolve(outputRoot, ".vite/manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
if (!Object.keys(manifest).length) {
  throw new Error("Client asset manifest is empty");
}

console.log(`Exported ${pages.length} pages to ${outputRoot}`);
