import { useState } from "react";

const questions = [
  {
    id: "destino",
    eixo: "Clareza de Destino",
    numero: "01",
    reconhecimento: "\"Quando tiver mais tempo, sento e organizo tudo.\"",
    pergunta: "Você consegue dizer, hoje, qual é o número exato que precisa acumular para ter a vida que quer — e em quanto tempo?",
    opcoes: [
      { label: "Tenho esse número claro, revisado, com plano ativo.", score: 0 },
      { label: "Tenho uma ideia, mas sem número ou prazo real.", score: 2 },
      { label: "Nunca parei para calcular isso de verdade.", score: 3 },
    ],
    reflexao: "Saber para onde ir não é luxo de quem já chegou. É o ponto de partida de qualquer decisão financeira que faça sentido.",
  },
  {
    id: "visibilidade",
    eixo: "Visibilidade do que Existe",
    numero: "02",
    reconhecimento: "\"Tenho uma noção do que tenho — acho que está tudo bem.\"",
    pergunta: "Se alguém te pedisse um resumo completo do seu patrimônio hoje — ativos, rendimentos, custos — você conseguiria entregar em menos de uma hora?",
    opcoes: [
      { label: "Sim, tenho isso organizado e atualizado.", score: 0 },
      { label: "Conseguiria, mas levaria dias e ficaria incompleto.", score: 2 },
      { label: "Não tenho isso consolidado em lugar nenhum.", score: 3 },
    ],
    reflexao: "Você é CEO de uma empresa. Mas quem tem o dashboard da sua própria vida financeira?",
  },
  {
    id: "protecao",
    eixo: "Separação e Proteção",
    numero: "03",
    reconhecimento: "\"Tenho um advogado. Se precisar, resolvo.\"",
    pergunta: "Seu patrimônio pessoal está formalmente separado da sua vida profissional e protegido de eventos imprevistos — divórcio, dissolução societária, incapacidade?",
    opcoes: [
      { label: "Sim, tenho estrutura jurídica funcionando para isso.", score: 0 },
      { label: "Sei que preciso organizar, mas ainda não está feito.", score: 2 },
      { label: "Nunca tratei isso de forma estruturada.", score: 3 },
    ],
    reflexao: "Proteção patrimonial não é pessimismo — é o mesmo raciocínio que te faz ter seguro no carro que você não pretende bater.",
  },
  {
    id: "processo",
    eixo: "Processo ou Produto",
    numero: "04",
    reconhecimento: "\"Tenho gerente no banco. Ele me orienta quando preciso.\"",
    pergunta: "Quando foi a última vez que alguém te explicou sua situação financeira sem estar, ao mesmo tempo, tentando te vender algo?",
    opcoes: [
      { label: "Tenho um planejador que só responde a mim, sem meta de produto.", score: 0 },
      { label: "Tenho assessor ou gerente — mas sei que eles têm metas próprias.", score: 2 },
      { label: "Nunca vivi essa experiência. Sempre veio acompanhada de oferta.", score: 3 },
    ],
    reflexao: "Gerente, assessor e planejador não são sinônimos. Saber a diferença muda tudo sobre em quem você pode confiar.",
  },
  {
    id: "decisao",
    eixo: "Decisão e Energia",
    numero: "05",
    reconhecimento: "\"Sei que preciso resolver isso. Só não tenho tempo agora.\"",
    pergunta: "Existe alguma decisão financeira relevante que você sabe que precisa tomar — e está adiando?",
    opcoes: [
      { label: "Não — estou em dia com as decisões que importam.", score: 0 },
      { label: "Sim, uma ou duas coisas que ficam esperando.", score: 1 },
      { label: "Sim, várias. E isso me pesa mais do que eu admito.", score: 3 },
    ],
    reflexao: "Adiar uma decisão financeira também é uma decisão — e ela tem custo. Só que esse custo não aparece em nenhum extrato.",
  },
];

const getResultado = (score) => {
  if (score <= 3) return {
    titulo: "Você tem clareza acima da média.",
    subtitulo: "Isso é raro — e foi construído.",
    corpo: "A maioria das mulheres na sua posição profissional chega aqui com muito mais lacunas do que você. Ter clareza de destino, visibilidade do patrimônio e proteção estruturada já te coloca à frente de quase todo o mercado. O que vale agora é garantir que esse processo seja revisado regularmente — clareza patrimonial não é estado, é prática.",
    cor: "#7A9E7E",
    label: "Clareza Alta",
  };
  if (score <= 8) return {
    titulo: "Você tem partes organizadas — e partes que ficaram para depois.",
    subtitulo: "\"Depois\" tem um custo que não aparece no extrato.",
    corpo: "Você provavelmente tem alguns pontos bem resolvidos e outros que ficaram em segundo plano — porque a vida exige isso, porque o tempo não apareceu, porque ninguém trouxe a conversa certa no momento certo. Não é descuido. É o resultado de um mercado que fala produto em vez de processo. O que você precisa não é de mais um produto — é de um processo que faça sentido para a sua vida.",
    cor: "#C9A96E",
    label: "Clareza Parcial",
  };
  return {
    titulo: "Você carrega mais do que deveria — sozinha.",
    subtitulo: "Competência no trabalho e clareza patrimonial são habilidades diferentes.",
    corpo: "Existe uma dissonância que poucas pessoas nomeiam: ser altamente competente na sua área e, ao mesmo tempo, sentir que a própria vida financeira está no piloto automático. Não é falta de inteligência — é falta de um processo que trabalhe para você, não para a meta de vendas de outra pessoa. O primeiro passo não é um produto. É uma conversa honesta sobre onde você está e para onde quer ir.",
    cor: "#C97A6E",
    label: "Clareza em Construção",
  };
};

const eixoCores = {
  destino: "#C9A96E",
  visibilidade: "#8EB8C9",
  protecao: "#C99E8E",
  processo: "#9EC8A4",
  decisao: "#B89EC9",
};

export default function App() {
  const [etapa, setEtapa] = useState("intro");
  const [respostas, setRespostas] = useState({});
  const [atual, setAtual] = useState(0);
  const [mostrarReflexao, setMostrarReflexao] = useState(false);
  const [animando, setAnimando] = useState(false);

  const q = questions[atual];
  const respondida = respostas[q?.id] !== undefined;
  const totalScore = Object.values(respostas).reduce((a, b) => a + b, 0);
  const resultado = getResultado(totalScore);

  const avancar = () => {
    if (!respondida) return;
    setMostrarReflexao(true);
    setTimeout(() => {
      setMostrarReflexao(false);
      setAnimando(true);
      setTimeout(() => {
        if (atual < questions.length - 1) {
          setAtual(a => a + 1);
        } else {
          setEtapa("resultado");
        }
        setAnimando(false);
      }, 300);
    }, 2200);
  };

  const responder = (score) => {
    if (mostrarReflexao) return;
    setRespostas(prev => ({ ...prev, [q.id]: score }));
  };

  const reiniciar = () => {
    setRespostas({});
    setAtual(0);
    setMostrarReflexao(false);
    setAnimando(false);
    setEtapa("intro");
  };

  const eixosAtencao = questions.filter(q => (respostas[q.id] ?? 0) >= 2);

  const s = estilos;

  if (etapa === "intro") return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
      <div style={s.introWrap}>
        <div style={s.linha} />
        <p style={s.eyebrow}>Diagnóstico de Clareza Patrimonial</p>
        <h1 style={s.tituloH1}>
          Você sabe exatamente<br />
          <em style={{ fontStyle: "italic", color: "#8A6E52" }}>onde está</em> — e para onde vai?
        </h1>
        <p style={s.subtituloIntro}>
          Cinco perguntas. Sem julgamento. Sem oferta de produto.<br />
          Só um espelho honesto da sua situação financeira atual.
        </p>
        <div style={s.introBloco}>
          <p style={s.introTexto}>
            Você provavelmente toma decisões complexas todos os dias no trabalho.
            Mas a própria vida financeira — quando foi a última vez que alguém
            te ajudou a olhar para ela de verdade, sem querer te vender algo no final?
          </p>
        </div>
        <button onClick={() => setEtapa("quiz")} style={s.btnPrimario}>
          Começar diagnóstico
        </button>
        <p style={s.nota}>Leva menos de 3 minutos</p>
      </div>
    </div>
  );

  if (etapa === "quiz") return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />

      <div style={s.progressoWrap}>
        {questions.map((_, i) => (
          <div key={i} style={{
            ...s.progressoDot,
            background: i < atual ? "#8A6E52" : i === atual ? "#C9A96E" : "#E8E0D5",
            transform: i === atual ? "scale(1.3)" : "scale(1)",
          }} />
        ))}
      </div>

      <div style={{ ...s.quizWrap, opacity: animando ? 0 : 1, transition: "opacity 0.3s" }}>
        <div style={s.eixoRow}>
          <span style={{ ...s.eixoNumero, color: eixoCores[q.id] }}>{q.numero}</span>
          <span style={s.eixoNome}>{q.eixo}</span>
        </div>

        <p style={s.reconhecimento}>{q.reconhecimento}</p>

        <h2 style={s.perguntaH2}>{q.pergunta}</h2>

        <div style={s.opcoesWrap}>
          {q.opcoes.map((op, i) => {
            const selecionada = respostas[q.id] === op.score;
            return (
              <button
                key={i}
                onClick={() => responder(op.score)}
                disabled={mostrarReflexao}
                style={{
                  ...s.opcao,
                  background: selecionada ? "#F5EDE0" : "#FDFAF7",
                  borderColor: selecionada ? eixoCores[q.id] : "#E8E0D5",
                  borderLeftWidth: selecionada ? 3 : 1,
                  color: selecionada ? "#3A2E24" : "#6A5E52",
                  transform: selecionada ? "translateX(4px)" : "none",
                }}
              >
                {op.label}
              </button>
            );
          })}
        </div>

        {mostrarReflexao && (
          <div style={s.reflexaoWrap}>
            <div style={{ ...s.reflexaoLinha, background: eixoCores[q.id] }} />
            <p style={s.reflexaoTexto}>{q.reflexao}</p>
          </div>
        )}

        {respondida && !mostrarReflexao && (
          <button onClick={avancar} style={s.btnAvancar}>
            {atual < questions.length - 1 ? "Próxima →" : "Ver resultado →"}
          </button>
        )}
      </div>
    </div>
  );

  if (etapa === "resultado") return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
      <div style={s.resultadoWrap}>
        <p style={s.eyebrow}>Seu diagnóstico</p>
        <div style={{ ...s.resultadoBadge, borderColor: resultado.cor, color: resultado.cor }}>
          {resultado.label}
        </div>

        <h2 style={s.resultadoTituloH2}>{resultado.titulo}</h2>
        <p style={s.resultadoSub}>{resultado.subtitulo}</p>

        <div style={s.separador} />

        <p style={s.resultadoCorpo}>{resultado.corpo}</p>

        {eixosAtencao.length > 0 && (
          <div style={s.eixosDestaque}>
            <p style={s.eixosLabel}>Dimensões que pedem atenção:</p>
            {eixosAtencao.map(q => (
              <div key={q.id} style={s.eixoItem}>
                <div style={{ ...s.eixoPonto, background: eixoCores[q.id] }} />
                <div>
                  <p style={s.eixoItemNome}>{q.eixo}</p>
                  <p style={s.eixoItemReflexao}>{q.reflexao}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={s.separador} />

        <div style={s.fechamento}>
          <p style={s.fechamentoTexto}>
            Se algo aqui ressoou — se você se reconheceu em alguma dessas perguntas —
            pode ser que o que você precise não seja um produto novo.
          </p>
          <p style={{ ...s.fechamentoTexto, marginTop: 12 }}>
            <em>Seja um processo.</em>
          </p>
        </div>

        <button onClick={reiniciar} style={s.btnSecundario}>
          Refazer diagnóstico
        </button>
      </div>
    </div>
  );
}

const estilos = {
  page: {
    minHeight: "100vh",
    background: "#FAF7F2",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    fontFamily: "'Lora', Georgia, serif",
    padding: "4rem 1.5rem 6rem",
  },
  introWrap: { maxWidth: 560, width: "100%" },
  linha: { width: 40, height: 2, background: "#C9A96E", marginBottom: 24 },
  eyebrow: {
    fontFamily: "'Lora', serif",
    fontSize: 11, letterSpacing: 3,
    textTransform: "uppercase", color: "#A08860",
    margin: "0 0 20px",
  },
  tituloH1: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(28px, 5vw, 38px)",
    fontWeight: 400, color: "#2A1F14",
    lineHeight: 1.25, margin: "0 0 24px",
  },
  subtituloIntro: {
    fontFamily: "'Lora', serif",
    fontSize: 16, color: "#7A6E62",
    lineHeight: 1.7, margin: "0 0 32px",
  },
  introBloco: { borderLeft: "2px solid #E8D5BC", paddingLeft: 24, marginBottom: 40 },
  introTexto: {
    fontFamily: "'Lora', serif",
    fontSize: 15, color: "#6A5E52",
    lineHeight: 1.8, fontStyle: "italic", margin: 0,
  },
  btnPrimario: {
    display: "block", width: "100%", padding: "18px",
    background: "#2A1F14", border: "none", color: "#FAF7F2",
    fontSize: 14, letterSpacing: 2, textTransform: "uppercase",
    fontFamily: "'Lora', serif", cursor: "pointer",
    borderRadius: 2, marginBottom: 16,
  },
  nota: {
    fontFamily: "'Lora', serif", fontSize: 12,
    color: "#B0A090", textAlign: "center", margin: 0,
  },
  progressoWrap: {
    position: "fixed", top: 28, left: "50%",
    transform: "translateX(-50%)",
    display: "flex", gap: 10, alignItems: "center", zIndex: 10,
  },
  progressoDot: {
    width: 8, height: 8, borderRadius: "50%",
    transition: "all 0.4s ease",
  },
  quizWrap: { maxWidth: 560, width: "100%", paddingTop: 32 },
  eixoRow: { display: "flex", alignItems: "baseline", gap: 12, marginBottom: 28 },
  eixoNumero: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 42, fontWeight: 400, lineHeight: 1,
  },
  eixoNome: {
    fontFamily: "'Lora', serif", fontSize: 11,
    letterSpacing: 3, textTransform: "uppercase", color: "#A08860",
  },
  reconhecimento: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 16, fontStyle: "italic", color: "#A08860",
    lineHeight: 1.6, margin: "0 0 24px",
    borderLeft: "2px solid #E8D5BC", paddingLeft: 18,
  },
  perguntaH2: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(18px, 3vw, 22px)",
    fontWeight: 400, color: "#2A1F14",
    lineHeight: 1.5, margin: "0 0 32px",
  },
  opcoesWrap: { display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 },
  opcao: {
    textAlign: "left", padding: "18px 22px",
    border: "1px solid #E8E0D5", borderRadius: 3,
    fontFamily: "'Lora', serif", fontSize: 14, lineHeight: 1.6,
    cursor: "pointer", transition: "all 0.2s ease",
  },
  reflexaoWrap: {
    display: "flex", gap: 16, alignItems: "flex-start",
    padding: "20px 0",
  },
  reflexaoLinha: { width: 2, minHeight: 60, borderRadius: 2, flexShrink: 0, marginTop: 4 },
  reflexaoTexto: {
    fontFamily: "'Lora', serif", fontSize: 14,
    color: "#5A4E42", lineHeight: 1.8,
    fontStyle: "italic", margin: 0,
  },
  btnAvancar: {
    display: "block", marginLeft: "auto",
    padding: "14px 28px", background: "transparent",
    border: "1px solid #2A1F14", color: "#2A1F14",
    fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase",
    fontFamily: "'Lora', serif", cursor: "pointer", borderRadius: 2,
  },
  resultadoWrap: { maxWidth: 560, width: "100%" },
  resultadoBadge: {
    display: "inline-block", padding: "6px 16px",
    border: "1px solid", borderRadius: 2,
    fontFamily: "'Lora', serif", fontSize: 11,
    letterSpacing: 3, textTransform: "uppercase",
    marginBottom: 24, marginTop: 16,
  },
  resultadoTituloH2: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(22px, 4vw, 28px)",
    fontWeight: 400, color: "#2A1F14",
    lineHeight: 1.4, margin: "0 0 8px",
  },
  resultadoSub: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 16, fontStyle: "italic",
    color: "#8A6E52", margin: "0 0 32px",
  },
  separador: { height: 1, background: "#E8E0D5", margin: "32px 0" },
  resultadoCorpo: {
    fontFamily: "'Lora', serif", fontSize: 15,
    color: "#4A3E32", lineHeight: 1.9, margin: "0 0 32px",
  },
  eixosDestaque: {
    background: "#F5EDE0", borderRadius: 4,
    padding: "24px 28px", marginBottom: 8,
  },
  eixosLabel: {
    fontFamily: "'Lora', serif", fontSize: 11,
    letterSpacing: 3, textTransform: "uppercase",
    color: "#A08860", margin: "0 0 20px",
  },
  eixoItem: { display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 },
  eixoPonto: { width: 8, height: 8, borderRadius: "50%", marginTop: 6, flexShrink: 0 },
  eixoItemNome: {
    fontFamily: "'Lora', serif", fontSize: 13,
    fontWeight: 600, color: "#3A2E24",
    margin: "0 0 4px", letterSpacing: 0.5,
  },
  eixoItemReflexao: {
    fontFamily: "'Lora', serif", fontSize: 13,
    color: "#7A6E62", lineHeight: 1.7,
    fontStyle: "italic", margin: 0,
  },
  fechamento: { borderLeft: "2px solid #C9A96E", paddingLeft: 24, marginBottom: 40 },
  fechamentoTexto: {
    fontFamily: "'Lora', serif", fontSize: 15,
    color: "#5A4E42", lineHeight: 1.8, margin: 0,
  },
  btnSecundario: {
    padding: "12px 24px", background: "transparent",
    border: "1px solid #C8B89A", color: "#A08860",
    fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
    fontFamily: "'Lora', serif", cursor: "pointer", borderRadius: 2,
  },
};
