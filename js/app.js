// Application State & CMS Dynamic Storage Connectors
const DB_KEYS = {
  artworks: "arte_expresso_artworks_v2",
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
  const saved = localStorage.getItem(DB_KEYS.artworks) || localStorage.getItem("arte_expresso_catalog_v1");
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
  initLucideIcons();
  renderCatalog("all");
  initTestimonials();
  initFAQ();
  initEventListeners();
  initScrollAnimations();
  initCustomCursor();
  initTiltEffects();
});

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
    <div class="product-reference-card flex flex-col justify-between group">
      
      <!-- Card Header (Reference Style: Title + Location + Badge) -->
      <div class="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 
            onclick="openArtworkModal('${item.id}')"
            class="font-sans font-bold text-base text-gray-900 group-hover:text-black transition-colors cursor-pointer"
          >
            ${item.title}
          </h3>
          <p class="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
            <span>Ateliê Sob Medida</span>
            <span>•</span>
            <span class="font-mono text-[11px] text-gray-400">Cód: ${item.id}</span>
          </p>
        </div>

        <div class="flex items-center gap-1.5 shrink-0">
          <span class="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">
            ${item.categoryLabel}
          </span>
          ${item.priceFrom && item.priceFrom.trim() ? `
            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              ${item.priceFrom}
            </span>
          ` : ''}
        </div>
      </div>

      <!-- Artwork Image with Floating Meta Badges -->
      <div class="relative aspect-[16/11] rounded-xl overflow-hidden bg-gray-100 cursor-pointer mb-3.5" onclick="openArtworkModal('${item.id}')">
        <img 
          src="${item.image}" 
          alt="${item.title}" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity"></div>
        
        <!-- Top Floating Status Badge -->
        <div class="absolute top-2.5 right-2.5">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-gray-900 shadow-sm backdrop-blur-md">
            100% Pintura Manual
          </span>
        </div>

        <!-- Bottom Meta Bar (Reference Style) -->
        <div class="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white font-medium">
          <span class="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-md">
            <i data-lucide="sparkles" class="w-3 h-3 text-amber-300"></i>
            <span>${item.technique}</span>
          </span>
          <span class="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-md">
            <i data-lucide="truck" class="w-3 h-3 text-emerald-300"></i>
            <span>Envio Seguro</span>
          </span>
        </div>
      </div>

      <!-- Sub-footer Attributes in 3 Columns (Reference Style) -->
      <div class="grid grid-cols-3 gap-2 py-2.5 border-t border-gray-100 text-center mb-3.5">
        <div class="text-left">
          <span class="block text-[9px] uppercase tracking-wider text-gray-400 font-semibold">Tamanho Sugerido</span>
          <span class="text-xs font-semibold text-gray-800 truncate block">${item.popularSizes ? item.popularSizes[0] : 'Sob Medida'}</span>
        </div>
        <div class="text-center">
          <span class="block text-[9px] uppercase tracking-wider text-gray-400 font-semibold">Estrutura</span>
          <span class="text-xs font-semibold text-gray-800 block">Chassi Imunizado</span>
        </div>
        <div class="text-right">
          <span class="block text-[9px] uppercase tracking-wider text-gray-400 font-semibold">Garantia</span>
          <span class="text-xs font-semibold text-emerald-600 block">Aprovação Vídeo</span>
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
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 sm:p-8 bg-white">
      <div class="relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
        <img src="${art.image}" alt="${art.title}" class="w-full h-full object-cover max-h-[480px]" />
        <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-gray-900 shadow-sm">
          ${art.categoryLabel}
        </span>
      </div>

      <div class="flex flex-col justify-between space-y-5">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono font-semibold text-gray-400 uppercase">CÓDIGO: ${art.id}</span>
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">100% Pintura Manual</span>
          </div>

          <h2 class="font-sans text-2xl font-bold text-gray-900">${art.title}</h2>
          
          <div class="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 space-y-1.5">
            <p><strong class="text-gray-900">Técnica:</strong> ${art.technique}</p>
            <p><strong class="text-gray-900">Materiais:</strong> Tela 100% algodão, pigmentos importados com proteção UV e chassi em madeira nobre imunizada.</p>
          </div>

          <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">${art.description}</p>

          <div class="space-y-2">
            <span class="text-xs font-bold text-gray-900 uppercase tracking-wider text-[11px]">Dimensões Sugeridas:</span>
            <div class="flex flex-wrap gap-2">
              ${(art.popularSizes || []).map(s => `
                <span class="px-3 py-1 rounded-lg bg-gray-100 text-xs text-gray-800 font-semibold border border-gray-200">
                  ${s}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-gray-200 space-y-3">
          <div class="flex items-baseline justify-between">
            <span class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Investimento:</span>
            ${art.priceFrom && art.priceFrom.trim() ? `
              <span class="text-base font-bold text-emerald-700">${art.priceFrom}</span>
            ` : `
              <span class="text-xs font-semibold text-gray-700">Orçamento Sob Medida no WhatsApp</span>
            `}
          </div>

          <div class="flex flex-col sm:flex-row gap-2.5">
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
   7. ARTIST PAINTBRUSH CURSOR & DYNAMIC PAINT TRAIL (CANVAS 60FPS)
   ========================================================================== */

function initCustomCursor() {
  // Ativar apenas em desktops com ponteiro preciso (mouse/trackpad)
  if (!window.matchMedia("(pointer: fine) and (hover: hover)").matches) return;

  // 1. Canvas para o rastro fluido de pintura
  const canvas = document.createElement("canvas");
  canvas.id = "paint-trail-canvas";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  // 2. Cursor de Pincel de Artista em SVG de Alta Fidelidade (Ponta alinhada em 0,0)
  const brush = document.createElement("div");
  brush.id = "art-brush-cursor";
  brush.innerHTML = `
    <svg viewBox="0 0 100 100" class="w-full h-full overflow-visible" style="transform: translate(-3px, -3px);">
      <!-- Sombra e Cabo de Madeira Nobre -->
      <path d="M4 4 L65 65 L72 58 L11 3 Z" fill="#18181B" stroke="#27272A" stroke-width="1.5" />
      <path d="M12 4 L66 58 L68 56 L15 3 Z" fill="#3F3F46" />
      
      <!-- Virola Metálica Dourada/Prateada -->
      <path d="M4 4 L22 22 L17 27 L2 6 Z" fill="#D4AF37" stroke="#AA820A" stroke-width="1" />
      <line x1="8" y1="8" x2="14" y2="14" stroke="#FDF0CD" stroke-width="1.2" />
      
      <!-- Cerdas de Pincel Fino -->
      <path d="M1 1 C1 1 5 10 9 14 C12 17 17 20 20 20 L2 2 Z" fill="#27272A" />
      <path d="M1 1 C2 4 6 9 10 11 L3 3 Z" fill="#52525B" />
      
      <!-- Ponta Úmida com Tinta Dourada / Esmeralda -->
      <path d="M0 0 C1 3 3 6 6 8 C5 5 3 2 0 0 Z" fill="#10B981" />
      <circle cx="1.5" cy="1.5" r="1.8" fill="#34D399" filter="drop-shadow(0 0 2px #10B981)" />
    </svg>
  `;
  document.body.appendChild(brush);
  document.body.classList.add("has-art-cursor");

  // Estados e física do cursor
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let prevX = mouseX;
  let prevY = mouseY;
  let currentAngle = -25;
  let targetAngle = -25;

  // Coleção de partículas e rastro de tinta
  const paintPoints = [];
  const splatters = [];
  const paletteColors = [
    { r: 212, g: 175, b: 55 },  // Ouro Clássico
    { r: 16, g: 185, b: 129 },  // Esmeralda Ateliê
    { r: 243, g: 229, b: 171 }, // Folha de Ouro Champagne
    { r: 24, g: 24, b: 27 }     // Tinta Acrílica Preta Nobre
  ];
  let colorIndex = 0;

  // Rastreamento do mouse
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const dx = mouseX - prevX;
    const dy = mouseY - prevY;
    const speed = Math.sqrt(dx * dx + dy * dy);

    // Calcular ângulo dinâmico natural do pincel
    if (speed > 1.5) {
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      targetAngle = angle - 45;
    }

    // Adicionar ponto ao rastro de tinta
    if (speed > 0.5) {
      colorIndex = (colorIndex + 0.05) % paletteColors.length;
      const c = paletteColors[Math.floor(colorIndex)];
      
      paintPoints.push({
        x: mouseX,
        y: mouseY,
        vx: dx * 0.1,
        vy: dy * 0.1,
        radius: Math.min(7, Math.max(2.5, 9 - speed * 0.15)),
        color: c,
        alpha: 0.65,
        maxLife: 35,
        life: 35
      });

      // Micro respingos de aquarela em movimentos rápidos
      if (speed > 12 && Math.random() < 0.4) {
        splatters.push({
          x: mouseX + (Math.random() - 0.5) * 16,
          y: mouseY + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 2 + dx * 0.1,
          vy: (Math.random() - 0.5) * 2 + dy * 0.1,
          radius: Math.random() * 2 + 1,
          color: c,
          alpha: 0.8,
          life: 25,
          maxLife: 25
        });
      }
    }

    prevX = mouseX;
    prevY = mouseY;
  }, { passive: true });

  // Pincelada introdutória no carregamento da página ("Intro Brush Sweep")
  function triggerIntroBrushSweep() {
    const startX = width * 0.15;
    const startY = height * 0.35;
    const endX = width * 0.85;
    const endY = height * 0.65;
    const steps = 60;
    let step = 0;

    const introTimer = setInterval(() => {
      if (step >= steps) {
        clearInterval(introTimer);
        return;
      }
      const t = step / steps;
      // Curva suave de Bezier
      const currentX = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * (width * 0.5) + t * t * endX;
      const currentY = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * (height * 0.15) + t * t * endY;
      
      const c = paletteColors[step % paletteColors.length];
      paintPoints.push({
        x: currentX,
        y: currentY,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.sin(t * Math.PI) * 14 + 3,
        color: c,
        alpha: 0.7,
        life: 55,
        maxLife: 55
      });

      step++;
    }, 16);
  }

  // Disparar o rastro inicial ao abrir o site
  setTimeout(triggerIntroBrushSweep, 400);

  // Loop de Renderização a 60 FPS com Interpolação Orgânica
  function renderPaintCanvas() {
    ctx.clearRect(0, 0, width, height);

    // Suavizar rotação do pincel
    currentAngle += (targetAngle - currentAngle) * 0.15;
    brush.style.setProperty("--cursor-x", `${mouseX}px`);
    brush.style.setProperty("--cursor-y", `${mouseY}px`);
    brush.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) rotate(${currentAngle}deg)`;

    // 1. Desenhar fita de tinta contínua conectando os pontos
    if (paintPoints.length > 1) {
      for (let i = 0; i < paintPoints.length - 1; i++) {
        const p1 = paintPoints[i];
        const p2 = paintPoints[i + 1];

        const progress = p1.life / p1.maxLife;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${p1.alpha * progress})`;
        ctx.lineWidth = p1.radius * progress;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        // Efeito aveludado de pigmento artístico
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, (p1.radius * 0.6) * progress, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${p1.alpha * 0.5 * progress})`;
        ctx.fill();

        p1.life--;
        p1.x += p1.vx;
        p1.y += p1.vy;
      }
    }

    // 2. Desenhar micro respingos
    for (let i = splatters.length - 1; i >= 0; i--) {
      const s = splatters[i];
      const progress = s.life / s.maxLife;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius * progress, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${s.alpha * progress})`;
      ctx.fill();

      s.x += s.vx;
      s.y += s.vy;
      s.life--;

      if (s.life <= 0) splatters.splice(i, 1);
    }

    // Limpar pontos mortos
    while (paintPoints.length > 0 && paintPoints[0].life <= 0) {
      paintPoints.shift();
    }

    requestAnimationFrame(renderPaintCanvas);
  }

  requestAnimationFrame(renderPaintCanvas);

  // Interatividade com botões e links
  const interactiveSelector = "a, button, input, textarea, select, .product-reference-card, .editorial-card, [role='button'], .catalog-filter-btn";

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.add("cursor-active");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.remove("cursor-active");
    }
  });

  document.addEventListener("mousedown", (e) => {
    document.body.classList.add("cursor-down");

    // Respingos de tinta ao clicar
    const c = paletteColors[0];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI * 2 * i) / 6 + Math.random();
      const dist = Math.random() * 8 + 4;
      splatters.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * (Math.random() * 2 + 1),
        vy: Math.sin(angle) * (Math.random() * 2 + 1),
        radius: Math.random() * 3 + 1.5,
        color: c,
        alpha: 0.9,
        life: 30,
        maxLife: 30
      });
    }
  });

  document.addEventListener("mouseup", () => {
    document.body.classList.remove("cursor-down");
  });
}

/* ==========================================================================
   8. TACTILE 3D CARD PARALLAX TILT
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
