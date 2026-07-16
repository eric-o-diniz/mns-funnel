import type { Metadata } from "next";
import {
  NUTRI_DOWNSELL_CHECKOUT_URL,
  NUTRI_FUNNEL_EXIT_URL,
} from "../../../config";

export const metadata: Metadata = {
  title: "Biblioteca Essencial de Atividades Infantis",
  description:
    "Versão essencial com 36 atividades imprimíveis para nutricionistas usarem em atendimentos infantis.",
};

export default function NutriDownsellPage() {
  return (
    <main className="nutri-funnel nutri-downsell">
      <div className="nutri-notice">Uma última opção antes de encerrar esta oferta</div>

      <header className="nutri-downsell-hero">
        <div className="site-shell nutri-downsell-layout">
          <div>
            <p className="nutri-brand">CONEXÃO NUTRITIVA · VERSÃO ESSENCIAL</p>
            <p className="nutri-kicker">Somente as atividades infantis</p>
            <h1>Leve as 36 atividades. Deixe os materiais complementares de fora.</h1>
            <p className="nutri-lead">
              Você recebe a biblioteca de atividades imprimíveis para usar durante
              seus atendimentos — sem os materiais para famílias, ferramentas de
              consulta e roteiros profissionais.
            </p>
            <a className="button nutri-button" href={NUTRI_DOWNSELL_CHECKOUT_URL}>
              <span>Quero as 36 atividades por R$147</span>
              <span aria-hidden="true">→</span>
            </a>
            <p className="nutri-microcopy">Pagamento único · licença profissional individual</p>
          </div>
        </div>
      </header>

      <section className="nutri-section" aria-labelledby="comparacao-nutri">
        <div className="site-shell narrow-wide">
          <p className="nutri-kicker">O que mudou</p>
          <h2 id="comparacao-nutri">A mesma clareza, com um escopo menor.</h2>
          <div className="nutri-comparison" role="table" aria-label="Comparação entre o Kit Profissional e a Biblioteca Essencial">
            <div className="nutri-comparison-row nutri-comparison-head" role="row">
              <span role="columnheader">Material</span>
              <span role="columnheader">Kit R$247</span>
              <span role="columnheader">Essencial R$147</span>
            </div>
            <div className="nutri-comparison-row" role="row">
              <span role="cell">36 atividades infantis</span>
              <strong role="cell">Incluído</strong>
              <strong role="cell">Incluído</strong>
            </div>
            <div className="nutri-comparison-row" role="row">
              <span role="cell">12 materiais para famílias</span>
              <strong role="cell">Incluído</strong>
              <span role="cell">Não incluído</span>
            </div>
            <div className="nutri-comparison-row" role="row">
              <span role="cell">8 ferramentas de consulta</span>
              <strong role="cell">Incluído</strong>
              <span role="cell">Não incluído</span>
            </div>
            <div className="nutri-comparison-row" role="row">
              <span role="cell">6 roteiros profissionais</span>
              <strong role="cell">Incluído</strong>
              <span role="cell">Não incluído</span>
            </div>
          </div>
        </div>
      </section>

      <section className="nutri-section nutri-section-dark" aria-labelledby="ainda-recebe-nutri">
        <div className="site-shell nutri-intro-grid">
          <div>
            <p className="nutri-kicker nutri-kicker-light">O núcleo do kit permanece</p>
            <h2 id="ainda-recebe-nutri">36 maneiras de tornar o atendimento mais visual, participativo e lembrável.</h2>
          </div>
          <div>
            <p className="nutri-large-copy">
              A versão essencial ainda entrega o ativo mais importante: atividades
              prontas que você pode escolher, imprimir e reutilizar.
            </p>
            <p>
              É a opção para quem quer começar construindo uma biblioteca de consulta
              agora e prefere criar por conta própria os materiais de acompanhamento.
            </p>
          </div>
        </div>
      </section>

      <section className="nutri-section nutri-value-band" aria-labelledby="valor-essencial">
        <div className="site-shell nutri-value-layout">
          <div>
            <p className="nutri-kicker">Valor direto</p>
            <h2 id="valor-essencial">R$147 por 36 atividades reutilizáveis.</h2>
            <p>
              Aproximadamente <strong>R$4,08 por atividade</strong>, com licença
              individual para usar nos seus próprios atendimentos.
            </p>
          </div>
          <div className="nutri-metric">
            <span>36</span>
            <p>atividades prontas para consulta</p>
          </div>
        </div>
      </section>

      <section className="nutri-offer" aria-labelledby="oferta-essencial">
        <div className="site-shell nutri-offer-layout">
          <div>
            <p className="nutri-kicker">Biblioteca Essencial</p>
            <h2 id="oferta-essencial">Comece pelo que vai diretamente para a mesa de atendimento.</h2>
            <ul className="nutri-check-list nutri-check-list-large">
              <li>36 atividades infantis imprimíveis</li>
              <li>Organização por objetivo de uso</li>
              <li>Arquivos digitais prontos para impressão</li>
              <li>Licença de uso profissional individual</li>
            </ul>
          </div>
          <div className="nutri-price-panel">
            <p>Oferta final</p>
            <div className="nutri-price"><small>R$</small>147</div>
            <a className="button nutri-button" href={NUTRI_DOWNSELL_CHECKOUT_URL}>
              <span>Sim, quero a Biblioteca Essencial</span>
              <span aria-hidden="true">→</span>
            </a>
            <a className="nutri-decline" href={NUTRI_FUNNEL_EXIT_URL}>
              Não, obrigada. Quero encerrar esta oferta.
            </a>
          </div>
        </div>
      </section>

      <footer className="nutri-footer">
        <div className="site-shell footer-content">
          <p>Conexão Nutritiva · Materiais Profissionais</p>
          <p>Material educativo de apoio. Não substitui avaliação ou acompanhamento individualizado.</p>
        </div>
      </footer>
    </main>
  );
}
