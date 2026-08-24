/**
 * Serviço de Integração com WhatsApp - Arte Expresso (@arte.expresso)
 * Número Comercial: (11) 95793-4714 -> 5511957934714
 */

const WHATSAPP_CONFIG = {
  phone: "5511957934714",
  displayPhone: "(11) 95793-4714",
  instagram: "https://www.instagram.com/arte.expresso/",
  instagramHandle: "@arte.expresso",
  businessHours: "Segunda a Sábado, das 09h às 20h"
};

const WhatsAppService = {
  /**
   * Abre o WhatsApp com a mensagem formatada
   */
  openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message.trim());
    const url = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodedMessage}`;
    
    // Tenta abrir em nova aba
    window.open(url, "_blank");
  },

  /**
   * Formata e envia a solicitação do Formulário de Encomenda Sob Medida
   */
  sendCustomQuote(data) {
    const lines = [
      `🎨 *ENCOMENDA DE QUADRO SOB MEDIDA — ARTE EXPRESSO*`,
      ``,
      `👤 *CLIENTE:*`,
      `• *Nome:* ${data.name || "Cliente"}`,
      data.city ? `• *Cidade/UF:* ${data.city}` : null,
      ``
    ].filter(Boolean);

    if (data.notes && data.notes.trim()) {
      lines.push(`📝 *O que tem em mente / Detalhes:*`);
      lines.push(`"${data.notes.trim()}"`);
      lines.push(``);
    }

    lines.push(`💬 _Olá! Gostaria de conversar com o artista para definirmos as medidas ideais para a minha parede, cores e o orçamento formal!_`);

    const fullMessage = lines.join("\n");
    this.openWhatsApp(fullMessage);
  },

  /**
   * Envia pedido de orçamento para uma obra específica do catálogo
   */
  sendCatalogArtworkQuote(artwork, customSize = null, customFrame = null) {
    const sizeInfo = customSize || (artwork.popularSizes ? artwork.popularSizes[0] : "Tamanho sob medida");
    const frameInfo = customFrame || "Moldura Filete Flutuante Premium";

    const lines = [
      `🎨 *INTERESSE EM OBRA DO CATÁLOGO — ARTE EXPRESSO*`,
      ``,
      `🖼️ *Obra:* ${artwork.title} (Cód: ${artwork.id})`,
      `• *Estilo / Categoria:* ${artwork.categoryLabel}`,
      `• *Técnica:* ${artwork.technique}`,
      `• *Tamanho Desejado:* ${sizeInfo}`,
      `• *Moldura Preferida:* ${frameInfo}`
    ];

    if (artwork.priceFrom && artwork.priceFrom.trim()) {
      lines.push(`• *Valor de Referência:* ${artwork.priceFrom}`);
    }

    lines.push(``);
    lines.push(`💬 _Olá! Amei essa obra e gostaria de saber o orçamento para meu tamanho e prazo de entrega para minha cidade._`);

    const fullMessage = lines.join("\n");
    this.openWhatsApp(fullMessage);
  },

  /**
   * Envia solicitação rápida de consultoria de medidas com foto do ambiente
   */
  sendConsultationRequest(name = "", roomType = "Sala") {
    const lines = [
      `📐 *CONSULTORIA GRATUITA DE MEDIDAS & AMBIENTE — ARTE EXPRESSO*`,
      ``,
      `👤 *Nome:* ${name || "Cliente"}`,
      `🏠 *Ambiente:* ${roomType}`,
      ``,
      `💬 _Olá! Gostaria de ajuda para definir o tamanho ideal e o estilo de quadro para a minha parede. Vou enviar a foto do meu ambiente aqui na sequência!_`
    ];

    const fullMessage = lines.join("\n");
    this.openWhatsApp(fullMessage);
  },

  /**
   * Conversa direta / Dúvidas gerais
   */
  sendGeneralChat(messageTopic = "Dúvidas sobre quadros sob medida") {
    const message = `Olá! Gostaria de tirar dúvidas com o artista da *Arte Expresso* sobre quadros sob encomenda e prazos.`;
    this.openWhatsApp(message);
  }
};
