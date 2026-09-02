/**
 * Arte Expresso (@arte.expresso) — Dedicated Catalog Gallery Controller
 * WhatsApp Comercial: (11) 95793-4714
 */

const DB_KEYS = {
  artworks: "arte_expresso_artworks_v3",
  categories: "arte_expresso_categories_v1"
};

let activeCatalogState = {
  category: "all",
  searchQuery: "",
  sortBy: "default"
};

document.addEventListener("DOMContentLoaded", () => {
  initCatalogPage();
});

function initCatalogPage() {
  initMobileMenu();
  initCategoryFilters();
  renderCatalogGallery();
  if (window.lucide) window.lucide.createIcons();
}

/* ==========================================================================
   1. DATA ACCESSORS
   ========================================================================== */

function getArtworksList() {
  const saved = localStorage.getItem(DB_KEYS.artworks);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {}
  }
  return typeof CATALOG_DATA !== "undefined" ? CATALOG_DATA : [];
}

function getCategoriesList() {
  const saved = localStorage.getItem(DB_KEYS.categories);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {}
  }
  return typeof DEFAULT_CATEGORIES !== "undefined" ? DEFAULT_CATEGORIES : [
    { id: "all", name: "Todas as Obras" },
    { id: "popart", name: "Pop Art & Street" },
    { id: "contemporaneo", name: "Contemporâneos & Conceituais" },
    { id: "texturizado", name: "Texturizados 3D" },
    { id: "abstrato", name: "Abstratos Modernos" },
    { id: "minimalista", name: "Minimalistas & Neutros" },
    { id: "personalizado", name: "Sob Medida & Personalizados" }
  ];
}

/* ==========================================================================
   2. CATEGORY FILTERS RENDERING
   ========================================================================== */

function initCategoryFilters() {
  const container = document.getElementById("catalog-category-filters");
  if (!container) return;

  const categories = getCategoriesList();
  let list = [...categories];
  if (!list.some(c => c.id === "all")) {
    list.unshift({ id: "all", name: "Todas as Obras" });
  }

  container.innerHTML = list.map(cat => {
    const isActive = cat.id === activeCatalogState.category;
    const activeClass = isActive 
      ? "bg-white text-black font-bold shadow-md" 
      : "bg-white/[0.08] hover:bg-white/[0.15] text-gray-300 font-semibold border border-white/10";

    return `
      <button 
        onclick="setCatalogCategory('${cat.id}', this)" 
        class="cat-filter-btn px-4 py-2 rounded-xl ${activeClass} text-xs whitespace-nowrap transition-all"
        data-cat="${cat.id}"
      >
        ${cat.name}
      </button>
    `;
  }).join('');
}

function setCatalogCategory(catId, btnEl) {
  activeCatalogState.category = catId;
  
  const buttons = document.querySelectorAll(".cat-filter-btn");
  buttons.forEach(btn => {
    const isThis = (btn === btnEl) || (btn.getAttribute("data-cat") === catId);
    if (isThis) {
      btn.className = "cat-filter-btn px-4 py-2 rounded-xl bg-white text-black font-bold shadow-md text-xs whitespace-nowrap transition-all";
    } else {
      btn.className = "cat-filter-btn px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-gray-300 font-semibold border border-white/10 text-xs whitespace-nowrap transition-all";
    }
  });

  renderCatalogGallery();
}

/* ==========================================================================
   3. SEARCH & SORTING
   ========================================================================== */

function handleCatalogSearch(query) {
  activeCatalogState.searchQuery = query.trim().toLowerCase();
  
  const clearBtn = document.getElementById("search-clear-btn");
  if (clearBtn) {
    if (activeCatalogState.searchQuery.length > 0) {
      clearBtn.classList.remove("hidden");
    } else {
      clearBtn.classList.add("hidden");
    }
  }

  renderCatalogGallery();
}

function clearCatalogSearch() {
  const input = document.getElementById("catalog-search-input");
  if (input) input.value = "";
  
  const clearBtn = document.getElementById("search-clear-btn");
  if (clearBtn) clearBtn.classList.add("hidden");

  activeCatalogState.searchQuery = "";
  activeCatalogState.category = "all";
  initCategoryFilters();
  renderCatalogGallery();
}

function handleCatalogSort(sortBy) {
  activeCatalogState.sortBy = sortBy;
  renderCatalogGallery();
}

/* ==========================================================================
   4. CATALOG GALLERY RENDERING
   ========================================================================== */

function renderCatalogGallery() {
  const grid = document.getElementById("catalog-grid");
  const countBadge = document.getElementById("catalog-count-badge");
  const emptyState = document.getElementById("catalog-empty-state");
  if (!grid) return;

  let allArtworks = getArtworksList();

  // Category filter
  if (activeCatalogState.category !== "all") {
    allArtworks = allArtworks.filter(art => art.category === activeCatalogState.category);
  }

  // Search filter
  if (activeCatalogState.searchQuery) {
    const q = activeCatalogState.searchQuery;
    allArtworks = allArtworks.filter(art => {
      const matchTitle = (art.title || "").toLowerCase().includes(q);
      const matchDesc = (art.description || "").toLowerCase().includes(q);
      const matchTech = (art.technique || "").toLowerCase().includes(q);
      const matchCode = (art.id || "").toLowerCase().includes(q);
      const matchTag = (art.tag || "").toLowerCase().includes(q);
      const matchCat = (art.categoryLabel || art.category || "").toLowerCase().includes(q);
      return matchTitle || matchDesc || matchTech || matchCode || matchTag || matchCat;
    });
  }

  // Sorting
  if (activeCatalogState.sortBy === "title_asc") {
    allArtworks.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  } else if (activeCatalogState.sortBy === "code_asc") {
    allArtworks.sort((a, b) => (a.id || "").localeCompare(b.id || ""));
  }

  // Counter
  if (countBadge) {
    countBadge.textContent = `${allArtworks.length} ${allArtworks.length === 1 ? 'obra encontrada' : 'obras encontradas'}`;
  }

  // Empty state check
  if (allArtworks.length === 0) {
    grid.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");

  // Render cards
  grid.innerHTML = allArtworks.map(item => {
    const hasPrice = item.priceFrom && item.priceFrom.trim();
    const tagHtml = item.tag ? `
      <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide bg-white/95 text-black shadow-md backdrop-blur-md">
        ${item.tag}
      </span>
    ` : '';

    return `
      <div class="group bg-white/[0.04] hover:bg-white/[0.07] rounded-3xl border border-white/10 hover:border-white/20 p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl">
        
        <div class="space-y-4">
          <!-- Image Box with Lightbox Click -->
          <div 
            onclick="openArtworkModal('${item.id}')"
            class="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black cursor-pointer group-hover:shadow-2xl transition-all"
            title="Clique para ampliar detalhes da obra"
          >
            <img 
              src="${item.image}" 
              alt="${item.title}" 
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            ${tagHtml}

            <!-- Code Badge -->
            <span class="absolute top-3 right-3 px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-black/80 text-gray-300 border border-white/10 backdrop-blur-md">
              ${item.id}
            </span>

            <!-- Zoom Indicator -->
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-semibold backdrop-blur-[2px]">
              <i data-lucide="maximize-2" class="w-4 h-4"></i>
              <span>Ampliar Detalhes</span>
            </div>
          </div>

          <!-- Metadata -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between gap-2">
              <span class="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                ${item.categoryLabel || item.category || 'Pintura Autoral'}
              </span>
              ${hasPrice ? `
                <span class="text-xs font-extrabold text-emerald-400 tabular-nums">${item.priceFrom}</span>
              ` : `
                <span class="text-[10px] font-semibold text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">Sob Consulta</span>
              `}
            </div>

            <h3 class="font-bold text-base sm:text-lg text-white leading-tight group-hover:text-amber-200 transition-colors">
              ${item.title}
            </h3>

            <p class="text-xs text-gray-400 line-clamp-2 leading-relaxed font-normal">
              ${item.technique || item.description}
            </p>
          </div>

          <!-- Features pill bar -->
          <div class="grid grid-cols-3 gap-1.5 py-2.5 border-t border-white/10 text-center">
            <div class="text-left overflow-hidden">
              <span class="block text-[8px] sm:text-[9px] uppercase tracking-wider text-gray-500 font-bold truncate">Tamanho</span>
              <span class="text-[11px] font-semibold text-gray-200 truncate block tabular-nums">${item.popularSizes ? item.popularSizes[0] : 'Sob Medida'}</span>
            </div>
            <div class="text-center overflow-hidden">
              <span class="block text-[8px] sm:text-[9px] uppercase tracking-wider text-gray-500 font-bold truncate">Estrutura</span>
              <span class="text-[11px] font-semibold text-gray-200 block truncate">Chassi Imunizado</span>
            </div>
            <div class="text-right overflow-hidden">
              <span class="block text-[8px] sm:text-[9px] uppercase tracking-wider text-gray-500 font-bold truncate">Garantia</span>
              <span class="text-[11px] font-semibold text-emerald-400 block truncate">Aprovação Vídeo</span>
            </div>
          </div>
        </div>

        <!-- Action CTAs -->
        <div class="pt-4 border-t border-white/10 flex items-center gap-2">
          <button 
            onclick="orderCatalogItem('${item.id}')"
            class="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-gray-100 text-gray-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
          >
            <svg class="w-4 h-4 fill-emerald-600 shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            <span>Pedir no WhatsApp</span>
          </button>
          
          <button 
            onclick="openArtworkModal('${item.id}')"
            title="Ver Detalhes"
            class="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
          >
            <i data-lucide="eye" class="w-4 h-4"></i>
          </button>
        </div>

      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

/* ==========================================================================
   5. WHATSAPP ORDER & LIGHTBOX MODAL
   ========================================================================== */

function orderCatalogItem(artworkId) {
  const artworks = getArtworksList();
  const art = artworks.find(a => a.id === artworkId);
  if (!art) return;

  const msg = `Olá! Vim pelo Catálogo da Arte Expresso e me interessei pela seguinte obra:\n\n` +
              `• Obra: ${art.title} (${art.id})\n` +
              `• Categoria: ${art.categoryLabel || art.category}\n` +
              `• Técnica: ${art.technique}\n` +
              (art.priceFrom ? `• Valor de Referência: ${art.priceFrom}\n` : '') +
              `\nGostaria de consultar opções de tamanhos, prazos e simulação para o meu ambiente!`;

  const url = `https://wa.me/5511957934714?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

function openArtworkModal(artworkId) {
  const artworks = getArtworksList();
  const art = artworks.find(a => a.id === artworkId);
  if (!art) return;

  const modal = document.getElementById("artwork-detail-modal");
  if (!modal) return;

  document.getElementById("modal-artwork-image").src = art.image;
  document.getElementById("modal-artwork-title").textContent = art.title;
  document.getElementById("modal-artwork-category").textContent = art.categoryLabel || art.category;
  document.getElementById("modal-artwork-technique").textContent = art.technique;
  document.getElementById("modal-artwork-desc").textContent = art.description;

  const tagEl = document.getElementById("modal-artwork-tag");
  if (tagEl) {
    if (art.tag) {
      tagEl.textContent = art.tag;
      tagEl.classList.remove("hidden");
    } else {
      tagEl.classList.add("hidden");
    }
  }

  const sizesContainer = document.getElementById("modal-artwork-sizes");
  if (sizesContainer) {
    sizesContainer.innerHTML = (art.popularSizes || ["120x80 cm", "150x90 cm", "Sob Medida"]).map(sz => `
      <span class="px-2.5 py-1 rounded-lg bg-white/10 text-white text-[11px] font-mono border border-white/10">${sz}</span>
    `).join('');
  }

  const priceEl = document.getElementById("modal-artwork-price");
  if (priceEl) {
    priceEl.textContent = art.priceFrom && art.priceFrom.trim() ? art.priceFrom : "Sob Consulta no WhatsApp";
  }

  const waLink = document.getElementById("modal-artwork-whatsapp-link");
  if (waLink) {
    const msg = `Olá! Gostaria de encomendar a obra "${art.title}" (${art.id}) vista no Catálogo da Arte Expresso.`;
    waLink.href = `https://wa.me/5511957934714?text=${encodeURIComponent(msg)}`;
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  if (window.lucide) window.lucide.createIcons();
}

function closeArtworkModal() {
  const modal = document.getElementById("artwork-detail-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

/* ==========================================================================
   6. MOBILE MENU
   ========================================================================== */

function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const dropdown = document.getElementById("mobile-menu-dropdown");
  const icon = document.getElementById("mobile-menu-icon");
  if (!btn || !dropdown) return;

  btn.addEventListener("click", () => {
    const isHidden = dropdown.classList.contains("hidden");
    if (isHidden) {
      dropdown.classList.remove("hidden");
      if (icon) icon.setAttribute("data-lucide", "x");
    } else {
      dropdown.classList.add("hidden");
      if (icon) icon.setAttribute("data-lucide", "menu");
    }
    if (window.lucide) window.lucide.createIcons();
  });
}
