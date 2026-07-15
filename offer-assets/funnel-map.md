# Mapa do funil

## 1. Produto de entrada - R$27

**Missão Novos Sabores - Trilha Sensorial**

Promessa: transformar o próximo contato com um alimento novo em uma missão concreta de olhar, tocar, cheirar e registrar, sem exigir que a criança limpe o prato.

Página: `/`

Checkout configurado em `app/config.ts`.

## 2. Order bumps

**Frases que Abrem a Curiosidade - R$9,90**

Resolve a insegurança imediata da mãe: “o que eu digo quando ele recusa?”

**Passaporte do Pequeno Explorador - R$12,90**

Resolve o problema de progresso invisível: registra contatos e descobertas sem transformar comer em prêmio.

## 3. Upsell - R$67

**21 Missões da Mesa Curiosa + dois bônus**

Expande uma atividade em repertório. O produto principal oferece variedade; o primeiro bônus organiza quatro semanas; o segundo alinha os outros adultos.

Página: `/upsell`

## 4. Downsell - R$47

**21 Missões da Mesa Curiosa - versão essencial**

Mantém o produto principal e remove os dois bônus. A redução de preço é explicada por uma redução real de entrega.

Página: `/downsell`

## Links pendentes da Hotmart

Substituir em `app/config.ts`:

- `UPSELL_CHECKOUT_URL`
- `DOWNSELL_CHECKOUT_URL`
- `FUNNEL_EXIT_URL`

Esses links só existem depois que os novos produtos e as ofertas forem cadastrados na Hotmart.

## Ordem de cadastro na Hotmart

1. Cadastrar cada PDF como produto digital e anexar o arquivo correspondente.
2. Criar as ofertas com os preços definidos acima.
3. Adicionar os dois order bumps à aparência do checkout do produto de R$27.
4. Configurar o funil pós-compra com a página de upsell e a página de downsell.
5. Colar os três links gerados no arquivo de configuração.
