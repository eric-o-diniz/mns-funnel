# Missão Novos Sabores - funil completo

Este projeto contém:

- página de vendas do produto de R$27 em `/mns/main`;
- página de upsell do kit de R$67 em `/mns/up`;
- página de downsell da versão essencial de R$47 em `/mns/down`;
- funil profissional para nutricionistas em `/mns/nutri`, `/mns/nutri/up` e `/mns/nutri/down`;
- copy curta para os dois order bumps;
- cinco produtos digitais finalizados em PDF;
- cópia local do produto principal fornecido.

Os links pós-compra da Hotmart ficam centralizados em `app/config.ts`. O link do produto principal já está configurado; os outros três devem ser substituídos depois que as novas ofertas forem criadas na Hotmart.

Os produtos prontos para entrega estão em `deliverables/` e a estratégia operacional está em `offer-assets/`.

Na Hostinger, publique o projeto de produção em `public_html/mns`. A página existente em `/mns-1/` não faz parte deste projeto e não deve ser alterada.

O comando `npm run export:connected` atualiza diretamente a pasta `mns` do repositório `rocksolidgocom`, já conectado à Hostinger em `public_html/funl`.
