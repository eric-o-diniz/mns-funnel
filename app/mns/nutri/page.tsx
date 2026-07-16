import type { Metadata } from "next";
import { NUTRI_MAIN_CHECKOUT_URL } from "../../config";

export const metadata: Metadata = {
  title: "Missão Novos Sabores para Nutricionistas",
  description:
    "Atividade imprimível para nutricionistas usarem em atendimentos infantis sobre recusa alimentar e apresentação de novos alimentos.",
  openGraph: {
    title: "Missão Novos Sabores para Nutricionistas",
    description: "Atividade imprimível para usar em atendimentos infantis.",
    images: [{ url: "/nutri-og.png", width: 1536, height: 864 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Missão Novos Sabores para Nutricionistas",
    description: "Atividade imprimível para usar em atendimentos infantis.",
    images: ["/nutri-og.png"],
  },
};

const professionalReturns = [
  {
    number: "01",
    title: "Tempo de preparo",
    text: "Abra, imprima e aplique. Você deixa de começar cada atendimento com uma folha em branco.",
  },
  {
    number: "02",
    title: "Valor percebido",
    text: "A família recebe uma orientação que consegue ver, entender e continuar em casa.",
  },
  {
    number: "03",
    title: "Reconhecimento",
    text: "Seu atendimento é lembrado pela experiência bem conduzida e pelo cuidado que continua depois da consulta.",
  },
];

const sessionFlow = [
  ["Apresente", "Transforme o alimento em objeto de investigação, sem colocar a mordida como única vitória."],
  ["Conduza", "Use quatro etapas claras: olhar, tocar, cheirar e, se a criança quiser, experimentar."],
  ["Registre", "Dê nome às percepções e mostre à família o que avançou durante o encontro."],
  ["Entregue", "Envie uma nova missão para casa e crie uma ponte concreta para o próximo atendimento."],
];

const included = [
  "Trilha Sensorial colorida em PDF tamanho A4",
  "Etapas de aparência, textura, cheiro e sabor",
  "Escala visual para a criança registrar cada percepção",
  "Guia ilustrado de aplicação e impressão",
  "Arquivo reutilizável em diferentes atendimentos",
  "Licença de uso profissional individual com seus pacientes",
];

const faqs = [
  [
    "Para quem este material foi criado?",
    "Para nutricionistas, estudantes de nutrição em prática supervisionada e profissionais que conduzem educação alimentar infantil. É um recurso educativo de apoio, não um protocolo clínico.",
  ],
  [
    "Posso usar com mais de um paciente?",
    "Sim. A licença individual permite imprimir e usar o material nos seus próprios atendimentos. Ela não permite revender, redistribuir os arquivos ou compartilhar a licença com outros profissionais.",
  ],
  [
    "Como aplico durante a consulta?",
    "Escolha um alimento, apresente a atividade como investigação e percorra as quatro etapas no ritmo da criança. O guia mostra a dinâmica e a folha registra o encontro.",
  ],
  [
    "Isso trata seletividade alimentar?",
    "Não. O material apoia educação alimentar e apresentação de alimentos. Ele não substitui avaliação, diagnóstico, plano terapêutico ou acompanhamento individualizado.",
  ],
  [
    "Como recebo?",
    "A Hotmart libera os arquivos digitais após a confirmação do pagamento. Nenhum produto físico será enviado.",
  ],
];

function CheckoutButton({ label }: { label: string }) {
  return (
    <a className="button nutri-button" href={NUTRI_MAIN_CHECKOUT_URL}>
      <span>{label}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

export default function NutriSalesPage() {
  return (
    <main className="nutri-funnel nutri-sales">
      <div className="nutri-notice">
        Material de educação alimentar para uso em atendimento infantil
      </div>

      <header className="nutri-hero nutri-hero-main">
        <div className="nutri-hero-overlay" />
        <div className="site-shell nutri-hero-content">
          <p className="nutri-brand">CONEXÃO NUTRITIVA · MATERIAIS PROFISSIONAIS</p>
          <p className="nutri-kicker">Pronto para imprimir e aplicar</p>
          <h1>Uma atividade que transforma orientação em experiência.</h1>
          <p className="nutri-lead">
            Use a Missão Novos Sabores em atendimentos infantis para explorar
            alimentos com começo, meio e fim — e entregar à família uma forma
            clara de continuar em casa.
          </p>
          <p className="nutri-proof">
            Menos tempo preparando material. Mais valor percebido no atendimento.
          </p>
          <CheckoutButton label="Quero usar nos meus atendimentos por R$27" />
          <p className="nutri-microcopy">
            Pagamento único · acesso digital imediato · licença profissional individual
          </p>
        </div>
      </header>

      <section className="nutri-section nutri-section-dark" aria-labelledby="material-apoio">
        <div className="site-shell nutri-intro-grid">
          <div>
            <p className="nutri-kicker nutri-kicker-light">A consulta termina. A experiência não precisa terminar.</p>
            <h2 id="material-apoio">A orientação verbal pode ser boa e ainda assim desaparecer na rotina.</h2>
          </div>
          <div>
            <p className="nutri-large-copy">
              Quando a família sai apenas com recomendações, ela precisa lembrar,
              interpretar e transformar tudo em ação sozinha.
            </p>
            <p>
              Um material bem apresentado torna sua orientação visível. A criança
              participa. A família entende o próximo passo. E seu trabalho continua
              presente depois que a porta do consultório fecha.
            </p>
          </div>
        </div>
      </section>

      <section className="nutri-section" aria-labelledby="retorno-profissional">
        <div className="site-shell">
          <div className="nutri-heading-row">
            <div>
              <p className="nutri-kicker">O retorno possível do seu investimento</p>
              <h2 id="retorno-profissional">O material trabalha em três frentes a cada novo uso.</h2>
            </div>
            <p>
              O valor não está em uma única folha. Está no tempo que ela poupa, na
              experiência que ela melhora e na lembrança profissional que ela ajuda a criar.
            </p>
          </div>
          <div className="nutri-return-grid">
            {professionalReturns.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <p className="nutri-disclaimer">
            O material não garante aumento de faturamento, indicações ou retenção.
            Ele oferece um recurso reutilizável para apoiar uma entrega mais clara,
            tangível e profissional.
          </p>
        </div>
      </section>

      <section className="nutri-section nutri-product-band" aria-labelledby="material-real">
        <div className="site-shell nutri-product-layout">
          <div>
            <p className="nutri-kicker">O material real</p>
            <h2 id="material-real">Uma dinâmica simples o bastante para aplicar. Estruturada o bastante para valorizar a consulta.</h2>
            <p>
              A criança investiga aparência, textura, cheiro e sabor. Você observa,
              conduz a conversa e registra o que aconteceu sem reduzir o encontro a
              “comeu” ou “não comeu”.
            </p>
            <ul className="nutri-check-list">
              <li>Objetivo compreensível para a criança</li>
              <li>Etapas visuais para orientar o atendimento</li>
              <li>Registro que a família consegue levar para casa</li>
            </ul>
          </div>
          <figure className="nutri-board-preview">
            <img
              src="/images/trilha-sensorial.png"
              alt="Trilha Sensorial Missão Novos Sabores com quatro etapas de investigação"
            />
            <figcaption>PDF A4 · pronto para imprimir</figcaption>
          </figure>
        </div>
      </section>

      <section className="nutri-section" aria-labelledby="aplicacao">
        <div className="site-shell">
          <p className="nutri-kicker">Como entra no atendimento</p>
          <h2 id="aplicacao">Da apresentação do alimento à tarefa para casa.</h2>
          <div className="nutri-flow">
            {sessionFlow.map(([title, text], index) => (
              <article key={title}>
                <strong>{String(index + 1).padStart(2, "0")}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="nutri-section nutri-recognition-band" aria-labelledby="reconhecimento">
        <div className="site-shell nutri-recognition-layout">
          <div>
            <p className="nutri-kicker nutri-kicker-light">Reconhecimento não vem de parecer complicada</p>
            <h2 id="reconhecimento">Vem de fazer a família sentir que foi compreendida — e saiu sabendo o que fazer.</h2>
          </div>
          <div>
            <blockquote>
              “Foi a nutricionista que conseguiu envolver meu filho e ainda nos deu
              uma atividade para continuar em casa.”
            </blockquote>
            <p>
              Essa é a lembrança que um recurso tangível pode ajudar a construir:
              não apenas informação, mas cuidado organizado, aplicável e fácil de compartilhar.
            </p>
          </div>
        </div>
      </section>

      <section className="nutri-section" aria-labelledby="recebe-nutri">
        <div className="site-shell nutri-included-layout">
          <div>
            <p className="nutri-kicker">O que você recebe hoje</p>
            <h2 id="recebe-nutri">Missão Novos Sabores — Atividade de Educação Alimentar Infantil.</h2>
            <ul className="nutri-check-list nutri-check-list-large">
              {included.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <aside className="nutri-bump-preview" aria-label="Prévia do complemento disponível no checkout">
            <p className="nutri-bump-label">Disponível no checkout</p>
            <h3>Roteiro de Aplicação para Nutris</h3>
            <p>
              Um guia rápido com abertura da dinâmica, perguntas de observação,
              orientação para a família e sequência de retorno.
            </p>
            <ul>
              <li>O que dizer para a criança</li>
              <li>O que observar durante a atividade</li>
              <li>Como transformar em tarefa para casa</li>
              <li>Perguntas para o próximo atendimento</li>
            </ul>
            <strong>Adicione por R$17 na tela de pagamento.</strong>
          </aside>
        </div>
      </section>

      <section className="nutri-offer" id="oferta" aria-labelledby="oferta-nutri">
        <div className="site-shell nutri-offer-layout">
          <div>
            <p className="nutri-kicker">Um recurso. Muitos atendimentos.</p>
            <h2 id="oferta-nutri">Comece com uma atividade que a família consegue ver, usar e lembrar.</h2>
            <p>
              Você recebe os arquivos digitais pela Hotmart e pode começar a aplicar
              no próximo atendimento. Sem curso para assistir antes.
            </p>
          </div>
          <div className="nutri-price-panel">
            <p>Investimento único</p>
            <div className="nutri-price"><small>R$</small>27</div>
            <CheckoutButton label="Quero a atividade profissional" />
            <p className="nutri-microcopy">Produto digital · nenhum material físico será enviado</p>
          </div>
        </div>
      </section>

      <section className="nutri-section nutri-faq" aria-labelledby="faq-nutri">
        <div className="site-shell nutri-faq-layout">
          <div>
            <p className="nutri-kicker">Antes de decidir</p>
            <h2 id="faq-nutri">Perguntas sobre uso profissional.</h2>
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

      <section className="nutri-final-cta" aria-labelledby="final-nutri">
        <div className="site-shell narrow">
          <p className="nutri-kicker nutri-kicker-light">Pronta para usar no próximo atendimento</p>
          <h2 id="final-nutri">Faça sua orientação continuar presente quando a consulta terminar.</h2>
          <CheckoutButton label="Receber a Missão Novos Sabores por R$27" />
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
