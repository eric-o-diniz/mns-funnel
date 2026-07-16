import type { Metadata } from "next";
import { UPSELL_CHECKOUT_URL } from "../config";

export const metadata: Metadata = {
  title: "21 Missões da Mesa Curiosa | Oferta Especial",
  description:
    "Amplie a Trilha Sensorial com 21 atividades rápidas, um plano de quatro semanas e o Acordo da Família à Mesa.",
};

const examples = [
  ["Detetive das Cores", "Observe detalhes sem pedir contato físico."],
  ["Toque com Ferramenta", "Explore textura com garfo, colher ou pinça."],
  ["Cheiro de Longe", "Aproxime o aroma só até a distância confortável."],
  ["Semáforo do Corpo", "Ajude a criança a comunicar continuar, pausar ou parar."],
  ["Repórter do Alimento", "Transforme as percepções em uma pequena notícia."],
  ["Reencontro", "Compare uma nova experiência com a descoberta anterior."],
];

const faqs = [
  ["É outro jogo igual ao que acabei de comprar?", "Não. A Trilha Sensorial é a atividade-base. As 21 Missões são variações curtas para mudar a forma de observar, tocar, cheirar, preparar e registrar diferentes encontros com alimentos."],
  ["Preciso fazer as 21 em ordem?", "Não. Você pode escolher duas a quatro por semana, repetir as favoritas e adaptar o ritmo à sua rotina."],
  ["Os bônus são produtos separados?", "Sim. Você recebe três PDFs: as 21 Missões, o Plano Mesa Curiosa de quatro semanas e o Acordo da Família à Mesa."],
  ["Como recebo?", "A oferta é digital e os arquivos são liberados pela Hotmart após a confirmação do pagamento."],
];

export default function UpsellPage() {
  return (
    <main>
      <div className="notice-bar notice-success">Seu pedido foi confirmado. Há uma última etapa antes de seguir.</div>
      <header className="hero hero-upsell">
        <div className="hero-overlay" />
        <div className="site-shell hero-content">
          <p className="brand">Conexão Nutritiva Kids</p>
          <p className="eyebrow">Oferta especial desta página</p>
          <h1>21 Missões da Mesa Curiosa</h1>
          <p className="hero-lead">
            Você já tem a trilha. Agora leve um repertório de 21 maneiras de continuar a aproximação sem repetir sempre a mesma atividade.
          </p>
          <p className="hero-proof">De um único jogo para quatro semanas de experiências variadas.</p>
          <a className="button button-primary" href={UPSELL_CHECKOUT_URL}>
            <span>Adicionar o kit completo por R$67</span>
            <span aria-hidden="true">→</span>
          </a>
          <p className="microcopy">Pagamento único · entrega digital pela Hotmart</p>
        </div>
      </header>

      <section className="section section-ink" aria-labelledby="por-que-agora">
        <div className="site-shell narrow">
          <p className="eyebrow eyebrow-light">Por que esta oferta vem agora</p>
          <h2 id="por-que-agora">Porque curiosidade cresce quando a experiência muda, mas a segurança continua.</h2>
          <p className="large-copy light-copy">
            A Trilha Sensorial dá a estrutura. As 21 Missões evitam que o processo vire “a mesma folha, a mesma pergunta, a mesma resposta” depois dos primeiros usos.
          </p>
          <p className="section-close">Você escolhe uma missão curta, define o menor passo e termina antes que a atividade volte a parecer cobrança.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="dentro">
        <div className="site-shell">
          <div className="heading-row">
            <div>
              <p className="eyebrow">O produto principal da oferta</p>
              <h2 id="dentro">21 missões prontas para olhar, tocar, cheirar, comparar e comunicar.</h2>
            </div>
            <p>Cada missão traz objetivo, preparação, passo a passo e uma linha de chegada possível - inclusive quando provar não é o passo de hoje.</p>
          </div>
          <div className="mission-grid">
            {examples.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section product-band" aria-labelledby="kit-completo">
        <div className="site-shell">
          <div className="product-intro">
            <p className="eyebrow">O kit completo</p>
            <h2 id="kit-completo">Um produto principal e dois bônus que resolvem o que acontece entre uma missão e outra.</h2>
          </div>
          <div className="product-stack">
            <article className="product-item product-item-main">
              <img src="/images/produto-missoes.jpg" alt="Capa do produto 21 Missões da Mesa Curiosa" />
              <div>
                <p className="item-label">Produto principal</p>
                <h3>21 Missões da Mesa Curiosa</h3>
                <p>21 atividades, método das quatro escolhas, preparação simples e registro completo das experiências.</p>
              </div>
            </article>
            <article className="product-item">
              <img src="/images/bonus-plano.jpg" alt="Capa do bônus Plano Mesa Curiosa - 4 Semanas" />
              <div>
                <p className="item-label">Bônus 1 · incluído</p>
                <h3>Plano Mesa Curiosa - 4 Semanas</h3>
                <p>Um roteiro para escolher alimentos, encaixar duas missões por semana e ajustar a dificuldade sem criar outra meta pesada.</p>
              </div>
            </article>
            <article className="product-item">
              <img src="/images/bonus-familia.jpg" alt="Capa do bônus Acordo da Família à Mesa" />
              <div>
                <p className="item-label">Bônus 2 · incluído</p>
                <h3>Acordo da Família à Mesa</h3>
                <p>Frases e combinados para alinhar parceiro, avós, babá e escola quando outras pessoas aumentam a pressão.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-mint" aria-labelledby="uso-real">
        <div className="site-shell split-copy">
          <div>
            <p className="eyebrow">Cabe na rotina real</p>
            <h2 id="uso-real">Não é um curso para assistir. É um repertório para abrir e usar.</h2>
          </div>
          <div>
            <p className="large-copy">Escolha uma missão. Separe uma pequena porção. Faça uma pergunta. Registre o que a criança conseguiu descobrir.</p>
            <p>As atividades foram escritas para funcionar em poucos minutos e podem ser repetidas com alimentos diferentes.</p>
          </div>
        </div>
      </section>

      <section className="section offer-section" aria-labelledby="oferta-upsell">
        <div className="site-shell offer-layout">
          <div className="offer-copy">
            <p className="eyebrow">Disponível apenas nesta etapa</p>
            <h2 id="oferta-upsell">Leve o kit completo da Mesa Curiosa.</h2>
            <ul className="plain-list">
              <li>21 Missões da Mesa Curiosa</li>
              <li>Bônus: Plano Mesa Curiosa - 4 Semanas</li>
              <li>Bônus: Acordo da Família à Mesa</li>
            </ul>
          </div>
          <div className="price-panel">
            <p>Pagamento único</p>
            <div className="price"><small>R$</small>67</div>
            <a className="button button-primary" href={UPSELL_CHECKOUT_URL}>
              <span>Sim, quero o kit completo</span>
              <span aria-hidden="true">→</span>
            </a>
            <a className="decline-link" href="/mns/down">Não, quero continuar sem esta oferta</a>
          </div>
        </div>
      </section>

      <section className="section faq-section" aria-labelledby="faq-upsell">
        <div className="site-shell faq-layout">
          <div>
            <p className="eyebrow">Dúvidas rápidas</p>
            <h2 id="faq-upsell">O que muda quando você adiciona este kit.</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="site-shell footer-content">
          <p>Conexão Nutritiva Kids</p>
          <p>Oferta digital complementar à Missão Novos Sabores.</p>
        </div>
      </footer>
    </main>
  );
}
