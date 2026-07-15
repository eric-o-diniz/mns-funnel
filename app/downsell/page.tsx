import type { Metadata } from "next";
import { DOWNSELL_CHECKOUT_URL, FUNNEL_EXIT_URL } from "../config";

export const metadata: Metadata = {
  title: "21 Missões da Mesa Curiosa | Versão Essencial",
  description: "Leve somente as 21 Missões da Mesa Curiosa, sem os dois bônus da oferta completa.",
};

export default function DownsellPage() {
  return (
    <main>
      <div className="notice-bar">Uma última opção antes de encerrar esta oferta</div>
      <header className="downsell-hero">
        <div className="site-shell downsell-layout">
          <div>
            <p className="brand">Conexão Nutritiva Kids</p>
            <p className="eyebrow">Versão essencial</p>
            <h1>Fique apenas com as 21 Missões da Mesa Curiosa.</h1>
            <p className="hero-lead">
              Sem o plano de quatro semanas e sem o guia para alinhar outros adultos. Você recebe somente o repertório de missões para usar junto da Trilha Sensorial.
            </p>
            <a className="button button-primary" href={DOWNSELL_CHECKOUT_URL}>
              <span>Adicionar somente as 21 missões por R$47</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <figure className="downsell-product">
            <img src="/images/produto-missoes.jpg" alt="Capa das 21 Missões da Mesa Curiosa" />
          </figure>
        </div>
      </header>

      <section className="section" aria-labelledby="comparacao">
        <div className="site-shell narrow-wide">
          <p className="eyebrow">O que mudou</p>
          <h2 id="comparacao">A mesma biblioteca de atividades, numa oferta menor.</h2>
          <div className="comparison-table" role="table" aria-label="Comparação entre kit completo e versão essencial">
            <div className="comparison-row comparison-head" role="row">
              <span role="columnheader">Material</span>
              <span role="columnheader">Kit completo</span>
              <span role="columnheader">Versão essencial</span>
            </div>
            <div className="comparison-row" role="row">
              <span role="cell">21 Missões da Mesa Curiosa</span>
              <strong role="cell">Incluído</strong>
              <strong role="cell">Incluído</strong>
            </div>
            <div className="comparison-row" role="row">
              <span role="cell">Plano Mesa Curiosa - 4 Semanas</span>
              <strong role="cell">Incluído</strong>
              <span role="cell">Não incluído</span>
            </div>
            <div className="comparison-row" role="row">
              <span role="cell">Acordo da Família à Mesa</span>
              <strong role="cell">Incluído</strong>
              <span role="cell">Não incluído</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-ink" aria-labelledby="ainda-recebe">
        <div className="site-shell narrow">
          <p className="eyebrow eyebrow-light">Você ainda recebe</p>
          <h2 id="ainda-recebe">21 maneiras de variar a experiência sem perder a estrutura.</h2>
          <div className="compact-points">
            <p>Missões de aparência, textura, cheiro, preparo e comunicação.</p>
            <p>Objetivo, passo a passo e linha de chegada para cada atividade.</p>
            <p>Registro das 21 experiências e espaço para criar a missão número 22.</p>
          </div>
        </div>
      </section>

      <section className="section offer-section" aria-labelledby="oferta-downsell">
        <div className="site-shell offer-layout">
          <div className="offer-copy">
            <p className="eyebrow">Oferta final</p>
            <h2 id="oferta-downsell">21 Missões da Mesa Curiosa - versão essencial.</h2>
            <p>Pagamento único. Material digital entregue pela Hotmart.</p>
          </div>
          <div className="price-panel">
            <p>Somente nesta versão</p>
            <div className="price"><small>R$</small>47</div>
            <a className="button button-primary" href={DOWNSELL_CHECKOUT_URL}>
              <span>Sim, quero somente as 21 missões</span>
              <span aria-hidden="true">→</span>
            </a>
            <a className="decline-link" href={FUNNEL_EXIT_URL}>Não, obrigada. Quero encerrar a oferta.</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="site-shell footer-content">
          <p>Conexão Nutritiva Kids</p>
          <p>Material educativo digital. Nenhum produto físico será enviado.</p>
        </div>
      </footer>
    </main>
  );
}
