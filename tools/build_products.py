from __future__ import annotations

from pathlib import Path
from typing import Iterable

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    Flowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "deliverables"
OUT.mkdir(parents=True, exist_ok=True)

FONT_REGULAR = Path(r"C:\Windows\Fonts\trebuc.ttf")
FONT_BOLD = Path(r"C:\Windows\Fonts\trebucbd.ttf")
pdfmetrics.registerFont(TTFont("MNS", str(FONT_REGULAR)))
pdfmetrics.registerFont(TTFont("MNS-Bold", str(FONT_BOLD)))

INK = colors.HexColor("#173B3A")
GREEN = colors.HexColor("#277A63")
MINT = colors.HexColor("#DDF2E7")
CORAL = colors.HexColor("#F26B4B")
PEACH = colors.HexColor("#FFE3D8")
YELLOW = colors.HexColor("#F5C84C")
BLUE = colors.HexColor("#2879A8")
SKY = colors.HexColor("#DDEFFA")
PAPER = colors.HexColor("#FCFCF8")
MUTED = colors.HexColor("#536867")
WHITE = colors.white


def styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "Title",
            parent=base["Title"],
            fontName="MNS-Bold",
            fontSize=30,
            leading=34,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=10,
        ),
        "subtitle": ParagraphStyle(
            "Subtitle",
            parent=base["BodyText"],
            fontName="MNS",
            fontSize=13,
            leading=18,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=16,
        ),
        "h1": ParagraphStyle(
            "H1",
            parent=base["Heading1"],
            fontName="MNS-Bold",
            fontSize=23,
            leading=28,
            textColor=INK,
            spaceAfter=10,
        ),
        "h2": ParagraphStyle(
            "H2",
            parent=base["Heading2"],
            fontName="MNS-Bold",
            fontSize=15,
            leading=19,
            textColor=GREEN,
            spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="MNS",
            fontSize=10.4,
            leading=15,
            textColor=INK,
            spaceAfter=8,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["BodyText"],
            fontName="MNS",
            fontSize=8.3,
            leading=11,
            textColor=MUTED,
        ),
        "card_title": ParagraphStyle(
            "CardTitle",
            parent=base["Heading3"],
            fontName="MNS-Bold",
            fontSize=12.2,
            leading=15,
            textColor=INK,
            spaceAfter=4,
        ),
        "card": ParagraphStyle(
            "Card",
            parent=base["BodyText"],
            fontName="MNS",
            fontSize=9.1,
            leading=12.5,
            textColor=INK,
        ),
        "quote": ParagraphStyle(
            "Quote",
            parent=base["BodyText"],
            fontName="MNS-Bold",
            fontSize=13.2,
            leading=18,
            textColor=INK,
            alignment=TA_LEFT,
        ),
        "label": ParagraphStyle(
            "Label",
            parent=base["BodyText"],
            fontName="MNS-Bold",
            fontSize=8,
            leading=10,
            textColor=GREEN,
        ),
    }


S = styles()


class AccentLine(Flowable):
    def __init__(self, width=42 * mm, color=CORAL, height=5 * mm):
        super().__init__()
        self.width = width
        self.height = height
        self.color = color

    def draw(self):
        self.canv.setFillColor(self.color)
        self.canv.roundRect(0, 1.5 * mm, self.width, 2.2 * mm, 1.1 * mm, fill=1, stroke=0)


def P(text: str, style="body") -> Paragraph:
    return Paragraph(text, S[style])


def page_header(canvas, doc, product: str):
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    canvas.setStrokeColor(MINT)
    canvas.setLineWidth(0.8)
    canvas.line(18 * mm, height - 15 * mm, width - 18 * mm, height - 15 * mm)
    canvas.setFillColor(GREEN)
    canvas.setFont("MNS-Bold", 8)
    canvas.drawString(18 * mm, height - 11.5 * mm, product.upper())
    canvas.setFillColor(MUTED)
    canvas.setFont("MNS", 7.5)
    canvas.drawRightString(width - 18 * mm, 10 * mm, f"{doc.page}")
    canvas.restoreState()


def build_pdf(filename: str, title: str, story: list, *, margins=(18, 18, 22, 18)):
    path = OUT / filename
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        rightMargin=margins[0] * mm,
        leftMargin=margins[1] * mm,
        topMargin=margins[2] * mm,
        bottomMargin=margins[3] * mm,
        title=title,
        author="Conexão Nutritiva Kids",
        subject="Material digital para famílias",
    )
    doc.build(story, onFirstPage=lambda c, d: page_header(c, d, title), onLaterPages=lambda c, d: page_header(c, d, title))
    return path


def cover(title: str, subtitle: str, promise: str, color=GREEN) -> list:
    return [
        Spacer(1, 34 * mm),
        AccentLine(54 * mm, color),
        Spacer(1, 8 * mm),
        P(title, "title"),
        P(subtitle, "subtitle"),
        Spacer(1, 10 * mm),
        Table(
            [[P(promise, "quote")]],
            colWidths=[154 * mm],
            style=TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), MINT if color == GREEN else PEACH),
                ("BOX", (0, 0), (-1, -1), 1, color),
                ("LEFTPADDING", (0, 0), (-1, -1), 16),
                ("RIGHTPADDING", (0, 0), (-1, -1), 16),
                ("TOPPADDING", (0, 0), (-1, -1), 16),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 16),
            ]),
        ),
        Spacer(1, 30 * mm),
        P("Material digital para imprimir ou consultar no celular", "small"),
        P("Conexão Nutritiva Kids", "h2"),
        PageBreak(),
    ]


def section(title: str, intro: str | None = None):
    items = [P(title, "h1"), AccentLine()]
    if intro:
        items += [Spacer(1, 3 * mm), P(intro)]
    return items


def card(title: str, body: str, color=MINT, width=78 * mm):
    return Table(
        [[P(title, "card_title")], [P(body, "card")]],
        colWidths=[width],
        style=TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), color),
            ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor("#B9D8CC") if color == MINT else colors.HexColor("#F4BCA9")),
            ("LEFTPADDING", (0, 0), (-1, -1), 10),
            ("RIGHTPADDING", (0, 0), (-1, -1), 10),
            ("TOPPADDING", (0, 0), (-1, -1), 9),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ]),
    )


def two_cards(left, right):
    return Table(
        [[left, right]],
        colWidths=[82 * mm, 82 * mm],
        hAlign="LEFT",
        style=TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ]),
    )


def build_phrase_kit():
    story = cover(
        "Frases que Abrem a Curiosidade",
        "24 respostas prontas para conduzir a experiência sem transformar a comida em disputa",
        "Você não precisa improvisar no meio da tensão. Escolha uma frase curta, preserve o vínculo e mantenha a porta aberta para a próxima pequena descoberta.",
    )
    story += section("Como usar este kit", "Leia uma situação, escolha uma frase que combina com a sua voz e fale uma única vez. Depois, dê espaço para a criança responder. A frase é um convite - não uma técnica para vencer a resistência.")
    story += [
        two_cards(
            card("1. Regule você primeiro", "Antes de responder, solte os ombros e abaixe o tom. Uma frase calma perde força quando o corpo comunica urgência."),
            card("2. Mude o objetivo", "O objetivo da missão é conhecer. Olhar, tocar, cheirar ou descrever já podem ser pequenas vitórias."),
        ),
        Spacer(1, 6 * mm),
        two_cards(
            card("3. Ofereça uma escolha real", "Escolha entre duas formas seguras de participar: olhar ou cheirar; tocar com o dedo ou com o garfo; agora ou no fim da refeição."),
            card("4. Encerre sem drama", "Se a resposta continuar sendo não, termine com neutralidade. O alimento pode voltar em outro dia, sem dívida emocional."),
        ),
        Spacer(1, 8 * mm),
        P("Importante", "h2"),
        P("Este material é educativo e não substitui avaliação profissional. Procure o pediatra ou um profissional de alimentação infantil se houver perda de peso, dor, engasgos, vômitos frequentes, medo intenso, lista de alimentos muito restrita ou preocupação com crescimento e desenvolvimento."),
        PageBreak(),
    ]

    situations = [
        ("Quando a criança diz \"não gosto\" antes de provar", [
            "Tudo bem ainda não saber. Hoje vamos descobrir só uma coisa sobre ele.",
            "Você prefere investigar a cor ou o cheiro primeiro?",
            "Não precisa gostar. Pode me contar o que seus olhos perceberam?",
            "Vamos chamar de \"ainda não conheço\" em vez de \"não gosto\"?",
        ], "Evite: \"Como você sabe se nem provou?\" Isso convida a criança a defender o não."),
        ("Quando ela não quer tocar", [
            "Você pode usar o garfo como ferramenta de cientista.",
            "Quer que eu toque primeiro e você me diga como imagina que seja?",
            "Pode encostar só a pontinha do dedo e limpar depois.",
            "Hoje olhar de perto já conta como parte da missão.",
        ], "A distância também pode diminuir aos poucos. Participar não precisa começar com contato direto."),
        ("Quando o cheiro incomoda", [
            "Vamos cheirar de longe primeiro. Perto só se você quiser.",
            "O cheiro lembra alguma coisa? Forte, fraco, doce ou azedo?",
            "Você pode tapar o nariz e apenas observar agora.",
            "Seu nariz está avisando que este alimento é novo. Vamos com calma.",
        ], "Não minimize com \"nem tem cheiro\". A percepção sensorial da criança pode ser diferente da sua."),
        ("Quando ela aceita provar e muda de ideia", [
            "Você pode tirar da boca no guardanapo. Obrigada por investigar.",
            "Seu corpo disse que já foi suficiente por hoje.",
            "O que apareceu primeiro: o sabor ou a textura?",
            "Você não precisa de outra mordida para a missão valer.",
        ], "Deixe um guardanapo disponível. Ter uma saída segura pode reduzir a sensação de estar presa."),
        ("Quando pede o alimento de sempre", [
            "O alimento conhecido vai ficar aqui. O novo veio só para ser investigado.",
            "Você pode comer o que conhece e visitar o novo quando estiver pronta.",
            "Quer que o alimento novo fique no prato ou em um potinho ao lado?",
            "Hoje não vamos trocar um pelo outro. Eles podem dividir a mesa.",
        ], "Um alimento seguro ao lado do novo ajuda a refeição a continuar sendo previsível."),
        ("Quando você sente vontade de insistir", [
            "Eu vou parar de explicar. Você já entendeu o convite.",
            "Vamos guardar esta descoberta para outro dia.",
            "Hoje nosso pequeno passo foi colocar o alimento na mesa.",
            "Eu cuido do que é oferecido; você escuta o seu corpo.",
        ], "Use esta página também como fala interna. A pressão muitas vezes começa na ansiedade do adulto."),
    ]
    for title, phrases, note in situations:
        story += section(title)
        rows = []
        for i in range(0, 4, 2):
            rows.append([card(f"Frase {i+1}", phrases[i], MINT), card(f"Frase {i+2}", phrases[i+1], PEACH)])
        story += [
            Table(rows, colWidths=[82 * mm, 82 * mm], style=TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ])),
            Spacer(1, 5 * mm),
            Table([[P(f"<b>Lembrete:</b> {note}", "card")]], colWidths=[164 * mm], style=TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), SKY),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
            ])),
            PageBreak(),
        ]

    story += section("Plano rápido para o próximo \"não\"")
    story += [
        P("Preencha antes de colocar o alimento na mesa. Uma decisão tomada com calma é mais fácil de seguir no momento real."),
        Spacer(1, 4 * mm),
        worksheet([
            "Alimento que será apresentado:",
            "Alimento conhecido que também estará disponível:",
            "Duas formas seguras de participar:",
            "A frase que vou usar:",
            "O sinal que mostrará que é hora de encerrar:",
            "A menor vitória que vou reconhecer hoje:",
        ]),
        PageBreak(),
    ]
    story += section("Cartões de bolso", "Recorte, deixe perto da mesa ou salve uma foto no celular.")
    pocket = [
        ("ANTES", "Hoje vamos conhecer, não convencer."),
        ("AO OUVIR NÃO", "Tudo bem. Qual parte você aceita investigar?"),
        ("AO PROVAR", "Uma tentativa já conta. O que você percebeu?"),
        ("AO ENCERRAR", "Obrigada por participar. Podemos tentar de outro jeito outro dia."),
    ]
    story += [
        Table([[card(t, b, MINT if i % 2 == 0 else PEACH) for i, (t, b) in enumerate(pocket[:2])],
               [card(t, b, MINT if i % 2 == 0 else PEACH) for i, (t, b) in enumerate(pocket[2:])]],
              colWidths=[82 * mm, 82 * mm], rowHeights=[62 * mm, 62 * mm], style=TableStyle([
                  ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                  ("LEFTPADDING", (0, 0), (-1, -1), 2),
                  ("RIGHTPADDING", (0, 0), (-1, -1), 2),
                  ("TOPPADDING", (0, 0), (-1, -1), 2),
                  ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
              ])),
    ]
    return build_pdf("01-frases-que-abrem-a-curiosidade.pdf", "Frases que Abrem a Curiosidade", story)


def worksheet(labels: Iterable[str], line_count=2):
    data = []
    for label in labels:
        data.append([P(label, "label")])
        data.extend([[""] for _ in range(line_count)])
    heights = []
    for row in data:
        heights.append(7 * mm if row[0] else 8 * mm)
    return Table(data, colWidths=[164 * mm], rowHeights=heights, style=TableStyle([
        ("LINEBELOW", (0, 1), (0, -1), 0.45, colors.HexColor("#B8C8C5")),
        ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
    ]))


def build_passport():
    story = cover(
        "Passaporte do Pequeno Explorador",
        "Um registro imprimível para transformar contatos com alimentos em pequenas conquistas visíveis",
        "O passaporte não mede pratos vazios. Ele registra coragem, curiosidade e os muitos jeitos de conhecer um alimento novo.",
        CORAL,
    )
    story += section("Antes de começar", "Este passaporte pertence à criança. Convide-a para escolher um nome de explorador, desenhar um retrato e decidir onde guardar suas páginas.")
    story += [
        worksheet(["Nome do explorador:", "Minha assinatura de explorador:", "Alimentos que eu já conheço:", "Uma coisa que quero descobrir:"], line_count=2),
        Spacer(1, 5 * mm),
        P("Regra de ouro", "h2"),
        P("Ganhe selos por explorar, não por comer. Olhar de perto, tocar com uma ferramenta, cheirar de longe, descrever e provar são experiências diferentes - todas podem merecer registro."),
        PageBreak(),
    ]
    story += section("Legenda das descobertas")
    levels = [
        ("EU VI", "Observei a cor, o formato ou alguma parte do alimento."),
        ("EU CHEGUEI PERTO", "Aceitei que o alimento ficasse perto ou no meu prato."),
        ("EU TOQUEI", "Usei a mão, um garfo ou outro utensílio para sentir."),
        ("EU CHEIREI", "Percebi o cheiro de perto ou de longe."),
        ("EU PROVEI", "Coloquei na boca e percebi sabor ou textura."),
        ("EU DESCOBRI", "Contei algo novo sobre este alimento."),
    ]
    rows = []
    for i in range(0, len(levels), 2):
        rows.append([card(levels[i][0], levels[i][1], MINT), card(levels[i+1][0], levels[i+1][1], PEACH)])
    story += [Table(rows, colWidths=[82 * mm, 82 * mm], style=TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ])), PageBreak()]

    for n in range(1, 9):
        story += section(f"Carimbo de descoberta {n}")
        story += [
            worksheet(["Data:", "Alimento investigado:"], line_count=1),
            Spacer(1, 3 * mm),
            Table([
                [P("MARQUE O QUE ACONTECEU", "label")],
                [P("[  ] Vi de perto    [  ] Deixei ficar perto    [  ] Toquei    [  ] Cheirei    [  ] Provei    [  ] Descrevi", "card")],
            ], colWidths=[164 * mm], style=TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), MINT if n % 2 else PEACH),
                ("BOX", (0, 0), (-1, -1), 0.8, GREEN if n % 2 else CORAL),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ])),
            Spacer(1, 5 * mm),
            worksheet([
                "O que meus olhos descobriram:",
                "O que meu nariz ou minhas mãos descobriram:",
                "Minha palavra para esta experiência:",
                "Na próxima vez, eu aceitaria:",
            ], line_count=2),
            Spacer(1, 4 * mm),
            P("Minha nota para a experiência:  [  ] 1   [  ] 2   [  ] 3   [  ] 4   [  ] 5", "card_title"),
            PageBreak(),
        ]

    story += section("Selos de exploração", "Recorte ou pinte um selo quando a descoberta acontecer. A criança pode escolher qual representa melhor o passo que deu.")
    seals = ["OLHEI", "CHEGUEI PERTO", "TOQUEI", "CHEIREI", "PROVEI", "DESCREVI", "VOLTEI OUTRO DIA", "PEDI AJUDA", "FIZ UMA PERGUNTA", "ESCOLHI MEU PASSO", "RESPEITEI MEU CORPO", "COMPLETEI UMA MISSÃO"]
    seal_rows = []
    for i in range(0, len(seals), 3):
        seal_rows.append([Table([[P(x, "card_title")]], colWidths=[51 * mm], rowHeights=[28 * mm], style=TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), MINT if (i+j) % 2 == 0 else PEACH),
            ("BOX", (0, 0), (-1, -1), 1, GREEN if (i+j) % 2 == 0 else CORAL),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ])) for j, x in enumerate(seals[i:i+3])])
    story += [Table(seal_rows, colWidths=[54 * mm] * 3, style=TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 1),
        ("RIGHTPADDING", (0, 0), (-1, -1), 1),
        ("TOPPADDING", (0, 0), (-1, -1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ])), PageBreak()]
    story += section("Certificado de explorador de sabores")
    story += [
        Spacer(1, 10 * mm),
        P("Este certificado celebra", "subtitle"),
        worksheet(["Nome do explorador:"], line_count=2),
        Spacer(1, 8 * mm),
        P("por participar com curiosidade, comunicar seus limites e descobrir novas características dos alimentos.", "quote"),
        Spacer(1, 12 * mm),
        worksheet(["A descoberta de que mais me orgulho:", "Data:", "Assinatura de quem acompanhou:"], line_count=2),
    ]
    return build_pdf("02-passaporte-do-pequeno-explorador.pdf", "Passaporte do Pequeno Explorador", story)


MISSIONS = [
    ("Detetive das cores", "Escolha duas cores visíveis no alimento.", "Coloque o alimento sob boa luz. Procure manchas, bordas, sementes ou partes com tons diferentes.", "Dizer ou apontar duas cores."),
    ("Mapa das formas", "Descobrir linhas, curvas e formatos.", "Observe inteiro e cortado. Compare com círculo, meia-lua, estrela, gota ou um formato inventado.", "Criar um nome para a forma."),
    ("Zoom de cientista", "Olhar detalhes que passam despercebidos.", "Use uma lupa real ou faça um círculo com as mãos. Procure fibras, furinhos, camadas e marcas.", "Desenhar um detalhe."),
    ("Som secreto", "Perceber sons sem exigir uma mordida.", "Aperte, quebre, corte ou mexa o alimento com um utensílio. Escute o som que aparece.", "Escolher: silencioso, estalo, crocante ou outro."),
    ("Toque com ferramenta", "Explorar textura mantendo distância.", "Use garfo, colher, pinça ou palito apropriado. Pressione de leve e observe o que muda.", "Marcar: duro, macio, seco, molhado ou elástico."),
    ("Temperatura em palavras", "Nomear sensações térmicas.", "Compare duas pequenas porções em temperaturas seguras: ambiente e fresca, por exemplo.", "Dizer qual parece mais confortável."),
    ("Cheiro de longe", "Aproximar o aroma em etapas.", "Comece com o alimento longe. Aproxime apenas até a distância escolhida pela criança.", "Classificar: sem cheiro, fraco, médio ou forte."),
    ("Memória do nariz", "Criar associações pessoais.", "Cheire sem pressa. Pergunte se lembra uma comida, lugar, pessoa, estação ou momento.", "Contar uma lembrança ou dizer \"não lembra nada\"."),
    ("Família de texturas", "Comparar sem dizer melhor ou pior.", "Coloque o novo alimento ao lado de um conhecido com textura parecida ou diferente.", "Encontrar uma semelhança e uma diferença."),
    ("Antes e depois", "Observar transformação.", "Compare cru e cozido, inteiro e amassado ou frio e morno, sempre com segurança.", "Escolher qual versão gostaria de investigar de novo."),
    ("Chef de montagem", "Participar da preparação sem obrigação de comer.", "Convide para organizar três pedaços no prato, espetar, misturar ou decorar.", "Dar um nome à montagem."),
    ("Porção minúscula", "Reduzir o tamanho do desafio.", "Sirva uma porção do tamanho escolhido pela criança: uma migalha, uma fatia fina ou um pedacinho.", "Deixar o alimento na área combinada do prato."),
    ("Três palavras", "Aumentar vocabulário sensorial.", "Escolha três palavras entre doce, salgado, azedo, amargo, suave, forte, firme, cremoso e crocante.", "Usar pelo menos uma palavra."),
    ("Semáforo do corpo", "Ajudar a criança a comunicar conforto.", "Verde = posso continuar; amarelo = preciso pausar; vermelho = quero parar. A criança aponta uma cor.", "Adulto respeitar a cor indicada."),
    ("Mordida opcional", "Tornar a saída previsível.", "Disponibilize guardanapo e diga que provar não obriga engolir ou repetir.", "Se quiser, tocar com a língua ou dar uma pequena mordida."),
    ("Repórter do alimento", "Transformar sensação em notícia.", "A criança anuncia: nome, aparência, cheiro, textura e uma descoberta surpresa.", "Gravar um áudio curto ou contar ao adulto."),
    ("Nota que pode mudar", "Mostrar que experiências variam.", "Dê uma nota de 1 a 5 para o encontro de hoje. Não para o alimento para sempre.", "Completar: \"Hoje foi nota... porque...\""),
    ("Escolha do utensílio", "Dar autonomia na aproximação.", "Ofereça duas ferramentas seguras para tocar, cortar ou levar o alimento perto.", "Escolher uma ferramenta ou optar por observar."),
    ("Pequeno professor", "Colocar a criança no papel de especialista.", "Ela ensina um boneco ou adulto a observar, tocar e descrever o alimento.", "Dar uma instrução ao aprendiz."),
    ("Reencontro", "Perceber o que mudou entre exposições.", "Retome um alimento já investigado. Leia o registro anterior e procure uma diferença.", "Completar: \"Desta vez eu...\""),
    ("Missão inventada", "Encerrar com autoria.", "A criança escolhe alimento, ferramenta, pergunta e menor passo. O adulto acompanha.", "Dar nome à missão e registrar a descoberta."),
]


def build_missions():
    story = cover(
        "21 Missões da Mesa Curiosa",
        "Um repertório de atividades rápidas para variar a exploração e continuar avançando sem repetir sempre a mesma abordagem",
        "Uma missão por vez. Um pequeno passo escolhido. Nenhuma obrigação de gostar, terminar ou repetir.",
    )
    story += section("O método das 4 escolhas", "Antes de cada missão, preserve quatro escolhas para manter a experiência leve e previsível.")
    story += [
        two_cards(card("1. Escolha o momento", "Prefira um momento em que o adulto não esteja correndo e a criança não esteja exausta ou com muita fome."), card("2. Escolha o alimento", "Comece com algo novo, pouco conhecido ou apresentado de uma forma diferente.")),
        Spacer(1, 5 * mm),
        two_cards(card("3. Escolha o menor passo", "A criança pode olhar, aproximar, tocar, cheirar, descrever ou provar. O próximo passo não precisa ser uma mordida."), card("4. Escolha o fim", "Combine como encerrar: depois de uma descoberta, após cinco minutos ou quando a criança usar o semáforo vermelho.")),
        Spacer(1, 7 * mm),
        P("Ritmo sugerido", "h2"),
        P("Faça de 2 a 4 missões por semana. Repetir uma missão com outro alimento também conta. Você não precisa completar as 21 em sequência."),
        P("Segurança", "h2"),
        P("Use alimentos e utensílios adequados à idade, supervisione a atividade e respeite alergias e orientações de saúde. Este material não substitui acompanhamento profissional."),
        PageBreak(),
    ]
    story += section("Preparação simples")
    story += [
        P("Escolha apenas o que a missão pede. Quanto menor a preparação, maior a chance de o material entrar na vida real."),
        Table([
            [P("BÁSICOS", "card_title"), P("OPCIONAIS", "card_title")],
            [P("Prato pequeno<br/>Guardanapo<br/>Lápis de cor<br/>Uma porção pequena<br/>Um alimento conhecido ao lado", "card"), P("Lupa<br/>Pinça infantil<br/>Palitos adequados à idade<br/>Boneco<br/>Celular para áudio<br/>Dois utensílios para escolha", "card")],
        ], colWidths=[82 * mm, 82 * mm], style=TableStyle([
            ("BACKGROUND", (0, 0), (0, -1), MINT),
            ("BACKGROUND", (1, 0), (1, -1), PEACH),
            ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor("#B9D8CC")),
            ("INNERGRID", (0, 0), (-1, -1), 0.5, WHITE),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 12),
            ("RIGHTPADDING", (0, 0), (-1, -1), 12),
            ("TOPPADDING", (0, 0), (-1, -1), 12),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
        ])),
        Spacer(1, 8 * mm),
        worksheet(["Nosso lugar para as missões:", "Melhores dias e horários:", "Sinais de que é melhor adiar:", "Frase de início da família:"], line_count=2),
        PageBreak(),
    ]

    for i in range(0, len(MISSIONS), 2):
        story += section(f"Missões {i+1} e {min(i+2, len(MISSIONS))}")
        group = []
        for j, mission in enumerate(MISSIONS[i:i+2], start=i+1):
            title, goal, steps, finish = mission
            group.append(Table([
                [P(f"MISSÃO {j:02d}", "label")],
                [P(title, "h2")],
                [P(f"<b>Objetivo:</b> {goal}", "card")],
                [P(f"<b>Como fazer:</b> {steps}", "card")],
                [P(f"<b>Linha de chegada:</b> {finish}", "card")],
                [P("Registro: [  ] olhou  [  ] tocou  [  ] cheirou  [  ] descreveu  [  ] provou", "small")],
            ], colWidths=[164 * mm], style=TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), MINT if j % 2 else PEACH),
                ("BOX", (0, 0), (-1, -1), 0.9, GREEN if j % 2 else CORAL),
                ("LEFTPADDING", (0, 0), (-1, -1), 11),
                ("RIGHTPADDING", (0, 0), (-1, -1), 11),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ])))
        for block in group:
            story += [block, Spacer(1, 7 * mm)]
        story += [PageBreak()]

    story += section("Registro das 21 missões")
    rows = [[P("Nº", "label"), P("Data", "label"), P("Alimento", "label"), P("Pequena descoberta", "label"), P("Repetir?", "label")]]
    for i in range(1, 22):
        rows.append([str(i), "", "", "", ""])
    story += [Table(rows, colWidths=[10 * mm, 25 * mm, 38 * mm, 70 * mm, 21 * mm], rowHeights=[8 * mm] + [9 * mm] * 21, style=TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), GREEN),
        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
        ("FONTNAME", (0, 0), (-1, 0), "MNS-Bold"),
        ("FONTNAME", (0, 1), (-1, -1), "MNS"),
        ("FONTSIZE", (0, 0), (-1, -1), 7.5),
        ("GRID", (0, 0), (-1, -1), 0.45, colors.HexColor("#A9BCB8")),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (0, 1), (0, -1), "CENTER"),
    ])), PageBreak()]
    story += section("Depois da missão 21")
    story += [
        P("O valor do ciclo não está em quantos alimentos foram comidos. Está no repertório que a família construiu para se aproximar do novo com menos improviso e mais segurança."),
        worksheet([
            "A missão que deixou a criança mais confortável:",
            "A frase que mais ajudou:",
            "Um alimento que ficou menos estranho:",
            "Uma coisa que o adulto aprendeu sobre a criança:",
            "A próxima missão que queremos inventar:",
        ], line_count=2),
    ]
    return build_pdf("03-21-missoes-da-mesa-curiosa.pdf", "21 Missões da Mesa Curiosa", story)


def build_planner_bonus():
    story = cover(
        "Plano Mesa Curiosa - 4 Semanas",
        "Bônus 1: um roteiro leve para encaixar as missões na rotina sem transformar o projeto em mais uma cobrança",
        "Planeje pouco, observe muito e ajuste o próximo passo com base no que a criança mostrou.",
        BLUE,
    )
    story += section("Como planejar sem pressionar")
    story += [
        two_cards(card("Duas missões por semana", "É frequência suficiente para criar continuidade e flexível o bastante para caber em semanas reais."), card("Um alimento por vez", "Repetir o mesmo alimento em missões diferentes ajuda a separar novidade de obrigação.")),
        Spacer(1, 5 * mm),
        two_cards(card("Registre o que aconteceu", "Anote comportamento observável: ficou perto, tocou com garfo, descreveu o cheiro. Evite rótulos como teimoso."), card("Ajuste a dificuldade", "Se houve tensão, reduza distância, duração ou contato na próxima vez. Se houve conforto, convide para um pequeno passo novo.")),
        Spacer(1, 8 * mm),
        worksheet(["Por que queremos fazer este ciclo:", "O que não queremos transformar em meta:", "Como saberemos que o clima está mais leve:"], line_count=2),
        PageBreak(),
    ]
    week_themes = [
        ("Semana 1 - Segurança", "Comece com missões de olhar, escolher distância e usar ferramentas.", ["Detetive das cores", "Toque com ferramenta"]),
        ("Semana 2 - Vocabulário", "Ajude a criança a nomear sensações sem classificar como bom ou ruim.", ["Três palavras", "Repórter do alimento"]),
        ("Semana 3 - Autonomia", "Dê escolhas pequenas e reais sobre porção, utensílio e fim da atividade.", ["Porção minúscula", "Escolha do utensílio"]),
        ("Semana 4 - Reencontro", "Retome um alimento e compare a experiência sem exigir evolução linear.", ["Nota que pode mudar", "Reencontro"]),
    ]
    for index, (title, intro, examples) in enumerate(week_themes, start=1):
        story += section(title, intro)
        story += [
            P(f"Sugestões: <b>{examples[0]}</b> e <b>{examples[1]}</b>. Você pode trocar por qualquer missão que combine melhor com a criança."),
            Spacer(1, 4 * mm),
            worksheet([
                "Alimento da semana:",
                "Missão A - dia e horário:",
                "Menor passo combinado:",
                "O que aconteceu:",
                "Missão B - dia e horário:",
                "O que vamos manter ou ajustar:",
            ], line_count=2),
            PageBreak(),
        ]
    story += section("Painel do ciclo")
    rows = [[P("SEMANA", "label"), P("ALIMENTO", "label"), P("MISSÕES", "label"), P("DESCOBERTA", "label"), P("PRÓXIMO PASSO", "label")]]
    for i in range(1, 5):
        rows.append([str(i), "", "", "", ""])
    story += [Table(rows, colWidths=[18 * mm, 36 * mm, 36 * mm, 40 * mm, 34 * mm], rowHeights=[10 * mm] + [35 * mm] * 4, style=TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), BLUE),
        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
        ("FONTNAME", (0, 0), (-1, 0), "MNS-Bold"),
        ("FONTNAME", (0, 1), (-1, -1), "MNS"),
        ("FONTSIZE", (0, 0), (-1, -1), 7),
        ("GRID", (0, 0), (-1, -1), 0.55, colors.HexColor("#9AB9CA")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ALIGN", (0, 1), (0, -1), "CENTER"),
    ])), PageBreak()]
    story += section("Revisão de 10 minutos")
    story += [worksheet([
        "O que ficou mais fácil para a criança:",
        "O que ficou mais fácil para o adulto:",
        "Onde ainda apareceu pressão:",
        "Qual tipo de missão funcionou melhor:",
        "O que queremos continuar no próximo mês:",
    ], line_count=3)]
    return build_pdf("bonus-01-plano-mesa-curiosa-4-semanas.pdf", "Plano Mesa Curiosa - 4 Semanas", story)


def build_family_bonus():
    story = cover(
        "Acordo da Família à Mesa",
        "Bônus 2: frases e combinados para alinhar parceiro, avós, babá e escola sem começar outra disputa entre adultos",
        "A criança recebe uma mensagem mais segura quando os adultos usam poucas regras, a mesma linguagem e expectativas possíveis.",
        CORAL,
    )
    story += section("A conversa em 15 minutos", "Escolha um momento fora da refeição. O objetivo não é convencer todos sobre teoria; é combinar comportamentos simples para a próxima experiência.")
    story += [
        two_cards(card("1. Comece pela intenção comum", "\"Todos queremos que ela cresça saudável e tranquila com a comida.\""), card("2. Nomeie o problema sem culpar", "\"Quando várias pessoas insistem ao mesmo tempo, a refeição fica mais tensa.\"")),
        Spacer(1, 5 * mm),
        two_cards(card("3. Proponha três combinados", "Sem obrigar uma mordida, sem comparar crianças e sem oferecer prêmio em troca de comer."), card("4. Dê uma alternativa", "Em vez de insistir, faça uma pergunta de curiosidade ou encerre o assunto.")),
        Spacer(1, 7 * mm),
        worksheet(["Nossa intenção comum:", "O momento que mais gera conflito:", "Três comportamentos que vamos testar por 14 dias:"], line_count=3),
        PageBreak(),
    ]
    story += section("O acordo de 6 pontos")
    agreements = [
        ("O adulto oferece", "Escolhe o que será servido, quando e onde, respeitando orientações de saúde da família."),
        ("A criança participa", "Pode observar, perguntar, servir-se com ajuda e comunicar conforto ou desconforto."),
        ("Ninguém exige prova", "Não pedimos uma mordida para merecer sobremesa, tela, brincadeira ou aprovação."),
        ("Ninguém compara", "Irmãos, primos e colegas têm corpos, histórias e ritmos diferentes."),
        ("Uma pessoa conduz", "Durante a missão, um adulto fala e os demais evitam acrescentar pressão."),
        ("O fim é respeitado", "Quando a atividade termina, não retomamos a negociação naquela refeição."),
    ]
    rows=[]
    for i in range(0,6,2): rows.append([card(agreements[i][0],agreements[i][1],MINT),card(agreements[i+1][0],agreements[i+1][1],PEACH)])
    story += [Table(rows,colWidths=[82*mm,82*mm],style=TableStyle([
        ("VALIGN",(0,0),(-1,-1),"TOP"),("LEFTPADDING",(0,0),(-1,-1),0),("RIGHTPADDING",(0,0),(-1,-1),5),("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5)
    ])), PageBreak()]
    story += section("Frases para interromper pressão com respeito")
    phrase_rows = [
        ("Quando alguém diz \"só uma mordida\"", "\"Hoje a missão é conhecer. Se ela quiser provar, o convite continua aberto.\""),
        ("Quando comparam com outra criança", "\"Cada criança tem um ritmo. Vamos falar do que ela descobriu hoje.\""),
        ("Quando chamam de manha", "\"Pode parecer simples para nós, mas ela está mostrando desconforto. Vamos reduzir o passo.\""),
        ("Quando oferecem prêmio", "\"Vamos separar a sobremesa desta negociação. A atividade termina sem dívida.\""),
        ("Quando o adulto perde a paciência", "\"Eu assumo daqui. A gente conversa depois, fora da mesa.\""),
        ("Quando dizem que você está cedendo", "\"Não estamos desistindo. Estamos praticando aproximações que ela consegue sustentar.\""),
    ]
    for i,(t,b) in enumerate(phrase_rows):
        story += [card(t,b,MINT if i%2==0 else PEACH,width=164*mm),Spacer(1,4*mm)]
    story += [PageBreak()]
    story += section("Mensagens prontas")
    messages = [
        ("PARA AVÓS E FAMILIARES", "Estamos testando uma forma mais tranquila de apresentar alimentos. Durante algumas semanas, vamos evitar pedir \"só uma mordida\", comparar ou premiar. Você pode ajudar perguntando sobre cor, cheiro ou formato - e deixando a criança encerrar quando disser que já foi suficiente."),
        ("PARA BABÁ OU CUIDADOR", "Nas refeições, ofereça o alimento combinado junto de algo conhecido. Não precisa convencer. Se houver recusa, diga: \"Tudo bem. Você quer olhar, cheirar ou deixar ao lado?\" Registre o que ela aceitou fazer e encerre sem insistir."),
        ("PARA A ESCOLA", "Estamos trabalhando uma aproximação gradual com alimentos novos. Pedimos que a criança não seja obrigada a provar, não seja comparada com colegas e possa comunicar desconforto. Observações sobre o que ela tolerou ou explorou serão muito úteis para alinharmos os próximos passos."),
    ]
    for title,body in messages:
        story += [card(title,body,SKY,width=164*mm),Spacer(1,5*mm)]
    story += [PageBreak()]
    story += section("Folha do acordo")
    story += [
        P("Durante os próximos 14 dias, nossa família vai testar estes combinados:"),
        worksheet([
            "Vamos evitar:",
            "Vamos dizer:",
            "Quando a criança disser não:",
            "Quando um adulto ficar frustrado:",
            "Quem conduz as missões:",
            "Data para revisar o acordo:",
        ],line_count=2),
        Spacer(1,5*mm),
        worksheet(["Assinaturas dos adultos:"],line_count=3),
        PageBreak(),
    ]
    story += section("Revisão do acordo")
    story += [worksheet([
        "Qual combinado trouxe mais calma:",
        "Qual foi mais difícil de manter:",
        "O que a criança comunicou melhor:",
        "O que vamos ajustar pelos próximos 14 dias:",
        "Há algum sinal de que precisamos procurar orientação profissional:",
    ],line_count=3)]
    return build_pdf("bonus-02-acordo-da-familia-a-mesa.pdf", "Acordo da Família à Mesa", story)


def main():
    built = [
        build_phrase_kit(),
        build_passport(),
        build_missions(),
        build_planner_bonus(),
        build_family_bonus(),
    ]
    for path in built:
        print(path)


if __name__ == "__main__":
    main()
