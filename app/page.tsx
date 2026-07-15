import type { Metadata } from "next";
import { MAIN_CHECKOUT_URL } from "./config";

export const metadata: Metadata = {
  title: "Missão Novos Sabores | Trilha Sensorial para Imprimir",
  description:
    "Uma atividade imprimível para transformar o próximo contato com um alimento novo em uma missão de curiosidade, sem obrigação de limpar o prato.",
};

const discoveries = [
  ["01", "Olhar", "A criança começa por cor, formato e aparência."],
  ["02", "Tocar", "Explora temperatura e textura com a mão ou um utensílio."],
  ["03", "Cheirar", "Percebe o aroma de perto ou de uma distância confortável."],
  ["04", "Experimentar", "Se quiser, prova e registra a experiência com estrelas."],
];

const included = [
  "Trilha Sensorial colorida em PDF tamanho A4",
  "Etapas de aparência, textura, cheiro e sabor",
  "Espaço para escrever o alimento investigado",
  "Escala de estrelas para registrar cada experiência",
  "Guia ilustrado de uso e impressão",
  "Arquivo reutilizável para imprimir em novas missões",
];

const faqs = [
  [
    "Como recebo o material?",
    "Depois da confirmação do pagamento, a Hotmart libera o acesso aos arquivos digitais. Nenhum produto físico será enviado.",
  ],
  [
    "Preciso imprimir em uma papelaria?",
    "Não. Você pode imprimir em casa ou em uma papelaria. O arquivo principal está preparado em A4 e o guia mostra a configuração de impressão.",
  ],
  [
    "Posso usar mais de uma vez?",
    "Sim. Salve o PDF e imprima uma nova cópia sempre que quiser investigar outro alimento.",
  ],
  [
    "Meu filho precisa provar para completar a missão?",
    "Não. Observar, aproximar, tocar, cheirar e descrever também são formas de participar. Provar é um convite, não uma condição para a atividade valer.",
  ],
  [
    "Para qual idade é indicado?",
    "A atividade foi pensada principalmente para crianças pequenas que já conseguem apontar, escolher e registrar com ajuda de um adulto. Adapte a conversa e supervisione conforme a idade.",
  ],
  [
    "Isso trata seletividade alimentar?",
    "Não. É uma atividade educativa para uso em casa e não substitui avaliação ou acompanhamento profissional. Procure orientação se houver dor, engasgos, perda de peso, medo intenso ou repertório alimentar muito restrito.",
  ],
];

function CheckoutButton({ label }: { label: string }) {
  return (
    <a className="button button-primary" href={MAIN_CHECKOUT_URL}>
      <span>{label}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

export default function Home() {
  return (
    <main>
      <div className="notice-bar">
        Para mães que querem continuar apresentando novos alimentos sem transformar a mesa em uma prova
      </div>

      <header className="hero hero-main">
        <div className="hero-overlay" />
        <div className="site-shell hero-content">
          <p className="brand">Conexão Nutritiva Kids</p>
          <p className="eyebrow">Atividade sensorial para imprimir</p>
          <h1>Missão Novos Sabores</h1>
          <p className="hero-lead">
            Troque o “só prova...” por uma missão em que seu filho olha, toca,
            cheira e registra o que descobriu - no ritmo que ele consegue hoje.
          </p>
          <p className="hero-proof">
            O objetivo não é limpar o prato. É tornar o próximo contato possível.
          </p>
          <CheckoutButton label="Começar a primeira missão por R$27" />
          <p className="microcopy">Pagamento único · acesso digital imediato · imprima quantas vezes quiser</p>
        </div>
      </header>

      <section className="section section-ink" aria-labelledby="problema">
        <div className="site-shell narrow">
          <p className="eyebrow eyebrow-light">Talvez você conheça este momento</p>
          <h2 id="problema">O alimento chega. O “não” vem antes mesmo da primeira descoberta.</h2>
          <div className="story-lines">
            <p>Você tenta explicar por que faz bem.</p>
            <p>Oferece uma troca. Pede só uma mordida.</p>
            <p>A criança percebe que está sendo observada. Você percebe que está insistindo.</p>
          </div>
          <blockquote>
            E o que deveria ser apenas uma refeição começa a parecer um teste para os dois.
          </blockquote>
          <p className="section-close">
            A Missão Novos Sabores cria uma terceira opção: continuar apresentando o alimento sem transformar aceitação em obrigação.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="novo-objetivo">
        <div className="site-shell">
          <div className="heading-row">
            <div>
              <p className="eyebrow">O novo objetivo da refeição</p>
              <h2 id="novo-objetivo">Antes de gostar, a criança pode aprender a conhecer.</h2>
            </div>
            <p>
              A trilha divide uma experiência grande em quatro passos concretos. Cada etapa dá à criança uma pergunta que ela consegue responder sem precisar dizer “eu gostei”.
            </p>
          </div>
          <div className="number-grid">
            {discoveries.map(([number, title, text]) => (
              <article className="number-card" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section product-band" aria-labelledby="produto-real">
        <div className="site-shell">
          <div className="product-intro">
            <p className="eyebrow">Veja o material de verdade</p>
            <h2 id="produto-real">Uma trilha colorida. Quatro descobertas. Uma pequena vitória possível hoje.</h2>
            <p>
              Escreva o nome do alimento no centro e acompanhe a criança por aparência, textura, cheiro e sabor. Ao final de cada parte, ela registra a própria percepção.
            </p>
          </div>
          <figure className="board-preview">
            <img
              src="/images/trilha-sensorial.png"
              alt="Trilha Sensorial Missão Novos Sabores com etapas de aparência, textura, cheiro e sabor"
            />
            <figcaption>Arquivo principal em PDF A4, pronto para imprimir.</figcaption>
          </figure>
        </div>
      </section>

      <section className="section section-coral" aria-labelledby="como-usar">
        <div className="site-shell">
          <p className="eyebrow">Da compra para a mesa</p>
          <h2 id="como-usar">Você prepara a primeira missão em poucos minutos.</h2>
          <div className="steps-row">
            <article>
              <strong>1</strong>
              <h3>Baixe e imprima</h3>
              <p>Receba os PDFs pela Hotmart e imprima a trilha em uma folha A4.</p>
            </article>
            <article>
              <strong>2</strong>
              <h3>Escolha um alimento</h3>
              <p>Pode ser novo, pouco conhecido ou apresentado de um jeito diferente.</p>
            </article>
            <article>
              <strong>3</strong>
              <h3>Convide para investigar</h3>
              <p>Conduza as perguntas, marque as descobertas e termine sem prolongar a negociação.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="recebe">
        <div className="site-shell media-layout">
          <div className="media-copy">
            <p className="eyebrow">O que você recebe</p>
            <h2 id="recebe">Tudo que precisa para começar sem ficar estudando antes.</h2>
            <ul className="check-list">
              {included.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <figure className="document-preview">
            <img src="/images/como-jogar.jpg" alt="Primeira página do guia ilustrado Como Jogar" />
          </figure>
        </div>
      </section>

      <section className="section section-mint" aria-labelledby="nao-promete">
        <div className="site-shell split-copy">
          <div>
            <p className="eyebrow">Uma promessa que cabe na vida real</p>
            <h2 id="nao-promete">Não promete que seu filho vai amar um alimento em uma tarde.</h2>
          </div>
          <div>
            <p className="large-copy">
              Entrega algo mais útil para a próxima tentativa: um jeito de aproximar, observar e conversar sem deixar que uma mordida decida se a experiência deu certo ou não.
            </p>
            <p>
              Para algumas crianças, a vitória pode ser provar. Para outras, pode ser deixar o alimento no prato, tocar com o garfo ou descobrir uma palavra para a textura.
            </p>
          </div>
        </div>
      </section>

      <section className="section offer-section" id="oferta" aria-labelledby="oferta-titulo">
        <div className="site-shell offer-layout">
          <div className="offer-copy">
            <p className="eyebrow">Comece pela próxima tentativa</p>
            <h2 id="oferta-titulo">Missão Novos Sabores - Trilha Sensorial</h2>
            <p>
              Um material simples para sair da negociação e entrar em uma experiência que a criança consegue compreender e participar.
            </p>
            <ul className="plain-list">
              <li>Trilha Sensorial em PDF A4</li>
              <li>Guia ilustrado de uso e impressão</li>
              <li>Acesso digital pela Hotmart</li>
            </ul>
          </div>
          <div className="price-panel">
            <p>Pagamento único</p>
            <div className="price"><small>R$</small>27</div>
            <CheckoutButton label="Quero começar a missão" />
            <p className="microcopy">Produto digital · nenhum material físico será enviado</p>
          </div>
        </div>
      </section>

      <section className="section faq-section" aria-labelledby="faq">
        <div className="site-shell faq-layout">
          <div>
            <p className="eyebrow">Antes de decidir</p>
            <h2 id="faq">Perguntas que podem estar passando pela sua cabeça.</h2>
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

      <section className="final-cta" aria-labelledby="final-title">
        <div className="site-shell narrow">
          <p className="eyebrow eyebrow-light">A próxima refeição não precisa provar nada</p>
          <h2 id="final-title">Ela pode simplesmente abrir espaço para uma descoberta.</h2>
          <CheckoutButton label="Receber a Missão Novos Sabores por R$27" />
        </div>
      </section>

      <footer>
        <div className="site-shell footer-content">
          <p>Conexão Nutritiva Kids</p>
          <p>Material educativo. Não substitui orientação de pediatra, nutricionista ou profissional de alimentação infantil.</p>
        </div>
      </footer>
    </main>
  );
}
