// Application State & CMS Dynamic Storage Connectors
const DB_KEYS = {
  artworks: "arte_expresso_artworks_v3",
  styles: "arte_expresso_styles_v2",
  sizes: "arte_expresso_sizes_v2",
  frames: "arte_expresso_frames_v2",
  rooms: "arte_expresso_rooms_v2",
  palettes: "arte_expresso_palettes_v2",
  testimonials: "arte_expresso_testimonials_v2",
  faqs: "arte_expresso_faqs_v2",
  settings: "arte_expresso_settings_v2"
};

function getActiveCatalog() {
  const saved = localStorage.getItem(DB_KEYS.artworks);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return typeof CATALOG_DATA !== "undefined" ? CATALOG_DATA : [];
}

function getActiveStyles() {
  const saved = localStorage.getItem(DB_KEYS.styles);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return typeof STYLES_LIST !== "undefined" ? STYLES_LIST : [];
}

function getActiveSizes() {
  const saved = localStorage.getItem(DB_KEYS.sizes);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return typeof POPULAR_SIZES !== "undefined" ? POPULAR_SIZES : [];
}

function getActiveFrames() {
  const saved = localStorage.getItem(DB_KEYS.frames);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return typeof FRAMES_LIST !== "undefined" ? FRAMES_LIST : [];
}

function getActiveRooms() {
  const saved = localStorage.getItem(DB_KEYS.rooms);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return typeof ROOMS_LIST !== "undefined" ? ROOMS_LIST : [];
}

function getActivePalettes() {
  const saved = localStorage.getItem(DB_KEYS.palettes);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return typeof PALETTES_LIST !== "undefined" ? PALETTES_LIST : [];
}

function getActiveTestimonials() {
  const saved = localStorage.getItem(DB_KEYS.testimonials);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return typeof TESTIMONIALS !== "undefined" ? TESTIMONIALS : [];
}

function getActiveFAQs() {
  const saved = localStorage.getItem(DB_KEYS.faqs);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return typeof FAQS !== "undefined" ? FAQS : [];
}

function getActiveSettings() {
  const saved = localStorage.getItem(DB_KEYS.settings);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return {
    whatsapp: "5511957934714",
    displayPhone: "(11) 95793-4714",
    instagram: "https://www.instagram.com/arte.expresso/",
    announcement: "Quadros 100% Pintados à Mão Sob Medida • Envio com Seguro Total para Todo o Brasil"
  };
}

const appState = {
  customizer: {
    step: 1,
    styleId: "texturizado_ouro",
    styleName: "Texturizado 3D com Folha de Ouro",
    styleImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    orientation: "horizontal",
    sizeLabel: "150 x 90 cm",
    width: 150,
    height: 90,
    isCustomSize: false,
    frameId: "filete_dourada",
    frameName: "Filete Flutuante Dourada",
    frameColor: "#D4AF37",
    roomId: "sala_estar",
    roomName: "Sala de Estar / Living",
    paletteId: "ouro_neutros",
    paletteName: "Folha de Ouro + Areia, Fendi & Concreto",
    customerName: "",
    customerPhone: "",
    customerCity: "",
    notes: "",
    estimatedPrice: "Orçamento Sob Medida no WhatsApp"
  },
  activeCatalogCategory: "all"
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initLucideIcons();
  renderCatalog("all");
  initTestimonials();
  initFAQ();
  initEventListeners();
  initScrollAnimations();
  initTiltEffects();
  initSecretAdminTrigger();
});

/* ==========================================================================
   0. PRELOADER & LOADING EXPERIENCE
   ========================================================================== */

function initPreloader() {
  const preloader = document.getElementById("site-preloader");
  if (!preloader) return;

  const minDisplayTime = 900;
  const startTime = Date.now();

  function dismiss() {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minDisplayTime - elapsed);

    setTimeout(() => {
      preloader.classList.add("preloader-hidden");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 750);
    }, remaining);
  }

  if (document.readyState === "complete") {
    dismiss();
  } else {
    window.addEventListener("load", dismiss);
    setTimeout(dismiss, 3000); // Fallback de segurança
  }
}

function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/* ==========================================================================
   1. CATALOG RENDERING & FILTERING
   ========================================================================== */

function renderCatalog(category = "all") {
  const container = document.getElementById("catalog-grid");
  if (!container) return;

  const catalog = getActiveCatalog();
  const filteredData = category === "all" 
    ? catalog 
    : catalog.filter(item => item.category === category);

  container.innerHTML = filteredData.map(item => `
    <div class="product-reference-card flex flex-col justify-between group p-3.5 sm:p-4">
      
      <!-- Card Header (Reference Style: Title + Location + Badge) -->
      <div class="flex items-start justify-between gap-2 mb-2.5">
        <div class="min-w-0 flex-1">
          <h3 
            onclick="openArtworkModal('${item.id}')"
            class="font-sans font-bold text-sm sm:text-base text-gray-900 group-hover:text-black transition-colors cursor-pointer leading-snug truncate"
            title="${item.title}"
          >
            ${item.title}
          </h3>
          <p class="text-[11px] sm:text-xs text-gray-500 flex items-center gap-1.5 mt-0.5 truncate">
            <span class="truncate">Ateliê Sob Medida</span>
            <span class="text-gray-300">•</span>
            <span class="font-mono text-[10px] sm:text-[11px] text-gray-400 shrink-0">Cód: ${item.id}</span>
          </p>
        </div>

        <div class="flex items-center gap-1 shrink-0 pt-0.5">
          <span class="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold bg-gray-100 text-gray-700 border border-gray-200 whitespace-nowrap">
            ${item.categoryLabel}
          </span>
          ${item.priceFrom && item.priceFrom.trim() ? `
            <span class="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
              ${item.priceFrom}
            </span>
          ` : ''}
        </div>
      </div>

      <!-- Artwork Image with Clean Meta Badges -->
      <div class="relative aspect-[16/11] rounded-xl overflow-hidden bg-gray-100 cursor-pointer mb-3" onclick="openArtworkModal('${item.id}')">
        <img 
          src="${item.image}" 
          alt="${item.title}" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity"></div>
        
        <!-- Top Floating Status Badge -->
        <div class="absolute top-2 right-2">
          <span class="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-white/95 text-gray-900 shadow-sm backdrop-blur-md">
            100% Pintura Manual
          </span>
        </div>

        <!-- Bottom Meta Bar (Compact & Clean) -->
        <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] sm:text-[11px] text-white font-medium">
          <span class="flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded-md backdrop-blur-md truncate max-w-[60%]">
            <i data-lucide="sparkles" class="w-3 h-3 text-amber-300 shrink-0"></i>
            <span class="truncate">${item.tag || 'Obra Original'}</span>
          </span>
          <span class="flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded-md backdrop-blur-md shrink-0">
            <i data-lucide="truck" class="w-3 h-3 text-emerald-300 shrink-0"></i>
            <span>Envio Seguro</span>
          </span>
        </div>
      </div>

      <!-- Sub-footer Attributes in 3 Columns (Reference Style) -->
      <div class="grid grid-cols-3 gap-1.5 sm:gap-2 py-2 border-t border-gray-100 text-center mb-3">
        <div class="text-left overflow-hidden">
          <span class="block text-[8px] sm:text-[9px] uppercase tracking-wider text-gray-400 font-bold truncate">Tamanho</span>
          <span class="text-[11px] sm:text-xs font-semibold text-gray-800 truncate block tabular-nums">${item.popularSizes ? item.popularSizes[0] : 'Sob Medida'}</span>
        </div>
        <div class="text-center overflow-hidden">
          <span class="block text-[8px] sm:text-[9px] uppercase tracking-wider text-gray-400 font-bold truncate">Estrutura</span>
          <span class="text-[11px] sm:text-xs font-semibold text-gray-800 block truncate">Chassi Imunizado</span>
        </div>
        <div class="text-right overflow-hidden">
          <span class="block text-[8px] sm:text-[9px] uppercase tracking-wider text-gray-400 font-bold truncate">Garantia</span>
          <span class="text-[11px] sm:text-xs font-semibold text-emerald-600 block truncate">Aprovação Vídeo</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2">
        <button 
          onclick="orderCatalogItem('${item.id}')"
          class="btn-solid-black flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <svg class="w-3.5 h-3.5 fill-emerald-400 shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <span>Pedir no WhatsApp</span>
        </button>
        <button 
          onclick="customizeFromCatalog('${item.id}')"
          title="Personalizar Medidas"
          class="btn-outline-clean p-2.5 rounded-xl transition-all"
        >
          <i data-lucide="sliders" class="w-4 h-4 text-gray-700"></i>
        </button>
      </div>

    </div>
  `).join('');

  initLucideIcons();
  if (typeof initTiltEffects === "function") initTiltEffects();
  if (typeof initScrollAnimations === "function") initScrollAnimations();
}

function filterCatalog(category, buttonElement) {
  appState.activeCatalogCategory = category;
  
  // Atualiza classes ativas nos botões
  const buttons = document.querySelectorAll(".catalog-filter-btn");
  buttons.forEach(btn => {
    btn.classList.remove("bg-black", "text-white", "shadow-sm");
    btn.classList.add("bg-gray-100", "text-gray-700", "border", "border-gray-200");
  });

  if (buttonElement) {
    buttonElement.classList.remove("bg-gray-100", "text-gray-700", "border", "border-gray-200");
    buttonElement.classList.add("bg-black", "text-white", "shadow-sm");
  }

  renderCatalog(category);
}

function handleHeroSearchOrder() {
  const style = document.getElementById("hero-search-style") ? document.getElementById("hero-search-style").value : "Texturizado 3D";
  const room = document.getElementById("hero-search-room") ? document.getElementById("hero-search-room").value : "Sala de Estar";
  const size = document.getElementById("hero-search-size") ? document.getElementById("hero-search-size").value : "Sob Medida";
  const frame = document.getElementById("hero-search-frame") ? document.getElementById("hero-search-frame").value : "Filete Flutuante";

  const msg = `Olá! Vim pelo site da Arte Expresso e montei uma proposta pelo buscador:\n\n` +
              `• Estilo: ${style}\n` +
              `• Ambiente: ${room}\n` +
              `• Tamanho aproximado: ${size}\n` +
              `• Moldura: ${frame}\n\n` +
              `Gostaria de falar com o artista para ver valores e prazos!`;

  const url = `https://wa.me/5511957934714?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

function orderCatalogItem(artworkId) {
  const item = getActiveCatalog().find(a => String(a.id) === String(artworkId));
  if (item && typeof WhatsAppService !== "undefined" && WhatsAppService.sendCatalogArtworkQuote) {
    WhatsAppService.sendCatalogArtworkQuote(item);
  } else {
    const title = item ? item.title : "Quadro do Catálogo";
    const cod = item ? item.id : artworkId;
    const msg = `Olá! Gostaria de um orçamento para a obra "${title}" (Cód: ${cod}) com o ateliê Arte Expresso.`;
    const url = `https://wa.me/5511957934714?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }
}

function customizeFromCatalog(artworkId) {
  const item = getActiveCatalog().find(a => String(a.id) === String(artworkId));
  if (item) {
    const ideaInput = document.getElementById("direct-cust-idea");
    if (ideaInput) {
      ideaInput.value = `Gostei da obra "${item.title}" (Cód: ${item.id}) e quero encomendar nas medidas do meu espaço.`;
    }
    scrollToSection("encomendas-section");
  }
}

/* ==========================================================================
   2. ENCOMENDAS SOB MEDIDA VIA WHATSAPP (DIRETO E SEM ETAPAS)
   ========================================================================== */

function submitDirectWhatsAppOrder(e) {
  if (e) e.preventDefault();

  const nameInput = document.getElementById("direct-cust-name");
  const cityInput = document.getElementById("direct-cust-city");
  const ideaInput = document.getElementById("direct-cust-idea");
  const submitBtn = e && e.target ? e.target.querySelector('button[type="submit"]') : null;

  const name = nameInput ? nameInput.value.trim() : "";
  const city = cityInput ? cityInput.value.trim() : "";
  const idea = ideaInput ? ideaInput.value.trim() : "";

  if (!name) {
    if (nameInput) {
      nameInput.focus();
      nameInput.classList.add("border-red-500");
      setTimeout(() => nameInput.classList.remove("border-red-500"), 3000);
    }
    return;
  }

  // Rauno Standard: Desativação temporária do botão para evitar envio duplicado
  if (submitBtn) {
    submitBtn.disabled = true;
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <i data-lucide="loader-2" class="w-4 h-4 animate-spin text-emerald-400"></i>
      <span>Abrindo WhatsApp do Artista...</span>
    `;
    initLucideIcons();
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalContent;
      initLucideIcons();
    }, 4000);
  }

  WhatsAppService.sendCustomQuote({
    name: name,
    city: city,
    notes: idea
  });
}

/* ==========================================================================
   3. MODALS, LIGHTBOX & TESTIMONIALS
   ========================================================================== */

function openArtworkModal(artworkId) {
  const art = getActiveCatalog().find(a => String(a.id) === String(artworkId));
  if (!art) return;

  const modal = document.getElementById("artwork-detail-modal");
  const modalContent = document.getElementById("artwork-modal-content");

  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 p-4 sm:p-6 lg:p-8 bg-white">
      <div class="relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
        <img src="${art.image}" alt="${art.title}" class="w-full h-full object-cover max-h-[360px] sm:max-h-[480px]" />
        <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-white/95 text-gray-900 shadow-sm">
          ${art.categoryLabel}
        </span>
      </div>

      <div class="flex flex-col justify-between space-y-4 sm:space-y-5">
        <div class="space-y-3 sm:space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-[11px] sm:text-xs font-mono font-semibold text-gray-400 uppercase">CÓDIGO: ${art.id}</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">100% Pintura Manual</span>
          </div>

          <h2 class="font-sans text-xl sm:text-2xl font-bold text-gray-900 leading-snug">${art.title}</h2>
          
          <div class="p-3.5 sm:p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 space-y-1.5">
            <p><strong class="text-gray-900">Técnica:</strong> ${art.technique}</p>
            <p><strong class="text-gray-900">Materiais:</strong> Tela 100% algodão, pigmentos nobres com proteção UV e chassi em madeira nobre imunizada.</p>
          </div>

          <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">${art.description}</p>

          <div class="space-y-2">
            <span class="text-[10px] sm:text-xs font-bold text-gray-900 uppercase tracking-wider">Dimensões Sugeridas:</span>
            <div class="flex flex-wrap gap-1.5 sm:gap-2">
              ${(art.popularSizes || []).map(s => `
                <span class="px-2.5 py-1 rounded-lg bg-gray-100 text-[11px] sm:text-xs text-gray-800 font-semibold border border-gray-200 tabular-nums">
                  ${s}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="pt-3.5 sm:pt-4 border-t border-gray-200 space-y-3">
          <div class="flex items-baseline justify-between">
            <span class="text-[11px] sm:text-xs text-gray-500 uppercase tracking-wider font-semibold">Investimento:</span>
            ${art.priceFrom && art.priceFrom.trim() ? `
              <span class="text-sm sm:text-base font-bold text-emerald-700">${art.priceFrom}</span>
            ` : `
              <span class="text-xs font-semibold text-gray-700">Orçamento Sob Medida no WhatsApp</span>
            `}
          </div>

          <div class="flex flex-col sm:flex-row gap-2">
            <button 
              onclick="orderCatalogItem('${art.id}'); closeArtworkModal();"
              class="btn-solid-black flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <svg class="w-4 h-4 fill-emerald-400 shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>Pedir Orçamento no WhatsApp</span>
            </button>
            <button 
              onclick="customizeFromCatalog('${art.id}'); closeArtworkModal();"
              class="btn-outline-clean py-3 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2"
            >
              <i data-lucide="sliders" class="w-4 h-4 text-gray-700"></i>
              <span>Personalizar Medidas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  initLucideIcons();
}

function closeArtworkModal() {
  const modal = document.getElementById("artwork-detail-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function initTestimonials() {
  const container = document.getElementById("testimonials-grid");
  if (!container) return;

  const testimonials = getActiveTestimonials();
  container.innerHTML = testimonials.map(t => `
    <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
      <div class="space-y-2">
        <div class="flex items-center gap-1 text-amber-500">
          ${Array(t.rating || 5).fill(0).map(() => `<i data-lucide="star" class="w-3.5 h-3.5 fill-amber-500 text-amber-500"></i>`).join('')}
        </div>
        <p class="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
          "${t.comment}"
        </p>
      </div>

      <div class="pt-3 border-t border-gray-200 flex items-center gap-3">
        <img src="${t.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}" alt="${t.name}" class="w-9 h-9 rounded-full object-cover border border-gray-300" />
        <div>
          <h5 class="text-xs font-bold text-gray-900 flex items-center gap-1">
            ${t.name}
            <i data-lucide="badge-check" class="w-3.5 h-3.5 text-emerald-500"></i>
          </h5>
          <p class="text-[10px] text-gray-500 font-medium">${t.role} • ${t.city}</p>
        </div>
      </div>
    </div>
  `).join('');

  initLucideIcons();
}

function initFAQ() {
  const container = document.getElementById("faq-container");
  if (!container) return;

  const faqs = getActiveFAQs();
  container.innerHTML = faqs.map((faq, idx) => `
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-colors">
      <button 
        onclick="toggleFAQ(${idx})"
        class="w-full p-4 sm:p-5 text-left font-sans font-semibold text-xs sm:text-sm text-gray-900 flex items-center justify-between gap-3 hover:text-black transition-colors"
      >
        <span>${faq.q}</span>
        <i id="faq-icon-${idx}" data-lucide="chevron-down" class="w-4 h-4 text-gray-500 transition-transform duration-200"></i>
      </button>
      <div id="faq-ans-${idx}" class="hidden px-4 sm:px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
        ${faq.a}
      </div>
    </div>
  `).join('');

  initLucideIcons();
}

function toggleFAQ(idx) {
  const ans = document.getElementById(`faq-ans-${idx}`);
  const icon = document.getElementById(`faq-icon-${idx}`);

  if (ans) {
    const isHidden = ans.classList.contains("hidden");
    ans.classList.toggle("hidden");
    if (icon) {
      icon.style.transform = isHidden ? "rotate(180deg)" : "rotate(0deg)";
    }
  }
}

/* ==========================================================================
   5. GENERAL EVENT LISTENERS & UTILITIES
   ========================================================================== */

function initEventListeners() {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu-dropdown");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Fechar modal ao clicar fora
  const modal = document.getElementById("artwork-detail-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeArtworkModal();
      }
    });
  }

  // Teclado: Fechar modal ao pressionar ESC (Impeccable A11y)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeArtworkModal();
      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }
    }
  });
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  const mobileMenu = document.getElementById("mobile-menu-dropdown");
  if (mobileMenu) mobileMenu.classList.add("hidden");
}

function openConsultationModal() {
  const name = prompt("Qual o seu nome para o atendimento exclusivo no WhatsApp?") || "Cliente";
  WhatsAppService.sendConsultationRequest(name, "Ambiente Residencial / Comercial");
}

/* ==========================================================================
   6. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */

function initScrollAnimations() {
  // Elements to reveal
  const elements = document.querySelectorAll(
    ".reveal-on-scroll, section > div, .editorial-card, .product-reference-card, #encomendas-section .bg-gray-50, #como-funciona-section .grid > div"
  );

  elements.forEach((el, index) => {
    if (!el.classList.contains("reveal-on-scroll")) {
      el.classList.add("reveal-on-scroll");
    }
  });

  const observerOptions = {
    threshold: 0.08,
    rootMargin: "0px 0px -30px 0px"
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal-on-scroll").forEach(el => observer.observe(el));
}

/* ==========================================================================
   7. TACTILE 3D CARD PARALLAX TILT
   ========================================================================== */

function initTiltEffects() {
  if (!window.matchMedia("(pointer: fine) and (hover: hover)").matches) return;

  const cards = document.querySelectorAll(".editorial-card, .product-reference-card");

  cards.forEach(card => {
    card.classList.add("interactive-tilt");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  });
}

/* ==========================================================================
   8. SECRET OWNER SHORTCUT ACCESS (DISGUISED ACCESS ONLY)
   ========================================================================== */

function initSecretAdminTrigger() {
  // Atalho de teclado para o administrador: Ctrl + Shift + A (ou Cmd + Shift + A no Mac)
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
      e.preventDefault();
      window.location.href = "admin.html?key=ae_gestao_2026";
    }
  });

  // 5 cliques rápidos no copyright do rodapé
  const trigger = document.getElementById("copyright-secret-trigger");
  if (trigger) {
    let clickCount = 0;
    let timer = null;
    trigger.addEventListener("click", () => {
      clickCount++;
      clearTimeout(timer);
      timer = setTimeout(() => { clickCount = 0; }, 1800);
      if (clickCount >= 5) {
        window.location.href = "admin.html?key=ae_gestao_2026";
      }
    });
  }
}
