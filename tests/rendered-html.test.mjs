import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the sales page at its production path with the live Hotmart checkout", async () => {
  const response = await render("/mns/main");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Missão Novos Sabores/);
  assert.match(html, /Antes de gostar, a criança pode aprender a conhecer/);
  assert.match(html, /pay\.hotmart\.com\/W106307307V/);
  assert.match(html, /R\$27/);
  assert.match(html, /trilha-sensorial\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("renders the upsell and downsell as distinct offers", async () => {
  const [upsellResponse, downsellResponse] = await Promise.all([
    render("/mns/up"),
    render("/mns/down"),
  ]);

  assert.equal(upsellResponse.status, 200);
  assert.equal(downsellResponse.status, 200);

  const [upsell, downsell] = await Promise.all([
    upsellResponse.text(),
    downsellResponse.text(),
  ]);

  assert.match(upsell, /21 Missões da Mesa Curiosa/);
  assert.match(upsell, /Plano Mesa Curiosa - 4 Semanas/);
  assert.match(upsell, /Acordo da Família à Mesa/);
  assert.match(upsell, /R\$67/);
  assert.match(upsell, /href="\/mns\/down"/);

  assert.match(downsell, /versão essencial/i);
  assert.match(downsell, /R\$47/);
  assert.match(downsell, /Não incluído/);
});

test("renders the professional nutritionist funnel as three clear offers", async () => {
  const [mainResponse, upsellResponse, downsellResponse] = await Promise.all([
    render("/mns/nutri"),
    render("/mns/nutri/up"),
    render("/mns/nutri/down"),
  ]);

  assert.equal(mainResponse.status, 200);
  assert.equal(upsellResponse.status, 200);
  assert.equal(downsellResponse.status, 200);

  const [main, upsell, downsell] = await Promise.all([
    mainResponse.text(),
    upsellResponse.text(),
    downsellResponse.text(),
  ]);

  assert.match(main, /Uma atividade que transforma orientação em experiência/);
  assert.match(main, /Reconhecimento/);
  assert.match(main, /Roteiro de Aplicação para Nutris/);
  assert.match(main, /pay\.hotmart\.com\/W106307307V/);
  assert.match(main, /R\$27/);

  assert.match(upsell, /62 materiais prontos/);
  assert.match(upsell, /Tempo, continuidade, indicação e reconhecimento/);
  assert.match(upsell, /R\$247/);
  assert.match(upsell, /href="\/mns\/nutri\/down"/);

  assert.match(downsell, /36 atividades/);
  assert.match(downsell, /R\$147/);
  assert.match(downsell, /Não incluído/);
});

test("keeps the checkout copy and all digital products in the project", async () => {
  const files = [
    "../offer-assets/checkout-copy.md",
    "../deliverables/01-frases-que-abrem-a-curiosidade.pdf",
    "../deliverables/02-passaporte-do-pequeno-explorador.pdf",
    "../deliverables/03-21-missoes-da-mesa-curiosa.pdf",
    "../deliverables/bonus-01-plano-mesa-curiosa-4-semanas.pdf",
    "../deliverables/bonus-02-acordo-da-familia-a-mesa.pdf",
    "../deliverables/produto-principal/como-jogar.pdf",
    "../deliverables/produto-principal/missao-novos-sabores-a4.pdf",
  ];

  await Promise.all(files.map((path) => access(new URL(path, import.meta.url))));
  const checkoutCopy = await readFile(
    new URL("../offer-assets/checkout-copy.md", import.meta.url),
    "utf8",
  );
  assert.match(checkoutCopy, /Frases que Abrem a Curiosidade/);
  assert.match(checkoutCopy, /Passaporte do Pequeno Explorador/);
});
