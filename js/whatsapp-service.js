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
   * Formata e envia a solicitação do Simulador Sob Medida
   */
  sendCustomQuote(data) {
    const dateStr = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    const lines = [
      `🎨 *SOLICITAÇÃO DE QUADRO SOB MEDIDA — ARTE EXPRESSO* 🎨`,
      `📅 *Data:* ${dateStr}`,
      ``,
      `👤 *DADOS DO CLIENTE:*`,
      `• *Nome:* ${data.name || "Não informado"}`,
      `• *WhatsApp:* ${data.phone || "Não informado"}`,
      `• *Cidade / UF:* ${data.city || "Não informada"}`,
      ``,
      `🖼️ *ESPECIFICAÇÕES DA OBRA:*`,
      `• *Estilo:* ${data.styleName || "Personalizado"}`,
      `• *Dimensões:* ${data.dimensions || "A combinar"}`,
      `• *Orientação:* ${data.orientation || "Horizontal"}`,
      `• *Moldura:* ${data.frameName || "Filete Flutuante"}`,
      `• *Ambiente:* ${data.roomName || "Sala de Estar"}`,
      `• *Paleta de Cores:* ${data.paletteName || "A combinar com artista"}`,
      ``
    ];

    if (data.estimatedPrice) {
      lines.push(`💰 *Estimativa de Referência:* ${data.estimatedPrice}`);
    }

    if (data.notes && data.notes.trim()) {
      lines.push(`📝 *Observações / Detalhes:*`);
      lines.push(`"${data.notes.trim()}"`);
      lines.push(``);
    }

    lines.push(`✨ *Enviado pelo Simulador Oficial* (arte.expresso)`);
    lines.push(`_Gostaria de receber a consultoria visual e o orçamento formal sem compromisso!_`);

    const fullMessage = lines.join("\n");
    this.openWhatsApp(fullMessage);
  },

  /**
   * Envia pedido de orçamento para uma obra específica do catálogo
   */
  sendCatalogArtworkQuote(artwork, customSize = null, customFrame = null) {
    const sizeInfo = customSize || artwork.popularSizes[0] || "Tamanho padrão";
    const frameInfo = customFrame || "Moldura Filete Flutuante Premium";

    const lines = [
      `🎨 *INTERESSE EM OBRA DO CATÁLOGO — ARTE EXPRESSO*`,
      ``,
      `🖼️ *Obra:* ${artwork.title} (Cód: ${artwork.id})`,
      `• *Estilo / Categoria:* ${artwork.categoryLabel}`,
      `• *Técnica:* ${artwork.technique}`,
      `• *Tamanho Desejado:* ${sizeInfo}`,
      `• *Moldura Preferida:* ${frameInfo}`,
      `• *Valor Inicial de Referência:* ${artwork.priceFrom}`,
      ``,
      `💬 _Olá! Amei essa obra e gostaria de saber o valor no meu tamanho e o prazo de entrega para minha cidade._`
    ];

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
