
const { useState, useEffect, useMemo, useCallback } = React;

/* ---------- Ícones próprios (sem dependência externa) ---------- */
function Icon({ size = 18, color = "currentColor", strokeWidth = 2, style, children, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={style} {...rest}>
      {children}
    </svg>
  );
}
const Plus = (p) => <Icon {...p}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></Icon>;
const ChevronRight = (p) => <Icon {...p}><polyline points="9 6 15 12 9 18" /></Icon>;
const ChevronLeft = (p) => <Icon {...p}><polyline points="15 6 9 12 15 18" /></Icon>;
const X = (p) => <Icon {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Icon>;
const Check = (p) => <Icon {...p}><polyline points="20 6 9 17 4 12" /></Icon>;
const Trash2 = (p) => <Icon {...p}><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></Icon>;
const Pencil = (p) => <Icon {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></Icon>;
const Delete = (p) => <Icon {...p}><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" /><line x1="18" y1="9" x2="12" y2="15" /><line x1="12" y1="9" x2="18" y2="15" /></Icon>;
const Download = (p) => <Icon {...p}><path d="M12 3v12" /><polyline points="7 10 12 15 17 10" /><path d="M5 21h14" /></Icon>;
const LineChartIcon = (p) => <Icon {...p}><polyline points="3 17 9 11 13 15 21 6" /><polyline points="15 6 21 6 21 12" /></Icon>;
const Lock = (p) => <Icon {...p}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></Icon>;

function EmojiIcon({ emoji, size = 18, style }) {
  return <span style={{ fontSize: size, lineHeight: 1, display: "inline-block", ...style }}>{emoji}</span>;
}
const Pizza = (p) => <EmojiIcon {...p} emoji="🍕" />;
const PartyPopper = (p) => <EmojiIcon {...p} emoji="🎉" />;
const Palmtree = (p) => <EmojiIcon {...p} emoji="🌴" />;
const Plane = (p) => <EmojiIcon {...p} emoji="✈️" />;
const GraduationCap = (p) => <EmojiIcon {...p} emoji="🎓" />;
const Utensils = (p) => <EmojiIcon {...p} emoji="🍽️" />;
const Car = (p) => <EmojiIcon {...p} emoji="🚗" />;
const HeartPulse = (p) => <EmojiIcon {...p} emoji="💊" />;
const Home = (p) => <EmojiIcon {...p} emoji="🏠" />;
const ShoppingBag = (p) => <EmojiIcon {...p} emoji="🛍️" />;
const Repeat = (p) => <EmojiIcon {...p} emoji="🔁" />;
const Rocket = (p) => <EmojiIcon {...p} emoji="🚀" />;
const Zap = (p) => <EmojiIcon {...p} emoji="⚡" />;
const MoreHorizontal = (p) => <EmojiIcon {...p} emoji="⋯" />;
const Coins = (p) => <EmojiIcon {...p} emoji="🪙" />;
const Wallet = (p) => <EmojiIcon {...p} emoji="💼" />;
const CreditCard = (p) => <EmojiIcon {...p} emoji="💳" />;
const Calendar = (p) => <EmojiIcon {...p} emoji="📅" />;
const Clipboard = (p) => <EmojiIcon {...p} emoji="📋" />;
const Target = (p) => <EmojiIcon {...p} emoji="🎯" />;
const Settings = (p) => <EmojiIcon {...p} emoji="⚙️" />;
const Sparkles = (p) => <EmojiIcon {...p} emoji="✨" />;
const Lightbulb = (p) => <EmojiIcon {...p} emoji="💡" />;
const Wrench = (p) => <EmojiIcon {...p} emoji="🔧" />;
const Briefcase = (p) => <EmojiIcon {...p} emoji="🏢" />;
const Shirt = (p) => <EmojiIcon {...p} emoji="👕" />;
const PawPrint = (p) => <EmojiIcon {...p} emoji="🐾" />;
const Gift = (p) => <EmojiIcon {...p} emoji="🎁" />;
const Shield = (p) => <EmojiIcon {...p} emoji="🛡️" />;
const TrendingDown = (p) => <EmojiIcon {...p} emoji="📉" />;
const Compass = (p) => <EmojiIcon {...p} emoji="🧭" />;
const PiggyBank = (p) => <EmojiIcon {...p} emoji="🐷" />;
const Landmark = (p) => <EmojiIcon {...p} emoji="🏛️" />;
const Sunrise = (p) => <EmojiIcon {...p} emoji="🌅" />;

/* ---------- Gráfico simples próprio (sem dependência externa) ---------- */
function SimpleLineChart({ data, height = 160 }) {
  const w = 340, h = height, padL = 34, padR = 8, padT = 8, padB = 20;
  const maxV = Math.max(1, ...data.flatMap(d => [d.Entradas || 0, d.Gastos || 0]));
  const stepX = data.length > 1 ? (w - padL - padR) / (data.length - 1) : 0;
  const y = (v) => padT + (1 - v / maxV) * (h - padT - padB);
  const x = (i) => padL + i * stepX;
  const pathFor = (key) => data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d[key] || 0)}`).join(" ");
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      {[0, 0.5, 1].map((f, i) => (
        <line key={i} x1={padL} x2={w - padR} y1={padT + f * (h - padT - padB)} y2={padT + f * (h - padT - padB)} stroke={COLORS.border} strokeWidth="1" />
      ))}
      {data.map((d, i) => (
        <text key={i} x={x(i)} y={h - 4} fontSize="10" fill={COLORS.textMuted} textAnchor="middle">{d.mes}</text>
      ))}
      <text x={2} y={padT + 4} fontSize="9" fill={COLORS.textMuted}>{`${Math.round(maxV / 1000)}k`}</text>
      <path d={pathFor("Entradas")} fill="none" stroke={COLORS.positive} strokeWidth="2" />
      <path d={pathFor("Gastos")} fill="none" stroke={COLORS.negative} strokeWidth="2" />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(d.Entradas || 0)} r="3" fill={COLORS.positive} />
          <circle cx={x(i)} cy={y(d.Gastos || 0)} r="3" fill={COLORS.negative} />
        </g>
      ))}
    </svg>
  );
}

// ---------- Fontes ----------
function useFonts() {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700;800&family=Public+Sans:wght@400;500;600&family=Sora:wght@600;700;800&display=swap";
    document.head.appendChild(l);
    return () => document.head.removeChild(l);
  }, []);
}

// ---------- Cores ----------
const COLORS = {
  bg: "#E4E4E7",
  surface: "#FFFFFF",
  surface2: "#F7F5EF",
  border: "rgba(20,20,15,0.14)",
  textPrimary: "#17161A",
  textMuted: "#6E6D75",
  positive: "#16A34A",
  negative: "#E5484D",
  orange: "#E8873A",
  blue: "#3E6FE0",
  purple: "#8B5CF6",
  red: "#E5484D",
  teal: "#0FA894",
  indigo: "#5457E5",
  green: "#1FA971",
  pink: "#DB2777",
  amber: "#D97706",
  cyan: "#0891B2",
  cartao: "#C026D3",
};
const PALETTE = [COLORS.orange, COLORS.blue, COLORS.purple, COLORS.teal,
COLORS.pink, COLORS.cyan, COLORS.amber, COLORS.indigo, COLORS.green];
function colorFor(index) { return PALETTE[index % PALETTE.length]; }

const FONT_DISPLAY = "'Bricolage Grotesque', sans-serif";
const FONT_BODY = "'Public Sans', sans-serif";
const FONT_MONO = "'Sora', sans-serif";

// ---------- Listas de referência ----------
const BANKS = [
  "Itaú", "Bradesco", "Santander", "Banco do Brasil", "Caixa Econômica Federal",
  "Nubank", "Inter", "C6 Bank", "BTG Pactual", "Sicoob", "Sicredi", "Original",
  "Neon", "PicPay", "Next", "Safra", "Votorantim", "Outro",
];
const BRANDS = ["Visa", "Mastercard", "Elo", "American Express", "Hipercard",
"Outra"];

const ICONS = { Pizza, PartyPopper, Palmtree, Plane, GraduationCap, Utensils, Car, HeartPulse, Home, ShoppingBag,
Repeat, Rocket, Zap, MoreHorizontal, Wallet, Download, Coins, Clipboard,
CreditCard, Sparkles, Lightbulb, Wrench, Briefcase, Shirt, PawPrint, Gift, Shield,
TrendingDown, PiggyBank, Sunrise, Compass };

const DEFAULT_CATEGORIES = [
 // Entradas
 { id: "salario", label: "Salário", icon: "Wallet", color: "#22C55E", kinds: ["entrada"] },
 { id: "renda_extra", label: "Renda extra", icon: "Sparkles", color: "#38BDF8", kinds:
["entrada"] },
 { id: "pix_recebido", label: "Pix recebido", icon: "Zap", color: "#FACC15", kinds:
["entrada"] },
 { id: "reembolso", label: "Reembolso", icon: "Download", color: "#0EA5E9", kinds:
["entrada"] },
 { id: "rendimentos", label: "Rendimentos", icon: "Coins", color: "#10B981", kinds:
["entrada"] },
 // Saídas e Cartão (despesas)
 { id: "casa", label: "Moradia", icon: "Home", color: "#A855F7", kinds: ["saida", "cartao"], subcategories: [
   { id: "aluguel", label: "Aluguel / Financiamento" }, { id: "condominio", label: "Condomínio" },
   { id: "iptu", label: "IPTU / Impostos Prediais" }, { id: "manutencao_casa", label: "Manutenção / Reparos" },
   { id: "reforma", label: "Reforma / Obras" }, { id: "mobilia", label: "Mobília / Decoração" },
 ] },
 { id: "utilidades", label: "Utilidades", icon: "Lightbulb", color: "#FBBF24", kinds: ["saida", "cartao"], subcategories: [
   { id: "energia", label: "Energia Elétrica" }, { id: "agua", label: "Água" }, { id: "gas", label: "Gás" },
   { id: "internet", label: "Internet" }, { id: "telefone", label: "Telefone / Celular" },
   { id: "tv_streaming", label: "TV / Streaming / Cabo" }, { id: "taxa_lixo", label: "Taxa de Lixo" },
 ] },
 { id: "alimentacao", label: "Alimentação", icon: "Utensils", color: "#F97316", kinds: ["saida", "cartao"], subcategories: [
   { id: "supermercado", label: "Supermercado" }, { id: "feira", label: "Feira / Hortifruti" },
   { id: "restaurante", label: "Restaurante / Lanchonete" }, { id: "delivery", label: "Delivery (iFood, Rappi etc)" },
   { id: "cafe", label: "Café / Lanches" }, { id: "bebidas", label: "Bebidas / Álcool" },
 ] },
 { id: "transporte", label: "Transporte", icon: "Car", color: "#3B82F6", kinds: ["saida", "cartao"], subcategories: [
   { id: "combustivel", label: "Combustível" }, { id: "app_transporte", label: "Uber / 99 / Táxi" },
   { id: "transporte_publico", label: "Ônibus / Metrô / Trem" }, { id: "estacionamento", label: "Estacionamento" },
   { id: "pedagio", label: "Pedágio" }, { id: "manutencao_veiculo", label: "Manutenção Veículo" }, { id: "lavagem", label: "Lavagem" },
 ] },
 { id: "veiculos", label: "Veículos", icon: "Wrench", color: "#64748B", kinds: ["saida", "cartao"], subcategories: [
   { id: "ipva", label: "IPVA" }, { id: "seguro_auto", label: "Seguro Auto" }, { id: "multas", label: "Multas" },
   { id: "revisao", label: "Revisão / Mecânica" }, { id: "pneus", label: "Pneus / Peças" }, { id: "documentacao", label: "Documentação" },
 ] },
 { id: "saude", label: "Saúde", icon: "HeartPulse", color: "#EF4444", kinds: ["saida", "cartao"], subcategories: [
   { id: "plano_saude", label: "Plano de Saúde" }, { id: "consultas", label: "Consultas Médicas" },
   { id: "farmacia", label: "Farmácia / Medicamentos" }, { id: "dentista", label: "Dentista" },
   { id: "exames", label: "Exames / Laboratório" }, { id: "terapias", label: "Terapias / Psicólogo" }, { id: "academia", label: "Academia / Bem-estar" },
 ] },
 { id: "educacao", label: "Educação", icon: "GraduationCap", color: "#14B8A6", kinds: ["saida", "cartao"], subcategories: [
   { id: "mensalidade", label: "Mensalidade Escola / Faculdade" }, { id: "cursos", label: "Cursos Online / Presenciais" },
   { id: "material_didatico", label: "Material Didático / Livros" }, { id: "idiomas", label: "Idiomas" },
   { id: "cursos_prof", label: "Cursos Profissionalizantes" },
 ] },
 { id: "trabalho", label: "Trabalho", icon: "Briefcase", color: "#0EA5E9", kinds: ["saida", "cartao"], subcategories: [
   { id: "alimentacao_trabalho", label: "Alimentação no Trabalho" }, { id: "transporte_trabalho", label: "Transporte para o Trabalho" },
   { id: "uniformes", label: "Uniformes / Equipamentos" }, { id: "capacitacao", label: "Cursos / Capacitação" },
 ] },
 { id: "vestuario", label: "Vestuário e Acessórios", icon: "Shirt", color: "#D946EF", kinds: ["saida", "cartao"], subcategories: [
   { id: "roupas", label: "Roupas" }, { id: "calcados", label: "Calçados" },
   { id: "acessorios", label: "Acessórios (bolsas, cintos, relógios etc)" }, { id: "roupa_intima", label: "Roupa Íntima" },
 ] },
  { id: "compras", label: "Compras Gerais", icon: "ShoppingBag", color: "#F59E0B", kinds:
["saida", "cartao"], subcategories: [
   { id: "eletronicos", label: "Eletrônicos / Celulares" }, { id: "eletrodomesticos", label: "Eletrodomésticos" },
   { id: "produtos_casa", label: "Produtos para Casa" }, { id: "beleza", label: "Beleza / Perfumaria" }, { id: "ferramentas", label: "Ferramentas" },
 ] },
  { id: "lazer", label: "Lazer e Entretenimento", icon: "PartyPopper", color: "#EC4899", kinds: ["saida",
"cartao"], subcategories: [
   { id: "cinema", label: "Cinema / Teatro" }, { id: "shows", label: "Shows / Eventos / Boate" },
   { id: "streaming_lazer", label: "Streaming (Netflix, Disney+, etc)" }, { id: "jogos", label: "Jogos / Videogames" },
   { id: "hobbies", label: "Hobbies" }, { id: "passeios", label: "Parques / Passeios" },
 ] },
  { id: "assinaturas", label: "Assinaturas", icon: "Repeat", color: "#6366F1", kinds:
["saida", "cartao"], subcategories: [
   { id: "streaming_assinatura", label: "Streaming de Vídeo e Música" }, { id: "apps_pagos", label: "Apps Pagos" },
   { id: "revistas", label: "Revistas / Jornais" }, { id: "software", label: "Software / Ferramentas" }, { id: "academia_assinatura", label: "Academia" },
 ] },
  { id: "viagem", label: "Viagens", icon: "Plane", color: "#06B6D4", kinds: ["saida",
"cartao"], subcategories: [
   { id: "passagens", label: "Passagens Aéreas / Ônibus" }, { id: "hospedagem", label: "Hospedagem" },
   { id: "alimentacao_viagem", label: "Alimentação em Viagem" }, { id: "turismo", label: "Passeios / Turismo" }, { id: "seguro_viagem", label: "Seguro Viagem" },
 ] },
  { id: "cuidados_pessoais", label: "Cuidados Pessoais", icon: "Sparkles", color: "#F472B6", kinds: ["saida", "cartao"], subcategories: [
   { id: "salao", label: "Salão de Beleza / Cabelo" }, { id: "barbeiro", label: "Barbeiro" },
   { id: "higiene", label: "Produtos de Higiene" }, { id: "manicure", label: "Manicure / Pedicure" },
   { id: "massagem", label: "Massagem / Spa" }, { id: "maquiagem", label: "Maquiagem" },
 ] },
  { id: "pets", label: "Animais de Estimação", icon: "PawPrint", color: "#84CC16", kinds: ["saida", "cartao"], subcategories: [
   { id: "racao", label: "Ração" }, { id: "veterinario", label: "Veterinário" }, { id: "banho", label: "Higiene / Banho" },
   { id: "brinquedos_pet", label: "Brinquedos / Acessórios" }, { id: "medicamentos_pet", label: "Medicamentos" },
 ] },
  { id: "presentes", label: "Presentes e Doações", icon: "Gift", color: "#FB7185", kinds: ["saida", "cartao"], subcategories: [
   { id: "aniversarios", label: "Aniversários" }, { id: "natal", label: "Natal / Datas Comemorativas" },
   { id: "casamentos", label: "Casamentos / Chás" }, { id: "doacoes", label: "Doações / Caridade" },
 ] },
  { id: "seguros", label: "Seguros", icon: "Shield", color: "#475569", kinds: ["saida", "cartao"], subcategories: [
   { id: "seguro_vida", label: "Seguro de Vida" }, { id: "seguro_residencial", label: "Seguro Residencial" }, { id: "seguro_saude_compl", label: "Seguro Saúde (complementar)" },
 ] },
  { id: "dividas", label: "Dívidas e Financeiras", icon: "TrendingDown", color: "#DC2626", kinds: ["saida", "cartao"], subcategories: [
   { id: "cartao_credito_divida", label: "Cartão de Crédito" }, { id: "emprestimos", label: "Empréstimos / Financiamentos" },
   { id: "juros", label: "Juros" }, { id: "taxas_bancarias", label: "Taxas Bancárias" },
   { id: "ir", label: "Imposto de Renda" }, { id: "outros_impostos", label: "Outros Impostos" },
 ] },
  // Vale pros três tipos (compra e venda de ativos, ou categoria coringa)
  { id: "investimentos", label: "Poupança e Investimentos", icon: "Rocket", color: "#22C55E",
kinds: ["entrada", "saida", "cartao"], subcategories: [
   { id: "aporte_poupanca", label: "Aporte Poupança" }, { id: "reserva_emergencia", label: "Reserva de Emergência" },
   { id: "investimentos_sub", label: "Investimentos (Ações, Tesouro Direto etc)" }, { id: "previdencia", label: "Previdência Privada" },
 ] },
  { id: "outros", label: "Outros", icon: "MoreHorizontal", color: "#94A3B8", kinds:
["entrada", "saida", "cartao"], subcategories: [
   { id: "nao_categorizadas", label: "Despesas Não Categorizadas" }, { id: "multas_gerais", label: "Multas Gerais" }, { id: "taxas_diversas", label: "Taxas e Tarifas Diversas" },
 ] },
  // Categorias de sistema — não aparecem nos seletores; usadas por transferências e pagamento de fatura
  { id: "transferencia", label: "Transferência", icon: "Repeat", color: "#94A3B8",
kinds: ["entrada", "saida"], system: true },
  { id: "fatura_pagamento", label: "Pagamento de fatura", icon: "CreditCard", color:
"#94A3B8", kinds: ["saida"], system: true },
];
// Categorias que não contam como "gasto" nem "entrada" nas análises (dinheiro que só muda de lugar ou já foi contado no cartão)
const SYSTEM_CATS = new Set(["transferencia", "fatura_pagamento"]);

const INVESTMENT_TYPES = [
  { id: "poupanca", label: "Poupança", quoted: false, icon: "PiggyBank", color:
"#EC4899" },
  { id: "acao", label: "Ações / FIIs", quoted: true, icon: "Coins", color: "#4F8EF7" },
  { id: "cripto", label: "Criptomoedas", quoted: true, icon: "Coins", color: "#F59E0B" },
  { id: "rendafixa", label: "Renda Fixa", quoted: false, icon: "Wallet", color:
"#14B8A6" },
  { id: "tesouro", label: "Tesouro Direto", quoted: false, icon: "Wallet", color:
"#8B5CF6" },
  { id: "previdencia", label: "Previdência Privada", quoted: false, icon: "Sunrise",
color: "#0891B2" },
];
const CRYPTO_OPTIONS = ["Bitcoin (BTC)", "Ethereum (ETH)", "Solana (SOL)",
"Cardano (ADA)", "Ripple (XRP)", "Dogecoin (DOGE)", "BNB", "Outra"];
const GOAL_CATEGORIES = [
  { id: "viagem", label: "Viagem", icon: "Plane" },
  { id: "reserva", label: "Reserva de emergência", icon: "Wallet" },
  { id: "casa", label: "Casa / imóvel", icon: "Home" },
  { id: "carro", label: "Veículo", icon: "Car" },
  { id: "educacao", label: "Educação", icon: "GraduationCap" },
  { id: "compra", label: "Compra grande", icon: "ShoppingBag" },
  { id: "outro", label: "Outro", icon: "Target" },
];
const TESOURO_OPTIONS = ["Tesouro Selic", "Tesouro IPCA+", "Tesouro IPCA+ com juros semestrais", "Tesouro Prefixado", "Tesouro Prefixado com juros semestrais",
"Outro"];

// ---------- Helpers ----------
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,
8); }
function currency(n) {
  const v = Number.isFinite(n) ? n : 0;
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function parseBRNumber(str) {
  if (typeof str === "number") return str;
  if (!str) return 0;
  const cleaned = String(str).replace(/\./g, "").replace(",", ".").replace(/[^\d.-]/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}
function toLocalISO(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function todayISO() { return toLocalISO(new Date()); }
function monthLabel(i) { return ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"][i]; }
function monthLabelFull(i) { return ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"][i]; }
function timeAgoPt(isoTimestamp) {
  const diffMs = Date.now() - new Date(isoTimestamp).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "agora mesmo";
  if (mins < 60) return `há ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `há ${hours}h`;
  const days = Math.floor(hours / 24);
  return `há ${days} dia${days === 1 ? "" : "s"}`;
}
function addMonthsSafe(dateISO, n) {
  const [y, m, d] = dateISO.split("-").map(Number);
  const base = new Date(y, m - 1 + n, 1);
  const lastDay = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
  base.setDate(Math.min(d, lastDay));
  return toLocalISO(base);
}
// Qual fatura (mês de fechamento) uma compra pertence, dado o dia de fechamento do cartão.
// Compras feitas depois do fechamento caem na fatura do mês seguinte.
function invoiceMonthOf(dateISO, closingDay) {
  if (!closingDay) return dateISO.slice(0, 7);
  const [y, m, d] = dateISO.split("-").map(Number);
  const base = new Date(y, m - 1, 1);
  if (d > closingDay) base.setMonth(base.getMonth() + 1);
  return `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, "0")}`;
}
// Gera as ocorrências de recorrências que ainda não existem, até o mês atual (pega meses "atrasados" desde a última abertura do app)
// Meses à frente que uma recorrência é pré-gerada, pra aparecer como "próximo lançamento"
// nas contas/projeção antes mesmo do mês chegar (não só quando já venceu).
const RECURRING_MONTHS_AHEAD = 3;

function generateMissingRecurring(state) {
  const now = new Date();
  const curY = now.getFullYear(), curM = now.getMonth() + 1;
  let targetY = curY, targetM = curM + RECURRING_MONTHS_AHEAD;
  while (targetM > 12) { targetM -= 12; targetY += 1; }
  const targetKey = `${targetY}-${String(targetM).padStart(2, "0")}`;
  let transactions = state.transactions;
  let changed = false;
  (state.recurring || []).filter(r => r.active).forEach(rule => {
    const existing = transactions.filter(t => t.recurringId === rule.id);
    if (existing.length === 0) return;
    if (rule.totalOccurrences && existing.length >= rule.totalOccurrences) return;
    const lastKey = existing.map(t => t.date.slice(0, 7)).sort().pop();
    if (lastKey >= targetKey) return;
    let [y, m] = lastKey.split("-").map(Number);
    let count = existing.length;
    while (`${y}-${String(m).padStart(2, "0")}` < targetKey) {
      if (rule.totalOccurrences && count >= rule.totalOccurrences) break;
      m += 1;
      if (m > 12) { m = 1; y += 1; }
      const key = `${y}-${String(m).padStart(2, "0")}`;
      const already = transactions.some(t => t.recurringId === rule.id && t.date.slice(0,
7) === key);
      if (!already) {
        const lastDay = new Date(y, m, 0).getDate();
        const day = Math.min(rule.dayOfMonth || 1, lastDay);
        const dateISO = `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2,
"0")}`;
        transactions = [...transactions, { id: uid(), kind: rule.kind, accountId:
rule.accountId, cardId: rule.cardId, categoryId: rule.categoryId, amount: rule.amount,
date: dateISO, description: rule.description, recurringId: rule.id }];
        count += 1;
        changed = true;
      }
    }
  });
  return changed ? transactions : state.transactions;
}

// Gera o pagamento automático de faturas já fechadas e vencidas, pros cartões
// marcados com "débito automático" — mesmo formato de um pagamento manual, só que criado sozinho.
function generateAutoDebitPayments(state) {
  const todayStr = todayISO();
  let transactions = state.transactions;
  let changed = false;
  state.cards.forEach(card => {
    if (!card.autoDebit || !card.autoDebitAccountId) return;
    const cardTx = transactions.filter(t => t.kind === "cartao" && t.cardId === card.id);
    if (cardTx.length === 0) return;
    const openInvoice = invoiceMonthOf(todayStr, card.closingDay);
    const invoiceKeys = [...new Set(cardTx.map(t => invoiceMonthOf(t.date,
card.closingDay)))].filter(k => k < openInvoice);
    invoiceKeys.forEach(key => {
      const alreadyPaid = transactions.some(t => t.paidCardId === card.id && t.paidInvoice
=== key);
      if (alreadyPaid) return;
      const [y, m] = key.split("-").map(Number);
      const lastDay = new Date(y, m, 0).getDate();
      const dueDay = Math.min(card.dueDay || 1, lastDay);
      const dueDateStr = `${y}-${String(m).padStart(2, "0")}-${String(dueDay).padStart(2,
"0")}`;
      if (dueDateStr > todayStr) return; // ainda não venceu
      const total = cardTx.filter(t => invoiceMonthOf(t.date, card.closingDay) === key)
.reduce((s, t) => s + t.amount, 0);
      if (total <= 0) return;
      const monthName = monthLabel(m - 1);
      transactions = [...transactions, {
        id: uid(), kind: "saida", accountId: card.autoDebitAccountId, cardId: null,
        categoryId: "fatura_pagamento", amount: Math.round(total * 100) / 100,
        date: dueDateStr, description: `Débito automático — fatura ${card.nickname
|| card.cardLabel} (${monthName})`,
        paidCardId: card.id, paidInvoice: key, autoDebit: true,
      }];
      changed = true;
    });
  });
  return changed ? transactions : state.transactions;
}
const APP_VERSION = "1.5.1";
// Nome de quem detém os direitos do app (independente do perfil de quem usa) — troque aqui quando decidir o nome definitivo/empresa.
const APP_AUTHOR = "Alex Cohen";

const DEFAULT_STATE = {
 profile: { name: "", incomeFixed: 0, incomeVariable: 0 },
 accounts: [], // {id, bank, nickname, agencia, conta, initialBalance, color}
 cards: [],    // {id, institution, cardLabel, brand, nickname, limit, closingDay, dueDay, color}
 categories: DEFAULT_CATEGORIES,
  transactions: [], // {id, kind, accountId, cardId, categoryId, amount, date, description, installmentGroupId, installmentIndex, installmentTotal, recurringId}
  recurring: [], // {id, kind, accountId, cardId, categoryId, amount, description, dayOfMonth, active}
  budgets: {}, // { [categoryId]: valor mensal orçado }
  investments: [], // {id, type, name, ticker, quantity, buyPrice, buyDate, appliedValue, manualValue, currentPrice, lastUpdated}
  sales: [], // {id, investmentId, name, type, quantity, proceeds, costBasis, realizedPL, date, accountId}
  goals: [],
  pin: null,
  apiKeys: {}, // { brapiToken } — token gratuito da brapi.dev, usado só pra cotação de ações/FIIs
};

// ---------- Dados fictícios (usuário médio) para testes ----------
function monthsAgoISO(monthsBack, day) {
  const d = new Date();
  d.setDate(1); // evita overflow de mês (ex: dia 31 em mês de 30 dias)
  d.setMonth(d.getMonth() - monthsBack);
  const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, lastDay));
  return toLocalISO(d);
}
function seedDemoData() {
  const accId = "demo-acc-itau";
  const nuId = "demo-card-nu";
  const itauCardId = "demo-card-itau";
  const tx = [];
  const push = (o) => tx.push({ id: uid(), ...o });

 // Salário — dois depósitos por mês, últimos 5 meses + mês atual
 for (let m = 5; m >= 0; m--) {
   push({ kind: "entrada", accountId: accId, categoryId: "salario", amount: 3400,
date: monthsAgoISO(m, 5), description: "Salário (1ª parcela)" });
   push({ kind: "entrada", accountId: accId, categoryId: "salario", amount: 2600,
date: monthsAgoISO(m, 20), description: "Salário (2ª parcela)" });
 }
 // Saídas fixas da conta — aluguel e contas de casa
 for (let m = 5; m >= 0; m--) {
   push({ kind: "saida", accountId: accId, categoryId: "casa", amount: 1650, date:
monthsAgoISO(m, 6), description: "Aluguel" });
   push({ kind: "saida", accountId: accId, categoryId: "casa", amount: 260 + (m % 3)
* 30, date: monthsAgoISO(m, 12), description: "Luz e água" });
 }
 // Pix recebido esporádico
 push({ kind: "entrada", accountId: accId, categoryId: "pix_recebido", amount: 150,
date: monthsAgoISO(1, 14), description: "Pix de um amigo" });

 // Cartão Nubank — alimentação, lazer, compras
 const nuGastos = [
   ["alimentacao", 480, "Mercado"], ["alimentacao", 32.9, "iFood"], ["lazer", 65,
"Cinema"],
   ["transporte", 180, "Combustível"], ["compras", 210, "Loja de roupas"],
["assinaturas", 39.9, "Streaming"],
 ];
 for (let m = 4; m >= 0; m--) {
   nuGastos.forEach(([cat, val, desc], i) => push({ kind: "cartao", cardId: nuId,
categoryId: cat, amount: val + (m * 3), date: monthsAgoISO(m, 3 + i * 4), description:
desc }));
 }
 // mês atual (parcial, pra simular fatura em aberto)
 push({ kind: "cartao", cardId: nuId, categoryId: "alimentacao", amount: 210, date:
monthsAgoISO(0, 3), description: "Mercado" });
 push({ kind: "cartao", cardId: nuId, categoryId: "lazer", amount: 58, date:
monthsAgoISO(0, 8), description: "Bar com amigos" });
 push({ kind: "cartao", cardId: nuId, categoryId: "assinaturas", amount: 39.9, date:
monthsAgoISO(0, 5), description: "Streaming" });

 // Cartão Itaú Black — transporte, saúde, viagem, compras maiores
 const itauGastos = [
   ["transporte", 320, "Manutenção do carro"], ["saude", 180, "Farmácia"],
["compras", 450, "Eletrônico"], ["viagem", 620, "Passagem"],
 ];
 for (let m = 3; m >= 0; m--) {
   itauGastos.forEach(([cat, val, desc], i) => push({ kind: "cartao", cardId: itauCardId,
categoryId: cat, amount: val + (m * 5), date: monthsAgoISO(m, 7 + i * 5), description:
desc }));
 }
 push({ kind: "cartao", cardId: itauCardId, categoryId: "compras", amount: 189.9,
date: monthsAgoISO(0, 4), description: "Pedido online" });

 // Compra de investimentos — debitando da conta (origem = conta)
 const investTx1 = { id: uid(), kind: "saida", accountId: accId, categoryId:
"investimentos", amount: 1500, date: monthsAgoISO(3, 10), description: "Compra PETR4" };
 const investTx2 = { id: uid(), kind: "saida", accountId: accId, categoryId:
"investimentos", amount: 3000, date: monthsAgoISO(2, 5), description: "Compra Tesouro Selic" };
 const investTx3 = { id: uid(), kind: "saida", accountId: accId, categoryId:
"investimentos", amount: 20, date: monthsAgoISO(0, 15), description: "Compra Bitcoin (BTC)" };
 tx.push(investTx1, investTx2, investTx3);

 // Venda anterior com lucro, dinheiro voltando pra conta
 const saleTx = { id: uid(), kind: "entrada", accountId: accId, categoryId:
"investimentos", amount: 900, date: monthsAgoISO(1, 18), description: "Venda MXRF11 (2 un.) — lucro de R$ 80,00" };
 tx.push(saleTx);

  return {
   profile: { name: "Usuário Teste", incomeFixed: 6000, incomeVariable: 0 },
   accounts: [
     { id: accId, bank: "Itaú", nickname: "Conta principal", agencia: "1234", conta:
"56789-0", initialBalance: 2800, color: colorFor(0) },
   ],
   cards: [
     { id: nuId, institution: "Nubank", cardLabel: "Platinum", brand: "Mastercard",
nickname: "Dia a dia", limit: 3000, closingDay: 3, dueDay: 10, color: colorFor(3) },
     { id: itauCardId, institution: "Itaú", cardLabel: "Black", brand: "Visa", nickname:
"Compras maiores", limit: 8000, closingDay: 8, dueDay: 15, color: colorFor(4) },
   ],
   categories: DEFAULT_CATEGORIES,
   transactions: tx,
   recurring: [],
   investments: [
     { id: "demo-inv-acao", type: "acao", name: "PETR4", ticker: "PETR4", quantity:
50, buyPrice: 30, currentPrice: 32.4, buyDate: monthsAgoISO(3, 10), buyTxIds:
[investTx1.id] },
     { id: "demo-inv-tesouro", type: "tesouro", name: "Tesouro Selic", appliedValue:
3000, manualValue: 3110, buyDate: monthsAgoISO(2, 5), buyTxIds: [investTx2.id] },
     { id: "demo-inv-cripto", type: "cripto", name: "Bitcoin (BTC)", ticker: "Bitcoin(BTC)", quantity: 0.00007, buyPrice: 285714, currentPrice: 301000, buyDate:
monthsAgoISO(0, 15), buyTxIds: [investTx3.id] },
     { id: "demo-inv-rf", type: "rendafixa", name: "CDB Banco Inter 118% CDI",
appliedValue: 4000, manualValue: 4180, buyDate: monthsAgoISO(5, 2), buyTxIds:
[] },
   ],
   sales: [
     { id: "demo-sale-1", investmentId: "demo-sold-mxrf", name: "MXRF11", type:
"acao", quantity: 2, proceeds: 900, costBasis: 820, realizedPL: 80, date:
monthsAgoISO(1, 18), accountId: accId },
   ],
   budgets: {},
   goals: [
     { id: "demo-goal-1", label: "Viagem de fim de ano", target: 6000, saved: 1800,
category: "viagem", dueDate: `${new Date().getFullYear()}-12-15` },
      { id: "demo-goal-2", label: "Reserva de emergência", target: 15000, saved: 4200,
category: "reserva", dueDate: null },
    ],
    pin: null,
  };
}

// ---------- Dados fictícios (perfil complexo) — múltiplas contas, parcelas em andamento, recorrências ----------
function makeInstallments(count, totalValue, startMonthsAgo, startDay, description,
kind, accountId, cardId, categoryId, groupId) {
  const totalCents = Math.round(totalValue * 100);
  const baseCents = Math.floor(totalCents / count);
  const remainder = totalCents - baseCents * count;
  const startDate = monthsAgoISO(startMonthsAgo, startDay);
  const parcels = [];
  for (let i = 1; i <= count; i++) {
    const cents = i === 1 ? baseCents + remainder : baseCents;
    parcels.push({
     id: uid(), kind, accountId, cardId, categoryId, amount: cents / 100,
     date: addMonthsSafe(startDate, i - 1), description: `${description} (${i}/${count})`,
     installmentGroupId: groupId, installmentIndex: i, installmentTotal: count,
    });
  }
  return parcels;
}
function makeRecurring(rule, count, startMonthsAgo, startDay) {
  const startDate = monthsAgoISO(startMonthsAgo, startDay);
  const tx = [];
  for (let i = 0; i < count; i++) {
    tx.push({
     id: uid(), kind: rule.kind, accountId: rule.accountId, cardId: rule.cardId,
categoryId: rule.categoryId,
     amount: rule.amount, date: addMonthsSafe(startDate, i), description:
rule.description, recurringId: rule.id,
    });
  }
  return tx;
}

function seedComplexDemoData() {
 const acc1 = "cplx-acc-itau"; // conta principal
 const acc2 = "cplx-acc-inter"; // conta reserva/secundária
 const nuId = "cplx-card-nu";
 const itauCardId = "cplx-card-itaublack";
 const c6Id = "cplx-card-c6";
 const tx = [];
 const push = (o) => tx.push({ id: uid(), ...o });

  // Salário e movimentações nas duas contas, últimos 6 meses
  for (let m = 6; m >= 0; m--) {
    push({ kind: "entrada", accountId: acc1, categoryId: "salario", amount: 5200, date:
monthsAgoISO(m, 5), description: "Salário" });
    push({ kind: "saida", accountId: acc1, categoryId: "casa", amount: 1900, date:
monthsAgoISO(m, 8), description: "Aluguel" });
    push({ kind: "saida", accountId: acc1, categoryId: "casa", amount: 220 + (m % 3) *
25, date: monthsAgoISO(m, 14), description: "Luz e água" });
    push({ kind: "entrada", accountId: acc2, categoryId: "rendimentos", amount: 60 +
(m % 4) * 10, date: monthsAgoISO(m, 25), description: "Rendimento CDB" });
  }
  const transferGid = uid();
  push({ kind: "saida", accountId: acc1, categoryId: "transferencia", amount: 500,
date: monthsAgoISO(4, 10), description: "Transferência para Conta reserva",
transferGroupId: transferGid });
  push({ kind: "entrada", accountId: acc2, categoryId: "transferencia", amount: 500,
date: monthsAgoISO(4, 10), description: "Transferência de Conta principal",
transferGroupId: transferGid });
  push({ kind: "entrada", accountId: acc1, categoryId: "pix_recebido", amount: 320,
date: monthsAgoISO(2, 9), description: "Pix de um amigo" });
  push({ kind: "entrada", accountId: acc1, categoryId: "renda_extra", amount: 900,
date: monthsAgoISO(1, 22), description: "Freela de design" });

 // Gastos correntes nos 3 cartões (últimos 5 meses)
 const nuGastos = [["alimentacao", 420, "Mercado"], ["alimentacao", 45, "iFood"],
["lazer", 80, "Cinema"], ["assinaturas", 39.9, "Streaming avulso"]];
 const itauGastos = [["transporte", 280, "Combustível"], ["saude", 150,
"Farmácia"], ["viagem", 450, "Passagem"]];
 const c6Gastos = [["compras", 320, "Eletrônico"], ["educacao", 199, "Curso online"]];
 for (let m = 4; m >= 0; m--) {
   nuGastos.forEach(([cat, val, desc], i) => push({ kind: "cartao", cardId: nuId,
categoryId: cat, amount: val + m * 2, date: monthsAgoISO(m, 4 + i * 5), description:
desc }));
   itauGastos.forEach(([cat, val, desc], i) => push({ kind: "cartao", cardId: itauCardId,
categoryId: cat, amount: val + m * 3, date: monthsAgoISO(m, 6 + i * 6), description:
desc }));
   c6Gastos.forEach(([cat, val, desc], i) => push({ kind: "cartao", cardId: c6Id,
categoryId: cat, amount: val, date: monthsAgoISO(m, 16 + i * 3), description:
desc }));
 }

 // Compras parceladas EM ANDAMENTO — algumas parcelas já passaram, outras ainda vêm
 // Notebook: 10x, comprado há 3 meses (no Nubank) — parcelas de -3 até +6 meses
 tx.push(...makeInstallments(10, 3500, 3, 12, "Notebook Dell", "cartao", null, nuId, "compras", "cplx-parc-notebook"));
 // Geladeira: 6x, comprada há 1 mês (no Itaú Black) — parcelas de -1 até +4 meses
 tx.push(...makeInstallments(6, 2400, 1, 20, "Geladeira", "cartao", null, itauCardId, "casa", "cplx-parc-geladeira"));
 // Celular: 12x, comprado há 5 meses (no C6) — já quase acabando, mostra parcelas passadas dominando
 tx.push(...makeInstallments(12, 3600, 5, 9, "iPhone", "cartao", null, c6Id, "compras", "cplx-parc-iphone"));

 // Recorrência COM prazo (empréstimo consignado, 12x, saída da conta principal) — começou há 5 meses, ainda tem parcelas futuras
 const emprestimoRule = { id: "cplx-rec-emprestimo", kind: "saida", accountId: acc1,
cardId: null, categoryId: "outros", amount: 450, description: "Empréstimo consignado", dayOfMonth: 15, active: true, totalOccurrences: 12 };
 tx.push(...makeRecurring(emprestimoRule, 12, 5, 15));

 // Recorrência SEM prazo (assinatura de streaming no cartão Nubank) — gerada até o mês atual
 const streamingRule = { id: "cplx-rec-streaming", kind: "cartao", accountId: null,
cardId: nuId, categoryId: "assinaturas", amount: 44.9, description: "Streaming principal", dayOfMonth: 7, active: true, totalOccurrences: null };
 tx.push(...makeRecurring(streamingRule, 6, 5, 7));

 // Compras de investimento, debitando de contas diferentes
 const investTx1 = { id: uid(), kind: "saida", accountId: acc1, categoryId:
"investimentos", amount: 2000, date: monthsAgoISO(3, 11), description: "Compra PETR4" };
 const investTx2 = { id: uid(), kind: "saida", accountId: acc2, categoryId:
"investimentos", amount: 5000, date: monthsAgoISO(2, 6), description: "Compra Tesouro IPCA+" };
 const investTx3 = { id: uid(), kind: "saida", accountId: acc1, categoryId:
"investimentos", amount: 30, date: monthsAgoISO(0, 16), description: "Compra Ethereum (ETH)" };
 tx.push(investTx1, investTx2, investTx3);

 const saleTx = { id: uid(), kind: "entrada", accountId: acc2, categoryId:
"investimentos", amount: 1200, date: monthsAgoISO(1, 20), description: "VendaVALE3 (10 un.) — lucro de R$ 150,00" };
 tx.push(saleTx);

  // Pagamento integral da fatura anterior do Nubank (demonstra o selo PAGA)
  const prevNuInvoice = invoiceMonthOf(monthsAgoISO(1, 15), 3);
  const prevNuTotal = tx.filter(t => t.kind === "cartao" && t.cardId === nuId &&
invoiceMonthOf(t.date, 3) === prevNuInvoice).reduce((s, t) => s + t.amount, 0);
  if (prevNuTotal > 0) {
    const payDate = new Date().getDate() >= 10 ? monthsAgoISO(0, 10) :
monthsAgoISO(1, 10);
    tx.push({ id: uid(), kind: "saida", accountId: acc1, categoryId: "fatura_pagamento",
amount: Math.round(prevNuTotal * 100) / 100, date: payDate, description:
"Pagamento fatura Nubank", paidCardId: nuId, paidInvoice: prevNuInvoice });
  }

  return {
   profile: { name: "Usuário Teste (perfil complexo)", incomeFixed: 5200, incomeVariable: 300 },
   accounts: [
     { id: acc1, bank: "Itaú", nickname: "Conta principal", agencia: "4521", conta:
"88213-4", initialBalance: 3200, color: colorFor(0) },
     { id: acc2, bank: "Banco Inter", nickname: "Conta reserva", agencia: "0001",
conta: "12345-6", initialBalance: 9000, color: colorFor(1) },
   ],
   cards: [
     { id: nuId, institution: "Nubank", cardLabel: "Platinum", brand: "Mastercard",
nickname: "Dia a dia", limit: 4000, closingDay: 3, dueDay: 10, color: colorFor(3) },
     { id: itauCardId, institution: "Itaú", cardLabel: "Black", brand: "Visa", nickname:
"Compras maiores", limit: 10000, closingDay: 8, dueDay: 15, color: colorFor(4) },
     { id: c6Id, institution: "C6 Bank", cardLabel: "Carbon", brand: "Mastercard",
nickname: "Parcelados", limit: 5000, closingDay: 20, dueDay: 27, color: colorFor(5) },
   ],
   categories: DEFAULT_CATEGORIES,
   transactions: tx,
   recurring: [emprestimoRule, streamingRule],
   investments: [
     { id: "cplx-inv-acao", type: "acao", name: "PETR4", ticker: "PETR4", quantity: 60,
buyPrice: 33.3, currentPrice: 35.1, buyDate: monthsAgoISO(3, 11), buyTxIds:
[investTx1.id] },
     { id: "cplx-inv-tesouro", type: "tesouro", name: "Tesouro IPCA+", appliedValue:
5000, manualValue: 5320, buyDate: monthsAgoISO(2, 6), buyTxIds: [investTx2.id] },
     { id: "cplx-inv-cripto", type: "cripto", name: "Ethereum (ETH)", ticker: "Ethereum(ETH)", quantity: 0.009, buyPrice: 3333, currentPrice: 3550, buyDate:
monthsAgoISO(0, 16), buyTxIds: [investTx3.id] },
   ],
   sales: [
      { id: "cplx-sale-1", investmentId: "cplx-sold-vale3", name: "VALE3", type: "acao",
quantity: 10, proceeds: 1200, costBasis: 1050, realizedPL: 150, date:
monthsAgoISO(1, 20), accountId: acc2 },
    ],
    budgets: { alimentacao: 900, transporte: 450, compras: 600 },
    goals: [
      { id: "cplx-goal-1", label: "Quitar o empréstimo", target: 5400, saved: 3150,
category: "outro", dueDate: monthsAgoISO(-7, 15) },
      { id: "cplx-goal-2", label: "Trocar de carro", target: 25000, saved: 6000, category:
"carro", dueDate: `${new Date().getFullYear() + 1}-06-01` },
      { id: "cplx-goal-3", label: "Reserva de emergência", target: 20000, saved: 9000,
category: "reserva", dueDate: null },
    ],
    pin: null,
  };
}

// ---------- Dados fictícios (perfil classe média alta) — renda alta, assinaturas múltiplas, parcelas grandes ----------
function seedUpperClassDemoData() {
 const acc1 = "up-acc-btg";
 const acc2 = "up-acc-safra";
 const nuId = "up-card-nu";
 const itauCardId = "up-card-itau";
 const tx = [];
 const push = (o) => tx.push({ id: uid(), ...o });

 // Salário — dois depósitos, R$20.000/mês, últimos 6 meses + atual
 for (let m = 6; m >= 0; m--) {
   push({ kind: "entrada", accountId: acc1, categoryId: "salario", amount: 12000, date: monthsAgoISO(m, 5), description: "Salário (1ª parcela)" });
   push({ kind: "entrada", accountId: acc1, categoryId: "salario", amount: 8000, date: monthsAgoISO(m, 20), description: "Salário (2ª parcela)" });
 }
 // Renda extra — consultoria esporádica
 push({ kind: "entrada", accountId: acc1, categoryId: "renda_extra", amount: 4500, date: monthsAgoISO(2, 18), description: "Consultoria" });
 push({ kind: "entrada", accountId: acc1, categoryId: "renda_extra", amount: 3200, date: monthsAgoISO(0, 12), description: "Consultoria" });

 // Rendimentos da conta reserva
 for (let m = 6; m >= 0; m--) {
   push({ kind: "entrada", accountId: acc2, categoryId: "rendimentos", amount: 380 + (m % 3) * 40, date: monthsAgoISO(m, 26), description: "Rendimento CDB" });
 }

 // Saídas fixas — condomínio/IPTU, escola dos filhos, plano de saúde família
 for (let m = 6; m >= 0; m--) {
   push({ kind: "saida", accountId: acc1, categoryId: "casa", amount: 2800, date: monthsAgoISO(m, 8), description: "Condomínio + IPTU" });
   push({ kind: "saida", accountId: acc1, categoryId: "educacao", amount: 3400, date: monthsAgoISO(m, 6), description: "Mensalidade escolar" });
   push({ kind: "saida", accountId: acc1, categoryId: "saude", amount: 1650, date: monthsAgoISO(m, 10), description: "Plano de saúde família" });
 }

 // Assinaturas — várias, recorrentes, no cartão Nubank
 const assinaturas = [
   ["Netflix Premium", 55.90, 8], ["Spotify Família", 34.90, 12],
   ["Amazon Prime", 19.90, 3], ["iCloud+ 2TB", 39.90, 15],
   ["Gympass Black", 189.90, 5], ["Assinatura Estadão", 29.90, 20],
 ];
 for (let m = 5; m >= 0; m--) {
   assinaturas.forEach(([desc, val, day]) => push({ kind: "cartao", cardId: nuId, categoryId: "assinaturas", amount: val, date: monthsAgoISO(m, day), description: desc }));
 }

 // Gastos correntes no Itaú — alimentação, lazer, compras, transporte
 const itauGastos = [
   ["alimentacao", 890, "Restaurantes"], ["lazer", 420, "Balada/eventos"],
   ["compras", 680, "Loja de roupas"], ["transporte", 350, "App de carro"],
 ];
 for (let m = 5; m >= 0; m--) {
   itauGastos.forEach(([cat, val, desc], i) => push({ kind: "cartao", cardId: itauCardId, categoryId: cat, amount: val + (m * 8), date: monthsAgoISO(m, 4 + i * 5), description: desc }));
 }

 // Parcelamentos grandes em andamento (típico de renda alta) — parcelas passadas e futuras misturadas
 tx.push(...makeInstallments(10, 14990, 6, 12, "MacBook Pro", "cartao", null, nuId, "compras", "up-parc-macbook"));
 tx.push(...makeInstallments(6, 24000, 2, 9, "Viagem Europa", "cartao", null, itauCardId, "viagem", "up-parc-europa"));
 tx.push(...makeInstallments(12, 8400, 4, 18, "Reforma do escritório", "cartao", null, itauCardId, "casa", "up-parc-reforma"));

 // --- Casos-limite propositais, pra testar robustez ---
 // Duplicidade acidental (mesmo valor/descrição/dia lançado duas vezes)
 push({ kind: "cartao", cardId: nuId, categoryId: "compras", amount: 259.90, date: monthsAgoISO(1, 14), description: "Livraria Cultura" });
 push({ kind: "cartao", cardId: nuId, categoryId: "compras", amount: 259.90, date: monthsAgoISO(1, 14), description: "Livraria Cultura" });
 // Estorno de uma compra cancelada
 push({ kind: "entrada", accountId: acc1, categoryId: "reembolso", amount: 680, date: monthsAgoISO(0, 9), description: "Estorno — Loja de roupas (compra cancelada)" });
 // Recorrência no dia 31 (testa meses com menos dias)
 const seguroRule = { id: "up-rec-seguro", kind: "saida", accountId: acc1, cardId: null, categoryId: "casa", amount: 890, description: "Seguro do carro", dayOfMonth: 31, active: true, totalOccurrences: null };
 tx.push(...makeRecurring(seguroRule, 4, 3, 31));
 // Compra à vista de valor alto e redondo
 push({ kind: "cartao", cardId: itauCardId, categoryId: "compras", amount: 12000, date: monthsAgoISO(0, 3), description: "Relógio" });

 // Investimentos — perfil mais robusto: ações, FII, tesouro, previdência
 const investTx1 = { id: uid(), kind: "saida", accountId: acc1, categoryId: "investimentos", amount: 8000, date: monthsAgoISO(4, 10), description: "Compra ITSA4" };
 const investTx2 = { id: uid(), kind: "saida", accountId: acc2, categoryId: "investimentos", amount: 15000, date: monthsAgoISO(3, 5), description: "Compra Tesouro IPCA+" };
 const investTx3 = { id: uid(), kind: "saida", accountId: acc1, categoryId: "investimentos", amount: 6000, date: monthsAgoISO(2, 12), description: "Compra HGLG11" };
 const investTx4 = { id: uid(), kind: "saida", accountId: acc2, categoryId: "investimentos", amount: 2000, date: monthsAgoISO(0, 20), description: "Aporte previdência privada" };
 tx.push(investTx1, investTx2, investTx3, investTx4);

 const saleTx = { id: uid(), kind: "entrada", accountId: acc1, categoryId: "investimentos", amount: 5400, date: monthsAgoISO(1, 16), description: "Venda BOVA11 (30 un.) — lucro de R$ 400,00" };
 tx.push(saleTx);

  return {
   profile: { name: "Usuário Teste (classe média alta)", incomeFixed: 20000, incomeVariable: 1000 },
   accounts: [
     { id: acc1, bank: "BTG Pactual", nickname: "Conta principal", agencia: "0001", conta: "998877-2", initialBalance: 18500, color: colorFor(0) },
     { id: acc2, bank: "Safra", nickname: "Conta reserva", agencia: "0130", conta: "445566-1", initialBalance: 42000, color: colorFor(1) },
   ],
   cards: [
     { id: nuId, institution: "Nubank", cardLabel: "Ultravioleta", brand: "Mastercard", nickname: "Dia a dia", limit: 25000, closingDay: 5, dueDay: 12, color: colorFor(3) },
     { id: itauCardId, institution: "Itaú", cardLabel: "Personnalité Infinite", brand: "Visa", nickname: "Compras grandes", limit: 40000, closingDay: 8, dueDay: 15, color: colorFor(4) },
   ],
   categories: DEFAULT_CATEGORIES,
   transactions: tx,
   recurring: [seguroRule],
   investments: [
     { id: "up-inv-acao", type: "acao", name: "ITSA4", ticker: "ITSA4", quantity: 800, buyPrice: 10, currentPrice: 10.85, buyDate: monthsAgoISO(4, 10), buyTxIds: [investTx1.id] },
     { id: "up-inv-tesouro", type: "tesouro", name: "Tesouro IPCA+", appliedValue: 15000, manualValue: 15980, buyDate: monthsAgoISO(3, 5), buyTxIds: [investTx2.id] },
     { id: "up-inv-fii", type: "acao", name: "HGLG11", ticker: "HGLG11", quantity: 38, buyPrice: 157.9, currentPrice: 163.2, buyDate: monthsAgoISO(2, 12), buyTxIds: [investTx3.id] },
     { id: "up-inv-prev", type: "rendafixa", name: "Previdência Privada PGBL", appliedValue: 22000, manualValue: 23400, buyDate: monthsAgoISO(5, 1), buyTxIds: [] },
   ],
   sales: [
     { id: "up-sale-1", investmentId: "up-sold-bova11", name: "BOVA11", type: "acao", quantity: 30, proceeds: 5400, costBasis: 5000, realizedPL: 400, date: monthsAgoISO(1, 16), accountId: acc1 },
   ],
   budgets: { alimentacao: 1200, lazer: 600, compras: 1500 },
   goals: [
     { id: "up-goal-1", label: "Entrada do apartamento novo", target: 180000, saved: 62000, category: "casa", dueDate: `${new Date().getFullYear() + 1}-08-01` },
     { id: "up-goal-2", label: "Viagem Disney em família", target: 35000, saved: 14000, category: "viagem", dueDate: `${new Date().getFullYear()}-12-20` },
     { id: "up-goal-3", label: "Reserva de emergência", target: 120000, saved: 42000, category: "reserva", dueDate: null },
   ],
   pin: null,
  };
}

// ---------- Persistência ----------
// Garante que dados salvos em versões anteriores ganhem os campos novos
function migrateState(parsed) {
  const st = { ...DEFAULT_STATE, ...parsed };
  const savedCats = Array.isArray(st.categories) ? st.categories : [];
  const customCats = savedCats.filter(c => c.custom && !DEFAULT_CATEGORIES.some(d => d.id === c.id));
  // Categorias padrão sempre vêm da versão mais atual (pega novas subcategorias, ícones, cores),
  // categorias criadas pelo usuário são preservadas como estão.
  const cats = [...DEFAULT_CATEGORIES, ...customCats];
  st.categories = cats;
  st.recurring = st.recurring || [];
  st.budgets = st.budgets || {};
  st.sales = st.sales || [];
  st.goals = st.goals || [];
  st.investments = st.investments || [];
  st.apiKeys = st.apiKeys || {};
  // Migração: renda única (incomeMonthly) vira renda fixa; renda variável começa em 0
  if (st.profile && st.profile.incomeFixed === undefined) {
    st.profile = { ...st.profile, incomeFixed: st.profile.incomeMonthly || 0,
incomeVariable: st.profile.incomeVariable || 0 };
  }
  return st;
}

function useStore() {
 const [state, setState] = useState(DEFAULT_STATE);
 const [loaded, setLoaded] = useState(false);
 useEffect(() => {
   try {
     const raw = localStorage.getItem(STORAGE_KEY);
     if (raw) setState(migrateState(JSON.parse(raw)));
   } catch (e) { /* primeiro uso */ }
   finally { setLoaded(true); }
 }, []);
    const save = useCallback((next) => {
      setState(next);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }
      catch (e) { console.error("Erro ao salvar", e); }
    }, []);
    return { state, setState: save, loaded };
}

// ---------- UI genérica ----------
function Toast({ message, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () =>
clearTimeout(t); }, [onDone]);
  return (
    <div style={{
     position: "fixed", left: "50%", bottom: 24, transform: "translateX(-50%)",
     background: COLORS.positive, color: "#04140C", padding: "12px 18px",
     borderRadius: 14, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 14,
     boxShadow: "0 8px 24px rgba(47,209,128,0.35)", zIndex: 999,
     display: "flex", alignItems: "center", gap: 8, animation: "toastPop 0.25s ease-out",
maxWidth: "90vw",
    }}><Check size={16} />{message}</div>
  );
}
function ConfirmDelete({ onConfirm, onCancel }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
     <button onClick={onConfirm} style={iconBtnStyle(COLORS.negative)}><Check
size={14} /></button>
     <button onClick={onCancel} style={iconBtnStyle(COLORS.textMuted)}><X
size={14} /></button>
    </div>
  );
}
function iconBtnStyle(color) {
  return { width: 28, height: 28, borderRadius: 8, border: `1px solid ${color}55`,
background: `${color}18`, color, display: "flex", alignItems: "center", justifyContent:
"center", cursor: "pointer" };
}
function Tile({ icon, image, label, value, sub, color, onClick, valueFont, valueSize }) {
  return (
    <button onClick={onClick} style={{
     background: COLORS.surface, border: `1px solid ${COLORS.border}`,
borderRadius: 18, padding: 16,
     textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 10,
width: "100%",
    }}>
     {image ? (
       <img src={image} alt="" style={{ width: 64, height: 64, borderRadius: 16,
objectFit: "cover", display: "block" }} />
     ) : (
       <div style={{ width: 44, height: 44, borderRadius: 13, background: `${color}22`,
display: "flex", alignItems: "center", justifyContent: "center", color }}>{icon}</div>
     )}
     <div>
       <div style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: COLORS.textMuted,
overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</div>
       <div style={{ fontFamily: valueFont || FONT_MONO, fontSize: valueSize || 18,
fontWeight: valueFont === FONT_DISPLAY ? 700 : 500, color: COLORS.textPrimary,
marginTop: 2 }}>{value}</div>
       {sub && <div style={{ fontFamily: FONT_BODY, fontSize: 11.5, color:
COLORS.textMuted, marginTop: 2 }}>{sub}</div>}
     </div>
    </button>
  );
}
function AddTile({ label, color, onClick }) {
  return (
    <button onClick={onClick} style={{
     background: "transparent", border: `1.5px dashed ${COLORS.border}`,
borderRadius: 18, padding: 16,
     cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center",
justifyContent: "center",
     gap: 6, minHeight: 106, color: COLORS.textMuted,
    }}>
     <Plus size={18} color={color} />
     <span style={{ fontSize: 12.5 }}>{label}</span>
    </button>
  );
}
function HomeTile({ image, label, onClick }) {
  return (
    <button onClick={onClick} style={{
      position: "relative", border: "none", padding: 0, margin: 0, cursor: "pointer",
      borderRadius: 20, overflow: "hidden", aspectRatio: "1 / 1.22",
      background: "#F6EEDD", width: "100%", display: "block",
      WebkitAppearance: "none", appearance: "none", outline: "none",
    }}>
      <img src={image} alt="" style={{ position: "absolute", inset: -1, width: "calc(100% + 2px)",
height: "calc(100% + 2px)", objectFit: "cover", display: "block", borderRadius: 20 }} />
      <div style={{ position: "absolute", left: 8, right: 8, bottom: 12, textAlign: "center",
        color: "#fff", fontSize: 14.5, fontWeight: 800,
        textShadow: "0 1px 3px rgba(0,0,0,0.55), 0 2px 10px rgba(0,0,0,0.35)" }}>
        {label}
      </div>
    </button>
  );
}
function ScreenHeader({ title, color, onBack, onEdit }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
marginBottom: 18 }}>
     <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
       <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: 10,
background: COLORS.surface, border: `1px solid ${COLORS.border}`, color:
COLORS.textPrimary, display: "flex", alignItems: "center", justifyContent: "center",
cursor: "pointer" }}>
        <ChevronLeft size={18} />
       </button>
       <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 19, color:
color || COLORS.textPrimary }}>{title}</div>
     </div>
     {onEdit && (
      <button onClick={onEdit} style={{ width: 34, height: 34, borderRadius: 10,
background: COLORS.surface, border: `1px solid ${COLORS.border}`, color:
COLORS.textMuted, display: "flex", alignItems: "center", justifyContent: "center",
cursor: "pointer" }}>
        <Pencil size={15} />
      </button>
     )}
    </div>
  );
}
const labelStyle = { display: "block", fontSize: 12, color: COLORS.textMuted,
marginBottom: 6, marginTop: 14 };
const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: 12, border:
`1px solid ${COLORS.border}`, background: COLORS.surface, color:
COLORS.textPrimary, fontSize: 15, outline: "none" };
const selectStyle = { ...inputStyle, appearance: "none" };
function saveBtnStyle(color) {
  const isLight = color === COLORS.surface2;
  return { width: "100%", marginTop: 12, padding: "12px 0", borderRadius: 12,
   border: isLight ? `1px solid ${COLORS.border}` : "none", background: color,
   color: isLight ? COLORS.textPrimary : "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" };
}
function Section({ title, children }) {
  return (
    <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}
`, borderRadius: 16, padding: 16, marginBottom: 14 }}>
     <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 600,
marginBottom: 4 }}>{title}</div>
     {children}
    </div>
  );
}

// ---------- Campo de valor com teclado numérico próprio (vírgula grande e legível) ----------
function AmountInput({ value, onChange, placeholder = "0,00", decimals = 2, style }) {
  const [open, setOpen] = useState(false);
  const hasValue = value !== undefined && value !== null && value !== "";
  const displayValue = hasValue
    ? (parseBRNumber(value) || 0).toLocaleString("pt-BR", { minimumFractionDigits:
decimals, maximumFractionDigits: decimals })
    : placeholder;
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} style={{
        ...inputStyle, ...style, textAlign: "left", cursor: "pointer",
        fontFamily: FONT_MONO, color: hasValue ? COLORS.textPrimary : COLORS.textMuted,
      }}>
        {displayValue}
      </button>
      {open && (
        <AmountKeypadModal value={value || ""} decimals={decimals}
          onConfirm={(v) => { onChange(v); setOpen(false); }}
          onClose={() => setOpen(false)} />
      )}
    </>
  );
}
function AmountKeypadModal({ value, decimals, onConfirm, onClose }) {
  const startUnits = Math.round((parseBRNumber(value || "0") || 0) * Math.pow(10,
decimals));
  const [units, setUnits] = useState(startUnits);
  const MAX_UNITS = Math.pow(10, 13); // teto de segurança, bem acima de qualquer valor real
  const press = (digit) => {
    setUnits(u => {
      const next = u * 10 + digit;
      return next >= MAX_UNITS ? u : next;
    });
  };
  const backspace = () => setUnits(u => Math.floor(u / 10));
  const numericValue = units / Math.pow(10, decimals);
  const formatted = numericValue.toLocaleString("pt-BR", { minimumFractionDigits:
decimals, maximumFractionDigits: decimals });
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(20,20,15,0.45)",
zIndex: 1000, display: "flex", alignItems: "flex-end" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 480,
margin: "0 auto", background: COLORS.surface, borderTopLeftRadius: 22,
borderTopRightRadius: 22, padding: "18px 16px 28px", boxShadow: "0 -8px 30px rgba(20,20,15,0.25)" }}>
        <div style={{ textAlign: "center", fontFamily: FONT_MONO, fontSize: 32,
fontWeight: 700, marginBottom: 18, color: COLORS.textPrimary }}>{formatted}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <button key={n} onClick={() => press(n)} style={amountKeyStyle()}>{n}</button>
          ))}
          <button onClick={() => { press(0); press(0); }} style={amountKeyStyle()}>00</button>
          <button onClick={() => press(0)} style={amountKeyStyle()}>0</button>
          <button onClick={backspace} style={{ ...amountKeyStyle(), background:
"transparent", border: "none" }}><Delete size={22} color={COLORS.textMuted} /></button>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <button onClick={onClose} style={{ ...saveBtnStyle(COLORS.surface2), marginTop:
0, flex: 1 }}>Cancelar</button>
          <button onClick={() => onConfirm(formatted)} style={{
...saveBtnStyle(COLORS.teal), marginTop: 0, flex: 2 }}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}
function amountKeyStyle() {
  return {
    height: 58, borderRadius: 16, border: `1px solid ${COLORS.border}`,
    background: COLORS.surface2, color: COLORS.textPrimary,
    fontSize: 21, fontWeight: 700,
    fontFamily: FONT_MONO, cursor: "pointer", display: "flex", alignItems: "center",
justifyContent: "center",
  };
}

// ---------- Campo de data com calendário próprio (evita instabilidade do date picker nativo) ----------
function formatDatePt(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${String(d).padStart(2, "0")} de ${monthLabelFull(m - 1).toLowerCase()} de ${y}`;
}
function DateInput({ value, onChange, style }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} style={{
        ...inputStyle, ...style, textAlign: "left", cursor: "pointer",
        fontFamily: FONT_BODY, color: value ? COLORS.textPrimary : COLORS.textMuted,
      }}>
        {value ? formatDatePt(value) : "Selecionar data"}
      </button>
      {open && (
        <DatePickerModal value={value}
          onSelect={(v) => { onChange(v); setOpen(false); }}
          onClose={() => setOpen(false)} />
      )}
    </>
  );
}
function DatePickerModal({ value, onSelect, onClose }) {
  const seed = value ? value.split("-").map(Number) : null;
  const now = new Date();
  const [viewYear, setViewYear] = useState(seed ? seed[0] : now.getFullYear());
  const [viewMonth, setViewMonth] = useState(seed ? seed[1] - 1 : now.getMonth());
  const todayStr = todayISO();
  const startWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const changeMonth = (delta) => {
    let m = viewMonth + delta, y = viewYear;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setViewMonth(m); setViewYear(y);
  };
  const isoFor = (d) => `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(20,20,15,0.45)",
zIndex: 1000, display: "flex", alignItems: "flex-end" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 480,
margin: "0 auto", background: COLORS.surface, borderTopLeftRadius: 22,
borderTopRightRadius: 22, padding: "18px 16px 24px", boxShadow: "0 -8px 30px rgba(20,20,15,0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginBottom: 14 }}>
          <button onClick={() => changeMonth(-1)} style={calNavBtnStyle()}><ChevronLeft
size={18} /></button>
          <div style={{ display: "flex", gap: 6, flex: 1, justifyContent: "center" }}>
            <select value={viewMonth} onChange={e => setViewMonth(parseInt(e.target.value,
10))} style={{ ...selectStyle, width: "auto", padding: "8px 10px", fontSize: 14,
fontFamily: FONT_DISPLAY, fontWeight: 700 }}>
              {Array.from({ length: 12 }).map((_, i) => <option key={i} value={i}
>{monthLabelFull(i)}</option>)}
            </select>
            <select value={viewYear} onChange={e => setViewYear(parseInt(e.target.value,
10))} style={{ ...selectStyle, width: "auto", padding: "8px 10px", fontSize: 14,
fontFamily: FONT_DISPLAY, fontWeight: 700 }}>
              {Array.from({ length: 151 }).map((_, i) => { const y = now.getFullYear()
- 100 + i; return <option key={y} value={y}>{y}</option>; })}
            </select>
          </div>
          <button onClick={() => changeMonth(1)} style={calNavBtnStyle()}><ChevronRight
size={18} /></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4,
marginBottom: 6 }}>
          {["D","S","T","Q","Q","S","S"].map((w, i) => (
            <div key={i} style={{ textAlign: "center", fontSize: 11, color:
COLORS.textMuted, fontWeight: 600 }}>{w}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4,
marginBottom: 16 }}>
          {cells.map((d, i) => {
            if (d === null) return <div key={i} />;
            const iso = isoFor(d);
            const isToday = iso === todayStr;
            const isSelected = iso === value;
            return (
              <button key={i} onClick={() => onSelect(iso)} style={{
                aspectRatio: "1", borderRadius: 10, border: isToday && !isSelected ?
`1px solid ${COLORS.teal}` : "1px solid transparent",
                background: isSelected ? COLORS.teal : "transparent", color: isSelected ?
"#fff" : COLORS.textPrimary, fontSize: 13, fontFamily: FONT_MONO, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{d}</button>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onClose} style={{ ...saveBtnStyle(COLORS.surface2),
marginTop: 0, flex: 1 }}>Cancelar</button>
          <button onClick={() => onSelect(todayStr)} style={{
...saveBtnStyle(COLORS.teal), marginTop: 0, flex: 1 }}>Hoje</button>
        </div>
      </div>
    </div>
  );
}
function calNavBtnStyle() {
  return { width: 34, height: 34, borderRadius: 10, background: COLORS.surface2,
border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center",
justifyContent: "center", cursor: "pointer", color: COLORS.textPrimary };
}

// ---------- App ----------
// ---------- Cálculo central de totais (função pura, testável) ----------
function computeTotals(state) {
  const tx = state.transactions;
  const todayStr = todayISO();
  const accountBalances = {};
  const accountProjected = {};
  state.accounts.forEach(acc => {
   let atual = acc.initialBalance, proj = acc.initialBalance;
   tx.forEach(t => {
     if (t.accountId !== acc.id) return;
     const delta = t.kind === "entrada" ? t.amount : t.kind === "saida" ? -t.amount : 0;
     proj += delta;
     if (t.date <= todayStr) atual += delta;
  });
  accountBalances[acc.id] = atual;
  accountProjected[acc.id] = proj;
 });
 const totalContas = Object.values(accountBalances).reduce((s, v) => s + v, 0);

  const now = new Date();
  const curMonthKey = `${now.getFullYear()}-${String(now.getMonth() +
1).padStart(2, "0")}`;
  const cardTotals = {};
  const cardOpenInvoice = {};
  state.cards.forEach(c => {
   const openInvoice = invoiceMonthOf(todayStr, c.closingDay);
   cardOpenInvoice[c.id] = openInvoice;
   cardTotals[c.id] = tx.filter(t => t.kind === "cartao" && t.cardId === c.id &&
invoiceMonthOf(t.date, c.closingDay) === openInvoice).reduce((s, t) => s +
t.amount, 0);
  });
  const totalCartoes = Object.values(cardTotals).reduce((s, v) => s + v, 0);

 const investTotal = state.investments.reduce((s, inv) => s + currentValueOf(inv), 0);

  return { accountBalances, accountProjected, totalContas, cardTotals,
cardOpenInvoice, totalCartoes, investTotal, curMonthKey };
}

function App() {
 useFonts();
 const { state, setState, loaded } = useStore();
 const [screen, setScreen] = useState({ name: "home" });
 const [toast, setToast] = useState(null);
 const [locked, setLocked] = useState(false);
 const [pinInput, setPinInput] = useState("");

 useEffect(() => { if (loaded && state.pin) setLocked(true); }, [loaded]); // eslint-disable-line

 useEffect(() => {
   if (!loaded) return;
   let nextTx = generateMissingRecurring(state);
   nextTx = generateAutoDebitPayments({ ...state, transactions: nextTx });
   if (nextTx !== state.transactions) setState({ ...state, transactions: nextTx });
   // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [loaded]);

 const showToast = (msg) => setToast(msg);
 const go = (name, id) => setScreen({ name, id });

 const totals = useMemo(() => computeTotals(state), [state.transactions,
state.accounts, state.cards, state.investments]);

 const chartData = useMemo(() => {
   const map = {};
   state.transactions.forEach(t => {
    const key = t.date?.slice(0, 7);
    if (!key) return;
    if (SYSTEM_CATS.has(t.categoryId)) return;
    if (!map[key]) map[key] = { entradas: 0, gastos: 0 };
    if (t.kind === "entrada") map[key].entradas += t.amount;
    else map[key].gastos += t.amount;
   });
   return Object.keys(map).sort().slice(-6).map(k => {
    const [y, m] = k.split("-");
    return { mes: `${monthLabel(parseInt(m, 10) - 1)}/${y.slice(2)}`, Gastos:
Math.round(map[k].gastos * 100) / 100, Entradas: Math.round(map[k].entradas *
100) / 100 };
   });
 }, [state.transactions]);

 if (!loaded) {
   return <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex",
alignItems: "center", justifyContent: "center", color: COLORS.textMuted, fontFamily:
FONT_BODY }}>Carregando…</div>;
 }
 if (locked) {
   return <PinScreen pin={state.pin} input={pinInput} setInput={setPinInput}
onSuccess={() => { setLocked(false); setPinInput(""); }} />;
 }
  return (
   <div style={{ minHeight: "100vh", background: COLORS.bg, color:
COLORS.textPrimary, fontFamily: FONT_BODY, paddingBottom: 40 }}>
    <style>{`
      @keyframes toastPop { from { opacity:0; transform:translate(-50%,10px); } to
{ opacity:1; transform:translate(-50%,0); } }
      * { box-sizing: border-box; }
      input, select { font-family: inherit; }
      ::-webkit-scrollbar { display: none; }
      [style*="Sora"] { font-weight: 700 !important; }
    `}</style>
    <style>{`
      @media (min-width: 900px) {
        .app-shell { max-width: 760px !important; }
        .tile-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
      }
    `}</style>
    <div className="app-shell" style={{ maxWidth: 480, margin: "0 auto", padding:
"20px 16px" }}>
      {screen.name === "home" && <HomeScreen state={state} setState={setState}
totals={totals} chartData={chartData} go={go} showToast={showToast} />}
      {screen.name === "novo" && <NovoLancamento state={state}
setState={setState} onBack={() => go("home")} showToast={showToast} />}
      {screen.name === "bancos" && <BancosScreen state={state} setState={setState}
totals={totals} go={go} showToast={showToast} />}
      {screen.name === "cartoes" && <CartoesScreen state={state} setState={setState}
totals={totals} go={go} showToast={showToast} />}
      {screen.name === "patrimonio" && <PatrimonioScreen state={state}
totals={totals} go={go} />}
      {screen.name === "account" && <AccountScreen id={screen.id} state={state}
setState={setState} totals={totals} go={go} />}
      {screen.name === "card" && <CardScreen id={screen.id} state={state}
setState={setState} totals={totals} go={go} showToast={showToast} />}
      {screen.name === "accountForm" && <AccountForm id={screen.id}
state={state} setState={setState} onBack={() => go("home")}
showToast={showToast} />}
      {screen.name === "cardForm" && <CardForm id={screen.id} state={state}
setState={setState} onBack={() => go("home")} showToast={showToast} />}
      {screen.name === "investimentos" && <InvestmentsScreen state={state}
setState={setState} totals={totals} go={go} showToast={showToast} />}
      {screen.name === "investmentForm" && <InvestmentForm id={screen.id}
state={state} setState={setState} onBack={() => go("investimentos")}
showToast={showToast} />}
      {screen.name === "investmentSell" && <SellInvestmentForm id={screen.id}
state={state} setState={setState} onBack={() => go("investimentos")}
showToast={showToast} />}
      {screen.name === "resumo" && <ResumoScreen state={state}
setState={setState} showToast={showToast} onBack={() => go("home")} />}
      {screen.name === "planejamento" && <PlanejamentoScreen state={state}
setState={setState} totals={totals} onBack={() => go("home")} showToast={showToast} />}
      {screen.name === "recorrencias" && <RecorrenciasScreen state={state} setState={setState}
onBack={() => go("home")} showToast={showToast} />}
      {screen.name === "config" && <ConfigScreen state={state} setState={setState}
onBack={() => go("home")} showToast={showToast} />}
     </div>
     {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}

function currentValueOf(inv) {
  if (inv.type === "acao" || inv.type === "cripto") {
    const price = inv.currentPrice ?? inv.buyPrice ?? 0;
    return (inv.quantity || 0) * price;
  }
  return inv.manualValue ?? inv.appliedValue ?? 0;
}
function investedValueOf(inv) {
  if (inv.type === "acao" || inv.type === "cripto") return (inv.quantity || 0) *
(inv.buyPrice || 0);
  return inv.appliedValue ?? 0;
}

// ---------- Cotações ao vivo (ações via brapi.dev, cripto via CoinGecko — ambas públicas, sem custo) ----------
const CRYPTO_TO_COINGECKO_ID = {
  "Bitcoin (BTC)": "bitcoin", "Ethereum (ETH)": "ethereum", "Solana (SOL)": "solana",
  "Cardano (ADA)": "cardano", "Ripple (XRP)": "ripple", "Dogecoin (DOGE)": "dogecoin",
  "BNB": "binancecoin",
};
async function fetchQuotes(state) {
  const acoes = state.investments.filter(i => i.type === "acao" && i.ticker);
  const criptos = state.investments.filter(i => i.type === "cripto" &&
CRYPTO_TO_COINGECKO_ID[i.ticker]);
  const prices = {}; // "acao:TICKER" | "cripto:coingeckoId" -> preço
  const errors = [];

  if (acoes.length > 0) {
    const tickers = [...new Set(acoes.map(i => i.ticker))];
    const token = state.apiKeys?.brapiToken;
    const results = await Promise.all(tickers.map(async (ticker) => {
      const url = `https://brapi.dev/api/quote/${encodeURIComponent(ticker)}`
+ (token ? `?token=${encodeURIComponent(token)}` : "");
      try {
        const res = await fetch(url);
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          return { ticker, error: `HTTP ${res.status}${data?.message ? " — " +
data.message : ""}` };
        }
        const r = Array.isArray(data?.results) ? data.results[0] : null;
        if (r?.regularMarketPrice != null) return { ticker, price: r.regularMarketPrice };
        return { ticker, error: "sem cotação (verifique o token ou o ticker)" };
      } catch (e) {
        return { ticker, error: e.message || "falha de conexão" };
      }
    }));
    results.forEach(r => {
      if (r.price != null) prices[`acao:${r.ticker}`] = r.price;
      else errors.push(`${r.ticker}: ${r.error}`);
    });
  }

  if (criptos.length > 0) {
    const ids = [...new Set(criptos.map(i => CRYPTO_TO_COINGECKO_ID[i.ticker]))];
    const url =
`https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(",")}&vs_currencies=brl`;
    try {
      const res = await fetch(url);
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        errors.push(`cripto: HTTP ${res.status}`);
      } else {
        ids.forEach(id => { if (data?.[id]?.brl != null) prices[`cripto:${id}`] =
data[id].brl; });
      }
    } catch (e) { errors.push(`cripto: ${e.message || "falha de conexão"}`); }
  }

  return { prices, errors };
}

// ---------- PIN ----------
function PinScreen({ pin, input, setInput, onSuccess }) {
  useEffect(() => {
    if (input.length === pin.length) {
      if (input === pin) onSuccess(); else setTimeout(() => setInput(""), 350);
    }
  }, [input]); // eslint-disable-line
  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color:
COLORS.textPrimary, display: "flex", flexDirection: "column", alignItems: "center",
justifyContent: "center", fontFamily: FONT_BODY, gap: 24 }}>
      <Lock size={28} color={COLORS.textMuted} />
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 600 }}>Digite
seu PIN</div>
      <div style={{ display: "flex", gap: 10 }}>
        {Array.from({ length: pin.length }).map((_, i) => (
          <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: i
< input.length ? COLORS.teal : COLORS.surface2, border: `1px solid ${COLORS.border}` }} />
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 64px)", gap: 14 }}>
        {[1,2,3,4,5,6,7,8,9].map(n => <button key={n} onClick={() => setInput(v =>
(v.length < pin.length ? v + n : v))} style={keypadBtn}>{n}</button>)}
      <div />
      <button onClick={() => setInput(v => (v.length < pin.length ? v + "0" : v))}
style={keypadBtn}>0</button>
      <button onClick={() => setInput(v => v.slice(0, -1))} style={{ ...keypadBtn,
background: "transparent", border: "none" }}><Delete size={20}
color={COLORS.textMuted} /></button>
     </div>
    </div>
  );
}
const keypadBtn = { width: 64, height: 64, borderRadius: "50%", background:
COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.textPrimary,
fontSize: 20, fontFamily: FONT_MONO, cursor: "pointer", display: "flex", alignItems:
"center", justifyContent: "center" };

// ---------- Home ----------
function HomeScreen({ state, setState, totals, chartData, go, showToast }) {
  const now = new Date();
  const todayDow = now.getDay(); // 0=Dom ... 6=Sáb
  const dowLetters = ["D", "S", "T", "Q", "Q", "S", "S"];

  return (
   <div>
    <div style={{
      background: "linear-gradient(160deg, #3B4CC8, #2E3AA8)", color: "#fff",
      margin: "-20px -16px 16px", padding: "26px 20px 26px",
    }}>
     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 28,
        letterSpacing: -0.3, textShadow: "0 3px 8px rgba(0,0,0,0.3)" }}>Finanças</div>
      <button onClick={() => go("novo")} style={{
        width: 52, height: 52, borderRadius: 26, background: "rgba(255,255,255,0.18)",
        border: "1.5px solid rgba(255,255,255,0.35)", color: "#fff", display: "flex",
        alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0,
      }}><Plus size={28} /></button>
     </div>
     <div style={{ display: "flex", gap: 7, marginTop: 34 }}>
      {dowLetters.map((letter, i) => {
        const isToday = i === todayDow;
        return (
          <div key={i} style={{
            width: 30, height: 30, borderRadius: 15, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: isToday ? 14 : 12, fontWeight: 700,
            color: isToday ? "#E5484D" : "rgba(255,255,255,0.55)",
            background: isToday ? "#fff" : "transparent",
            boxShadow: isToday ? "0 3px 8px rgba(0,0,0,0.18)" : "none",
          }}>
            {isToday ? now.getDate() : letter}
          </div>
        );
      })}
     </div>
    </div>

    <div className="tile-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 4 }}>
     <HomeTile image="icones/bancos.png" label="Bancos" onClick={() => go("bancos")} />
     <HomeTile image="icones/cartoes.png" label="Cartões" onClick={() => go("cartoes")} />
     <HomeTile image="icones/investimentos.png" label="Investimentos" onClick={() => go("investimentos")} />
     <HomeTile image="icones/planejamento.png" label="Planejamento" onClick={() => go("planejamento")} />
     <HomeTile image="icones/patrimonio.png" label="Patrimônio" onClick={() => go("patrimonio")} />
     <HomeTile image="icones/perfil.png" label="Perfil" onClick={() => go("config")} />
    </div>
   </div>
  );
}
function SectionLabel({ children }) {
  return <div style={{ fontSize: 12.5, color: COLORS.textMuted, marginBottom: 8,
fontWeight: 600, letterSpacing: 0.2 }}>{children}</div>;
}

// ---------- Bancos ----------
function BancosScreen({ state, setState, totals, go, showToast }) {
  return (
    <div>
      <ScreenHeader title="Bancos" color={COLORS.orange} onBack={() => go("home")} />
      <div className="tile-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 22 }}>
        {state.accounts.map((acc, i) => (
          <Tile key={acc.id} icon={<Wallet size={21} />} label={acc.nickname || acc.bank}
            value={currency(totals.accountBalances[acc.id] || 0)} sub={acc.bank}
            color={acc.color || colorFor(i)} onClick={() => go("account", acc.id)} />
        ))}
        <AddTile label="Nova conta" color={COLORS.orange} onClick={() => go("accountForm")} />
      </div>
      <RecorrenciasScreen state={state} setState={setState} showToast={showToast}
        filterKind="conta" embedded title="Recorrências em conta corrente" />
    </div>
  );
}

// ---------- Cartões ----------
function CartoesScreen({ state, setState, totals, go, showToast }) {
  return (
    <div>
      <ScreenHeader title="Cartões" color={COLORS.cartao} onBack={() => go("home")} />
      <div className="tile-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 22 }}>
        {state.cards.map((c, i) => (
          <Tile key={c.id} icon={<CreditCard size={21} />} label={c.nickname || c.cardLabel}
            value={currency(totals.cardTotals[c.id] || 0)} sub={`${c.institution} · ${c.brand}`}
            color={c.color || colorFor(i)} onClick={() => go("card", c.id)} />
        ))}
        <AddTile label="Novo cartão" color={COLORS.cartao} onClick={() => go("cardForm")} />
      </div>
      <RecorrenciasScreen state={state} setState={setState} showToast={showToast}
        filterKind="cartao" embedded title="Recorrências no cartão" />
    </div>
  );
}

// ---------- Patrimônio ----------
function PatrimonioScreen({ state, totals, go }) {
  const consolidada = totals.totalContas + totals.investTotal - totals.totalCartoes;
  const rows = [
    { label: "Em contas", value: totals.totalContas, color: COLORS.orange },
    { label: "Investido", value: totals.investTotal, color: COLORS.green },
    { label: "Faturas em aberto", value: -totals.totalCartoes, color: COLORS.cartao },
  ];
  return (
    <div>
      <ScreenHeader title="Patrimônio" color={COLORS.indigo} onBack={() => go("home")} />
      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 18, padding: 18, marginBottom: 16 }}>
        <div style={{ fontSize: 12.5, color: COLORS.textMuted, marginBottom: 4 }}>Patrimônio líquido</div>
        <div style={{ fontFamily: FONT_MONO, fontSize: 28, fontWeight: 700 }}>{currency(consolidada)}</div>
      </div>
      <Section title="Composição atual">
        {rows.map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "10px 0", borderBottom: i < rows.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: r.color }} />
              {r.label}
            </div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 14, fontWeight: 700,
              color: r.value < 0 ? COLORS.negative : COLORS.textPrimary }}>{currency(r.value)}</div>
          </div>
        ))}
      </Section>
      <div style={{ fontSize: 11.5, color: COLORS.textMuted, textAlign: "center", padding: "4px 12px 12px" }}>
        A evolução ao longo do tempo chega numa próxima atualização.
      </div>
    </div>
  );
}

// ---------- Cadastro de conta ----------
function AccountForm({ id, state, setState, onBack, showToast }) {
  const editing = state.accounts.find(a => a.id === id);
  const [bank, setBank] = useState(editing?.bank || BANKS[0]);
  const [customBank, setCustomBank] = useState(editing && !
BANKS.includes(editing.bank) ? editing.bank : "");
  const [nickname, setNickname] = useState(editing?.nickname || "");
  const [agencia, setAgencia] = useState(editing?.agencia || "");
  const [conta, setConta] = useState(editing?.conta || "");
  const [initialBalance, setInitialBalance] = useState(String(editing?.initialBalance ??
""));
  const [confirmingDelete, setConfirmingDelete] = useState(false);
 const save = () => {
   const finalBank = bank === "Outro" ? (customBank.trim() || "Outro") : bank;
   if (!finalBank || !conta) return;
   if (editing) {
     const next = { ...state, accounts: state.accounts.map(a => a.id === id ? { ...a,
bank: finalBank, nickname, agencia, conta, initialBalance:
parseBRNumber(initialBalance) } : a) };
     setState(next); showToast("Conta atualizada");
   } else {
     const acc = { id: uid(), bank: finalBank, nickname, agencia, conta, initialBalance:
parseBRNumber(initialBalance), color: colorFor(state.accounts.length) };
     setState({ ...state, accounts: [...state.accounts, acc] }); showToast("Conta cadastrada");
   }
   onBack();
 };
 const del = () => {
   setState({
     ...state,
     accounts: state.accounts.filter(a => a.id !== id),
     transactions: state.transactions.filter(t => t.accountId !== id),
   });
   showToast("Conta removida");
   onBack();
 };

 return (
  <div>
    <ScreenHeader title={editing ? "Editar conta" : "Nova conta"}
color={COLORS.orange} onBack={onBack} />
    <label style={labelStyle}>Banco</label>
    <select value={bank} onChange={e => setBank(e.target.value)}
style={selectStyle}>
     {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
    </select>
    {bank === "Outro" && (
     <input value={customBank} onChange={e => setCustomBank(e.target.value)}
placeholder="Nome do banco" style={{ ...inputStyle, marginTop: 8 }} />
    )}
    <label style={labelStyle}>Apelido (opcional)</label>
    <input value={nickname} onChange={e => setNickname(e.target.value)}
placeholder="Ex: Conta principal" style={inputStyle} />
    <div style={{ display: "flex", gap: 8 }}>
     <div style={{ flex: 1 }}>
       <label style={labelStyle}>Agência</label>
      <input value={agencia} onChange={e => setAgencia(e.target.value)}
inputMode="numeric" onFocus={e => e.target.select()} placeholder="0000" style={inputStyle} />
     </div>
     <div style={{ flex: 1.4 }}>
      <label style={labelStyle}>Conta corrente</label>
      <input value={conta} onChange={e => setConta(e.target.value)}
placeholder="00000-0" style={inputStyle} />
     </div>
   </div>
   <label style={labelStyle}>Saldo inicial</label>
   <AmountInput value={initialBalance} onChange={setInitialBalance} placeholder="0,00" />

     <button onClick={save} style={saveBtnStyle(COLORS.orange)}>{editing ? "Salvar alterações" : "Cadastrar conta"}</button>
     {editing && (
      confirmingDelete ? (
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
         <button onClick={del} style={{ ...saveBtnStyle(COLORS.negative), marginTop:
0, flex: 1 }}>Confirmar exclusão</button>
         <button onClick={() => setConfirmingDelete(false)}
style={{ ...saveBtnStyle(COLORS.surface2), marginTop: 0, flex: 1 }}>Cancelar</button>
        </div>
      ):(
        <button onClick={() => setConfirmingDelete(true)}
style={{ ...saveBtnStyle("transparent"), border: `1px solid ${COLORS.negative}55`,
color: COLORS.negative, marginTop: 10 }}>
         Excluir conta
        </button>
      )
     )}
    </div>
  );
}

// ---------- Cadastro de cartão ----------
function CardForm({ id, state, setState, onBack, showToast }) {
  const editing = state.cards.find(c => c.id === id);
  const [institution, setInstitution] = useState(editing?.institution || BANKS[0]);
  const [customInst, setCustomInst] = useState(editing && !
BANKS.includes(editing.institution) ? editing.institution : "");
  const [cardLabel, setCardLabel] = useState(editing?.cardLabel || "");
  const [brand, setBrand] = useState(editing?.brand || BRANDS[0]);
  const [nickname, setNickname] = useState(editing?.nickname || "");
 const [limit, setLimit] = useState(String(editing?.limit ?? ""));
 const [closingDay, setClosingDay] = useState(String(editing?.closingDay ?? ""));
 const [dueDay, setDueDay] = useState(String(editing?.dueDay ?? ""));
 const [autoDebit, setAutoDebit] = useState(editing?.autoDebit || false);
 const [autoDebitAccountId, setAutoDebitAccountId] = useState(editing?.autoDebitAccountId || state.accounts[0]?.id || "");
 const [confirmingDelete, setConfirmingDelete] = useState(false);

  const save = () => {
    const finalInst = institution === "Outro" ? (customInst.trim() || "Outro") : institution;
    if (!finalInst || !cardLabel) return;
    if (editing) {
      const next = { ...state, cards: state.cards.map(c => c.id === id ? { ...c, institution:
finalInst, cardLabel, brand, nickname, limit: parseBRNumber(limit), closingDay:
parseInt(closingDay || "0", 10), dueDay: parseInt(dueDay || "0", 10),
autoDebit, autoDebitAccountId: autoDebit ? autoDebitAccountId : null } : c) };
      setState(next); showToast("Cartão atualizado");
    } else {
      const card = { id: uid(), institution: finalInst, cardLabel, brand, nickname, limit:
parseBRNumber(limit), closingDay: parseInt(closingDay || "0", 10), dueDay:
parseInt(dueDay || "0", 10), color: colorFor(state.cards.length + 3),
autoDebit, autoDebitAccountId: autoDebit ? autoDebitAccountId : null };
      setState({ ...state, cards: [...state.cards, card] }); showToast("Cartão cadastrado");
    }
    onBack();
  };
  const del = () => {
    setState({ ...state, cards: state.cards.filter(c => c.id !== id), transactions:
state.transactions.filter(t => t.cardId !== id) });
    showToast("Cartão removido");
    onBack();
  };

 return (
  <div>
    <ScreenHeader title={editing ? "Editar cartão" : "Novo cartão"}
color={COLORS.cartao} onBack={onBack} />
    <label style={labelStyle}>Instituição</label>
    <select value={institution} onChange={e => setInstitution(e.target.value)}
style={selectStyle}>
      {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
    </select>
    {institution === "Outro" && (
      <input value={customInst} onChange={e => setCustomInst(e.target.value)}
placeholder="Nome da instituição" style={{ ...inputStyle, marginTop: 8 }} />
    )}
    <label style={labelStyle}>Nome do cartão</label>
    <input value={cardLabel} onChange={e => setCardLabel(e.target.value)}
placeholder="Ex: Platinum, Black, Gold…" style={inputStyle} />
    <label style={labelStyle}>Bandeira</label>
    <select value={brand} onChange={e => setBrand(e.target.value)}
style={selectStyle}>
     {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
    </select>
    <label style={labelStyle}>Apelido (opcional)</label>
    <input value={nickname} onChange={e => setNickname(e.target.value)}
placeholder="Ex: Cartão do dia a dia" style={inputStyle} />
    <div style={{ display: "flex", gap: 8 }}>
     <div style={{ flex: 1 }}>
       <label style={labelStyle}>Limite</label>
       <AmountInput value={limit} onChange={setLimit} placeholder="0,00" />
     </div>
     <div style={{ width: 100 }}>
       <label style={labelStyle}>Fechamento</label>
       <input value={closingDay} onChange={e =>
setClosingDay(e.target.value.replace(/\D/g, ""))} inputMode="numeric" onFocus={e => e.target.select()}
placeholder="3" style={inputStyle} />
     </div>
     <div style={{ width: 100 }}>
       <label style={labelStyle}>Dia venc.</label>
       <input value={dueDay} onChange={e => setDueDay(e.target.value.replace(/\D/g, ""))} inputMode="numeric" onFocus={e => e.target.select()} placeholder="10" style={inputStyle} />
     </div>
    </div>
    <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 8,
lineHeight: 1.4, marginBottom: 4 }}>
     O fechamento é o dia em que a fatura "corta" — compras depois dele entram
na fatura seguinte. Fica normalmente uns dias antes do vencimento.
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14,
padding: "12px 14px", borderRadius: 12, border: `1px solid ${COLORS.border}`,
background: COLORS.surface2 }}>
     <input type="checkbox" checked={autoDebit} onChange={e =>
setAutoDebit(e.target.checked)} style={{ width: 18, height: 18, accentColor:
COLORS.cartao }} />
     <div>
      <div style={{ fontSize: 13, fontWeight: 600 }}>Débito automático</div>
      <div style={{ fontSize: 11, color: COLORS.textMuted }}>No dia do
vencimento, a fatura é paga sozinha na conta escolhida</div>
     </div>
    </div>
    {autoDebit && (
     <>
      <label style={labelStyle}>Conta debitada</label>
      <select value={autoDebitAccountId} onChange={e =>
setAutoDebitAccountId(e.target.value)} style={selectStyle}>
       {state.accounts.length === 0 && <option value="">Cadastre uma conta
primeiro</option>}
       {state.accounts.map(a => <option key={a.id} value={a.id}>{a.nickname ||
a.bank}</option>)}
      </select>
     </>
    )}

     <button onClick={save} style={saveBtnStyle(COLORS.cartao)}>{editing ? "Salvar alterações" : "Cadastrar cartão"}</button>
     {editing && (
      confirmingDelete ? (
       <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
         <button onClick={del} style={{ ...saveBtnStyle(COLORS.negative), marginTop:
0, flex: 1 }}>Confirmar exclusão</button>
         <button onClick={() => setConfirmingDelete(false)}
style={{ ...saveBtnStyle(COLORS.surface2), marginTop: 0, flex: 1 }}>Cancelar</button>
       </div>
      ):(
       <button onClick={() => setConfirmingDelete(true)}
style={{ ...saveBtnStyle("transparent"), border: `1px solid ${COLORS.negative}55`,
color: COLORS.negative, marginTop: 10 }}>
         Excluir cartão
        </button>
      )
     )}
    </div>
  );
}

// ---------- Importação de extratos (CSV/OFX) e categorização automática ----------
const SPEND_KEYWORDS = [
  ["alimentacao", ["ifood", "rappi", "mercado", "supermerc", "padaria", "restaurante",
"lanch", "burger", "pizza", "acai", "cafe", "hortifruti", "acougue"]],
  ["transporte", ["uber", "99app", "99 ", "taxi", "posto", "combust", "gasolina",
"estacionamento", "pedagio", "metro", "onibus", "passagem", "shell", "ipiranga"]],
  ["casa", ["aluguel", "condominio", "energia", "luz ", "agua", "gas ", "internet",
"claro", "vivo", "tim ", "enel", "sabesp", "copel", "cemig"]],
  ["saude", ["farmacia", "drogaria", "drogasil", "medico", "consulta", "exame",
"academia", "unimed", "plano de saude", "dentista", "laboratorio"]],
  ["assinaturas", ["netflix", "spotify", "prime", "disney", "hbo", "max ", "youtube",
"icloud", "apple.com", "google one", "assinatura", "deezer"]],
  ["lazer", ["cinema", "show", "ingresso", "bar ", "steam", "playstation", "xbox",
"nintendo", "clube"]],
  ["educacao", ["curso", "escola", "faculdade", "livraria", "udemy", "alura",
"mensalidade"]],
  ["viagem", ["hotel", "airbnb", "latam", "gol ", "azul ", "booking", "decolar", "hostel",
"pousada"]],
  ["compras", ["amazon", "shopee", "mercado livre", "mercadolivre", "magalu",
"americanas", "aliexpress", "shein", "loja", "magazine"]],
];
const INCOME_KEYWORDS = [
  ["salario", ["salario", "provento", "folha", "pagamento salario", "vencimento"]],
  ["rendimentos", ["rendimento", "juros", "dividendo", "jcp", "resgate"]],
  ["reembolso", ["reembolso", "estorno"]],
  ["pix_recebido", ["pix"]],
];
function guessCategory(desc, kindOfTx) {
  const d = stripAccents((desc || "").toLowerCase());
  if (!d) return null;
  const table = kindOfTx === "entrada" ? INCOME_KEYWORDS :
SPEND_KEYWORDS;
  for (const [catId, words] of table) {
    if (words.some(w => d.includes(w))) return catId;
    }
    return null;
}

// Converte um OFX em linhas "DD/MM/AAAA valor descrição" (valor com sinal, decimal com vírgula)
function ofxToLines(text) {
  const blocks = text.match(/<STMTTRN>[\s\S]*?(?:<\/STMTTRN>|(?=<STMTTRN>))/gi) || [];
  const lines = [];
  blocks.forEach(b => {
   const g = (tag) => { const m = b.match(new RegExp("<" + tag + ">([^<\\r\\n]*)",
"i")); return m ? m[1].trim() : ""; };
   const dt = g("DTPOSTED").slice(0, 8);
   const amtRaw = g("TRNAMT");
   const memo = g("MEMO") || g("NAME") || "";
   if (dt.length !== 8 || !amtRaw) return;
   const amt = parseFloat(amtRaw.replace(",", "."));
   if (!Number.isFinite(amt) || amt === 0) return;
   const dateBR = `${dt.slice(6, 8)}/${dt.slice(4, 6)}/${dt.slice(0, 4)}`;
   const valueBR = `${amt < 0 ? "-" : ""}${Math.abs(amt).toFixed(2).replace(".", ",")}`;
   lines.push(`${dateBR} ${valueBR} ${memo}`.trim());
  });
  return lines;
}

// Converte um CSV (separador ; , ou tab; datas DD/MM/AAAA ou AAAA-MM-DD) em linhas "DD/MM/AAAA valor descrição"
function csvToLines(text) {
  const lines = [];
  text.split(/\r?\n/).forEach(raw => {
   const line = raw.trim();
   if (!line) return;
   const sep = line.includes(";") ? ";" : line.includes("\t") ? "\t" : ",";
   const parts = line.split(sep).map(p => p.trim().replace(/^"|"$/g, ""));
   let dateBR = null, value = null;
   const descParts = [];
   parts.forEach(p => {
     if (!dateBR && /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(p)) { dateBR = p; return; }
     if (!dateBR && /^\d{4}-\d{2}-\d{2}/.test(p)) { const [y, m, d] = p.slice(0,
10).split("-"); dateBR = `${d}/${m}/${y}`; return; }
     if (value === null && /^-?[\d.,]+$/.test(p) && /\d/.test(p)) {
       let v = p;
       if (v.includes(".") && v.includes(",")) v = v.replace(/\./g, "");    // 1.234,56 → 1234,56
        else if (v.includes(".") && !v.includes(",")) v = v.replace(".", ","); // 45.90 → 45,90
        const n = parseFloat(v.replace(",", "."));
        if (Number.isFinite(n) && n !== 0) { value = v; return; }
      }
      descParts.push(p);
   });
   if (dateBR && value !== null) lines.push(`${dateBR} ${value} ${descParts.join("").trim()}`.trim());
  });
  return lines;
}

// ---------- Novos Lançamentos ----------
function NovoLancamento({ state, setState, onBack, showToast }) {
  const [kind, setKind] = useState("entrada");
  const [accountId, setAccountId] = useState(state.accounts[0]?.id || "");
  const [cardId, setCardId] = useState(state.cards[0]?.id || "");
  const catsForKind = (k) => state.categories.filter(c => !c.system && (!c.kinds ||
c.kinds.includes(k)));
  const [categoryId, setCategoryId] = useState(catsForKind("entrada")[0]?.id ||
state.categories[0]?.id);
  const [subcategoryId, setSubcategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(todayISO());
  const [description, setDescription] = useState("");
  const [bulkText, setBulkText] = useState("");
  const [showBulk, setShowBulk] = useState(false);
  const [repeatMode, setRepeatMode] = useState("none"); // none | installments | recurring
  const [installmentsCount, setInstallmentsCount] = useState("");
  const [occurrences, setOccurrences] = useState("");
  const [fromId, setFromId] = useState(state.accounts[0]?.id || "");
  const [toId, setToId] = useState(state.accounts[1]?.id || "");
  const availableCats = catsForKind(kind);

 const blocked = kind === "transfer" ? state.accounts.length < 2
   : (kind === "entrada" || kind === "saida") ? state.accounts.length === 0
   : state.cards.length === 0;
 const catLabel = state.categories.find(c => c.id === categoryId)?.label ||
"Lançamento";
 const accName = (id) => { const a = state.accounts.find(x => x.id === id); return a ?
(a.nickname || a.bank) : ""; };

 const changeKind = (k) => {
  setKind(k);
   if ((k === "entrada" || k === "transfer") && repeatMode === "installments")
setRepeatMode("none");
   if (k === "transfer") { setRepeatMode("none"); return; }
   const valid = catsForKind(k);
   if (!valid.some(c => c.id === categoryId)) { setCategoryId(valid[0]?.id || ""); setSubcategoryId(""); }
 };

 const addTransfer = () => {
   const value = parseBRNumber(amount);
   if (blocked) return;
   if (value <= 0) { showToast("Digite um valor maior que zero"); return; }
   if (!fromId || !toId || fromId === toId) { showToast("Escolha duas contas diferentes"); return; }
   const groupId = uid();
   const txs = [
     { id: uid(), kind: "saida", accountId: fromId, cardId: null, categoryId:
"transferencia", amount: value, date, description: description || `Transferência para
${accName(toId)}`, transferGroupId: groupId },
     { id: uid(), kind: "entrada", accountId: toId, cardId: null, categoryId:
"transferencia", amount: value, date, description: description || `Transferência de ${accName(fromId)}`, transferGroupId: groupId },
   ];
   setState({ ...state, transactions: [...state.transactions, ...txs] });
   showToast(`Transferência de ${currency(value)} registrada`);
   setAmount(""); setDescription("");
 };

 const addTransaction = () => {
  const value = parseBRNumber(amount);
  if (blocked) return;
  if (value <= 0) { showToast("Digite um valor maior que zero"); return; }
  const baseAccountId = kind !== "cartao" ? accountId : null;
  const baseCardId = kind === "cartao" ? cardId : null;

  if (repeatMode === "installments" && kind !== "entrada") {
    const n = parseInt(installmentsCount || "0", 10);
    if (!n || n < 2) { showToast("Digite o número de parcelas (mínimo 2)"); return; }
    const totalCents = Math.round(value * 100);
    const baseCents = Math.floor(totalCents / n);
    const remainder = totalCents - baseCents * n;
    const groupId = uid();
    const parcels = [];
    for (let i = 1; i <= n; i++) {
      const cents = i === 1 ? baseCents + remainder : baseCents;
      parcels.push({
       id: uid(), kind, accountId: baseAccountId, cardId: baseCardId, categoryId, subcategoryId: subcategoryId || undefined,
        amount: cents / 100, date: addMonthsSafe(date, i - 1),
        description: `${description || catLabel} (${i}/${n})`,
        installmentGroupId: groupId, installmentIndex: i, installmentTotal: n,
       });
      }
      setState({ ...state, transactions: [...state.transactions, ...parcels] });
      showToast(`Parcelado em ${n}x de ${currency(baseCents / 100)}`);
      setAmount(""); setDescription("");
      return;
  }

   if (repeatMode === "recurring") {
     const ruleId = uid();
     const day = parseInt(date.split("-")[2], 10);
     const n = parseInt(occurrences || "0", 10);
     const rule = { id: ruleId, kind, accountId: baseAccountId, cardId: baseCardId,
categoryId, subcategoryId: subcategoryId || undefined, amount: value, description: description || catLabel, dayOfMonth: day,
active: true, totalOccurrences: n >= 2 ? n : null };
     let newTxs;
     if (n >= 2) {
       newTxs = Array.from({ length: n }).map((_, i) => ({
         id: uid(), kind, accountId: baseAccountId, cardId: baseCardId, categoryId, subcategoryId: subcategoryId || undefined,
amount: value,
         date: addMonthsSafe(date, i), description: description || undefined, recurringId:
ruleId,
       }));
       showToast(`Criado — ${n}x de ${currency(value)}`);
     } else {
       newTxs = [{ id: uid(), kind, accountId: baseAccountId, cardId: baseCardId,
categoryId, subcategoryId: subcategoryId || undefined, amount: value, date, description: description || undefined, recurringId:
ruleId }];
       showToast("Lançamento recorrente criado — vai se repetir todo mês");
     }
     setState({ ...state, transactions: [...state.transactions, ...newTxs], recurring: [...
(state.recurring || []), rule] });
     setAmount(""); setDescription(""); setOccurrences("");
     return;
   }

  const tx = { id: uid(), kind, accountId: baseAccountId, cardId: baseCardId,
categoryId, subcategoryId: subcategoryId || undefined, amount: value, date, description: description || undefined };
  setState({ ...state, transactions: [...state.transactions, tx] });
  showToast(`${kind === "entrada" ? "Entrada" : kind === "saida" ? "Saída" :
"Lançamento"} de ${currency(value)} salva`);
  setAmount(""); setDescription(""); setSubcategoryId("");
 };

 const importBulk = () => {
  if (blocked) return;
  const lines = bulkText.split("\n").map(l => l.trim()).filter(Boolean);
  const parsed = [];
  let unrecognized = 0;
  lines.forEach(line => {
    const m = line.match(/^(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)\s+(-?[\d.,]+)\s*(.*)$/);
    if (!m) { unrecognized += 1; return; }
    const [, dateStr, valStr, desc] = m;
    const parts = dateStr.split("/");
    const year = parts[2] ? (parts[2].length === 2 ? "20" + parts[2] : parts[2]) :
String(new Date().getFullYear());
    const isoDate = `${year}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2,
"0")}`;
    const negative = valStr.trim().startsWith("-");
    const value = Math.abs(parseBRNumber(valStr));
    if (value <= 0) { unrecognized += 1; return; }
    parsed.push({ isoDate, value, negative, desc: desc.trim() });
  });

   const anyNegative = parsed.some(p => p.negative);
   const added = [];
   let skippedPayments = 0, nEntradas = 0, nSaidas = 0;
   parsed.forEach(p => {
     let txKind;
     if (kind === "cartao") {
       if (p.negative || !anyNegative) txKind = "cartao";
       else { skippedPayments += 1; return; } // positivo num extrato com sinais = pagamento/estorno da fatura
     } else {
       txKind = anyNegative ? (p.negative ? "saida" : "entrada") : kind;
     }
     const guessed = guessCategory(p.desc, txKind);
     const selectedValid = state.categories.find(c => c.id === categoryId && !
c.system && (!c.kinds || c.kinds.includes(txKind)));
     const catId = guessed || (selectedValid ? categoryId : "outros");
     const dup = state.transactions.some(t => t.date === p.isoDate && t.amount ===
p.value && (t.description || "") === p.desc);
     if (dup) return;
     if (txKind === "entrada") nEntradas += 1; else nSaidas += 1;
     added.push({ id: uid(), kind: txKind, accountId: txKind !== "cartao" ? accountId :
null, cardId: txKind === "cartao" ? cardId : null, categoryId: catId, amount: p.value,
date: p.isoDate, description: p.desc || undefined });
  });

    if (added.length) {
      setState({ ...state, transactions: [...state.transactions, ...added] });
      const bits = [`${added.length} importado(s)`];
      if (kind !== "cartao" && anyNegative) bits.push(`${nEntradas} entrada(s), ${nSaidas} saída(s)`);
      if (skippedPayments) bits.push(`${skippedPayments} pagamento(s)/estorno(s)
ignorado(s)`);
      if (unrecognized) bits.push(`${unrecognized} linha(s) não reconhecida(s)`);
      showToast(bits.join(" · "));
      setBulkText(""); setShowBulk(false);
    } else showToast(unrecognized ? "Nenhuma linha reconhecida — confira o formato" : "Nada novo para importar");
  };

 const onBulkFile = (e) => {
   const file = e.target.files?.[0];
   e.target.value = "";
   if (!file) return;
   const reader = new FileReader();
   reader.onload = () => {
     const text = String(reader.result || "");
     const lines = /<STMTTRN>/i.test(text) ? ofxToLines(text) : csvToLines(text);
     if (lines.length === 0) { showToast("Não reconheci lançamentos nesse arquivo"); return; }
     setBulkText(lines.join("\n"));
     setShowBulk(true);
     showToast(`${lines.length} lançamento(s) lidos — revise e toque em Importar`);
   };
   reader.readAsText(file);
 };

 return (
  <div>
   <ScreenHeader title="Novos Lançamentos" color={COLORS.teal}
onBack={onBack} />
   <div style={{ display: "flex", background: COLORS.surface, borderRadius: 14,
padding: 4, border: `1px solid ${COLORS.border}`, marginBottom: 16 }}>
     {[{ id: "entrada", label: "Entrada", color: COLORS.positive }, { id: "saida", label: "Saída", color: COLORS.negative }, { id: "cartao", label: "Cartão", color: COLORS.cartao }, { id: "transfer", label: "Transferir", color: COLORS.blue }].map(opt => (
      <button key={opt.id} onClick={() => changeKind(opt.id)} style={{ flex: 1,
padding: "9px 0", borderRadius: 11, border: "none", cursor: "pointer", background:
kind === opt.id ? `${opt.color}25` : "transparent", color: kind === opt.id ? opt.color :
COLORS.textMuted, fontWeight: 600, fontSize: 12.5 }}>{opt.label}</button>
     ))}
   </div>

     {blocked ? (
       <div style={{ textAlign: "center", padding: "24px 12px", color:
COLORS.textMuted, fontSize: 13, lineHeight: 1.5 }}>
         {kind === "transfer"
          ? "Cadastre pelo menos duas contas para registrar transferências entre elas."
          : `Você ainda não cadastrou ${kind === "cartao" ? "nenhum cartão" :
"nenhuma conta"}. Volte e cadastre em "${kind === "cartao" ? "Cartões" :
"Contas"}" na tela inicial.`}
       </div>
     ) : kind === "transfer" ? (
       <>
         <label style={labelStyle}>Da conta</label>
         <select value={fromId} onChange={e => { setFromId(e.target.value); if
(e.target.value === toId) setToId(state.accounts.find(a => a.id !== e.target.value)?.id
|| ""); }} style={selectStyle}>
          {state.accounts.map(a => <option key={a.id} value={a.id}>{a.nickname ||
a.bank}</option>)}
         </select>
         <label style={labelStyle}>Para a conta</label>
         <select value={toId} onChange={e => setToId(e.target.value)}
style={selectStyle}>
          {state.accounts.filter(a => a.id !== fromId).map(a => <option key={a.id}
value={a.id}>{a.nickname || a.bank}</option>)}
         </select>
         <label style={labelStyle}>Valor</label>
         <AmountInput value={amount} onChange={setAmount} placeholder="0,00" />
         <label style={labelStyle}>Data</label>
         <DateInput value={date} onChange={setDate} />
         <label style={labelStyle}>Descrição (opcional)</label>
         <input value={description} onChange={e => setDescription(e.target.value)}
placeholder="Ex: guardando na reserva" style={inputStyle} />
         <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginTop: 10,
lineHeight: 1.4, background: COLORS.surface2, borderRadius: 10, padding: 10 }}>
          A transferência movimenta as duas contas, mas não conta como gasto nem
como entrada nas análises — o dinheiro só mudou de lugar.
         </div>
         <button onClick={addTransfer} style={{ width: "100%", marginTop: 18, padding:
"13px 0", borderRadius: 14, border: "none", background: COLORS.blue, color:
"#06101F", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Registrar
transferência</button>
     </>
    ):(
     <>
      {kind !== "cartao" ? (
        <>
         <label style={labelStyle}>Conta</label>
         <select value={accountId} onChange={e => setAccountId(e.target.value)}
style={selectStyle}>
          {state.accounts.map(a => <option key={a.id} value={a.id}>{a.nickname ||
a.bank}</option>)}
         </select>
        </>
      ):(
        <>
         <label style={labelStyle}>Cartão</label>
         <select value={cardId} onChange={e => setCardId(e.target.value)}
style={selectStyle}>
          {state.cards.map(c => <option key={c.id} value={c.id}>{c.nickname ||
c.cardLabel}</option>)}
         </select>
        </>
      )}

      <label style={labelStyle}>Como é esse lançamento?</label>
      <div style={{ display: "flex", gap: 6 }}>
        <button onClick={() => setRepeatMode("none")}
style={repeatModeBtn(repeatMode === "none")}>Única</button>
        {kind !== "entrada" && <button onClick={() =>
setRepeatMode("installments")} style={repeatModeBtn(repeatMode ===
"installments")}>Parcelada</button>}
        <button onClick={() => setRepeatMode("recurring")}
style={repeatModeBtn(repeatMode === "recurring")}>Recorrente</button>
      </div>

      {repeatMode === "installments" ? (
       <>
         <label style={labelStyle}>Valor total da compra</label>
         <AmountInput value={amount} onChange={setAmount} placeholder="0,00" />
         <label style={labelStyle}>Número de parcelas</label>
         <input value={installmentsCount} onChange={e =>
setInstallmentsCount(e.target.value.replace(/\D/g, ""))} inputMode="numeric" onFocus={e => e.target.select()}
placeholder="2" style={inputStyle} />
         {parseBRNumber(amount) > 0 && parseInt(installmentsCount || "0", 10) >= 2
&& (
          <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginTop: 6 }}>
            {installmentsCount}x de {currency(parseBRNumber(amount) /
parseInt(installmentsCount, 10))} — a primeira em {new Date(date +
"T00:00:00").toLocaleDateString("pt-BR")}
          </div>
         )}
       </>
      ):(
       <>
         <label style={labelStyle}>Valor {repeatMode === "recurring" ? "(por vez)" :
""}</label>
         <AmountInput value={amount} onChange={setAmount} placeholder="0,00" />
         {repeatMode === "recurring" && (
          <>
            <label style={labelStyle}>Número de vezes (opcional)</label>
            <input value={occurrences} onChange={e =>
setOccurrences(e.target.value.replace(/\D/g, ""))} inputMode="numeric" onFocus={e => e.target.select()}
placeholder="Deixe em branco pra repetir sem parar" style={inputStyle} />
          </>
         )}
       </>
      )}

       <label style={labelStyle}>Categoria</label>
       <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
         {availableCats.map(cat => {
          const Icon = ICONS[cat.icon] || MoreHorizontal;
          const active = categoryId === cat.id;
          return (
            <button key={cat.id} onClick={() => { setCategoryId(cat.id); setSubcategoryId(""); }} style={{ display:
"flex", flexDirection: "column", alignItems: "center", gap: 4, width: 88, flexShrink: 0, padding:
"8px 3px", borderRadius: 12, cursor: "pointer", border: `1px solid ${active ?
cat.color : COLORS.border}`, background: active ? `${cat.color}20` :
COLORS.surface }}>
             <Icon size={16} color={cat.color} />
             <span style={{ fontSize: 10.5, color: COLORS.textMuted, textAlign:
"center", lineHeight: 1.25, wordBreak: "normal", overflowWrap: "normal", width: "100%" }}>{cat.label}</span>
            </button>
          );
         })}
       </div>
       {(() => {
         const catObj = state.categories.find(c => c.id === categoryId);
         if (!catObj?.subcategories?.length) return null;
         return (
          <>
            <label style={labelStyle}>Subcategoria (opcional)</label>
            <select value={subcategoryId} onChange={e => setSubcategoryId(e.target.value)} style={selectStyle}>
              <option value="">Nenhuma</option>
              {catObj.subcategories.map(sc => <option key={sc.id} value={sc.id}>{sc.label}</option>)}
            </select>
          </>
         );
       })()}
      <label style={labelStyle}>{repeatMode === "installments" ? "Data da 1ª parcela" : "Data"}</label>
      <DateInput value={date} onChange={setDate} />
      <label style={labelStyle}>Descrição (opcional)</label>
      <input value={description} onChange={e => setDescription(e.target.value)}
placeholder="Ex: mercado, ifood…" style={inputStyle} />

      {repeatMode === "recurring" && (
       <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginTop: 10,
lineHeight: 1.4, background: COLORS.surface2, borderRadius: 10, padding: 10 }}>
         {parseInt(occurrences || "0", 10) >= 2
          ? `Já lança as ${occurrences} vezes de uma vez, uma por mês a partir
de ${new Date(date + "T00:00:00").toLocaleDateString("pt-BR")}.`
          : `Vai lançar hoje e se repetir automaticamente todo mês (no dia ${date.split("-")[2]}) sempre que você abrir o app, até você cancelar.`}
       </div>
      )}

      <button onClick={addTransaction} style={{ width: "100%", marginTop: 18,
padding: "13px 0", borderRadius: 14, border: "none", background: COLORS.teal,
color: "#04140C", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
        {repeatMode === "installments" ? "Salvar compra parcelada" : repeatMode
=== "recurring" ? "Salvar recorrência" : "Salvar lançamento"}
      </button>
      {repeatMode === "none" && (
        <button onClick={() => setShowBulk(v => !v)} style={{ width: "100%",
marginTop: 10, padding: "11px 0", borderRadius: 14, border: `1px solid ${COLORS.border}`, background: "transparent", color: COLORS.textMuted, fontSize:
13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
gap: 6 }}><Clipboard size={14} /> Importar em lote</button>
      )}

      {showBulk && repeatMode === "none" && (
       <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginBottom: 6,
lineHeight: 1.45 }}>
         Uma linha por lançamento — formato: DD/MM valor descrição. Valores
negativos viram saídas e positivos viram entradas; a categoria é detectada pela
descrição quando possível. Ou importe direto o arquivo do banco:
        </div>
        <input type="file" accept=".csv,.ofx,.txt,text/csv" onChange={onBulkFile}
id="bulk-file-input" style={{ display: "none" }} />
        <label htmlFor="bulk-file-input" style={{ display: "flex", alignItems: "center",
justifyContent: "center", gap: 6, width: "100%", boxSizing: "border-box", padding:
"10px 0", borderRadius: 12, border: `1px dashed ${COLORS.border}`, background:
"transparent", color: COLORS.textMuted, fontSize: 12.5, fontWeight: 600, cursor:
"pointer", marginBottom: 8 }}>
            <Download size={13} /> Carregar arquivo do banco (.csv ou .ofx)
           </label>
           <textarea value={bulkText} onChange={e => setBulkText(e.target.value)}
placeholder={"12/07 45,90 ifood\n13/07 -120,00 posto"} style={{ ...inputStyle,
minHeight: 100, resize: "vertical" }} />
           <button onClick={importBulk} style={{ width: "100%", marginTop: 8, padding:
"10px 0", borderRadius: 12, border: "none", background: COLORS.surface2, color:
COLORS.textPrimary, fontWeight: 600, cursor: "pointer" }}>Importar</button>
         </div>
        )}
      </>
     )}
    </div>
  );
}
function repeatModeBtn(active) {
  return { flex: 1, padding: "9px 0", borderRadius: 11, cursor: "pointer", border: `1px
solid ${active ? COLORS.teal : COLORS.border}`, background: active ? `${COLORS.teal}20` : COLORS.surface, color: active ? COLORS.teal :
COLORS.textMuted, fontSize: 12.5, fontWeight: 600 };
}

// ---------- Lista de transações ----------
function stripAccents(s) { return s.normalize("NFD").replace(/[\u0300-\u036f]/g,
""); }
function txMatches(t, categories, q) {
  const needle = stripAccents(q.trim().toLowerCase());
  if (!needle) return true;
  const cat = categories.find(c => c.id === t.categoryId);
  const hay = stripAccents([
    t.description || "", cat?.label || "", String(t.amount),
    t.amount.toFixed(2).replace(".", ","),
    new Date(t.date + "T00:00:00").toLocaleDateString("pt-BR"),
  ].join(" ").toLowerCase());
  return hay.includes(needle);
}

// Aplica uma edição a um lançamento; opcionalmente propaga valor/categoria (e descrição) às parcelas/ocorrências seguintes
function applyTransactionEdit(state, tx, edits, applyToRest) {
  const isInstallment = !!tx.installmentGroupId;
  const isRecurring = !!tx.recurringId;
  const isTransfer = !!tx.transferGroupId;
  const next = state.transactions.map(t => {
    const isThis = t.id === tx.id;
    const isPair = isTransfer && t.transferGroupId === tx.transferGroupId && t.id !==
tx.id;
    const isFutureSibling = applyToRest && (
      (isInstallment && t.installmentGroupId === tx.installmentGroupId &&
t.installmentIndex > tx.installmentIndex) ||
      (isRecurring && t.recurringId === tx.recurringId && t.date > tx.date)
    );
    if (isPair) return { ...t, amount: edits.amount, date: edits.date };
    if (!isThis && !isFutureSibling) return t;
    const base = { ...t, amount: edits.amount, categoryId: edits.categoryId };
    if (isThis) { base.date = edits.date; base.description = edits.description ||
undefined; }
    else if (edits.description) { base.description = isInstallment ? `${edits.description}
(${t.installmentIndex}/${t.installmentTotal})` : edits.description; }
    return base;
  });
  // Mantém a regra da recorrência coerente para os meses que ainda serão gerados
  const nextRecurring = (isRecurring && applyToRest)
    ? (state.recurring || []).map(r => r.id === tx.recurringId ? { ...r, amount:
edits.amount, categoryId: edits.categoryId, description: edits.description ||
r.description } : r)
    : state.recurring;
  return { ...state, transactions: next, recurring: nextRecurring };
}

const rowIconBtn = { background: "none", border: "none", cursor: "pointer", color:
COLORS.textMuted, padding: 8, margin: -8, display: "flex", alignItems: "center",
justifyContent: "center" };

function TransactionRow({ tx, categories, state, setState }) {
 const [mode, setMode] = useState(null); // null | 'confirm' | 'choose' | 'edit'
 const [eAmount, setEAmount] = useState("");
 const [eDate, setEDate] = useState("");
 const [eDesc, setEDesc] = useState("");
 const [eCat, setECat] = useState("");
 const [applyToRest, setApplyToRest] = useState(false);
 const cat = categories.find(c => c.id === tx.categoryId) ||
categories[categories.length - 1];
 const Icon = ICONS[cat?.icon] || MoreHorizontal;
 const isPositive = tx.kind === "entrada";
 const isInstallment = !!tx.installmentGroupId;
 const isRecurring = !!tx.recurringId;
 const isTransfer = !!tx.transferGroupId;
 const editableCats = categories.filter(c => !c.system && (!c.kinds ||
c.kinds.includes(tx.kind)));

 const startEdit = () => {
   setEAmount(String(tx.amount).replace(".", ","));
   setEDate(tx.date);
   setEDesc(tx.description || "");
   setECat(tx.categoryId);
   setApplyToRest(false);
   setMode("edit");
 };

 const saveEdit = () => {
   const value = parseBRNumber(eAmount);
   if (value <= 0 || !eDate) return;
   setState(applyTransactionEdit(state, tx, { amount: value, categoryId: eCat, date:
eDate, description: eDesc }, applyToRest));
   setMode(null);
 };

  const deleteJustThis = () => setState({ ...state, transactions:
state.transactions.filter(t => isTransfer ? t.transferGroupId !== tx.transferGroupId :
t.id !== tx.id) });
  const deleteRemainingInstallments = () => setState({
   ...state,
   transactions: state.transactions.filter(t => !(t.installmentGroupId ===
tx.installmentGroupId && t.installmentIndex >= tx.installmentIndex)),
  });
  const cancelRecurring = () => setState({
   ...state,
   recurring: (state.recurring || []).map(r => r.id === tx.recurringId ? { ...r, active:
false } : r),
   transactions: state.transactions.filter(t => !(t.recurringId === tx.recurringId &&
t.date >= tx.date)),
  });

 const subcat = cat?.subcategories?.find(sc => sc.id === tx.subcategoryId);
 const subtitle = [
   new Date(tx.date + "T00:00:00").toLocaleDateString("pt-BR"),
   subcat ? subcat.label : null,
   isInstallment ? `parcela ${tx.installmentIndex}/${tx.installmentTotal}` : null,
   isRecurring ? "recorrente" : null,
   isTransfer ? "transferência" : null,
 ].filter(Boolean).join(" · ");
  if (mode === "edit") {
    return (
      <div style={{ padding: "12px 0", borderBottom: `1px solid ${COLORS.border}` }}>
       <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted,
marginBottom: 4 }}>Editando lançamento</div>
       <div style={{ display: "flex", gap: 8 }}>
         <div style={{ flex: 1 }}>
          <label style={labelStyle}>Valor</label>
          <AmountInput value={eAmount} onChange={setEAmount} placeholder="0,00" />
         </div>
         <div style={{ flex: 1.2 }}>
          <label style={labelStyle}>Data</label>
          <DateInput value={eDate} onChange={setEDate} />
         </div>
       </div>
       {!isTransfer && (
         <>
          <label style={labelStyle}>Categoria</label>
          <select value={eCat} onChange={e => setECat(e.target.value)}
style={selectStyle}>
            {editableCats.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
         </>
       )}
       <label style={labelStyle}>Descrição</label>
       <input value={eDesc} onChange={e => setEDesc(e.target.value)}
placeholder={cat?.label} style={inputStyle} />
       {isTransfer && (
         <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginTop: 10 }}>Valor e
data atualizam os dois lados da transferência.</div>
       )}
       {(isInstallment || isRecurring) && (
         <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12,
fontSize: 12.5, color: COLORS.textPrimary, cursor: "pointer" }}>
          <input type="checkbox" checked={applyToRest} onChange={e =>
setApplyToRest(e.target.checked)} style={{ width: 16, height: 16, accentColor:
COLORS.teal }} />
          Aplicar valor e categoria também às {isInstallment ? "parcelas seguintes" :
"próximas ocorrências"}
         </label>
       )}
       <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
       <button onClick={saveEdit} style={{ ...saveBtnStyle(COLORS.teal), marginTop:
0, flex: 1, padding: "10px 0", fontSize: 13 }}>Salvar</button>
       <button onClick={() => setMode(null)}
style={{ ...saveBtnStyle(COLORS.surface2), marginTop: 0, flex: 1, padding: "10px 0",
fontSize: 13 }}>Cancelar</button>
      </div>
     </div>
   );
 }

  return (
   <div style={{ padding: "11px 0", borderBottom: `1px solid ${COLORS.border}` }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div onClick={startEdit} style={{ display: "flex", alignItems: "center", gap: 10,
minWidth: 0, cursor: "pointer", flex: 1 }}>
       <div style={{ width: 34, height: 34, borderRadius: 10, background: `${cat?.color}22`, display: "flex", alignItems: "center", justifyContent: "center",
flexShrink: 0 }}><Icon size={15} color={cat?.color} /></div>
       <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 500, overflow: "hidden",
textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tx.description || cat?.label}</div>
        <div style={{ fontSize: 11, color: COLORS.textMuted }}>{subtitle}</div>
       </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
       <div style={{ fontFamily: FONT_MONO, fontSize: 14, fontWeight: 500, color:
isPositive ? COLORS.positive : COLORS.textPrimary }}>{isPositive ? "+" : "-"}
{currency(tx.amount)}</div>
       {mode === "confirm" ? (
        <ConfirmDelete onConfirm={deleteJustThis} onCancel={() => setMode(null)} /
>
       ):(
        <>
          <button onClick={startEdit} style={rowIconBtn} aria-label="Editar"><Pencil
size={14} /></button>
          <button onClick={() => setMode(isInstallment || isRecurring ? "choose" :
"confirm")} style={rowIconBtn} aria-label="Excluir"><Trash2 size={15} /></button>
        </>
       )}
      </div>
    </div>
    {mode === "choose" && (
      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
       <button onClick={deleteJustThis} style={smallActionBtn}>{isInstallment ? "Sóessa parcela" : "Só esse mês"}</button>
        <button onClick={isInstallment ? deleteRemainingInstallments :
cancelRecurring} style={smallActionBtn}>{isInstallment ? "Essa e as restantes" :
"Cancelar recorrência"}</button>
        <button onClick={() => setMode(null)}
style={iconBtnStyle(COLORS.textMuted)}><X size={14} /></button>
      </div>
     )}
    </div>
  );
}
const smallActionBtn = { flex: 1, padding: "8px 6px", borderRadius: 10, border: `1px
solid ${COLORS.border}`, background: COLORS.surface2, color:
COLORS.textPrimary, fontSize: 11.5, fontWeight: 600, cursor: "pointer" };

// ---------- Detalhe de conta ----------
function AccountScreen({ id, state, setState, totals, go }) {
  const acc = state.accounts.find(a => a.id === id);
  const entries = useMemo(() => state.transactions.filter(t => t.accountId ===
id).sort((a, b) => (a.date < b.date ? 1 : -1)), [state.transactions, id]);
  const [expanded, setExpanded] = useState(new Set());
  const [query, setQuery] = useState("");
  const [showFuture, setShowFuture] = useState(false);
  const [showPeriod, setShowPeriod] = useState(false);
  if (!acc) return null;
  const searching = query.trim().length > 0;
  const results = searching ? entries.filter(t => txMatches(t, state.categories, query)) :
[];

 const curMonthKey = todayISO().slice(0, 7);
 const groupsMap = {};
 entries.forEach(t => {
   const key = t.date.slice(0, 7);
   if (!groupsMap[key]) groupsMap[key] = [];
   groupsMap[key].push(t);
 });
 const allKeys = Object.keys(groupsMap);
 const futureKeys = allKeys.filter(k => k > curMonthKey).sort();
 const futureCount = futureKeys.reduce((s, k) => s + groupsMap[k].length, 0);
 // Mês atual sempre primeiro e em destaque; meses passados (mais recentes primeiro)
 // ficam recolhidos. Lançamentos futuros saíram daqui — têm janela própria (ver botão acima).
 const pastKeys = allKeys.filter(k => k < curMonthKey).sort().reverse();
 const orderedKeys = [curMonthKey, ...pastKeys].filter(k => groupsMap[k]);
 const toggle = (k) => setExpanded(prev => { const next = new Set(prev);
next.has(k) ? next.delete(k) : next.add(k); return next; });

 return (
   <div>
    <ScreenHeader title={acc.nickname || acc.bank} color={acc.color} onBack={() =>
go("home")} onEdit={() => go("accountForm", id)} />
    <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}
`, borderRadius: 18, padding: 16, marginBottom: 14 }}>
     <div style={{ fontSize: 12, color: COLORS.textMuted }}>{acc.bank} {acc.agencia
&& `· Ag. ${acc.agencia}`} {acc.conta && `· Cc ${acc.conta}`}</div>
     <div style={{ fontFamily: FONT_MONO, fontSize: 26, fontWeight: 500,
marginTop: 4 }}>{currency(totals.accountBalances[id] || 0)}</div>
     <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginTop: 2 }}>Saldo
Atual</div>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
     <button onClick={() => setShowFuture(true)} style={{ width: "100%", display: "flex",
alignItems: "center", justifyContent: "space-between", padding: "12px 14px",
borderRadius: 14, border: `1px solid ${acc.color}55`, background: `${acc.color}15`,
color: acc.color, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
      <span>📅 Ver lançamentos futuros {futureCount > 0 ? `(${futureCount})` : ""}</span>
      <ChevronRight size={16} />
     </button>
     <button onClick={() => setShowPeriod(true)} style={{ width: "100%", display: "flex",
alignItems: "center", justifyContent: "space-between", padding: "12px 14px",
borderRadius: 14, border: `1px solid ${COLORS.border}`, background: COLORS.surface,
color: COLORS.textPrimary, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
      <span>Entradas e saídas por período</span>
      <ChevronRight size={16} color={COLORS.textMuted} />
     </button>
    </div>
    {showFuture && <FutureTransactionsModal acc={acc} futureKeys={futureKeys}
groupsMap={groupsMap} state={state} setState={setState} onClose={() =>
setShowFuture(false)} />}
    {showPeriod && <PeriodStatsModal entries={entries} onClose={() =>
setShowPeriod(false)} />}
    {entries.length > 0 && (
     <input value={query} onChange={e => setQuery(e.target.value)}
placeholder="Buscar por descrição, categoria ou valor" style={{ ...inputStyle,
marginBottom: 12, fontSize: 13.5, padding: "10px 14px" }} />
    )}
    <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 4 }}
>{searching ? `${results.length} resultado${results.length === 1 ? "" : "s"}` :
"Movimentações"}</div>
    {entries.length === 0 && <div style={{ color: COLORS.textMuted, fontSize: 13,
padding: "20px 0" }}>Nenhum lançamento ainda.</div>}
    {searching && results.length === 0 && entries.length > 0 && (
     <div style={{ color: COLORS.textMuted, fontSize: 13, padding: "16px 0" }}>Nada
encontrado para "{query.trim()}".</div>
    )}
    {searching && results.map(tx => <TransactionRow key={tx.id} tx={tx}
categories={state.categories} state={state} setState={setState} />)}
    {!searching && orderedKeys.map(key => {
      const [y, m] = key.split("-");
      const isCurrent = key === curMonthKey;
      const isFuture = key > curMonthKey;
      const isExpanded = isCurrent || expanded.has(key);
      const monthTotal = groupsMap[key].reduce((s, t) => s + (t.kind === "entrada" ?
t.amount : -t.amount), 0);
      return (
       <div key={key}>
        {isCurrent ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0 6px" }}>
           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: acc.color }}
>{monthLabelFull(parseInt(m, 10) - 1)} de {y}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: acc.color, background:
`${acc.color}22`, borderRadius: 8, padding: "2px 7px" }}>MÊS ATUAL</span>
           </div>
           <span style={{ fontFamily: FONT_MONO, fontSize: 11.5, color: monthTotal
>= 0 ? COLORS.positive : COLORS.textMuted }}>{monthTotal >= 0 ? "+" : ""}
{currency(monthTotal)}</span>
          </div>
        ):(
          <>
           {key === pastKeys[0] && (
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 18,
marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.4 }}>Meses
anteriores</div>
           )}
           <button onClick={() => toggle(key)} style={{ width: "100%", display: "flex",
alignItems: "center", justifyContent: "space-between", background:
COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding:
"10px 12px", marginBottom: isExpanded ? 2 : 6, cursor: "pointer" }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color:
COLORS.textMuted }}>{monthLabelFull(parseInt(m, 10) - 1)} de {y}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 12.5, color:
monthTotal >= 0 ? COLORS.positive : COLORS.textMuted }}>{monthTotal >= 0 ? "+" :
""}{currency(monthTotal)}</span>
               <ChevronRight size={14} color={COLORS.textMuted} style={{ transform:
isExpanded ? "rotate(90deg)" : "none", transition: "transform 0.15s" }} />
             </span>
            </button>
           </>
         )}
         {isExpanded && (
           <div style={{ marginBottom: 14 }}>
            {groupsMap[key].map(tx => <TransactionRow key={tx.id} tx={tx}
categories={state.categories} state={state} setState={setState} />)}
           </div>
         )}
        </div>
      );
     })}
    </div>
  );
}

// ---------- Lançamentos futuros (janela separada, não mistura com o mês atual/meses anteriores) ----------
function FutureTransactionsModal({ acc, futureKeys, groupsMap, state, setState, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(20,20,15,0.45)",
zIndex: 1000, display: "flex", alignItems: "flex-end" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 480,
margin: "0 auto", maxHeight: "82vh", overflowY: "auto", background: COLORS.surface,
borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: "18px 16px 28px",
boxShadow: "0 -8px 30px rgba(20,20,15,0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16 }}
>Lançamentos futuros</div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 9,
background: COLORS.surface2, border: "none", display: "flex", alignItems: "center",
justifyContent: "center", cursor: "pointer" }}><X size={15} color={COLORS.textMuted} /></button>
        </div>
        <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginBottom: 16,
lineHeight: 1.4 }}>
         Parcelas e recorrências já lançadas pra meses adiante — não entram na
leitura do mês atual nem no saldo já consolidado.
        </div>
        {futureKeys.length === 0 && (
         <div style={{ textAlign: "center", color: COLORS.textMuted, fontSize: 13,
padding: "24px 0" }}>Nenhum lançamento futuro no momento.</div>
        )}
        {futureKeys.map(key => {
          const [y, m] = key.split("-");
          const monthTotal = groupsMap[key].reduce((s, t) => s + (t.kind === "entrada" ?
t.amount : -t.amount), 0);
          return (
           <div key={key} style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
             <span style={{ fontSize: 12.5, fontWeight: 700, color: acc.color }}
>{monthLabelFull(parseInt(m, 10) - 1)} de {y}</span>
             <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: monthTotal >= 0 ?
COLORS.positive : COLORS.textMuted }}>{monthTotal >= 0 ? "+" : ""}{currency(monthTotal)}</span>
            </div>
            {groupsMap[key].map(tx => <TransactionRow key={tx.id} tx={tx}
categories={state.categories} state={state} setState={setState} />)}
           </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Entradas e saídas por período (janela separada, com atalhos de intervalo) ----------
function PeriodStatsModal({ entries, onClose }) {
  const [preset, setPreset] = useState("30");
  const [customFrom, setCustomFrom] = useState(todayISO());
  const [customTo, setCustomTo] = useState(todayISO());

  const range = useMemo(() => {
    const today = todayISO();
    if (preset === "custom") return { from: customFrom, to: customTo };
    if (preset === "ano") return { from: `${today.slice(0, 4)}-01-01`, to: today };
    const days = parseInt(preset, 10);
    const d = new Date();
    d.setDate(d.getDate() - days);
    return { from: toLocalISO(d), to: today };
  }, [preset, customFrom, customTo]);

  const inRange = entries.filter(t => t.date >= range.from && t.date <= range.to);
  const entradas = inRange.filter(t => t.kind === "entrada").reduce((s, t) => s +
t.amount, 0);
  const saidas = inRange.filter(t => t.kind === "saida").reduce((s, t) => s + t.amount, 0);

  const presets = [
    { id: "30", label: "30 dias" },
    { id: "60", label: "60 dias" },
    { id: "90", label: "90 dias" },
    { id: "ano", label: "Este ano" },
    { id: "custom", label: "Personalizado" },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(20,20,15,0.45)",
zIndex: 1000, display: "flex", alignItems: "flex-end" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 480,
margin: "0 auto", background: COLORS.surface, borderTopLeftRadius: 22,
borderTopRightRadius: 22, padding: "18px 16px 28px", boxShadow: "0 -8px 30px rgba(20,20,15,0.25)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16 }}
>Entradas e saídas</div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 9,
background: COLORS.surface2, border: "none", display: "flex", alignItems: "center",
justifyContent: "center", cursor: "pointer" }}><X size={15} color={COLORS.textMuted} /></button>
        </div>
        <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 16,
paddingBottom: 2 }}>
         {presets.map(p => (
          <button key={p.id} onClick={() => setPreset(p.id)} style={{ padding: "8px 13px",
borderRadius: 20, border: `1px solid ${preset === p.id ? COLORS.teal :
COLORS.border}`, background: preset === p.id ? `${COLORS.teal}18` : COLORS.surface,
color: preset === p.id ? COLORS.teal : COLORS.textMuted, fontSize: 12.5,
fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}
>{p.label}</button>
         ))}
        </div>
        {preset === "custom" && (
         <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
           <label style={labelStyle}>De</label>
           <DateInput value={customFrom} onChange={setCustomFrom} />
          </div>
          <div style={{ flex: 1 }}>
           <label style={labelStyle}>Até</label>
           <DateInput value={customTo} onChange={setCustomTo} />
          </div>
         </div>
        )}
        <div style={{ background: COLORS.surface2, borderRadius: 14, padding: 14 }}>
         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 12.5, color: COLORS.textMuted }}>Entradas</span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 14, color: COLORS.positive }}
>{currency(entradas)}</span>
         </div>
         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 12.5, color: COLORS.textMuted }}>Saídas</span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 14, color: COLORS.negative }}
>{currency(saidas)}</span>
         </div>
         <div style={{ height: 1, background: COLORS.border, margin: "8px 0" }} />
         <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12.5, fontWeight: 600 }}>Saldo do período</span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 15, fontWeight: 700, color:
(entradas - saidas) >= 0 ? COLORS.positive : COLORS.negative }}
>{currency(entradas - saidas)}</span>
         </div>
        </div>
        <div style={{ fontSize: 10.5, color: COLORS.textMuted, marginTop: 10,
textAlign: "center" }}>{inRange.length} lançamento{inRange.length === 1 ? "" : "s"}
no período</div>
      </div>
    </div>
  );
}

// ---------- Detalhe de cartão ----------
function CardScreen({ id, state, setState, totals, go, showToast }) {
  const card = state.cards.find(c => c.id === id);
  const cardTx = useMemo(() => state.transactions.filter(t => t.cardId === id).sort((a,
b) => (a.date < b.date ? 1 : -1)), [state.transactions, id]);
  const [expanded, setExpanded] = useState(new Set());
  const [query, setQuery] = useState("");
  if (!card) return null;
  const searching = query.trim().length > 0;
  const results = searching ? cardTx.filter(t => txMatches(t, state.categories, query)) :
[];

  const usado = totals.cardTotals[id] || 0;
  const pct = card.limit > 0 ? Math.min(100, (usado / card.limit) * 100) : 0;
  const now = new Date();
  let due = new Date(now.getFullYear(), now.getMonth(), card.dueDay || 1);
  if (due < now) due = new Date(now.getFullYear(), now.getMonth() + 1, card.dueDay
|| 1);
  const daysToDue = Math.ceil((due - now) / 86400000);
  let closing = new Date(now.getFullYear(), now.getMonth(), card.closingDay || 1);
  if (closing < now) closing = new Date(now.getFullYear(), now.getMonth() + 1,
card.closingDay || 1);
  const daysToClose = Math.ceil((closing - now) / 86400000);
  // Agrupa por fatura (considerando o fechamento), não pelo mês do calendário
  const groups = {};
  cardTx.forEach(t => {
    const key = invoiceMonthOf(t.date, card.closingDay);
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
  });
  const paidByInvoice = {};
  state.transactions.forEach(t => {
    if (t.paidCardId !== id || !t.paidInvoice) return;
    paidByInvoice[t.paidInvoice] = (paidByInvoice[t.paidInvoice] || 0) + t.amount;
  });
  const openInvoice = totals.cardOpenInvoice?.[id];
  const allKeys = Object.keys(groups);
  // A fatura em aberto vem sempre primeiro e em destaque; futuras (mais próximas primeiro) e passadas (mais recentes primeiro) ficam recolhidas, sem atrapalhar a leitura do mês atual
  const futureKeys = allKeys.filter(k => k > openInvoice).sort();
  const pastKeys = allKeys.filter(k => k < openInvoice).sort().reverse();
  const orderedKeys = [openInvoice, ...futureKeys, ...pastKeys].filter(k => groups[k]);
  const toggle = (k) => setExpanded(prev => { const next = new Set(prev);
next.has(k) ? next.delete(k) : next.add(k); return next; });

 return (
  <div>
    <ScreenHeader title={card.nickname || card.cardLabel} color={card.color}
onBack={() => go("home")} onEdit={() => go("cardForm", id)} />
    <div style={{ background: `linear-gradient(135deg, ${card.color}22, ${COLORS.surface})`, border: `1px solid ${card.color}44`, borderRadius: 18, padding:
16, marginBottom: 18 }}>
     <div style={{ fontSize: 12, color: COLORS.textMuted }}>{card.institution} ·
{card.brand}</div>
     <div style={{ fontFamily: FONT_MONO, fontSize: 26, fontWeight: 500,
marginTop: 4 }}>{currency(usado)}</div>
     {card.limit > 0 && (
      <>
        <div style={{ height: 6, borderRadius: 6, background: COLORS.surface2,
marginTop: 12, overflow: "hidden" }}>
         <div style={{ width: `${pct}%`, height: "100%", background: card.color }} />
        </div>
        <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginTop: 6 }}
>{pct.toFixed(0)}% do limite de {currency(card.limit)}</div>
      </>
     )}
     <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 10, fontSize:
12, color: COLORS.textMuted }}>
      {card.closingDay > 0 && (
       <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Calendar
size={13} /> Fecha em {daysToClose} dia{daysToClose === 1 ? "" : "s"} (dia
{card.closingDay})</span>
      )}
      {card.dueDay > 0 && (
       <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Calendar
size={13} /> Vence em {daysToDue} dia{daysToDue === 1 ? "" : "s"} (dia
{card.dueDay})</span>
      )}
      {card.autoDebit && card.autoDebitAccountId && (
       <span style={{ display: "flex", alignItems: "center", gap: 6, color: card.color,
fontWeight: 600 }}><Repeat size={13} /> Débito automático — {(state.accounts.find(a =>
a.id === card.autoDebitAccountId)?.nickname) || (state.accounts.find(a => a.id ===
card.autoDebitAccountId)?.bank) || "conta"}</span>
      )}
     </div>
    </div>

   {cardTx.length > 0 && (
     <input value={query} onChange={e => setQuery(e.target.value)}
placeholder="Buscar por descrição, categoria ou valor" style={{ ...inputStyle,
marginBottom: 12, fontSize: 13.5, padding: "10px 14px" }} />
   )}
   {cardTx.length === 0 && <div style={{ color: COLORS.textMuted, fontSize: 13,
padding: "20px 0" }}>Nenhum lançamento ainda.</div>}
   {searching && (
     <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 4 }}
>{results.length} resultado{results.length === 1 ? "" : "s"}</div>
   )}
   {searching && results.length === 0 && cardTx.length > 0 && (
     <div style={{ color: COLORS.textMuted, fontSize: 13, padding: "16px 0" }}>Nada
encontrado para "{query.trim()}".</div>
   )}
   {searching && results.map(tx => <TransactionRow key={tx.id} tx={tx}
categories={state.categories} state={state} setState={setState} />)}
   {!searching && orderedKeys.map((key, idx) => {
     const [y, m] = key.split("-");
     const isOpen = key === openInvoice;
     const isFuture = key > openInvoice;
     const isExpanded = isOpen || expanded.has(key);
     const groupTotal = groups[key].reduce((s, t) => s + t.amount, 0);
     const paid = paidByInvoice[key] || 0;
     const fullyPaid = groupTotal > 0 && paid >= groupTotal - 0.009;
     return (
      <div key={key}>
       {isOpen ? (
         <div style={{ marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}
>
             <span style={{ fontSize: 14, fontWeight: 700, color: card.color }}>Fatura de
{monthLabel(parseInt(m, 10) - 1)}</span>
             <span style={{ fontSize: 10, fontWeight: 700, color: card.color,
background: `${card.color}22`, borderRadius: 8, padding: "2px 7px" }}>EM
ABERTO</span>
             {fullyPaid && <span style={{ fontSize: 10, fontWeight: 700, color:
COLORS.positive, background: `${COLORS.positive}22`, borderRadius: 8, padding:
"2px 7px" }}>PAGA</span>}
           </div>
           {!fullyPaid && paid > 0 && <div style={{ fontSize: 11, color:
COLORS.textMuted }}>Pago {currency(paid)} de {currency(groupTotal)}</div>}
          </div>
        ):(
          <>
           {key === futureKeys[0] && (
             <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 18,
marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.4 }}>Próximas
faturas</div>
           )}
           {key === pastKeys[0] && (
             <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 18,
marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.4 }}>Faturas
anteriores</div>
           )}
           <button onClick={() => toggle(key)} style={{ width: "100%", display: "flex",
alignItems: "center", justifyContent: "space-between", background:
COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding:
"10px 12px", marginBottom: isExpanded ? 2 : 6, cursor: "pointer" }}>
             <span style={{ fontSize: 12.5, fontWeight: 600, color: COLORS.textMuted,
display: "flex", alignItems: "center", gap: 6 }}>
              Fatura de {monthLabel(parseInt(m, 10) - 1)} {isFuture ? "(futura)" : ""}
              {fullyPaid && <span style={{ fontSize: 9.5, fontWeight: 700, color:
COLORS.positive, background: `${COLORS.positive}22`, borderRadius: 7, padding:
"1px 6px" }}>PAGA</span>}
             </span>
             <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 12.5, color:
COLORS.textMuted }}>{currency(groupTotal)}</span>
              <ChevronRight size={14} color={COLORS.textMuted} style={{ transform:
isExpanded ? "rotate(90deg)" : "none", transition: "transform 0.15s" }} />
             </span>
           </button>
          </>
        )}
        {isExpanded && (
          <div style={{ marginBottom: 14 }}>
            {groups[key].map(tx => <TransactionRow key={tx.id} tx={tx}
categories={state.categories} state={state} setState={setState} />)}
            {!isFuture && !fullyPaid && (
              <InvoicePayForm card={card} invoiceKey={key}
monthName={monthLabel(parseInt(m, 10) - 1)} remaining={Math.max(0, groupTotal -
paid)} state={state} setState={setState} showToast={showToast} />
            )}
          </div>
         )}
        </div>
      );
     })}
    </div>
  );
}

// ---------- Pagamento de fatura ----------
function InvoicePayForm({ card, invoiceKey, monthName, remaining, state, setState,
showToast }) {
  const [open, setOpen] = useState(false);
  const [accountId, setAccountId] = useState(state.accounts[0]?.id || "");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(todayISO());

 const openForm = () => {
   setAmount(remaining > 0 ? remaining.toFixed(2).replace(".", ",") : "");
   setDate(todayISO());
   setOpen(true);
 };
 const confirm = () => {
   const value = parseBRNumber(amount);
   if (state.accounts.length === 0) { showToast?.("Cadastre uma conta primeiro");
return; }
   if (value <= 0) { showToast?.("Digite um valor maior que zero"); return; }
   const tx = {
     id: uid(), kind: "saida", accountId, cardId: null, categoryId: "fatura_pagamento",
     amount: value, date, description: `Pagamento fatura ${card.nickname ||
card.cardLabel} (${monthName})`,
     paidCardId: card.id, paidInvoice: invoiceKey,
   };
   setState({ ...state, transactions: [...state.transactions, tx] });
   showToast?.("Pagamento registrado");
   setOpen(false);
 };
  if (!open) {
    return (
      <button onClick={openForm} style={{ width: "100%", marginTop: 8, padding: "9px 0", borderRadius: 10, border: `1px dashed ${COLORS.border}`, background:
"transparent", color: COLORS.textMuted, fontSize: 12, fontWeight: 600, cursor:
"pointer" }}>
       Registrar pagamento desta fatura
      </button>
    );
  }
  return (
    <div style={{ marginTop: 8, background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted }}
>Pagamento — fatura de {monthName}</div>
      <label style={labelStyle}>Debitar da conta</label>
      <select value={accountId} onChange={e => setAccountId(e.target.value)}
style={selectStyle}>
       {state.accounts.map(a => <option key={a.id} value={a.id}>{a.nickname || a.bank}
</option>)}
      </select>
      <div style={{ display: "flex", gap: 8 }}>
       <div style={{ flex: 1 }}>
        <label style={labelStyle}>Valor</label>
        <AmountInput value={amount} onChange={setAmount} placeholder="0,00" />
       </div>
       <div style={{ flex: 1.2 }}>
        <label style={labelStyle}>Data</label>
        <DateInput value={date} onChange={setDate} />
       </div>
      </div>
      <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 8, lineHeight:
1.4 }}>
       Sai da conta escolhida, mas não conta como gasto nas análises — as compras
já foram contadas no cartão.
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
       <button onClick={confirm} style={{ ...saveBtnStyle(COLORS.positive),
marginTop: 0, flex: 1, padding: "10px 0", fontSize: 13, color: "#04140C" }}
>Confirmar</button>
       <button onClick={() => setOpen(false)}
style={{ ...saveBtnStyle(COLORS.surface2), marginTop: 0, flex: 1, padding: "10px 0",
fontSize: 13 }}>Cancelar</button>
     </div>
    </div>
  );
}

// ---------- Investimentos ----------
function InvestmentsScreen({ state, setState, totals, go, showToast }) {
 const [filter, setFilter] = useState("todos");
 const [refreshing, setRefreshing] = useState(false);
 const invested = state.investments.reduce((s, i) => s + investedValueOf(i), 0);
 const current = totals.investTotal;
 const pl = current - invested;

  const filtered = filter === "todos" ? state.investments : state.investments.filter(i =>
i.type === filter);

  const quotableCount = state.investments.filter(i => (i.type === "acao" && i.ticker)
|| (i.type === "cripto" && CRYPTO_TO_COINGECKO_ID[i.ticker])).length;

  const handleRefresh = async () => {
    setRefreshing(true);
    const { prices, errors } = await fetchQuotes(state);
    const now = new Date().toISOString();
    let updatedCount = 0;
    const nextInvestments = state.investments.map(inv => {
      if (inv.type === "acao" && prices[`acao:${inv.ticker}`] != null) {
        updatedCount++;
        return { ...inv, currentPrice: prices[`acao:${inv.ticker}`], lastUpdated: now };
      }
      if (inv.type === "cripto") {
        const id = CRYPTO_TO_COINGECKO_ID[inv.ticker];
        if (id && prices[`cripto:${id}`] != null) {
          updatedCount++;
          return { ...inv, currentPrice: prices[`cripto:${id}`], lastUpdated: now };
        }
      }
      return inv;
    });
    setState({ ...state, investments: nextInvestments });
    setRefreshing(false);
    if (errors.length > 0) showToast(`${updatedCount} cotação(ões) atualizada(s) — ${errors.join(" · ")}`);
    else if (updatedCount > 0) showToast(`${updatedCount} cotação(ões) atualizada(s)`);
    else showToast("Nenhum ativo cotável (ações ou cripto com ticker reconhecido)");
  };

  const del = (invId) => {
    const inv = state.investments.find(i => i.id === invId);
    const linkedIds = inv?.buyTxIds || (inv?.buyTxId ? [inv.buyTxId] : []);
    setState({ ...state, investments: state.investments.filter(i => i.id !== invId),
transactions: state.transactions.filter(t => !linkedIds.includes(t.id)) });
  };

 return (
  <div>
    <ScreenHeader title="Investimentos" color={COLORS.green} onBack={() =>
go("home")} />
    <div style={{ background: `linear-gradient(135deg, ${COLORS.green}20, ${COLORS.surface})`, border: `1px solid ${COLORS.green}44`, borderRadius: 18,
padding: 16, marginBottom: 12 }}>
     <div style={{ fontSize: 12, color: COLORS.textMuted }}>Valor atual</div>
     <div style={{ fontFamily: FONT_MONO, fontSize: 26, fontWeight: 500 }}
>{currency(current)}</div>
     <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize:
12.5, color: pl >= 0 ? COLORS.positive : COLORS.negative }}>
       {pl >= 0 ? "▲ " : "▼ "}
       {currency(Math.abs(pl))} {pl >= 0 ? "de ganho" : "de perda"} sobre
{currency(invested)} aplicados
     </div>
   </div>

    {quotableCount > 0 && (
     <button onClick={handleRefresh} disabled={refreshing} style={{ width: "100%",
marginBottom: 14, padding: "11px 0", borderRadius: 14, border: `1px solid ${COLORS.green}55`, background: `${COLORS.green}15`, color: COLORS.green,
fontWeight: 600, fontSize: 13, cursor: refreshing ? "default" : "pointer", opacity:
refreshing ? 0.6 : 1 }}>
      {refreshing ? "Atualizando…" : `↻ Atualizar cotações (${quotableCount})`}
     </button>
    )}

    <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 14,
paddingBottom: 2 }}>
      {[{ id: "todos", label: "Todos", color:
COLORS.green }, ...INVESTMENT_TYPES].map(f => (
       <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: "7px 12px",
borderRadius: 20, whiteSpace: "nowrap", fontSize: 12.5, cursor: "pointer", border:
`1px solid ${filter === f.id ? f.color : COLORS.border}`, background: filter === f.id ?
`${f.color}20` : COLORS.surface, color: filter === f.id ? f.color : COLORS.textMuted }}
>{f.label}</button>
      ))}
    </div>

    {filtered.length === 0 && <div style={{ color: COLORS.textMuted, fontSize: 13,
padding: "16px 0", textAlign: "center" }}>Nenhum ativo aqui ainda.</div>}
    {filtered.map(inv => <InvestmentRow key={inv.id} inv={inv} onDelete={del}
onEdit={() => go("investmentForm", inv.id)} onSell={() => go("investmentSell",
inv.id)} />)}

   <button onClick={() => go("investmentForm")} style={{ width: "100%",
marginTop: 8, padding: "12px 0", borderRadius: 14, border: "none", background:
COLORS.green, color: "#04140C", fontWeight: 700, fontSize: 14.5, cursor:
"pointer" }}>+ Adicionar ativo</button>

    {state.sales.length > 0 && (
      <div style={{ marginTop: 24 }}>
       <SectionLabel>Histórico de vendas</SectionLabel>
       {[...state.sales].sort((a, b) => (a.date < b.date ? 1 : -1)).map(s => (
        <div key={s.id} style={{ display: "flex", justifyContent: "space-between",
alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}
` }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted }}>{new Date(s.date +
"T00:00:00").toLocaleDateString("pt-BR")} · recebido {currency(s.proceeds)}</div>
           </div>
           <div style={{ fontFamily: FONT_MONO, fontSize: 13, fontWeight: 600, color:
s.realizedPL >= 0 ? COLORS.positive : COLORS.negative }}>
            {s.realizedPL >= 0 ? "+" : ""}{currency(s.realizedPL)}
           </div>
         </div>
        ))}
      </div>
     )}
    </div>
  );
}

function InvestmentRow({ inv, onDelete, onEdit, onSell }) {
  const [confirming, setConfirming] = useState(false);
  const value = currentValueOf(inv);
  const investedV = investedValueOf(inv);
  const pl = value - investedV;
  const plPct = investedV > 0 ? (pl / investedV) * 100 : 0;
  const typeInfo = INVESTMENT_TYPES.find(t => t.id === inv.type);
  const color = typeInfo?.color || COLORS.green;
  const Icon = typeInfo?.icon === "Coins" ? Coins : Wallet;
  return (
   <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}
`, borderRadius: 14, padding: 12, marginBottom: 8 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div onClick={onEdit} style={{ display: "flex", alignItems: "center", gap: 10,
cursor: "pointer" }}>
       <div style={{ width: 32, height: 32, borderRadius: 10, background: `${color}
22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
><Icon size={15} color={color} /></div>
       <div>
         <div style={{ fontWeight: 600, fontSize: 14 }}>{inv.name}</div>
         <div style={{ fontSize: 11, color: COLORS.textMuted }}>{typeInfo?.label}
{inv.quantity ? ` · ${inv.quantity} un.` : ""}{inv.lastUpdated ? ` · atualizado
${timeAgoPt(inv.lastUpdated)}` : ""}</div>
       </div>
      </div>
      {confirming ? <ConfirmDelete onConfirm={() => onDelete(inv.id)} onCancel={() => setConfirming(false)} /> : (
       <button onClick={() => setConfirming(true)} style={{ background: "none",
border: "none", cursor: "pointer", color: COLORS.textMuted }}><Trash2 size={14} /
></button>
      )}
    </div>
     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 8 }}>
      <div>
       <div style={{ fontFamily: FONT_MONO, fontSize: 16, fontWeight: 500 }}
>{currency(value)}</div>
       <div style={{ fontSize: 12, color: pl >= 0 ? COLORS.positive : COLORS.negative,
fontFamily: FONT_MONO }}>{pl >= 0 ? "+" : ""}{plPct.toFixed(1)}%</div>
      </div>
      <button onClick={onSell} style={{ display: "flex", alignItems: "center", gap: 5,
padding: "6px 11px", borderRadius: 10, border: `1px solid ${color}55`, background:
`${color}18`, color, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
       Vender
      </button>
     </div>
    </div>
  );
}

// ---------- Venda de investimento ----------
function SellInvestmentForm({ id, state, setState, onBack, showToast }) {
  const inv = state.investments.find(i => i.id === id);
  const quoted = inv?.type === "acao" || inv?.type === "cripto";
  const maxQty = inv?.quantity || 0;
  const maxValue = inv?.manualValue ?? 0;

  const [quantity, setQuantity] = useState(String(maxQty || ""));
  const [sellPrice, setSellPrice] = useState(String(inv?.currentPrice ??
inv?.buyPrice ?? ""));
  const [redeemValue, setRedeemValue] = useState(String(maxValue || ""));
  const [date, setDate] = useState(todayISO());
  const [accountId, setAccountId] = useState(state.accounts[0]?.id || "");

 if (!inv) return null;
 const noAccounts = state.accounts.length === 0;

 const preview = useMemo(() => {
  if (quoted) {
    const qty = Math.min(parseBRNumber(quantity), maxQty);
    const price = parseBRNumber(sellPrice);
    const proceeds = qty * price;
    const cost = qty * (inv.buyPrice || 0);
    return { proceeds, cost, pl: proceeds - cost, qty };
  }
  const val = Math.min(parseBRNumber(redeemValue), maxValue);
  const fraction = maxValue > 0 ? val / maxValue : 1;
   const cost = (inv.appliedValue || 0) * fraction;
   return { proceeds: val, cost, pl: val - cost, val };
 }, [quantity, sellPrice, redeemValue, quoted, maxQty, maxValue, inv]);

 const confirmSale = () => {
   if (noAccounts) return;
   if (preview.proceeds <= 0) { showToast("Informe uma quantidade/valor maior que zero"); return; }
   let nextInvestments;
   if (quoted) {
     const remaining = maxQty - preview.qty;
     nextInvestments = remaining > 0.0000001
       ? state.investments.map(i => i.id === id ? { ...i, quantity: remaining } : i)
       : state.investments.filter(i => i.id !== id);
   } else {
     const remaining = maxValue - preview.proceeds;
     nextInvestments = remaining > 0.01
       ? state.investments.map(i => i.id === id ? { ...i, manualValue: remaining,
appliedValue: (i.appliedValue || 0) - preview.cost } : i)
       : state.investments.filter(i => i.id !== id);
   }
   const saleRecord = {
     id: uid(), investmentId: id, name: inv.name, type: inv.type,
     quantity: quoted ? preview.qty : undefined, proceeds: preview.proceeds,
     costBasis: preview.cost, realizedPL: preview.pl, date, accountId,
   };
   const tx = {
     id: uid(), kind: "entrada", accountId, cardId: null, categoryId: "investimentos",
     amount: preview.proceeds, date,
     description: `Venda ${inv.name}${quoted ? ` (${preview.qty} un.)` : ""} — ${preview.pl >= 0 ? "lucro" : "prejuízo"} de ${currency(Math.abs(preview.pl))}`,
   };
   setState({ ...state, investments: nextInvestments, sales: [...state.sales,
saleRecord], transactions: [...state.transactions, tx] });
   showToast(`Venda registrada — ${currency(preview.proceeds)} creditado`);
   onBack();
 };

 return (
  <div>
   <ScreenHeader title={`Vender ${inv.name}`} color={INVESTMENT_TYPES.find(t => t.id === inv.type)?.color || COLORS.green} onBack={onBack} />

   {noAccounts ? (
    <div style={{ textAlign: "center", padding: "24px 12px", color:
COLORS.textMuted, fontSize: 13, lineHeight: 1.5 }}>
      Cadastre uma conta primeiro — é pra lá que o valor da venda vai.
     </div>
    ):(
     <>
      {quoted ? (
        <>
         <label style={labelStyle}>Quantidade vendida (de {maxQty})</label>
         <AmountInput value={quantity} onChange={setQuantity} placeholder="0,00" decimals={8} />
         <label style={labelStyle}>Valor de venda (unitário)</label>
         <AmountInput value={sellPrice} onChange={setSellPrice} placeholder="0,00" />
        </>
      ):(
        <>
         <label style={labelStyle}>Valor resgatado (de {currency(maxValue)})</label>
         <AmountInput value={redeemValue} onChange={setRedeemValue} placeholder="0,00" />
        </>
      )}
      <label style={labelStyle}>Data</label>
      <DateInput value={date} onChange={setDate} />
      <label style={labelStyle}>Conta de destino (onde o dinheiro entra)</label>
      <select value={accountId} onChange={e => setAccountId(e.target.value)}
style={selectStyle}>
        {state.accounts.map(a => <option key={a.id} value={a.id}>{a.nickname ||
a.bank}</option>)}
      </select>

      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 14, marginTop: 16 }}>
       <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13,
marginBottom: 6 }}>
        <span style={{ color: COLORS.textMuted }}>Você recebe</span>
        <span style={{ fontFamily: FONT_MONO, fontWeight: 600 }}
>{currency(preview.proceeds)}</span>
       </div>
       <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
        <span style={{ color: COLORS.textMuted }}>Resultado (lucro/prejuízo)</span>
        <span style={{ fontFamily: FONT_MONO, fontWeight: 600, color: preview.pl
>= 0 ? COLORS.positive : COLORS.negative }}>
         {preview.pl >= 0 ? "+" : ""}{currency(preview.pl)}
        </span>
       </div>
      </div>

        <button onClick={confirmSale}
style={saveBtnStyle(INVESTMENT_TYPES.find(t => t.id === inv.type)?.color ||
COLORS.green)}>Confirmar venda</button>
      </>
     )}
    </div>
  );
}

function InvestmentTypeCard({ typeInfo, onClick }) {
  const Icon = typeInfo.icon === "Coins" ? Coins : Wallet;
  return (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 12,
width: "100%", padding: 14, borderRadius: 16, border: `1px solid ${COLORS.border}
`, background: COLORS.surface, cursor: "pointer", marginBottom: 10, textAlign:
"left" }}>
     <div style={{ width: 38, height: 38, borderRadius: 12, background: `${typeInfo.color}22`, display: "flex", alignItems: "center", justifyContent: "center",
color: typeInfo.color }}><Icon size={17} /></div>
     <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 14.5 }}
>{typeInfo.label}</div>
     <ChevronRight size={16} color={COLORS.textMuted} style={{ marginLeft:
"auto" }} />
    </button>
  );
}

function InvestmentForm({ id, state, setState, onBack, showToast }) {
  const editing = state.investments.find(i => i.id === id);
  const linkedTxIds = editing?.buyTxIds || (editing?.buyTxId ? [editing.buyTxId] : []);
  const linkedTx = linkedTxIds.length === 1 ? state.transactions.find(t => t.id ===
linkedTxIds[0]) : null;
  const hasAccounts = state.accounts.length > 0;
  const [type, setType] = useState(editing?.type || null);
  const [name, setName] = useState(editing?.name || "");
  const [customName, setCustomName] = useState("");
  const [quantity, setQuantity] = useState(String(editing?.quantity ?? ""));
  const [buyPrice, setBuyPrice] = useState(String(editing?.buyPrice ?? ""));
  const [appliedValue, setAppliedValue] = useState(String(editing?.appliedValue ??
""));
  const [buyDate, setBuyDate] = useState(editing?.buyDate || todayISO());
 const [accountId, setAccountId] = useState(linkedTx?.accountId ||
state.accounts[0]?.id || "");
 const [origin, setOrigin] = useState(() => {
  if (editing) return linkedTxIds.length > 0 ? "account" : "none";
  return hasAccounts ? "account" : "none";
 });
 const quoted = type === "acao" || type === "cripto";

 // Tela 1: escolher o tipo (só em cadastro novo)
 if (!editing && !type) {
   return (
     <div>
      <ScreenHeader title="Novo ativo" color={COLORS.green} onBack={onBack} />
      <div style={{ fontSize: 12.5, color: COLORS.textMuted, marginBottom: 14 }}>O
que você quer registrar?</div>
      {INVESTMENT_TYPES.map(t => <InvestmentTypeCard key={t.id} typeInfo={t}
onClick={() => setType(t.id)} />)}
     </div>
   );
 }

 const investedValue = quoted ? parseBRNumber(quantity) *
parseBRNumber(buyPrice) : parseBRNumber(appliedValue);
 const finalName = type === "cripto" && name === "Outra" ? customName
   : (type === "poupanca" && !name.trim()) ? "Poupança"
   : name;
 const valueChanged = editing && linkedTx && origin === "account" &&
Math.round(linkedTx.amount * 100) !== Math.round(investedValue * 100);

  // Ao cadastrar (não editar), procura se já existe uma posição igual pra somar em vez de duplicar
  const existingMatch = !editing && finalName
    ? state.investments.find(i => i.type === type && i.name.trim().toLowerCase() ===
finalName.trim().toLowerCase())
    : null;

 const save = () => {
  if (!finalName) { showToast("Preencha o nome/código do ativo antes de salvar");
return; }
  const base = { type, name: finalName, ticker: finalName, buyDate };
  const payload = quoted
    ? { ...base, quantity: parseBRNumber(quantity), buyPrice:
parseBRNumber(buyPrice), currentPrice: editing?.currentPrice }
    : { ...base, appliedValue: parseBRNumber(appliedValue), manualValue:
parseBRNumber(appliedValue) };

  if (editing) {
      let nextTransactions = state.transactions;
      let buyTxIds = linkedTxIds;
      if (origin === "account" && linkedTxIds.length <= 1) {
        const existingId = linkedTxIds[0];
        const existingTxIndex = existingId ? state.transactions.findIndex(t => t.id ===
existingId) : -1;
        if (existingTxIndex >= 0) {
          nextTransactions = state.transactions.map(t => t.id === existingId
            ? { ...t, amount: investedValue, date: buyDate, accountId, description:
`Compra ${finalName}` }
            : t);
          buyTxIds = [existingId];
        } else {
          const newTx = { id: uid(), kind: "saida", accountId, cardId: null, categoryId:
"investimentos", amount: investedValue, date: buyDate, description: `Compra ${finalName}` };
          nextTransactions = [...state.transactions, newTx];
          buyTxIds = [newTx.id];
        }
      } else if (origin !== "account" && linkedTxIds.length <= 1 && linkedTxIds[0]) {
        nextTransactions = state.transactions.filter(t => t.id !== linkedTxIds[0]);
        buyTxIds = [];
      }
      setState({ ...state, investments: state.investments.map(i => i.id === id ?
{ ...i, ...payload, name: finalName || i.name, buyTxIds, buyTxId: undefined } : i),
transactions: nextTransactions });
      showToast("Ativo atualizado");
      onBack();
      return;
    }

   // Novo lançamento — cria transação de débito se vier de conta
   let newTx = null;
   if (origin === "account") {
     newTx = { id: uid(), kind: "saida", accountId, cardId: null, categoryId:
"investimentos", amount: investedValue, date: buyDate, description: `Compra ${finalName}` };
   }
   const nextTransactions = newTx ? [...state.transactions, newTx] :
state.transactions;

  if (existingMatch) {
    // Já existe posição igual — soma e recalcula o preço médio ponderado
    let mergedInvestments;
    if (quoted) {
        const oldQty = existingMatch.quantity || 0;
        const newQty = oldQty + parseBRNumber(quantity);
        const avgPrice = newQty > 0 ? (oldQty * (existingMatch.buyPrice || 0) +
parseBRNumber(quantity) * parseBRNumber(buyPrice)) / newQty : 0;
        mergedInvestments = state.investments.map(i => i.id === existingMatch.id
         ? { ...i, quantity: newQty, buyPrice: avgPrice, buyTxIds: [...(i.buyTxIds ||
(i.buyTxId ? [i.buyTxId] : [])), newTx?.id].filter(Boolean), buyTxId: undefined }
         : i);
        showToast(`Somado à posição existente — agora ${newQty} un. a ${currency(avgPrice)} (média)`);
      } else {
        const newApplied = (existingMatch.appliedValue || 0) +
parseBRNumber(appliedValue);
        const newManual = (existingMatch.manualValue || existingMatch.appliedValue ||
0) + parseBRNumber(appliedValue);
        mergedInvestments = state.investments.map(i => i.id === existingMatch.id
         ? { ...i, appliedValue: newApplied, manualValue: newManual, buyTxIds: [...
(i.buyTxIds || (i.buyTxId ? [i.buyTxId] : [])), newTx?.id].filter(Boolean), buyTxId:
undefined }
         : i);
        showToast(`Somado à posição existente — total aplicado ${currency(newApplied)}`);
      }
      setState({ ...state, investments: mergedInvestments, transactions:
nextTransactions });
    } else {
      const newInv = { id: uid(), ...payload, buyTxIds: newTx ? [newTx.id] : [] };
      setState({ ...state, investments: [...state.investments, newInv], transactions:
nextTransactions });
      showToast(newTx ? `Ativo adicionado — ${currency(investedValue)} debitado da
conta` : "Ativo adicionado à carteira");
    }
    onBack();
  };
  const del = () => {
    setState({ ...state, investments: state.investments.filter(i => i.id !== id),
transactions: state.transactions.filter(t => !linkedTxIds.includes(t.id)) });
    showToast("Ativo removido");
    onBack();
  };

 return (
  <div>
   <ScreenHeader title={editing ? "Editar ativo" : INVESTMENT_TYPES.find(t => t.id
=== type)?.label} color={INVESTMENT_TYPES.find(t => t.id === type)?.color ||
COLORS.green} onBack={onBack} />

    {type === "acao" && (
     <>
       <label style={labelStyle}>Código do ativo</label>
       <input value={name} onChange={e => setName(e.target.value.toUpperCase())}
placeholder="Ex: PETR4, MXRF11…" style={inputStyle} />
       <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1 }}><label style={labelStyle}>Quantidade</label><AmountInput value={quantity} onChange={setQuantity} placeholder="0" decimals={8} /></div>
        <div style={{ flex: 1 }}><label style={labelStyle}>Valor de compra (un.)</label>
<AmountInput value={buyPrice} onChange={setBuyPrice} placeholder="0,00" /></div>
       </div>
     </>
    )}

    {type === "cripto" && (
     <>
       <label style={labelStyle}>Qual criptomoeda</label>
       <select value={name} onChange={e => setName(e.target.value)}
style={selectStyle}>
        <option value="" disabled>Selecione</option>
        {CRYPTO_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
       </select>
       {name === "Outra" && <input value={customName} onChange={e =>
setCustomName(e.target.value)} placeholder="Nome da criptomoeda"
style={{ ...inputStyle, marginTop: 8 }} />}
       <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1 }}><label style={labelStyle}>Quantidade</label><AmountInput value={quantity} onChange={setQuantity} placeholder="0" decimals={8} /></div>
        <div style={{ flex: 1 }}><label style={labelStyle}>Valor de compra (un.)</label>
<AmountInput value={buyPrice} onChange={setBuyPrice} placeholder="0,00" /></div>
       </div>
     </>
    )}

   {type === "rendafixa" && (
    <>
      <label style={labelStyle}>Nome do título</label>
      <input value={name} onChange={e => setName(e.target.value)}
placeholder="Ex: CDB Banco XP 120% CDI" style={inputStyle} />
      <label style={labelStyle}>Valor aplicado</label>
      <AmountInput value={appliedValue} onChange={setAppliedValue} placeholder="0,00" />
     </>
   )}

    {type === "tesouro" && (
     <>
       <label style={labelStyle}>Qual título</label>
       <select value={name} onChange={e => setName(e.target.value)}
style={selectStyle}>
        <option value="" disabled>Selecione</option>
        {TESOURO_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
       </select>
       <label style={labelStyle}>Valor aplicado</label>
       <AmountInput value={appliedValue} onChange={setAppliedValue} placeholder="0,00" />
     </>
    )}

    {type === "poupanca" && (
     <>
       <label style={labelStyle}>Apelido (opcional)</label>
       <input value={name} onChange={e => setName(e.target.value)}
placeholder="Ex: Poupança Itaú" style={inputStyle} />
       <label style={labelStyle}>Saldo atual</label>
       <AmountInput value={appliedValue} onChange={setAppliedValue} placeholder="0,00" />
       <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 6, lineHeight: 1.4 }}>
        A poupança rende sozinha (sem cotação) — quando quiser atualizar o saldo
com o rendimento do mês, edite esse valor manualmente.
       </div>
     </>
    )}

    {type === "previdencia" && (
     <>
       <label style={labelStyle}>Nome do plano</label>
       <input value={name} onChange={e => setName(e.target.value)}
placeholder="Ex: Previdência PGBL Banco X" style={inputStyle} />
       <label style={labelStyle}>Valor aplicado</label>
       <AmountInput value={appliedValue} onChange={setAppliedValue} placeholder="0,00" />
     </>
    )}

    {existingMatch && (
     <div style={{ fontSize: 11.5, color: COLORS.teal, marginTop: 10, lineHeight: 1.4,
background: `${COLORS.teal}15`, borderRadius: 10, padding: 10 }}>
       Você já tem {quoted ? `${existingMatch.quantity} un. de ${existingMatch.name} (preço médio ${currency(existingMatch.buyPrice)})` : `${existingMatch.name} com ${currency(existingMatch.appliedValue)} aplicados`} —
essa compra vai somar a essa posição em vez de criar uma nova.
     </div>
    )}

   <label style={labelStyle}>Data</label>
   <DateInput value={buyDate} onChange={setBuyDate} />

    {hasAccounts && (
     <>
      <label style={labelStyle}>Origem do dinheiro</label>
      <div style={{ display: "flex", gap: 8 }}>
       <button onClick={() => setOrigin("account")} style={{ flex: 1, padding: "10px 0", borderRadius: 12, cursor: "pointer", border: `1px solid ${origin === "account" ?
COLORS.green : COLORS.border}`, background: origin === "account" ? `${COLORS.green}20` : COLORS.surface, color: origin === "account" ?
COLORS.green : COLORS.textMuted, fontSize: 12.5, fontWeight: 600 }}>De uma
conta</button>
       <button onClick={() => setOrigin("none")} style={{ flex: 1, padding: "10px 0",
borderRadius: 12, cursor: "pointer", border: `1px solid ${origin === "none" ?
COLORS.green : COLORS.border}`, background: origin === "none" ? `${COLORS.green}20` : COLORS.surface, color: origin === "none" ? COLORS.green :
COLORS.textMuted, fontSize: 12.5, fontWeight: 600 }}>Já era meu / outra origem</button>
      </div>
    </>
   )}

    {origin === "account" && hasAccounts ? (
      <>
       <label style={labelStyle}>{editing ? "Conta (débito da compra)" : "Conta de origem (de onde o dinheiro sai)"}</label>
       <select value={accountId} onChange={e => setAccountId(e.target.value)}
style={selectStyle}>
        {state.accounts.map(a => <option key={a.id} value={a.id}>{a.nickname ||
a.bank}</option>)}
       </select>
       {valueChanged && (
        <div style={{ fontSize: 11.5, color: COLORS.amber, marginTop: 8, lineHeight:
1.4 }}>
          O débito original era {currency(linkedTx.amount)}. Ao salvar, vai passar a
ser {currency(investedValue)}.
        </div>
       )}
      </>
    ):(
      <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginTop:
hasAccounts ? 8 : 14, lineHeight: 1.4 }}>
       {hasAccounts
        ? "Esse ativo entra na sua carteira sem debitar nenhuma conta — ideal pra registrar uma posição que você já tinha antes de usar o app, ou dinheiro que veio de fora do controle daqui."
        : "Você ainda não tem conta cadastrada, então esse ativo vai entrar direto na carteira, sem debitar nada. Se quiser que compras futuras debitem automaticamente, cadastre uma conta em \"Contas\" na tela inicial."}
      </div>
    )}

    {editing && linkedTxIds.length > 1 && (
      <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginTop: 12, lineHeight:
1.4, background: COLORS.surface2, borderRadius: 10, padding: 10 }}>
       Essa posição tem {linkedTxIds.length} compras somadas. Editar aqui ajusta
só a quantidade/preço médio — as compras já lançadas no extrato da conta
continuam como estão.
    </div>
   )}

     <button onClick={save} style={saveBtnStyle(INVESTMENT_TYPES.find(t => t.id
=== type)?.color || COLORS.green)}>{editing ? "Salvar alterações" :
(existingMatch ? "Somar à posição existente" : "Confirmar")}</button>
     {editing && (
      <button onClick={del} style={{ ...saveBtnStyle("transparent"), border: `1px solid
${COLORS.negative}55`, color: COLORS.negative, marginTop: 10 }}>Excluir
ativo{linkedTxIds.length > 0 ? ` (e reverter ${linkedTxIds.length > 1 ? "os débitos" :
"o débito"})` : ""}</button>
     )}
    </div>
  );
}

// ---------- Resumo mensal por categoria ----------
function ResumoScreen({ state, setState, showToast, onBack }) {
  const [monthKey, setMonthKey] = useState(todayISO().slice(0, 7));
  const [scope, setScope] = useState("tudo"); // tudo | contas | cartoes
  const [editingBudgets, setEditingBudgets] = useState(false);
  const [draft, setDraft] = useState({});
  const budgets = state.budgets || {};
  const shift = (n) => {
    const [y, m] = monthKey.split("-").map(Number);
    const d = new Date(y, m - 1 + n, 1);
    setMonthKey(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  };
  const [yy, mm] = monthKey.split("-").map(Number);
  const isCurrentMonth = monthKey === todayISO().slice(0, 7);

 const data = useMemo(() => {
  const inMonth = (t) => t.date?.slice(0, 7) === monthKey;
  const isSpend = (t) => (t.kind === "saida" && scope !== "cartoes") || (t.kind ===
"cartao" && scope !== "contas");
  const spendTx = state.transactions.filter(t => inMonth(t) && isSpend(t) && !
SYSTEM_CATS.has(t.categoryId));
  const entradas = scope === "cartoes" ? 0 : state.transactions
   .filter(t => inMonth(t) && t.kind === "entrada" && !
SYSTEM_CATS.has(t.categoryId))
   .reduce((s, t) => s + t.amount, 0);
  const byCat = {};
  spendTx.forEach(t => {
   if (!byCat[t.categoryId]) byCat[t.categoryId] = { sum: 0, count: 0, subs: {} };
   byCat[t.categoryId].sum += t.amount;
      byCat[t.categoryId].count += 1;
      const subKey = t.subcategoryId || "_outros";
      if (!byCat[t.categoryId].subs[subKey]) byCat[t.categoryId].subs[subKey] = { sum: 0, count: 0 };
      byCat[t.categoryId].subs[subKey].sum += t.amount;
      byCat[t.categoryId].subs[subKey].count += 1;
    });
    // Categorias com orçamento definido aparecem mesmo sem gasto no mês
    Object.keys(state.budgets || {}).forEach(catId => {
      if ((state.budgets[catId] || 0) > 0 && !byCat[catId]) byCat[catId] = { sum: 0, count:
0, subs: {} };
    });
    const rows = Object.entries(byCat)
      .map(([catId, v]) => ({ catId, cat: state.categories.find(c => c.id === catId) ||
{ label: "Outros", color: "#94A3B8", icon: "MoreHorizontal" }, ...v }))
      .sort((a, b) => b.sum - a.sum);
    const total = rows.reduce((s, r) => s + r.sum, 0);
    const maxSum = rows[0]?.sum || 1;
    const budgeted = rows.filter(r => (state.budgets?.[r.catId] || 0) > 0);
    const totalOrcado = budgeted.reduce((s, r) => s + state.budgets[r.catId], 0);
    const gastoNasOrcadas = budgeted.reduce((s, r) => s + r.sum, 0);
    return { rows, total, entradas, maxSum, totalOrcado, gastoNasOrcadas };
  }, [state.transactions, state.categories, state.budgets, monthKey, scope]);

 const spendCats = state.categories.filter(c => !c.system && c.kinds &&
(c.kinds.includes("saida") || c.kinds.includes("cartao")));
 const openBudgetEditor = () => {
   const d = {};
   spendCats.forEach(c => { d[c.id] = budgets[c.id] ?
String(budgets[c.id]).replace(".", ",") : ""; });
   setDraft(d);
   setEditingBudgets(true);
 };
 const saveBudgets = () => {
   const next = {};
   spendCats.forEach(c => { const v = parseBRNumber(draft[c.id] || ""); if (v > 0)
next[c.id] = v; });
   setState({ ...state, budgets: next });
   showToast("Orçamentos salvos");
   setEditingBudgets(false);
 };

 return (
  <div>
   <ScreenHeader title="Resumo do Mês" color={COLORS.amber}
onBack={onBack} />

   <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
    <button onClick={() => shift(-1)} style={{ ...iconBtnStyle(COLORS.textMuted),
width: 36, height: 36 }}><ChevronLeft size={17} /></button>
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 16 }}
>{monthLabelFull(mm - 1)} de {yy}</div>
      {isCurrentMonth && <div style={{ fontSize: 10.5, fontWeight: 700, color:
COLORS.amber }}>MÊS ATUAL</div>}
    </div>
    <button onClick={() => shift(1)} style={{ ...iconBtnStyle(COLORS.textMuted),
width: 36, height: 36 }}><ChevronRight size={17} /></button>
   </div>

     <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
      {[{ id: "tudo", label: "Tudo" }, { id: "contas", label: "Só contas" }, { id: "cartoes",
label: "Só cartões" }].map(f => (
       <button key={f.id} onClick={() => setScope(f.id)} style={{ flex: 1, padding: "8px 0", borderRadius: 11, cursor: "pointer", fontSize: 12.5, fontWeight: 600, border: `1px
solid ${scope === f.id ? COLORS.amber : COLORS.border}`, background: scope ===
f.id ? `${COLORS.amber}20` : COLORS.surface, color: scope === f.id ?
COLORS.amber : COLORS.textMuted }}>{f.label}</button>
      ))}
     </div>

   <div style={{ background: `linear-gradient(135deg, ${COLORS.amber}18, ${COLORS.surface})`, border: `1px solid ${COLORS.amber}44`, borderRadius: 18,
padding: 16, marginBottom: 16 }}>
    <div style={{ fontSize: 12, color: COLORS.textMuted }}>Total de gastos no
mês</div>
    <div style={{ fontFamily: FONT_MONO, fontSize: 26, fontWeight: 500,
marginTop: 2 }}>{currency(data.total)}</div>
    {scope !== "cartoes" ? (
      <div style={{ display: "flex", gap: 14, marginTop: 8, fontSize: 12, color:
COLORS.textMuted, flexWrap: "wrap" }}>
       <span>Entradas: <b style={{ color: COLORS.positive, fontFamily:
FONT_MONO }}>{currency(data.entradas)}</b></span>
       <span>Saldo do mês: <b style={{ color: (data.entradas - data.total) >= 0 ?
COLORS.positive : COLORS.negative, fontFamily: FONT_MONO }}
>{currency(data.entradas - data.total)}</b></span>
      </div>
    ):(
      <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 6 }}>Somente
compras nos cartões, pela data da compra.</div>
    )}
    {data.totalOrcado > 0 && (
      <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 8 }}>
       Orçamentos: <b style={{ fontFamily: FONT_MONO, color:
data.gastoNasOrcadas <= data.totalOrcado ? COLORS.positive : COLORS.negative }}
>{currency(data.gastoNasOrcadas)}</b> de <b style={{ fontFamily: FONT_MONO }}
>{currency(data.totalOrcado)}</b> orçado
       </div>
      )}
      <div style={{ fontSize: 10.5, color: COLORS.textMuted, marginTop: 8, lineHeight:
1.4 }}>
       Transferências e pagamentos de fatura não entram — gasto de cartão conta
na data da compra.
      </div>
    </div>

    {editingBudgets ? (
     <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 14, marginBottom: 16 }}>
       <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Orçamento
mensal por categoria</div>
       <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 10,
lineHeight: 1.4 }}>Defina um teto de gasto por mês. Deixe em branco para não
acompanhar a categoria.</div>
       {spendCats.map(c => {
         const Icon = ICONS[c.icon] || MoreHorizontal;
         return (
           <div key={c.id} style={{ display: "flex", alignItems: "center", justifyContent:
"space-between", gap: 10, marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
             <div style={{ width: 26, height: 26, borderRadius: 8, background: `${c.color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink:
0 }}><Icon size={12} color={c.color} /></div>
             <span style={{ fontSize: 12.5 }}>{c.label}</span>
            </div>
            <AmountInput value={draft[c.id] || ""} onChange={v => setDraft(prev => ({ ...prev,
[c.id]: v }))} placeholder="—" style={{ width: 110, padding: "8px 10px", fontSize: 13, textAlign: "right", flexShrink: 0 }} />
           </div>
         );
       })}
       <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
         <button onClick={saveBudgets} style={{ ...saveBtnStyle(COLORS.amber),
marginTop: 0, flex: 1, color: "#1A1204" }}>Salvar orçamentos</button>
         <button onClick={() => setEditingBudgets(false)}
style={{ ...saveBtnStyle(COLORS.surface2), marginTop: 0, flex: 1 }}>Cancelar</button>
       </div>
     </div>
   ):(
    <button onClick={openBudgetEditor} style={{ width: "100%", marginBottom: 16,
padding: "10px 0", borderRadius: 12, border: `1px dashed ${COLORS.border}`,
background: "transparent", color: COLORS.textMuted, fontSize: 12.5, fontWeight:
600, cursor: "pointer" }}>
    {data.totalOrcado > 0 ? "Ajustar orçamentos por categoria" : "Definir orçamentos por categoria"}
    </button>
   )}

    {data.rows.length === 0 && (
     <div style={{ textAlign: "center", color: COLORS.textMuted, fontSize: 13,
padding: "24px 0" }}>Nenhum gasto registrado neste mês.</div>
    )}
    {data.rows.length > 0 && (
     <div style={{ background: COLORS.surface2, borderRadius: 14, padding: "10px 14px",
marginBottom: 16, fontSize: 12.5, color: COLORS.textMuted, lineHeight: 1.5 }}>
      Maior gasto do mês: <b style={{ color: data.rows[0].cat.color }}
>{data.rows[0].cat.label}</b> — <b style={{ fontFamily: FONT_MONO, color:
COLORS.textPrimary }}>{currency(data.rows[0].sum)}</b> ({data.total > 0 ?
((data.rows[0].sum / data.total) * 100).toFixed(0) : 0}% do total), espalhado
por {data.rows.length} categoria{data.rows.length === 1 ? "" : "s"}. Toque numa
categoria pra ver as subcategorias.
     </div>
    )}
    {data.rows.map(r => (
      <CategoryRow key={r.catId || r.cat.label} r={r} totalDoMes={data.total}
maxSum={data.maxSum} budget={budgets[r.catId] || 0} />
    ))}
    </div>
  );
}

function CategoryRow({ r, totalDoMes, maxSum, budget }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = ICONS[r.cat.icon] || MoreHorizontal;
  const pctOfTotal = totalDoMes > 0 ? (r.sum / totalDoMes) * 100 : 0;
  const overBudget = budget > 0 && r.sum > budget + 0.009;
  const barPct = budget > 0 ? Math.min(100, (r.sum / budget) * 100) : (r.sum / maxSum) * 100;
  const barColor = overBudget ? COLORS.negative : r.cat.color;
  const subEntries = Object.entries(r.subs || {})
    .map(([subId, v]) => ({
      subId,
      label: subId === "_outros" ? "Sem subcategoria" : (r.cat.subcategories?.find(sc => sc.id === subId)?.label || "Outros"),
      ...v,
    }))
    .sort((a, b) => b.sum - a.sum);
  const hasSubs = subEntries.length > 1 || (subEntries.length === 1 && subEntries[0].subId !== "_outros");
  return (
    <div style={{ marginBottom: 12 }}>
      <button onClick={() => hasSubs && setExpanded(v => !v)} style={{
        width: "100%", background: "none", border: "none", padding: 0, textAlign: "left",
        cursor: hasSubs ? "pointer" : "default", fontFamily: "inherit", color: "inherit",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
         <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
           <div style={{ width: 28, height: 28, borderRadius: 9, background: `${r.cat.color}22`, display: "flex", alignItems: "center", justifyContent: "center",
flexShrink: 0 }}><Icon size={13} color={r.cat.color} /></div>
           <span style={{ fontSize: 13, fontWeight: 500 }}>{r.cat.label}</span>
           <span style={{ fontSize: 11, color: COLORS.textMuted }}>· {r.count} lançamento{r.count === 1 ? "" : "s"}</span>
           {hasSubs && <ChevronRight size={12} color={COLORS.textMuted} style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "transform 0.15s", flexShrink: 0 }} />}
         </div>
         <div style={{ textAlign: "right", flexShrink: 0 }}>
           <span style={{ fontFamily: FONT_MONO, fontSize: 13, fontWeight: 600 }}
>{currency(r.sum)}</span>
           <span style={{ fontSize: 11, color: COLORS.textMuted, marginLeft: 6 }}
>{pctOfTotal.toFixed(0)}%</span>
         </div>
        </div>
        <div style={{ height: 7, borderRadius: 7, background: COLORS.surface2,
overflow: "hidden" }}>
         <div style={{ width: `${barPct}%`, height: "100%", background: barColor,
borderRadius: 7 }} />
         </div>
         {budget > 0 && (
          <div style={{ fontSize: 10.5, color: overBudget ? COLORS.negative :
COLORS.textMuted, marginTop: 3 }}>
            {overBudget
             ? `Orçamento de ${currency(budget)} — estourou ${currency(r.sum -
budget)}`
             : `Orçamento de ${currency(budget)} — restam ${currency(budget -
r.sum)}`}
          </div>
         )}
      </button>
      {expanded && hasSubs && (
        <div style={{ marginTop: 8, marginLeft: 36, display: "flex", flexDirection: "column", gap: 6 }}>
          {subEntries.map(s => {
            const subPct = r.sum > 0 ? (s.sum / r.sum) * 100 : 0;
            return (
              <div key={s.subId} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <span style={{ fontSize: 12, color: COLORS.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.label}</span>
                <span style={{ fontSize: 12, fontFamily: FONT_MONO, color: COLORS.textPrimary, flexShrink: 0, whiteSpace: "nowrap" }}>{currency(s.sum)} <span style={{ color: COLORS.textMuted }}>({subPct.toFixed(0)}%)</span></span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------- Planejamento (Metas + Projeção, integradas) ----------
function PlanejamentoScreen({ state, setState, totals, onBack, showToast }) {
  const [tab, setTab] = useState("metas");
  const [showNextYear, setShowNextYear] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = now.getMonth();
  const nextYear = curYear + 1;

  const buildMonthsFor = (year, startMonth) => {
    const arr = [];
    for (let m = startMonth; m <= 11; m++) {
      const isCurrent = year === curYear && m === curMonth;
      const key = `${year}-${String(m + 1).padStart(2, "0")}`;
      const saidasMes = state.transactions.filter(t => t.kind === "saida" &&
t.date?.slice(0, 7) === key);
      const entradasMes = state.transactions.filter(t => t.kind === "entrada" &&
t.date?.slice(0, 7) === key);
      const cartaoMes = state.transactions.filter(t => {
        if (t.kind !== "cartao") return false;
        const card = state.cards.find(c => c.id === t.cardId);
        return invoiceMonthOf(t.date, card?.closingDay) === key;
      });
      const gastosReais = saidasMes.reduce((s, t) => s + t.amount, 0) +
cartaoMes.reduce((s, t) => s + t.amount, 0);
      const entradasReais = entradasMes.reduce((s, t) => s + t.amount, 0);
      const temLancado = saidasMes.length + cartaoMes.length + entradasMes.length
> 0;
      const rendaFixa = state.profile.incomeFixed ?? state.profile.incomeMonthly ?? 0;
      const rendaVariavel = state.profile.incomeVariable || 0;
      const renda = rendaFixa + rendaVariavel;
      const rendaProjetada = isCurrent ? Math.max(entradasReais, renda) : renda;
      arr.push({ key, year, m, isCurrent, gastosReais, entradasReais, rendaProjetada,
temLancado, saldo: rendaProjetada - gastosReais });
    }
    return arr;
  };

  const monthsEsteAno = useMemo(() => buildMonthsFor(curYear, curMonth),
   [state.transactions, state.cards, state.profile.incomeFixed, state.profile.incomeVariable, curMonth, curYear]);
  const monthsProximoAno = useMemo(() => buildMonthsFor(nextYear, 0),
   [state.transactions, state.cards, state.profile.incomeFixed, state.profile.incomeVariable, nextYear]);

  const sumMonths = (arr) => arr.reduce((acc, mo) => ({ renda: acc.renda +
mo.rendaProjetada, gastos: acc.gastos + mo.gastosReais }), { renda: 0, gastos: 0 });
  const anual = sumMonths(monthsEsteAno);
  const anualProximo = sumMonths(monthsProximoAno);
  const acumuladoAteProximo = { renda: anual.renda + anualProximo.renda, gastos:
anual.gastos + anualProximo.gastos };

  // Elo entre as duas abas: sobra média projetada (pro lado de Metas) e quanto
  // as metas com prazo pedem por mês (pro lado de Projeção).
  const avgMonthlySurplus = monthsEsteAno.length > 0
    ? monthsEsteAno.reduce((s, mo) => s + mo.saldo, 0) / monthsEsteAno.length : 0;
  const totalMonthlyNeeded = state.goals.reduce((s, g) => {
    if (!g.dueDate) return s;
    const monthsLeft = monthsBetween(todayISO(), g.dueDate);
    const remaining = Math.max(0, g.target - (g.saved || 0));
    return s + (monthsLeft > 0 ? remaining / monthsLeft : remaining);
  }, 0);

  if (formOpen) {
    return <GoalForm state={state} setState={setState} goal={editingGoal}
onBack={() => { setFormOpen(false); setEditingGoal(null); }} showToast={showToast} />;
  }

  return (
    <div>
      <ScreenHeader title="Planejamento" color={COLORS.cyan} onBack={onBack} />
      <div style={{ display: "flex", background: COLORS.surface2, borderRadius: 12,
padding: 3, marginBottom: 18 }}>
        <button onClick={() => setTab("metas")} style={{ flex: 1, textAlign: "center",
padding: "9px 0", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13,
fontWeight: 600, background: tab === "metas" ? COLORS.surface : "transparent",
color: tab === "metas" ? COLORS.textPrimary : COLORS.textMuted, boxShadow: tab ===
"metas" ? "0 1px 4px rgba(20,20,15,0.1)" : "none" }}>Metas</button>
        <button onClick={() => setTab("projecao")} style={{ flex: 1, textAlign: "center",
padding: "9px 0", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13,
fontWeight: 600, background: tab === "projecao" ? COLORS.surface : "transparent",
color: tab === "projecao" ? COLORS.textPrimary : COLORS.textMuted, boxShadow: tab ===
"projecao" ? "0 1px 4px rgba(20,20,15,0.1)" : "none" }}>Projeção</button>
      </div>
      {tab === "metas" ? (
        <MetasContent state={state} setState={setState} showToast={showToast}
          avgMonthlySurplus={avgMonthlySurplus} totalMonthlyNeeded={totalMonthlyNeeded}
          onNewGoal={() => setFormOpen(true)}
          onEditGoal={(g) => { setEditingGoal(g); setFormOpen(true); }} />
      ) : (
        <ProjecaoContent state={state} monthsEsteAno={monthsEsteAno}
          monthsProximoAno={monthsProximoAno} anual={anual}
          acumuladoAteProximo={acumuladoAteProximo} curYear={curYear} nextYear={nextYear}
          showNextYear={showNextYear} setShowNextYear={setShowNextYear}
          totalMonthlyNeeded={totalMonthlyNeeded} avgMonthlySurplus={avgMonthlySurplus} />
      )}
    </div>
  );
}

// ---------- Projeção ----------
function ProjecaoContent({ state, monthsEsteAno, monthsProximoAno, anual,
acumuladoAteProximo, curYear, nextYear, showNextYear, setShowNextYear,
totalMonthlyNeeded, avgMonthlySurplus }) {
 const exportXLSX = async () => {
   const rows = state.transactions.map(t => ({
    Data: t.date,
    Tipo: t.kind === "entrada" ? "Entrada" : t.kind === "saida" ? "Saída" : "Cartão",
    Conta: t.accountId ? (state.accounts.find(a => a.id === t.accountId)?.nickname ||
state.accounts.find(a => a.id === t.accountId)?.bank || "") : "",
    Cartão: t.cardId ? (state.cards.find(c => c.id === t.cardId)?.nickname ||
state.cards.find(c => c.id === t.cardId)?.cardLabel || "") : "",
    Categoria: state.categories.find(c => c.id === t.categoryId)?.label || "",
    Descrição: t.description || "",
    Valor: t.amount,
    Parcela: t.installmentGroupId ? `${t.installmentIndex}/${t.installmentTotal}` : "",
    Recorrente: t.recurringId ? "Sim" : "",
   }));
   const ws = XLSX.utils.json_to_sheet(rows);
   const wb = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, "Lançamentos");
   const wsInv = XLSX.utils.json_to_sheet(state.investments.map(i => ({
    Ativo: i.name, Tipo: INVESTMENT_TYPES.find(t => t.id === i.type)?.label,
    Investido: investedValueOf(i), Atual: currentValueOf(i),
   })));
   XLSX.utils.book_append_sheet(wb, wsInv, "Investimentos");
   XLSX.writeFile(wb, `financas-${curYear}.xlsx`);
 };

 return (
  <div>
   <div style={{ background: `linear-gradient(135deg, ${COLORS.cyan}20, ${COLORS.surface})`, border: `1px solid ${COLORS.cyan}44`, borderRadius: 18,
padding: 16, marginBottom: 18 }}>
     <div style={{ fontSize: 12, color: COLORS.textMuted }}>Projeção até
dezembro de {curYear}</div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 26, fontWeight: 500, color:
(anual.renda - anual.gastos) >= 0 ? COLORS.positive : COLORS.negative }}
>{currency(anual.renda - anual.gastos)}</div>
      <div style={{ display: "flex", gap: 14, marginTop: 8, fontSize: 12, color:
COLORS.textMuted }}>
        <span>Renda: <b style={{ color: COLORS.textPrimary, fontFamily:
FONT_MONO }}>{currency(anual.renda)}</b></span>
        <span>Gastos: <b style={{ color: COLORS.textPrimary, fontFamily:
FONT_MONO }}>{currency(anual.gastos)}</b></span>
      </div>
      {totalMonthlyNeeded > 0 && (
       <div style={{ fontSize: 12, marginTop: 10, paddingTop: 10, borderTop: `1px
solid ${COLORS.cyan}33`, color: avgMonthlySurplus >= totalMonthlyNeeded ?
COLORS.positive : COLORS.negative }}>
        🎯 Suas metas com prazo (aba Metas) pedem <b>{currency(totalMonthlyNeeded)}/mês</b>
        {avgMonthlySurplus >= totalMonthlyNeeded ? " — sua sobra média projetada cobre isso." :
` — R$ acima da sua sobra média projetada (${currency(avgMonthlySurplus)}/mês).`}
       </div>
      )}
      <div style={{ fontSize: 10.5, color: COLORS.textMuted, marginTop: 8, lineHeight:
1.4 }}>
        Parcelas e recorrências com prazo já entram nos meses futuros (respeitando
o fechamento de cada cartão). O resto do mês futuro usa sua renda cadastrada;
gastos ainda não lançados não são estimados.
      </div>
     </div>

     <div style={{ background: `linear-gradient(135deg, ${COLORS.indigo}18, ${COLORS.surface})`, border: `1px solid ${COLORS.indigo}44`, borderRadius: 18,
padding: 16, marginBottom: 18 }}>
      <div style={{ fontSize: 12, color: COLORS.textMuted }}>Projeção acumulada
até dezembro de {nextYear}</div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 26, fontWeight: 500, color:
(acumuladoAteProximo.renda - acumuladoAteProximo.gastos) >= 0 ? COLORS.positive :
COLORS.negative }}>{currency(acumuladoAteProximo.renda - acumuladoAteProximo.gastos)}</div>
      <div style={{ display: "flex", gap: 14, marginTop: 8, fontSize: 12, color:
COLORS.textMuted }}>
        <span>Renda: <b style={{ color: COLORS.textPrimary, fontFamily:
FONT_MONO }}>{currency(acumuladoAteProximo.renda)}</b></span>
        <span>Gastos: <b style={{ color: COLORS.textPrimary, fontFamily:
FONT_MONO }}>{currency(acumuladoAteProximo.gastos)}</b></span>
      </div>
      <div style={{ fontSize: 10.5, color: COLORS.textMuted, marginTop: 8, lineHeight:
1.4 }}>
        Soma os {monthsEsteAno.length} meses restantes de {curYear} com os 12 meses de {nextYear} — mais de um ano à frente, pra planejar com folga.
      </div>
     </div>

     {monthsEsteAno.map(mo => (
      <div key={mo.key} style={{ display: "flex", alignItems: "center", justifyContent:
"space-between", padding: "12px 14px", marginBottom: 8, borderRadius: 14,
background: mo.isCurrent ? `${COLORS.cyan}18` : COLORS.surface, border: `1px
solid ${mo.isCurrent ? COLORS.cyan : COLORS.border}` }}>
        <div>
         <div style={{ fontWeight: 600, fontSize: 14, color: mo.isCurrent ?
COLORS.cyan : COLORS.textPrimary }}>{monthLabel(mo.m)} {mo.isCurrent && "·mês atual"}</div>
         <div style={{ fontSize: 11, color: COLORS.textMuted }}>
          Renda {currency(mo.rendaProjetada)} · Gastos {currency(mo.gastosReais)}
{!mo.isCurrent && mo.temLancado ? " (já com parcelas/recorrências)" : ""}
         </div>
        </div>
        <div style={{ fontFamily: FONT_MONO, fontWeight: 600, fontSize: 15, color:
mo.saldo >= 0 ? COLORS.positive : COLORS.negative }}>{currency(mo.saldo)}</div>
      </div>
     ))}

     <button onClick={() => setShowNextYear(v => !v)} style={{ width: "100%",
marginTop: 4, marginBottom: showNextYear ? 8 : 14, padding: "11px 0", borderRadius: 14,
border: `1px dashed ${COLORS.indigo}66`, background: showNextYear ? `${COLORS.indigo}12` : "transparent", color: COLORS.indigo, fontSize: 12.5, fontWeight:
600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
gap: 6 }}>
      {showNextYear ? "Ocultar" : "Ver"} meses de {nextYear}
      <ChevronRight size={14} style={{ transform: showNextYear ? "rotate(90deg)" :
"none", transition: "transform 0.15s" }} />
     </button>

     {showNextYear && monthsProximoAno.map(mo => (
      <div key={mo.key} style={{ display: "flex", alignItems: "center", justifyContent:
"space-between", padding: "12px 14px", marginBottom: 8, borderRadius: 14,
background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
        <div>
         <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.textPrimary }}
>{monthLabel(mo.m)}/{String(mo.year).slice(2)}</div>
         <div style={{ fontSize: 11, color: COLORS.textMuted }}>
          Renda {currency(mo.rendaProjetada)} · Gastos {currency(mo.gastosReais)}
{mo.temLancado ? " (já com parcelas/recorrências)" : ""}
         </div>
        </div>
        <div style={{ fontFamily: FONT_MONO, fontWeight: 600, fontSize: 15, color:
mo.saldo >= 0 ? COLORS.positive : COLORS.negative }}>{currency(mo.saldo)}</div>
      </div>
     ))}

     <button onClick={exportXLSX} style={{ width: "100%", marginTop: 14, padding:
"12px 0", borderRadius: 14, border: `1px solid ${COLORS.border}`, background:
COLORS.surface, color: COLORS.textPrimary, fontWeight: 600, fontSize: 14, cursor:
"pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
><Download size={15} /> Exportar planilha (.xlsx)</button>
    </div>
  );
}

// ---------- Configurações ----------
// ---------- Categorias personalizadas ----------
const CATEGORY_ICON_OPTIONS = ["Pizza", "Utensils", "PartyPopper", "Palmtree", "Plane", "Car",
"HeartPulse", "Home", "ShoppingBag", "Repeat", "Rocket", "Zap", "Wallet",
"Sparkles", "Download", "Coins", "Clipboard", "GraduationCap", "CreditCard", "MoreHorizontal",
"Lightbulb", "Wrench", "Briefcase", "Shirt", "PawPrint", "Gift", "Shield", "TrendingDown"];
const CATEGORY_COLOR_OPTIONS = ["#F97316", "#3B82F6", "#A855F7",
"#EF4444", "#EC4899", "#F59E0B", "#6366F1", "#14B8A6", "#06B6D4",
"#22C55E", "#FACC15", "#94A3B8"];

// ---------- Backup e restauração ----------
function BackupSection({ state, setState, showToast }) {
  const [pendingImport, setPendingImport] = useState(null);

 const exportBackup = () => {
  try {
    const payload = JSON.stringify({ app: "financas", version: 2, exportedAt: new
Date().toISOString(), data: state }, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `financas-backup-${todayISO()}.json`;
     document.body.appendChild(a);
     a.click();
     a.remove();
     setTimeout(() => URL.revokeObjectURL(url), 2000);
     showToast("Backup baixado");
   } catch (e) { showToast("Não consegui gerar o arquivo de backup"); }
 };

 const onImportFile = (e) => {
   const file = e.target.files?.[0];
   e.target.value = "";
   if (!file) return;
   const reader = new FileReader();
   reader.onload = () => {
     try {
       const parsed = JSON.parse(reader.result);
       const data = parsed && parsed.app === "financas" && parsed.data ?
parsed.data : parsed;
       if (!data || !Array.isArray(data.accounts) || !Array.isArray(data.transactions))
throw new Error("estrutura");
       setPendingImport(data);
     } catch (err) { showToast("Arquivo inválido — use um backup gerado por este app"); }
   };
   reader.readAsText(file);
 };

 const confirmImport = () => {
   setState(migrateState(pendingImport));
   setPendingImport(null);
   showToast("Backup restaurado");
 };

  return (
   <Section title="Backup">
    <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10,
lineHeight: 1.4 }}>
      Baixe um arquivo com todos os seus dados para guardar por segurança, e
restaure quando precisar (por exemplo, em outro aparelho).
    </div>
    <button onClick={exportBackup} style={saveBtnStyle(COLORS.indigo)}>Baixar
backup (.json)</button>
    <input type="file" accept="application/json,.json" onChange={onImportFile}
id="backup-file-input" style={{ display: "none" }} />
    <label htmlFor="backup-file-input" style={{ ...saveBtnStyle("transparent"),
border: `1px solid ${COLORS.border}`, color: COLORS.textPrimary, display: "block",
textAlign: "center", boxSizing: "border-box" }}>
      Restaurar de um backup
     </label>
     {pendingImport && (
      <div style={{ marginTop: 10, background: COLORS.surface2, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 12 }}>
        <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>
         O arquivo contém <b>{pendingImport.accounts.length} conta(s)</b>,
<b>{(pendingImport.cards || []).length} cartão(ões)</b> e
<b>{pendingImport.transactions.length} lançamento(s)</b>.
         Restaurar vai <b>substituir</b> tudo o que está no app agora.
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
         <button onClick={confirmImport} style={{ ...saveBtnStyle(COLORS.negative),
marginTop: 0, flex: 1, padding: "10px 0", fontSize: 13 }}>Substituir meus dados</button>
         <button onClick={() => setPendingImport(null)}
style={{ ...saveBtnStyle(COLORS.surface2), marginTop: 0, flex: 1, padding: "10px 0",
fontSize: 13 }}>Cancelar</button>
        </div>
      </div>
     )}
    </Section>
  );
}

function CategoryManagerSection({ state, setState, showToast }) {
 const [adding, setAdding] = useState(false);
 const [name, setName] = useState("");
 const [selKinds, setSelKinds] = useState(["saida", "cartao"]);
 const [icon, setIcon] = useState("ShoppingBag");
 const [color, setColor] = useState(CATEGORY_COLOR_OPTIONS[0]);
 const [confirmingId, setConfirmingId] = useState(null);
 const customCats = state.categories.filter(c => c.custom);

  const toggleKind = (k) => setSelKinds(prev => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k]);
  const save = () => {
   if (!name.trim()) { showToast("Dê um nome à categoria"); return; }
   if (selKinds.length === 0) { showToast("Escolha pelo menos um tipo de lançamento"); return; }
   const cat = { id: uid(), label: name.trim(), icon, color, kinds: [...selKinds], custom:
true };
   setState({ ...state, categories: [...state.categories, cat] });
   showToast(`Categoria "${cat.label}" criada`);
   setName(""); setSelKinds(["saida", "cartao"]); setIcon("ShoppingBag");
setColor(CATEGORY_COLOR_OPTIONS[0]); setAdding(false);
 };
 const remove = (id) => {
   setState({
    ...state,
    categories: state.categories.filter(c => c.id !== id),
    transactions: state.transactions.map(t => t.categoryId === id ? { ...t, categoryId:
"outros" } : t),
    recurring: (state.recurring || []).map(r => r.categoryId === id ? { ...r, categoryId:
"outros" } : r),
   });
   showToast("Categoria excluída — lançamentos movidos para Outros");
   setConfirmingId(null);
 };
 const kindLabel = { entrada: "entrada", saida: "saída", cartao: "cartão" };

  return (
   <Section title="Categorias personalizadas">
    {customCats.length === 0 && !adding && (
      <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10,
lineHeight: 1.4 }}>
       Crie categorias próprias (por exemplo: Pets, Beleza, Impostos) para
complementar as padrão.
      </div>
    )}
    {customCats.map(c => {
      const Icon = ICONS[c.icon] || MoreHorizontal;
      return (
       <div key={c.id} style={{ padding: "9px 0", borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
           <div style={{ width: 30, height: 30, borderRadius: 9, background: `${c.color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon
size={14} color={c.color} /></div>
           <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>{c.label}</div>
            <div style={{ fontSize: 10.5, color: COLORS.textMuted }}>{(c.kinds ||
[]).map(k => kindLabel[k]).join(", ")}</div>
           </div>
          </div>
          {confirmingId === c.id ? (
            <ConfirmDelete onConfirm={() => remove(c.id)} onCancel={() =>
setConfirmingId(null)} />
          ):(
            <button onClick={() => setConfirmingId(c.id)} style={rowIconBtn}><Trash2
size={14} /></button>
          )}
        </div>
       </div>
     );
    })}
    {adding ? (
     <div style={{ marginTop: 10 }}>
       <label style={labelStyle}>Nome</label>
       <input value={name} onChange={e => setName(e.target.value)}
placeholder="Ex: Pets" style={inputStyle} />
       <label style={labelStyle}>Vale para</label>
       <div style={{ display: "flex", gap: 6 }}>
        {["entrada", "saida", "cartao"].map(k => (
          <button key={k} onClick={() => toggleKind(k)} style={{ flex: 1, padding: "8px 0", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 600, border: `1px
solid ${selKinds.includes(k) ? COLORS.indigo : COLORS.border}`, background:
selKinds.includes(k) ? `${COLORS.indigo}20` : COLORS.surface, color:
selKinds.includes(k) ? COLORS.indigo : COLORS.textMuted }}
>{kindLabel[k].charAt(0).toUpperCase() + kindLabel[k].slice(1)}</button>
        ))}
       </div>
       <label style={labelStyle}>Ícone</label>
       <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {CATEGORY_ICON_OPTIONS.map(k => {
          const Icon = ICONS[k];
          const active = icon === k;
          return (
            <button key={k} onClick={() => setIcon(k)} style={{ width: 38, height: 38,
borderRadius: 10, cursor: "pointer", border: `1px solid ${active ? color :
COLORS.border}`, background: active ? `${color}20` : COLORS.surface, display:
"flex", alignItems: "center", justifyContent: "center" }}>
             <Icon size={15} color={active ? color : COLORS.textMuted} />
            </button>
          );
        })}
       </div>
       <label style={labelStyle}>Cor</label>
       <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {CATEGORY_COLOR_OPTIONS.map(c => (
          <button key={c} onClick={() => setColor(c)} style={{ width: 30, height: 30,
borderRadius: "50%", cursor: "pointer", background: c, border: color === c ? `2px
solid ${COLORS.textPrimary}` : "2px solid transparent" }} />
         ))}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
         <button onClick={save} style={{ ...saveBtnStyle(COLORS.indigo), marginTop:
0, flex: 1 }}>Criar categoria</button>
         <button onClick={() => setAdding(false)}
style={{ ...saveBtnStyle(COLORS.surface2), marginTop: 0, flex: 1 }}>Cancelar</button>
        </div>
      </div>
     ):(
      <button onClick={() => setAdding(true)} style={{ ...saveBtnStyle("transparent"),
border: `1px solid ${COLORS.indigo}55`, color: COLORS.indigo }}>+ Nova
categoria</button>
     )}
    </Section>
  );
}

function RecorrenciaRow({ r, state, setState, showToast, confirmingId, setConfirmingId }) {
  const count = state.transactions.filter(t => t.recurringId === r.id).length;
  const cat = state.categories.find(c => c.id === r.categoryId) || { label: "Outros", color: "#94A3B8", icon: "MoreHorizontal" };
  const CatIcon = ICONS[cat.icon] || MoreHorizontal;
  const isCard = r.kind === "cartao";
  const card = isCard ? state.cards.find(c => c.id === r.cardId) : null;
  const acc = !isCard ? state.accounts.find(a => a.id === r.accountId) : null;
  const sourceLabel = isCard ? (card?.nickname || card?.cardLabel || "Cartão") : (acc?.nickname || acc?.bank || "Conta");
  const sourceColor = isCard ? (card?.color || COLORS.cartao) : (acc?.color || COLORS.orange);
  const cancel = () => {
    const today = todayISO();
    setState({
      ...state,
      recurring: (state.recurring || []).map(x => x.id === r.id ? { ...x, active: false } : x),
      transactions: state.transactions.filter(t => !(t.recurringId === r.id && t.date >= today)),
    });
    showToast("Recorrência cancelada");
    setConfirmingId(null);
  };
  return (
    <div style={{ padding: "12px 0", borderBottom: `1px solid ${COLORS.border}` }}>
     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
      <div style={{ display: "flex", gap: 10, minWidth: 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: 11, background: `${cat.color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><CatIcon size={17} color={cat.color} /></div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600 }}>{r.description}</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4, background: `${sourceColor}18`, borderRadius: 8, padding: "2px 8px" }}>
            {isCard ? <CreditCard size={11} color={sourceColor} /> : <Wallet size={11} color={sourceColor} />}
            <span style={{ fontSize: 11.5, fontWeight: 700, color: sourceColor }}>{sourceLabel}</span>
          </div>
          <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>
           {r.kind === "entrada" ? "Entrada" : r.kind === "saida" ? "Saída" : "Cartão"} · {r.totalOccurrences ? `${count} de ${r.totalOccurrences} vezes` : `todo dia ${r.dayOfMonth}, sem prazo`}
          </div>
        </div>
      </div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 14, fontWeight: 700, color: r.kind === "entrada" ? COLORS.positive : COLORS.textPrimary, flexShrink: 0 }}>{currency(r.amount)}</div>
     </div>
     {confirmingId === r.id ? (
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={cancel} style={{ ...saveBtnStyle(COLORS.negative), marginTop: 0, flex: 1, padding: "8px 0", fontSize: 12.5 }}>Confirmar cancelamento</button>
        <button onClick={() => setConfirmingId(null)} style={{ ...saveBtnStyle(COLORS.surface2), marginTop: 0, flex: 1, padding: "8px 0", fontSize: 12.5 }}>Voltar</button>
      </div>
     ):(
      <button onClick={() => setConfirmingId(r.id)} style={{ marginTop: 8, background: "none", border: "none", color: COLORS.negative, fontSize: 11.5, cursor: "pointer", padding: 0 }}>Cancelar (mantém o que já passou)</button>
     )}
    </div>
  );
}

function RecorrenciasScreen({ state, setState, onBack, showToast, filterKind, embedded, title }) {
  const base = (state.recurring || []).filter(r => r.active);
  const active = filterKind === "cartao" ? base.filter(r => r.kind === "cartao")
    : filterKind === "conta" ? base.filter(r => r.kind !== "cartao")
    : base;
  const [confirmingId, setConfirmingId] = useState(null);
  const heading = title || "Recorrências";

  if (embedded) {
    return (
      <div>
        <SectionLabel>{heading}</SectionLabel>
        {active.length === 0 ? (
          <div style={{ fontSize: 13, color: COLORS.textMuted, padding: "0 0 16px" }}>Nenhuma recorrência ativa no momento.</div>
        ) : (
          <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: "0 16px", marginBottom: 14 }}>
            {active.map(r => (
              <RecorrenciaRow key={r.id} r={r} state={state} setState={setState} showToast={showToast}
                confirmingId={confirmingId} setConfirmingId={setConfirmingId} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <ScreenHeader title={heading} color={COLORS.indigo} onBack={onBack} />
      <Section title={`Ativas (${active.length})`}>
        {active.length === 0 && <div style={{ fontSize: 13, color: COLORS.textMuted, padding: "8px 0" }}>Nenhuma recorrência ativa no momento.</div>}
        {active.map(r => (
          <RecorrenciaRow key={r.id} r={r} state={state} setState={setState} showToast={showToast}
            confirmingId={confirmingId} setConfirmingId={setConfirmingId} />
        ))}
      </Section>
    </div>
  );
}

// ---------- Metas ----------
function goalIconFor(catId) {
  const map = { viagem: Plane, reserva: Wallet, casa: Home, carro: Car, educacao:
GraduationCap, compra: ShoppingBag, outro: Target };
  return map[catId] || Target;
}
function monthsBetween(fromISO, toISO) {
  const [fy, fm] = fromISO.split("-").map(Number);
  const [ty, tm] = toISO.split("-").map(Number);
  return Math.max(0, (ty - fy) * 12 + (tm - fm));
}

function MetasContent({ state, setState, showToast, avgMonthlySurplus,
totalMonthlyNeeded, onNewGoal, onEditGoal }) {
 const [confirmingId, setConfirmingId] = useState(null);
 const del = (id) => { setState({ ...state, goals: state.goals.filter(g => g.id !== id) });
setConfirmingId(null); };

 return (
   <div>
    {state.goals.length === 0 && (
     <div style={{ textAlign: "center", color: COLORS.textMuted, fontSize: 13,
padding: "20px 0", lineHeight: 1.5 }}>
       Nenhuma meta ainda. Defina um objetivo — uma viagem, uma reserva, o que for
— e acompanhe se está no caminho certo.
     </div>
    )}
    {state.goals.length > 0 && avgMonthlySurplus != null && (
     <div style={{ background: `${COLORS.pink}12`, border: `1px solid ${COLORS.pink}33`,
borderRadius: 14, padding: 14, marginBottom: 16 }}>
      <div style={{ fontSize: 12, color: COLORS.textMuted }}>Sobra média
projetada (aba Projeção)</div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 20, fontWeight: 700, color:
avgMonthlySurplus >= 0 ? COLORS.textPrimary : COLORS.negative }}
>{currency(avgMonthlySurplus)}/mês</div>
      {totalMonthlyNeeded > 0 && (
       <div style={{ fontSize: 11.5, marginTop: 6, color: avgMonthlySurplus >=
totalMonthlyNeeded ? COLORS.positive : COLORS.negative }}>
        {avgMonthlySurplus >= totalMonthlyNeeded
          ? `Cobre os ${currency(totalMonthlyNeeded)}/mês que suas metas com prazo pedem.`
          : `Suas metas com prazo pedem ${currency(totalMonthlyNeeded)}/mês — ${currency(totalMonthlyNeeded - avgMonthlySurplus)} acima da sua sobra média.`}
       </div>
      )}
     </div>
    )}
    {state.goals.map(g => {
     const pct = g.target > 0 ? Math.min(100, ((g.saved || 0) / g.target) * 100) : 0;
     const Icon = goalIconFor(g.category);
     const monthsLeft = g.dueDate ? monthsBetween(todayISO(), g.dueDate) : null;
     const remaining = Math.max(0, g.target - (g.saved || 0));
     const monthlyNeeded = monthsLeft && monthsLeft > 0 ? remaining /
monthsLeft : null;
     const etaMonths = !g.dueDate && avgMonthlySurplus > 0 && remaining > 0
       ? Math.ceil(remaining / avgMonthlySurplus) : null;
     return (
       <div key={g.id} style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 14, marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems:
"flex-start" }}>
         <div onClick={() => onEditGoal(g)}
style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: `${COLORS.pink}22`, display: "flex", alignItems: "center", justifyContent: "center" }}
><Icon size={16} color={COLORS.pink} /></div>
           <div>
             <div style={{ fontWeight: 600, fontSize: 14 }}>{g.label}</div>
             <div style={{ fontSize: 11, color: COLORS.textMuted }}>
              {currency(g.saved || 0)} de {currency(g.target)}{g.dueDate ? ` · até ${new Date(g.dueDate + "T00:00:00").toLocaleDateString("pt-BR")}` : ""}
             </div>
           </div>
          </div>
          {confirmingId === g.id ? (
           <ConfirmDelete onConfirm={() => del(g.id)} onCancel={() =>
setConfirmingId(null)} />
          ):(
           <button onClick={() => setConfirmingId(g.id)} style={{ background: "none",
border: "none", cursor: "pointer", color: COLORS.textMuted }}><Trash2 size={14} /
></button>
          )}
         </div>
         <div style={{ height: 6, borderRadius: 6, background: COLORS.surface2,
marginTop: 12, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background:
COLORS.pink }} />
         </div>
         <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6,
fontSize: 11, color: COLORS.textMuted }}>
         <span>{pct.toFixed(0)}% da meta</span>
         {monthlyNeeded != null && <span>Precisa guardar ~{currency(monthlyNeeded)}/mês</span>}
         {etaMonths != null && <span>No ritmo atual, bate em ~{etaMonths} mês{etaMonths === 1 ? "" : "es"}</span>}
         </div>
        </div>
      );
     })}
     <button onClick={onNewGoal} style={{ width: "100%", padding:
"13px 0", borderRadius: 14, border: "none", background: COLORS.pink, color:
"#1A0512", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>+ Nova meta</button>
    </div>
  );
}

function GoalForm({ state, setState, goal, onBack, showToast }) {
 const editing = !!goal;
 const [label, setLabel] = useState(goal?.label || "");
 const [target, setTarget] = useState(String(goal?.target ?? ""));
 const [saved, setSaved] = useState(String(goal?.saved ?? "0"));
 const [dueDate, setDueDate] = useState(goal?.dueDate || "");
 const [category, setCategory] = useState(goal?.category || "outro");

  const save = () => {
    const t = parseBRNumber(target);
    if (!label || t <= 0) { showToast("Preencha o nome e um valor alvo maior que zero");
return; }
    const payload = { label, target: t, saved: parseBRNumber(saved), dueDate:
dueDate || null, category };
    if (editing) {
      setState({ ...state, goals: state.goals.map(g => g.id === goal.id ?
{ ...g, ...payload } : g) });
      showToast("Meta atualizada");
    } else {
      setState({ ...state, goals: [...state.goals, { id: uid(), ...payload }] });
      showToast("Meta criada");
    }
    onBack();
  };

  return (
   <div>
    <ScreenHeader title={editing ? "Editar meta" : "Nova meta"}
color={COLORS.pink} onBack={onBack} />
    <label style={labelStyle}>Nome da meta</label>
    <input value={label} onChange={e => setLabel(e.target.value)} placeholder="Ex: Viagem pra praia" style={inputStyle} />
    <label style={labelStyle}>Categoria</label>
    <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
      {GOAL_CATEGORIES.map(c => {
       const Icon = goalIconFor(c.id);
       const active = category === c.id;
       return (
         <button key={c.id} onClick={() => setCategory(c.id)} style={{ display: "flex",
flexDirection: "column", alignItems: "center", gap: 4, width: 88, flexShrink: 0, padding: "8px 3px", borderRadius: 12, cursor: "pointer", border: `1px solid ${active ? COLORS.pink :
COLORS.border}`, background: active ? `${COLORS.pink}20` : COLORS.surface }}>
          <Icon size={16} color={COLORS.pink} />
          <span style={{ fontSize: 10, color: COLORS.textMuted, textAlign: "center",
lineHeight: 1.25, wordBreak: "normal", overflowWrap: "normal", width: "100%" }}
>{c.label}</span>
         </button>
       );
      })}
    </div>
    <div style={{ display: "flex", gap: 8 }}>
      <div style={{ flex: 1 }}>
       <label style={labelStyle}>Valor alvo</label>
       <AmountInput value={target} onChange={setTarget} placeholder="0,00" />
      </div>
      <div style={{ flex: 1 }}>
       <label style={labelStyle}>Já guardado</label>
       <AmountInput value={saved} onChange={setSaved} placeholder="0,00" />
      </div>
     </div>
     <label style={labelStyle}>Prazo (opcional)</label>
     <DateInput value={dueDate} onChange={setDueDate} />
     <button onClick={save} style={saveBtnStyle(COLORS.pink)}>{editing ? "Salvar alterações" : "Criar meta"}</button>
    </div>
  );
}

function ConfigScreen({ state, setState, onBack, showToast }) {
 const [name, setName] = useState(state.profile.name || "");
 const [incomeFixed, setIncomeFixed] =
useState(String(state.profile.incomeFixed || state.profile.incomeMonthly || ""));
 const [incomeVariable, setIncomeVariable] =
useState(String(state.profile.incomeVariable || ""));
 const [pinSetup, setPinSetup] = useState("");
 const [brapiToken, setBrapiToken] = useState(state.apiKeys?.brapiToken || "");
 const [confirmingDemo, setConfirmingDemo] = useState(false);
 const [confirmingComplex, setConfirmingComplex] = useState(false);
 const [confirmingUpperClass, setConfirmingUpperClass] = useState(false);
 const [confirmingClear, setConfirmingClear] = useState(false);

 const saveProfile = () => { setState({ ...state, profile: { name,
incomeFixed: parseBRNumber(incomeFixed), incomeVariable: parseBRNumber(incomeVariable) } });
showToast("Perfil atualizado"); };
 const saveBrapiToken = () => { setState({ ...state, apiKeys: { ...state.apiKeys,
brapiToken: brapiToken.trim() } }); showToast("Token salvo"); };
 const savePin = () => { if (pinSetup.length >= 4) { setState({ ...state, pin:
pinSetup }); showToast("PIN configurado"); setPinSetup(""); } };
 const removePin = () => { setState({ ...state, pin: null }); showToast("PIN removido"); };

 return (
  <div>
    <ScreenHeader title="Configurações" color={COLORS.indigo}
onBack={onBack} />
    <Section title="Perfil">
     <label style={labelStyle}>Nome</label>
     <input value={name} onChange={e => setName(e.target.value)}
style={inputStyle} placeholder="Seu nome" />
     <label style={labelStyle}>Renda fixa mensal</label>
     <AmountInput value={incomeFixed} onChange={setIncomeFixed} placeholder="0,00" />
     <label style={labelStyle}>Renda variável (média mensal)</label>
     <AmountInput value={incomeVariable} onChange={setIncomeVariable} placeholder="0,00" />
     <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 6, lineHeight: 1.4 }}>
      Separar os dois deixa a projeção mais realista: a fixa é o que você sabe
que vai entrar (salário, por exemplo); a variável é uma média do que costuma vir
de freelas, comissão etc. Some as duas quando quiser usar um número só.
     </div>
     <button onClick={saveProfile} style={saveBtnStyle(COLORS.indigo)}>Salvar
perfil</button>

    </Section>

    <Section title="🔒 Privacidade e segurança">
     <div style={{ fontSize: 12.5, color: COLORS.textMuted, lineHeight: 1.6 }}>
      <p style={{ margin: "0 0 8px" }}>
       Seus lançamentos, saldos e investimentos ficam guardados <b style={{ color:
COLORS.textPrimary }}>só neste aparelho</b> — não existe login, nuvem ou servidor
por trás do app. Nada do que você digita aqui sai daqui.
      </p>
      <p style={{ margin: "0 0 8px" }}>
       Isso também significa que o app <b style={{ color: COLORS.textPrimary }}
>nunca pede senha de banco</b> nem acesso à sua conta — diferente de apps que
sincronizam automaticamente com instituições financeiras.
      </p>
      <p style={{ margin: 0 }}>
       Como bônus, sem servidor não tem risco de um bug de sincronização bagunçar
seu saldo ou apagar seu histórico — o que já aconteceu com usuários de outros
apps financeiros. Pra levar seus dados pra outro aparelho ou guardar uma cópia,
use o Backup logo abaixo.
      </p>
     </div>
    </Section>

    <Section title="Cotações automáticas">
     <div style={{ fontSize: 12.5, color: COLORS.textMuted, lineHeight: 1.5, marginBottom: 4 }}>
      Criptomoedas são cotadas automaticamente, sem configuração. Pra ações e
FIIs além de PETR4/VALE3/MGLU3/ITUB4 (que são gratuitas), cole aqui um token
gratuito da <b>brapi.dev</b> (crie uma conta lá, sem cartão) — o botão "Atualizar
cotações" na tela de Investimentos usa esse token.
     </div>
     <label style={labelStyle}>Token da brapi.dev</label>
     <input value={brapiToken} onChange={e => setBrapiToken(e.target.value)}
style={inputStyle} placeholder="Cole seu token aqui" />
     <button onClick={saveBrapiToken} style={saveBtnStyle(COLORS.green)}>Salvar
token</button>
    </Section>

    <Section title="Contas e cartões">
     <div style={{ fontSize: 12.5, color: COLORS.textMuted, lineHeight: 1.5 }}>
       Cadastro, edição e limite/vencimento de cada conta e cartão ficam nas
telas de "Contas" e "Cartões" — toque no item na tela inicial e depois no Ícone de
lápis.
     </div>
    </Section>

    <Section title="Segurança">
     {state.pin ? (
       <button onClick={removePin} style={saveBtnStyle(COLORS.negative)}
>Remover PIN</button>
     ):(
       <>
        <label style={labelStyle}>Criar PIN (mín. 4 dígitos)</label>
        <input value={pinSetup} onChange={e => setPinSetup(e.target.value.replace(/\D/g, ""))} inputMode="numeric" onFocus={e => e.target.select()} style={inputStyle} placeholder="••••" />
        <button onClick={savePin} style={saveBtnStyle(COLORS.indigo)}>Ativar PIN</button>
       </>
     )}
    </Section>

    <Section title="Dados de teste">
     <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10,
lineHeight: 1.4 }}>
      Substitui tudo que está cadastrado agora por um exemplo completo, ou apaga
tudo pra recomeçar do zero.
     </div>
     {confirmingDemo ? (
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => { setState(seedDemoData()); showToast("Dados fictícios carregados"); setConfirmingDemo(false); }}
style={{ ...saveBtnStyle(COLORS.teal), marginTop: 0, flex: 1 }}>Confirmar</button>
        <button onClick={() => setConfirmingDemo(false)}
style={{ ...saveBtnStyle(COLORS.surface2), marginTop: 0, flex: 1 }}>Cancelar</button>
      </div>
     ):(
      <button onClick={() => setConfirmingDemo(true)}
style={saveBtnStyle(COLORS.teal)}>Carregar perfil simples</button>
     )}
     {confirmingComplex ? (
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={() => { setState(seedComplexDemoData());
showToast("Perfil complexo carregado"); setConfirmingComplex(false); }}
style={{ ...saveBtnStyle(COLORS.purple), marginTop: 0, flex: 1 }}>Confirmar</button>
        <button onClick={() => setConfirmingComplex(false)}
style={{ ...saveBtnStyle(COLORS.surface2), marginTop: 0, flex: 1 }}>Cancelar</button>
      </div>
     ):(
      <button onClick={() => setConfirmingComplex(true)}
style={{ ...saveBtnStyle(COLORS.purple), marginTop: 8 }}>Carregar perfil complexo
(2 contas, parcelas, empréstimo)</button>
     )}
     {confirmingUpperClass ? (
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={() => { setState(seedUpperClassDemoData());
showToast("Perfil classe média alta carregado"); setConfirmingUpperClass(false); }}
style={{ ...saveBtnStyle(COLORS.amber), marginTop: 0, flex: 1 }}>Confirmar</button>
        <button onClick={() => setConfirmingUpperClass(false)}
style={{ ...saveBtnStyle(COLORS.surface2), marginTop: 0, flex: 1 }}>Cancelar</button>
      </div>
     ):(
      <button onClick={() => setConfirmingUpperClass(true)}
style={{ ...saveBtnStyle(COLORS.amber), marginTop: 8 }}>Carregar perfil classe média alta
(renda 20k, assinaturas, parcelas grandes)</button>
     )}
     {confirmingClear ? (
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={() => { setState({ ...DEFAULT_STATE }); showToast("Tudo limpo"); setConfirmingClear(false); }} style={{ ...saveBtnStyle(COLORS.negative),
marginTop: 0, flex: 1 }}>Confirmar</button>
        <button onClick={() => setConfirmingClear(false)}
style={{ ...saveBtnStyle(COLORS.surface2), marginTop: 0, flex: 1 }}>Cancelar</button>
      </div>
     ):(
      <button onClick={() => setConfirmingClear(true)}
style={{ ...saveBtnStyle("transparent"), border: `1px solid ${COLORS.negative}55`,
color: COLORS.negative, marginTop: 8 }}>Limpar todos os dados</button>
     )}
    </Section>

   <CategoryManagerSection state={state} setState={setState}
showToast={showToast} />

   <BackupSection state={state} setState={setState} showToast={showToast} />

   <div style={{ textAlign: "center", padding: "18px 0 4px", fontSize: 11,
color: COLORS.textMuted }}>
    Finanças · v{APP_VERSION}
    <br />
    © {new Date().getFullYear()} {APP_AUTHOR}. Todos os
direitos reservados.
   </div>
      </div>
    );
}
