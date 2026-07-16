import type { Metadata } from "next";
import { NUTRI_UPSELL_CHECKOUT_URL } from "../../../config";

export const metadata: Metadata = {
  title: "Kit Profissional de Educação Alimentar Infantil",
  description:
    "Biblioteca reutilizável com atividades, materiais para famílias e ferramentas para atendimentos infantis.",
};

const library = [
  ["36 atividades infantis", "Dinâmicas de exploração, linguagem sensorial, autonomia e registro para usar durante o atendimento."],
  ["12 materiais para famílias", "Folhas claras para reforçar orientações e continuar o trabalho em casa."],
  ["8 ferramentas de consulta", "Mapas, escalas visuais, registros e recursos de acompanhamento para organizar a conversa."],
  ["6 roteiros profissionais", "Aberturas, perguntas, tarefas e sequências de retorno para reduzir seu tempo de preparo."],
];

const returnExamples = [
  ["Reutilização", "Os 62 recursos podem entrar em atendimentos diferentes, com crianças e objetivos diferentes."],
  ["Continuidade", "A família leva uma ação concreta para casa e retorna com algo observável para conversar."],
  ["Indicação", "Materiais úteis e bem apresentados tornam seu trabalho mais fácil de explicar e lembrar."],
  ["Posicionamento", "Você entrega uma experiência profissional própria, organizada e consistente."],
];

const faqs = [
  ["O que exatamente estou comprando?", "Uma biblioteca digital com 62 materiais imprimíveis: 36 atividades infantis, 12 materiais para famílias, 8 ferramentas de consulta e 6 roteiros profissionais."],
  ["É um curso?", "Não. É um kit de execução. Você escolhe o recurso adequado, imprime ou envia e usa no atendimento."],
  ["Posso usar com todos os meus pacientes?", "Sim. A licença profissional individual permite usar os materiais nos seus próprios atendimentos. Não permite revenda ou compartilhamento dos arquivos com outros profissionais."],
  ["O kit garante retorno financeiro?", "Não. Nenhum material garante faturamento, retenção ou indicações. O kit foi estruturado para poupar tempo e apoiar uma entrega mais tangível, consistente e percebida como valiosa."],
  ["Como recebo os materiais?", "Depois da confirmação do pagamento, a Hotmart libera o acesso digital aos arquivos."],
];

export default function NutriUpsellPage() {
  return (
    <main className="nutri-funnel nutri-upsell">
      <div className="nutri-notice nutri-notice-success">
        Seu pedido foi confirmado · esta condição aparece apenas nesta etapa
      </div>

      <header className="nutri-hero nutri-hero-kit">
        <div className="nutri-hero-overlay" />
        <div className="site-shell nutri-hero-content">
          <p className="nutri-brand">CONEXÃO NUTRITIVA · BIBLIOTECA PROFISSIONAL</p>
          <p className="nutri-kicker">Oferta especial pós-compra</p>
          <h1>62 materiais prontos para usar em atendimentos infantis.</h1>
          <p className="nutri-lead">
            Atividades, materiais para famílias, ferramentas de consulta e roteiros
            profissionais reunidos em uma biblioteca reutilizável.
          </p>
          <p className="nutri-proof">
            Para economizar preparo, elevar a experiência e fazer seu trabalho continuar presente depois da consulta.
          </p>
          <a className="button nutri-button" href={NUTRI_UPSELL_CHECKOUT_URL}>
            <span>Adicionar o Kit Profissional por R$247</span>
            <span aria-hidden="true">→</span>
          </a>
          <p className="nutri-microcopy">Pagamento único · licença profissional individual · acesso digital</p>
        </div>
      </header>

      <section className="nutri-section nutri-section-dark" aria-labelledby="clareza-kit">
        <div className="site-shell narrow">
          <p className="nutri-kicker nutri-kicker-light">Em uma frase</p>
          <h2 id="clareza-kit">Um kit de atividades e materiais imprimíveis para usar em atendimentos infantis e enviar como tarefa para casa.</h2>
          <p className="nutri-large-copy">
            Não é uma promessa vaga de “melhorar suas consultas”. É uma biblioteca
            de execução: você escolhe, imprime, aplica e reutiliza.
          </p>
        </div>
      </section>

      <section className="nutri-section" aria-labelledby="biblioteca">
        <div className="site-shell">
          <div className="nutri-heading-row">
            <div>
              <p className="nutri-kicker">O que existe dentro</p>
              <h2 id="biblioteca">Quatro blocos. 62 recursos. Uma aplicação clara.</h2>
            </div>
            <p>
              Cada bloco resolve uma parte concreta do atendimento: envolver a criança,
              orientar a família, organizar o encontro e preparar o acompanhamento.
            </p>
          </div>
          <div className="nutri-library-grid">
            {library.map(([title, text], index) => (
              <article key={title}>
                <strong>{String(index + 1).padStart(2, "0")}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="nutri-section nutri-value-band" aria-labelledby="investimento">
        <div className="site-shell nutri-value-layout">
          <div>
            <p className="nutri-kicker">Valor percebível</p>
            <h2 id="investimento">R$247 por uma biblioteca que não acaba no primeiro uso.</h2>
            <p>
              São 62 recursos por aproximadamente <strong>R$3,98 cada</strong> — e
              cada recurso pode ser usado novamente em diferentes atendimentos.
            </p>
          </div>
          <div className="nutri-metric">
            <span>62</span>
            <p>recursos profissionais reutilizáveis</p>
          </div>
        </div>
      </section>

      <section className="nutri-section" aria-labelledby="retorno-kit">
        <div className="site-shell">
          <p className="nutri-kicker">O retorno pode aparecer de mais de uma forma</p>
          <h2 id="retorno-kit">Tempo, continuidade, indicação e reconhecimento.</h2>
          <div className="nutri-return-grid nutri-return-grid-four">
            {returnExamples.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="nutri-recognition-note">
            <strong>O reconhecimento profissional acontece quando a entrega vira lembrança.</strong>
            <p>
              A família talvez não repita toda a orientação que ouviu. Mas consegue
              mostrar a atividade, contar como a criança participou e dizer quem tornou
              aquele passo possível. Isso dá ao seu trabalho uma forma concreta.
            </p>
          </div>
          <p className="nutri-disclaimer">
            Exemplos de uso e posicionamento, não garantia de faturamento, retorno,
            retenção, indicação ou resultado clínico.
          </p>
        </div>
      </section>

      <section className="nutri-section nutri-use-band" aria-labelledby="uso-kit">
        <div className="site-shell nutri-use-layout">
          <div>
            <p className="nutri-kicker">Como você usa</p>
            <h2 id="uso-kit">Escolha pelo momento do atendimento — não por uma ordem obrigatória.</h2>
          </div>
          <ol>
            <li><span>1</span><p>Identifique o objetivo educativo daquele encontro.</p></li>
            <li><span>2</span><p>Escolha uma atividade e uma ferramenta visual.</p></li>
            <li><span>3</span><p>Conduza a experiência e registre o que observou.</p></li>
            <li><span>4</span><p>Envie um material para a família continuar em casa.</p></li>
          </ol>
        </div>
      </section>

      <section className="nutri-offer" aria-labelledby="oferta-kit">
        <div className="site-shell nutri-offer-layout">
          <div>
            <p className="nutri-kicker">Kit Profissional de Educação Alimentar Infantil</p>
            <h2 id="oferta-kit">Uma biblioteca que valoriza o que você já sabe fazer.</h2>
            <ul className="nutri-check-list nutri-check-list-large">
              <li>36 atividades para crianças</li>
              <li>12 materiais de orientação para famílias</li>
              <li>8 ferramentas visuais para consulta</li>
              <li>6 roteiros profissionais de aplicação e retorno</li>
              <li>Licença de uso profissional individual</li>
            </ul>
          </div>
          <div className="nutri-price-panel">
            <p>Condição desta página</p>
            <div className="nutri-price"><small>R$</small>247</div>
            <a className="button nutri-button" href={NUTRI_UPSELL_CHECKOUT_URL}>
              <span>Sim, quero o Kit Profissional</span>
              <span aria-hidden="true">→</span>
            </a>
            <a className="nutri-decline" href="/mns/nutri/down">
              Não, quero ver a versão somente com atividades
            </a>
          </div>
        </div>
      </section>

      <section className="nutri-section nutri-faq" aria-labelledby="faq-kit">
        <div className="site-shell nutri-faq-layout">
          <div>
            <p className="nutri-kicker">Dúvidas objetivas</p>
            <h2 id="faq-kit">O que muda ao adicionar a biblioteca.</h2>
          </div>
          <div className="nutri-faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
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
