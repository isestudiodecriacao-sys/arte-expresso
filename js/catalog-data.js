/**
 * Catálogo de Artes e Quadros Sob Medida - Arte Expresso (@arte.expresso)
 * WhatsApp Comercial: (11) 95793-4714
 * Nota: Os valores aparecem apenas quando definidos pelo administrador no Painel de Gestão.
 */

const DEFAULT_CATEGORIES = [
  { id: "all", name: "Todas as Obras" },
  { id: "popart", name: "Pop Art & Street" },
  { id: "contemporaneo", name: "Contemporâneos & Conceituais" },
  { id: "texturizado", name: "Texturizados 3D" },
  { id: "abstrato", name: "Abstratos Modernos" },
  { id: "minimalista", name: "Minimalistas & Neutros" },
  { id: "personalizado", name: "Sob Medida & Personalizados" }
];

const CATALOG_DATA = [
  {
    id: "EXP-01",
    title: "David no Cinema (Pop Classic)",
    category: "popart",
    categoryLabel: "Pop Art Contemporânea",
    technique: "Pintura mista sobre tela de algodão com intervenção pop art e relevo espatulado",
    description: "Fusão marcante da estética renascentista com a cultura pop do cinema. A escultura clássica ganha vida contemporânea com óculos neon e balde de pipoca, criando um ponto focal magnético no ambiente.",
    popularSizes: ["80x100 cm", "90x120 cm", "100x140 cm", "120x160 cm"],
    priceFrom: null,
    image: "assets/images/obras/obra-pop-cinema-david.png",
    featured: true,
    tag: "Mais Pedido",
    palette: ["#1F1F24", "#D1D5DB", "#F97316", "#FAFAFA"]
  },
  {
    id: "EXP-02",
    title: "Pop Street Good Day",
    category: "popart",
    categoryLabel: "Street Art & Pop Culture",
    technique: "Pintura mista, estêncil e acrílica sobre tela com texturas urbanas e grafite",
    description: "Homenagem aos ícones da cultura pop e da televisão com estética street art, traços em grafite spray, donut vitrificado e tipografia urbana vibrante.",
    popularSizes: ["70x100 cm", "80x120 cm", "90x140 cm", "100x150 cm"],
    priceFrom: null,
    image: "assets/images/obras/obra-pop-chaves-donut.png",
    featured: true,
    tag: "Street Art",
    palette: ["#EC4899", "#38BDF8", "#FBBF24", "#111827"]
  },
  {
    id: "EXP-03",
    title: "Restauração Renascentista Tech",
    category: "contemporaneo",
    categoryLabel: "Arte Conceitual & Renascença",
    technique: "Pintura a óleo e acrílico com técnica clássica renascentista e intervenção futurista",
    description: "Diálogo entre a herança da pintura clássica e o avanço tecnológico contemporâneo. Obra conceitual e envolvente, perfeita para livings elegantes e escritórios de arquitetura ou tecnologia.",
    popularSizes: ["120x80 cm", "150x100 cm", "180x120 cm", "200x130 cm"],
    priceFrom: null,
    image: "assets/images/obras/obra-renascenca-robotica.png",
    featured: true,
    tag: "Conceitual",
    palette: ["#1E3A8A", "#D97706", "#92400E", "#F3F4F6"]
  },
  {
    id: "EXP-04",
    title: "Surrealismo Multiverso (Dalí & Rick)",
    category: "popart",
    categoryLabel: "Pop Art & Surrealismo",
    technique: "Retrato em preto e branco de alta precisão com aplicação de faixa pop colorida em relevo",
    description: "O gênio do surrealismo Salvador Dalí encontra a ousadia do multiverso contemporâneo em uma composição monocromática marcante com destaque para a faixa colorida tridimensional.",
    popularSizes: ["80x80 cm", "90x90 cm", "100x100 cm", "120x120 cm"],
    priceFrom: null,
    image: "assets/images/obras/obra-dali-rick.png",
    featured: true,
    tag: "Edição Exclusiva",
    palette: ["#18181B", "#7DD3FC", "#FCD34D", "#FFFFFF"]
  },
  {
    id: "EXP-05",
    title: "Sétima Arte / O Cinegrafista",
    category: "contemporaneo",
    categoryLabel: "Cinema & Figurativo Moderno",
    technique: "Composição artística figurativa com câmera cinematográfica vintage e geometria moderna",
    description: "Homenagem à era de ouro do cinema em contraste com plano geométrico azul celeste e base em preto absoluto. Cria sofisticação imediata para home cinemas, salas de estar e estúdios.",
    popularSizes: ["80x100 cm", "90x120 cm", "100x140 cm", "120x160 cm"],
    priceFrom: null,
    image: "assets/images/obras/obra-cinema-vintage.png",
    featured: true,
    tag: "Cinema & Design",
    palette: ["#0284C7", "#18181B", "#71717A", "#F4F4F5"]
  },
  {
    id: "EXP-06",
    title: "Quadro 100% Personalizado do Zero",
    category: "personalizado",
    categoryLabel: "Sob Encomenda Exclusiva",
    technique: "Pintado à mão pelo artista sob medida com as cores, medidas e tema do seu ambiente",
    description: "Tem uma ideia, uma foto de referência ou gostaria de uma pintura exclusiva para combinar com as cores do seu espaço? Nosso artista desenha e pinta sob medida especialmente para você.",
    popularSizes: ["Sob Medida Livre (Qualquer Tamanho)"],
    priceFrom: null,
    image: "assets/images/hero-banner-artista.jpg",
    featured: true,
    tag: "Consultoria Grátis",
    palette: ["#D4AF37", "#10B981", "#111827", "#FFFFFF"]
  }
];

const STYLES_LIST = [
  {
    id: "texturizado_ouro",
    name: "Texturizado 3D com Folha de Ouro",
    badge: "Mais Procurado",
    icon: "sparkles",
    desc: "Relevo escultórico espatulado na tela com fendas brilhantes em folha de ouro 24k ou prata.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "abstrato_moderno",
    name: "Abstrato Contemporâneo",
    badge: "Tendência",
    icon: "palette",
    desc: "Composições livres e harmônicas com paletas personalizadas para combinar com sua decoração.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "minimalista_neutro",
    name: "Minimalista & Tons Neutros",
    badge: "Sofisticado",
    icon: "feather",
    desc: "Tons de linho, fendi, off-white e areia com texturas suaves e sensação de paz visual.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "retrato_realista",
    name: "Retrato & Desenho Realista",
    badge: "Especialidade @arte.expresso",
    icon: "user",
    desc: "Retratos de família, pets, casais ou figuras ilustres pintados com realismo impressionante.",
    image: "https://images.unsplash.com/photo-1578925518470-4def7a0f08bb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "diptico_triptico",
    name: "Conjunto Díptico ou Tríptico",
    badge: "Grandes Paredes",
    icon: "grid",
    desc: "2 ou 3 telas integradas que formam uma única narrativa visual contínua e imponente.",
    image: "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "personalizado_total",
    name: "Criar do Zero com Minha Referência",
    badge: "100% Exclusivo",
    icon: "wand2",
    desc: "Envie fotos do seu ambiente ou referências da internet e criamos a composição sob medida.",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=600&q=80"
  }
];

const FRAMES_LIST = [
  {
    id: "filete_dourada",
    name: "Filete Flutuante Dourada",
    color: "#D4AF37",
    tag: "Premium",
    desc: "Moldura chanfrada de alta qualidade com acabamento em ouro champanhe acetinado."
  },
  {
    id: "filete_preta",
    name: "Filete Flutuante Preta Fosca",
    color: "#1E1E1E",
    tag: "Moderna",
    desc: "Acabamento minimalista em preto fosco com espaçamento canaleta de 8mm."
  },
  {
    id: "filete_amadeirada",
    name: "Filete Madeira Freijó / Carvalho",
    color: "#8B5A2B",
    tag: "Aconchegante",
    desc: "Madeira maciça tratada com veios naturais para ambientes quentes e sofisticados."
  },
  {
    id: "filete_branca",
    name: "Filete Branca Acetinada",
    color: "#F3F4F6",
    tag: "Clean",
    desc: "Perfeito para decorações em tons claros, estilo escandinavo ou praiano."
  },
  {
    id: "filete_prata",
    name: "Filete Flutuante Prata / Alumínio",
    color: "#C0C0C0",
    tag: "Contemporânea",
    desc: "Elegância neutra com reflexo metálico sutil para espaços cosmopolitas."
  },
  {
    id: "sem_moldura",
    name: "Borda Infinita (Chassi Painel 4cm)",
    color: "#4B5563",
    tag: "Galeria Pura",
    desc: "Tela esticada em chassi de madeira reforçada de 4cm com pintura contínua nas laterais."
  }
];

const POPULAR_SIZES = [
  { width: 120, height: 80, label: "120 x 80 cm", orient: "horizontal", desc: "Ideal para sofás de 2 a 3 lugares", isPopular: true },
  { width: 150, height: 90, label: "150 x 90 cm", orient: "horizontal", desc: "Tamanho nobre para salas de estar e livings", isPopular: true },
  { width: 180, height: 100, label: "180 x 100 cm", orient: "horizontal", desc: "Grandes formatos / Parede principal", isPopular: true },
  { width: 200, height: 100, label: "200 x 100 cm", orient: "horizontal", desc: "Formato imponente para livings amplos", isPopular: false },
  { width: 100, height: 70, label: "100 x 70 cm", orient: "horizontal", desc: "Compacto para corredores ou quartos", isPopular: false },
  { width: 80, height: 120, label: "80 x 120 cm", orient: "vertical", desc: "Vertical para hall de entrada ou colunas", isPopular: false },
  { width: 100, height: 150, label: "100 x 150 cm", orient: "vertical", desc: "Vertical imponente para pé direito duplo", isPopular: false },
  { width: 100, height: 100, label: "100 x 100 cm", orient: "quadrado", desc: "Quadrado clássico e equilibrado", isPopular: false },
  { width: 120, height: 120, label: "120 x 120 cm", orient: "quadrado", desc: "Quadrado amplo para sala de jantar", isPopular: false },
  { width: 160, height: 100, label: "Díptico 2x (80x100 cm)", orient: "diptico", desc: "Conjunto de 2 quadros integrados", isPopular: true },
  { width: 210, height: 90, label: "Tríptico 3x (70x90 cm)", orient: "triptico", desc: "Conjunto triplo para grandes espaços", isPopular: false }
];

const ROOMS_LIST = [
  { id: "sala_estar", name: "Sala de Estar / Living", icon: "sofa" },
  { id: "sala_jantar", name: "Sala de Jantar", icon: "utensils" },
  { id: "quarto_casal", name: "Quarto de Casal / Cabeceira", icon: "bed" },
  { id: "hall_entrada", name: "Hall de Entrada / Corredor", icon: "door-open" },
  { id: "escritorio", name: "Escritório / Consultório", icon: "briefcase" },
  { id: "outro", name: "Outro Espaço Especial", icon: "home" }
];

const PALETTES_LIST = [
  { id: "ouro_neutros", name: "Folha de Ouro + Areia, Fendi & Concreto", colors: ["#D4AF37", "#E6DFD5", "#938A7E", "#2B2A29"] },
  { id: "terracota_quente", name: "Terracota, Ocre, Bege Cru & Carvão", colors: ["#C86D51", "#E8D8C3", "#3C3733", "#C29B38"] },
  { id: "minimalista_fendi", name: "Minimalista Off-White, Linho & Fendi", colors: ["#FAF8F5", "#DED7CC", "#A39B8E", "#615C54"] },
  { id: "marinho_prata", name: "Azul Marinho Profundo, Turquesa & Prata", colors: ["#1B2E4B", "#3182CE", "#E2E8F0", "#718096"] },
  { id: "preto_branco_luxo", name: "Preto Fosco, Grafite & Folha de Ouro", colors: ["#18181B", "#CA8A04", "#71717A", "#FFFFFF"] },
  { id: "personalizada", name: "Quero enviar foto do meu ambiente", colors: ["#9CA3AF", "#6B7280", "#4B5563", "#374151"] }
];

const TESTIMONIALS = [
  {
    name: "Dra. Carolina Mendonça",
    role: "Proprietária - Jardins, SP",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    comment: "O quadro ficou simplesmente espetacular na minha sala de jantar! A textura 3D e a folha de ouro ao vivo têm um brilho incrível quando a iluminação bate. O atendimento no WhatsApp tirou todas as dúvidas de medidas antes de começar.",
    rating: 5,
    city: "São Paulo, SP",
    artwork: "Quadro Texturizado Ouro 180x100cm",
    verified: true
  },
  {
    name: "Rodrigo & Paula Alencar",
    role: "Apartamento Novo - Moema, SP",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    comment: "Estávamos há meses procurando um quadro grande pro sofá de 3 metros. Mandamos a foto da nossa parede e o artista sugeriu as cores exatas para harmonizar com as almofadas e o tapete. Chegou impecável na caixa de madeira reforçada!",
    rating: 5,
    city: "São Paulo, SP",
    artwork: "Abstrato Sob Medida 200x100cm",
    verified: true
  },
  {
    name: "Arq. Mariana Silveira",
    role: "Arquiteta de Interiores",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    comment: "Parceiros de confiança para os meus projetos de clientes exigentes. O acabamento da moldura filete e a qualidade das tintas são de nível de galeria de arte. Meus clientes ficam encantados quando recebem o vídeo da tela pronta antes do envio.",
    rating: 5,
    city: "Campinas, SP",
    artwork: "Conjunto Díptico Dourado",
    verified: true
  }
];

const FAQS = [
  {
    q: "Como funciona a encomenda de um quadro sob medida?",
    a: "É muito simples e transparente! 1º Você escolhe o estilo e informa as medidas aproximadas aqui no site ou no WhatsApp. 2º Nossa equipe alinha a proposta de cores e o tamanho ideal para sua parede. 3º O artista produz a pintura 100% à mão. 4º Antes de enviar, mandamos fotos e vídeos em alta resolução da tela pronta para sua aprovação final. 5º Enviamos em embalagem de madeira reforçada com seguro total até a sua porta."
  },
  {
    q: "O quadro já vem pronto para pendurar na parede?",
    a: "Sim! Todos os nossos quadros vão prontos para pendurar, com chassi de madeira tratada, suporte traseiro reforçado e a moldura filete flutuante de sua escolha já instalada com precisão milimétrica."
  },
  {
    q: "Qual o prazo de confecção e entrega?",
    a: "O prazo médio de pintura artesanal, secagem e emolduramento é de 7 a 12 dias úteis. O prazo de transporte varia conforme a sua cidade (geralmente de 2 a 6 dias úteis para a Grande SP e capitais). Se você tiver urgência, nos avise no WhatsApp para priorizarmos seu pedido."
  },
  {
    q: "Vocês enviam para todo o Brasil? Como é feita a embalagem?",
    a: "Sim, enviamos com segurança total para todo o território nacional. Desenvolvemos uma embalagem especial com cantoneiras de alta densidade, plástico bolha reforçado e caixa externa de madeira/compensado para garantir que a obra chegue 100% intacta."
  },
  {
    q: "Como posso pagar pelo meu quadro?",
    a: "Aceitamos Pix (com condição especial à vista) e Cartão de Crédito em até 12x. Todas as condições de pagamento e link de pagamento seguro são combinados diretamente no WhatsApp oficial."
  },
  {
    q: "Posso mandar a foto da minha sala para vocês me ajudarem com o tamanho e as cores?",
    a: "Com certeza! É um dos nossos maiores diferenciais. Você pode nos enviar uma foto da sua parede no WhatsApp e fazemos uma consultoria visual gratuita com simulação do quadro no seu espaço."
  }
];
