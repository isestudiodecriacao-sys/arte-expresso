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
    <div class="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group transition-all">
      
      <!-- Artwork Visual Presentation Frame -->
      <div class="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-neutral-950 cursor-pointer" onclick="openArtworkModal('${item.id}')">
        <img 
          src="${item.image}" 
          alt="${item.title}" 
          class="artwork-img w-full h-full object-cover"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
        
        <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-black/80 text-neutral-200 border border-white/15 backdrop-blur-md tracking-wider uppercase">
            ${item.categoryLabel}
          </span>
          ${item.tag ? `
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white text-black tracking-wider uppercase">
              ${item.tag}
            </span>
          ` : ''}
          ${item.priceFrom && item.priceFrom.trim() ? `
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-900 border border-white/20 text-white shadow-md">
              ${item.priceFrom}
            </span>
          ` : ''}
        </div>

        <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-neutral-300">
          <span class="flex items-center gap-1.5 text-neutral-400">
            <i data-lucide="sparkles" class="w-3 h-3 text-white"></i>
            100% Pintura Manual
          </span>
          <span class="text-neutral-400 font-semibold font-mono text-[10px] uppercase">Cód: ${item.id}</span>
        </div>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          <h3 
            onclick="openArtworkModal('${item.id}')"
            class="font-serif text-base sm:text-lg font-normal text-white group-hover:text-neutral-300 transition-colors cursor-pointer"
          >
            ${item.title}
          </h3>
          <p class="text-[11px] text-neutral-400 mt-1 font-medium flex items-center gap-1.5">
            <i data-lucide="brush" class="w-3 h-3 text-neutral-300"></i>
            ${item.technique}
          </p>
          <p class="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
            ${item.description}
          </p>
        </div>

        <!-- Palette Preview -->
        <div class="flex items-center gap-2 pt-1">
          <span class="text-[10px] text-neutral-500 uppercase tracking-wider">Tons:</span>
          ${item.palette ? item.palette.map(c => `
            <span class="w-3 h-3 rounded-full border border-white/20 shadow-sm" style="background-color: ${c};"></span>
          `).join('') : ''}
        </div>

        <!-- Sizes & Quote Action -->
        <div class="pt-3 border-t border-white/10 space-y-3">
          <div class="flex items-center justify-between text-xs">
            <span class="text-neutral-400">Tamanho sugerido:</span>
            <span class="text-white font-medium">${item.popularSizes ? item.popularSizes[0] : 'Sob medida'}</span>
          </div>

          <div class="flex items-center gap-2.5">
            <button 
              onclick="orderCatalogItem('${item.id}')"
              class="btn-luxury-white btn-shimmer flex-1 py-2.5 px-3.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <i data-lucide="message-circle" class="w-3.5 h-3.5 text-emerald-700 fill-emerald-700"></i>
              <span>Pedir no WhatsApp</span>
            </button>
            <button 
              onclick="customizeFromCatalog('${item.id}')"
              title="Personalizar Medidas Deste Estilo"
              class="btn-luxury-dark p-2.5 rounded-xl transition-all"
            >
              <i data-lucide="sliders" class="w-4 h-4 text-white"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  initLucideIcons();
}

function filterCatalog(category, buttonElement) {
  appState.activeCatalogCategory = category;
  
  // Atualiza classes ativas nos botões
  const buttons = document.querySelectorAll(".catalog-filter-btn");
  buttons.forEach(btn => {
    btn.classList.remove("bg-white", "text-black", "shadow-lg");
    btn.classList.add("bg-neutral-900", "text-neutral-300", "border", "border-white/10");
  });

  if (buttonElement) {
    buttonElement.classList.remove("bg-neutral-900", "text-neutral-300", "border", "border-white/10");
    buttonElement.classList.add("bg-white", "text-black", "shadow-lg");
  }

  renderCatalog(category);
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
  const photoInput = document.getElementById("direct-wall-photo");
  const submitBtn = e && e.target ? e.target.querySelector('button[type="submit"]') : null;

  const name = nameInput ? nameInput.value.trim() : "";
  const city = cityInput ? cityInput.value.trim() : "";
  let idea = ideaInput ? ideaInput.value.trim() : "";

  if (!name) {
    if (nameInput) {
      nameInput.focus();
      nameInput.classList.add("border-red-500");
      setTimeout(() => nameInput.classList.remove("border-red-500"), 3000);
    }
    return;
  }

  // Rauno Standard: Desativação do botão para evitar envio duplicado
  if (submitBtn) {
    submitBtn.disabled = true;
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <i data-lucide="loader-2" class="w-4 h-4 animate-spin text-emerald-700"></i>
      <span>Abrindo WhatsApp do Artista...</span>
    `;
    initLucideIcons();
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalContent;
      initLucideIcons();
    }, 4000);
  }

  if (photoInput && photoInput.files && photoInput.files.length > 0) {
    idea = (idea ? idea + "\n" : "") + "📸 [Anexando foto da parede / referência aqui no WhatsApp]";
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
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-9 bg-[#0c0c0e]">
      <div class="relative rounded-xl overflow-hidden bg-neutral-950 border border-white/15">
        <img src="${art.image}" alt="${art.title}" class="w-full h-full object-cover max-h-[500px]" />
        <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-semibold bg-black/85 text-neutral-200 border border-white/20 tracking-wider uppercase backdrop-blur-md">
          ${art.categoryLabel}
        </span>
      </div>

      <div class="flex flex-col justify-between space-y-6">
        <div>
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono text-neutral-400 uppercase tracking-wider">CÓDIGO: ${art.id}</span>
            <span class="px-3 py-0.5 rounded-full text-xs bg-white/10 text-white font-medium border border-white/15">100% Pintura Manual</span>
          </div>

          <h2 class="font-serif text-2xl sm:text-3xl font-normal text-white mt-3">${art.title}</h2>
          
          <div class="mt-4 p-4 rounded-xl bg-neutral-900 border border-white/10 text-xs text-neutral-300 space-y-2">
            <p><strong class="text-white uppercase tracking-wider text-[11px]">Técnica:</strong> ${art.technique}</p>
            <p><strong class="text-white uppercase tracking-wider text-[11px]">Materiais:</strong> Tela 100% algodão, tintas importadas com proteção UV e chassi em madeira imunizada.</p>
          </div>

          <p class="text-xs sm:text-sm text-neutral-400 mt-4 leading-relaxed">${art.description}</p>

          <div class="mt-6 space-y-2.5">
            <span class="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Dimensões Sugeridas:</span>
            <div class="flex flex-wrap gap-2">
              ${(art.popularSizes || []).map(s => `
                <span class="px-3 py-1.5 rounded-lg bg-neutral-900 text-xs text-neutral-200 border border-white/10 font-medium">
                  ${s}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="pt-5 border-t border-white/10 space-y-4">
          <div class="flex items-baseline justify-between">
            <span class="text-xs text-neutral-400 uppercase tracking-wider">Investimento:</span>
            ${art.priceFrom && art.priceFrom.trim() ? `
              <span class="text-base font-bold text-white">${art.priceFrom}</span>
            ` : `
              <span class="text-xs font-semibold text-neutral-300">Orçamento Sob Medida no WhatsApp</span>
            `}
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <button 
              onclick="orderCatalogItem('${art.id}'); closeArtworkModal();"
              class="btn-luxury-white btn-shimmer flex-1 py-3.5 px-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              <i data-lucide="message-circle" class="w-4 h-4 text-emerald-700 fill-emerald-700"></i>
              <span>Pedir Orçamento no WhatsApp</span>
            </button>
            <button 
              onclick="customizeFromCatalog('${art.id}'); closeArtworkModal();"
              class="btn-luxury-dark py-3.5 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2"
            >
              <i data-lucide="sliders" class="w-4 h-4 text-white"></i>
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
    <div class="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 hover:border-white/25 transition-all">
      <div>
        <div class="flex items-center gap-1 text-white mb-3">
          ${Array(t.rating || 5).fill(0).map(() => `<i data-lucide="star" class="w-3.5 h-3.5 fill-white text-white"></i>`).join('')}
        </div>
        <p class="text-xs sm:text-sm text-neutral-300 italic leading-relaxed">
          "${t.comment}"
        </p>
      </div>

      <div class="pt-4 border-t border-white/10 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="${t.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}" alt="${t.name}" class="w-9 h-9 rounded-full object-cover border border-white/20" />
          <div>
            <h5 class="text-xs font-bold text-white flex items-center gap-1.5">
              ${t.name}
              <i data-lucide="badge-check" class="w-3.5 h-3.5 text-emerald-400"></i>
            </h5>
            <p class="text-[10px] text-neutral-400">${t.role} • ${t.city}</p>
          </div>
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
    <div class="glass-card rounded-xl border border-white/10 overflow-hidden transition-colors">
      <button 
        onclick="toggleFAQ(${idx})"
        class="w-full p-4 sm:p-5 text-left font-serif font-medium text-xs sm:text-sm text-white flex items-center justify-between gap-3 hover:text-neutral-300 transition-colors"
      >
        <span>${faq.q}</span>
        <i id="faq-icon-${idx}" data-lucide="chevron-down" class="w-4 h-4 text-neutral-400 transition-transform duration-300"></i>
      </button>
      <div id="faq-ans-${idx}" class="hidden px-4 sm:px-5 pb-5 text-xs text-neutral-400 leading-relaxed border-t border-white/10 pt-3">
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
