// Application State
const STORAGE_KEY = "arte_expresso_catalog_v1";

function getActiveCatalog() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return CATALOG_DATA;
    }
  }
  return CATALOG_DATA;
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
    estimatedPrice: "R$ 890 - R$ 1.150"
  },
  wallVisualizer: {
    wallColor: "fendi",
    furniture: "sofa",
    currentArtworkId: "EXP-01",
    currentFrame: "frame-filete-dourada"
  },
  activeCatalogCategory: "all"
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initLucideIcons();
  renderCatalog("all");
  initCustomizer();
  initWallVisualizer();
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
    <div class="artwork-card glass-panel rounded-2xl overflow-hidden border border-stone-800/80 flex flex-col group" data-category="${item.category}">
      <div class="relative overflow-hidden aspect-[4/3] bg-stone-900 cursor-pointer" onclick="openArtworkModal('${item.id}')">
        <img 
          src="${item.image}" 
          alt="${item.title}" 
          class="artwork-img w-full h-full object-cover"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
        
        <div class="absolute top-3 left-3 flex flex-wrap gap-2">
          <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-md">
            ${item.categoryLabel}
          </span>
          ${item.tag ? `
            <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/90 text-stone-950 font-medium">
              ${item.tag}
            </span>
          ` : ''}
        </div>

        <div class="absolute top-3 right-3">
          <button 
            onclick="event.stopPropagation(); testOnWall('${item.id}')"
            title="Ver na Parede Virtual"
            class="p-2 rounded-xl bg-stone-900/80 hover:bg-amber-500 hover:text-stone-950 text-stone-300 transition-all border border-stone-700/60 backdrop-blur-md shadow-lg flex items-center gap-1.5 text-xs"
          >
            <i data-lucide="eye" class="w-4 h-4"></i>
            <span class="hidden sm:inline">Simular</span>
          </button>
        </div>

        <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-stone-300">
          <span class="flex items-center gap-1 text-stone-400">
            <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-400"></i>
            100% Pintado à Mão
          </span>
          <span class="text-amber-400 font-semibold">Cód: ${item.id}</span>
        </div>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 class="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
            ${item.title}
          </h3>
          <p class="text-xs text-amber-400/90 mt-1 font-medium flex items-center gap-1">
            <i data-lucide="brush" class="w-3 h-3"></i>
            ${item.technique}
          </p>
          <p class="text-xs text-stone-400 mt-2.5 line-clamp-2 leading-relaxed">
            ${item.description}
          </p>
        </div>

        <!-- Palette Preview -->
        <div class="flex items-center gap-1.5 pt-1">
          <span class="text-[11px] text-stone-500 mr-1">Tons:</span>
          ${item.palette ? item.palette.map(c => `
            <span class="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm" style="background-color: ${c};"></span>
          `).join('') : ''}
        </div>

        <!-- Sizes & Quote Action -->
        <div class="pt-3 border-t border-stone-800/80 space-y-3">
          <div class="flex items-center justify-between text-xs">
            <span class="text-stone-400">Tamanhos sugeridos:</span>
            <span class="text-stone-300 font-medium">${item.popularSizes[0]} e mais</span>
          </div>

          <div class="flex items-center gap-2">
            <button 
              onclick="orderCatalogItem('${item.id}')"
              class="btn-shimmer flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
            >
              <i data-lucide="message-circle" class="w-4 h-4"></i>
              <span>Pedir no WhatsApp</span>
            </button>
            <button 
              onclick="customizeFromCatalog('${item.id}')"
              title="Personalizar Medidas Deste Estilo"
              class="p-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-amber-300 transition-all border border-stone-700/60"
            >
              <i data-lucide="sliders" class="w-4 h-4"></i>
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
    btn.classList.remove("bg-amber-500", "text-stone-950", "shadow-amber-500/20");
    btn.classList.add("bg-stone-900/80", "text-stone-300");
  });

  if (buttonElement) {
    buttonElement.classList.remove("bg-stone-900/80", "text-stone-300");
    buttonElement.classList.add("bg-amber-500", "text-stone-950", "shadow-amber-500/20");
  }

  renderCatalog(category);
}

function orderCatalogItem(artworkId) {
  const item = getActiveCatalog().find(a => a.id === artworkId);
  if (item) {
    WhatsAppService.sendCatalogArtworkQuote(item);
  }
}

function customizeFromCatalog(artworkId) {
  const item = getActiveCatalog().find(a => a.id === artworkId);
  if (item) {
    // Procura estilo compatível
    appState.customizer.styleName = item.title;
    appState.customizer.styleImage = item.image;
    updateSimulatorPreview();
    scrollToSection("simulador-section");
    goToCustomizerStep(2);
  }
}

function testOnWall(artworkId) {
  appState.wallVisualizer.currentArtworkId = artworkId;
  updateWallVisualizer();
  scrollToSection("visualizador-section");
}

/* ==========================================================================
   2. INTERACTIVE CUSTOMIZER / SIMULATOR (STEP BY STEP)
   ========================================================================== */

function initCustomizer() {
  renderCustomizerStyles();
  renderCustomizerSizes();
  renderCustomizerFrames();
  renderCustomizerRooms();
  renderCustomizerPalettes();
  updateSimulatorPreview();
  calculatePriceEstimate();
}

function renderCustomizerStyles() {
  const container = document.getElementById("customizer-styles-grid");
  if (!container) return;

  container.innerHTML = STYLES_LIST.map((style, idx) => {
    const isSelected = style.id === appState.customizer.styleId;
    return `
      <div 
        onclick="selectCustomizerStyle('${style.id}')"
        class="customizer-style-card relative rounded-2xl overflow-hidden cursor-pointer transition-all border ${
          isSelected 
            ? 'border-amber-400 ring-2 ring-amber-400/40 bg-stone-900' 
            : 'border-stone-800 hover:border-stone-600 bg-stone-900/60'
        } p-4 flex flex-col justify-between space-y-3 group"
      >
        <div class="relative aspect-video rounded-xl overflow-hidden bg-stone-950">
          <img src="${style.image}" alt="${style.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent"></div>
          <span class="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-950/80 text-amber-300 border border-amber-500/30">
            ${style.badge}
          </span>
          ${isSelected ? `
            <div class="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-lg">
              <i data-lucide="check" class="w-3.5 h-3.5 stroke-[3]"></i>
            </div>
          ` : ''}
        </div>
        <div>
          <h4 class="font-serif font-bold text-sm text-stone-100 ${isSelected ? 'text-amber-300' : ''}">
            ${style.name}
          </h4>
          <p class="text-xs text-stone-400 mt-1 leading-relaxed line-clamp-2">
            ${style.desc}
          </p>
        </div>
      </div>
    `;
  }).join('');

  initLucideIcons();
}

function selectCustomizerStyle(styleId) {
  const style = STYLES_LIST.find(s => s.id === styleId);
  if (style) {
    appState.customizer.styleId = style.id;
    appState.customizer.styleName = style.name;
    appState.customizer.styleImage = style.image;
    renderCustomizerStyles();
    updateSimulatorPreview();
    calculatePriceEstimate();
  }
}

function renderCustomizerSizes() {
  const container = document.getElementById("customizer-sizes-grid");
  if (!container) return;

  container.innerHTML = POPULAR_SIZES.map((size) => {
    const isSelected = appState.customizer.sizeLabel === size.label && !appState.customizer.isCustomSize;
    return `
      <div 
        onclick="selectCustomizerSize(${size.width}, ${size.height}, '${size.label}', '${size.orient}', ${size.basePrice})"
        class="relative p-4 rounded-xl cursor-pointer transition-all border ${
          isSelected 
            ? 'border-amber-400 bg-amber-500/10 ring-1 ring-amber-400/40 text-stone-100' 
            : 'border-stone-800 hover:border-stone-700 bg-stone-900/60 text-stone-300'
        } flex flex-col justify-between"
      >
        <div class="flex items-center justify-between">
          <span class="font-bold text-sm text-stone-100">${size.label}</span>
          ${size.isPopular ? `
            <span class="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-medium">Popular</span>
          ` : ''}
        </div>
        <p class="text-xs text-stone-400 mt-1">${size.desc}</p>
        <div class="mt-3 pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs">
          <span class="text-stone-500">Estimativa base:</span>
          <span class="text-amber-400 font-semibold">a partir de R$ ${size.basePrice}</span>
        </div>
      </div>
    `;
  }).join('');
}

function selectCustomizerSize(width, height, label, orient, basePrice) {
  appState.customizer.width = width;
  appState.customizer.height = height;
  appState.customizer.sizeLabel = label;
  appState.customizer.orientation = orient;
  appState.customizer.isCustomSize = false;
  
  // Limpa campos customizados se houver
  const customW = document.getElementById("custom-width-input");
  const customH = document.getElementById("custom-height-input");
  if (customW) customW.value = "";
  if (customH) customH.value = "";

  renderCustomizerSizes();
  updateSimulatorPreview();
  calculatePriceEstimate();
}

function handleCustomSizeInput() {
  const customW = document.getElementById("custom-width-input");
  const customH = document.getElementById("custom-height-input");
  
  const w = parseInt(customW?.value || 0, 10);
  const h = parseInt(customH?.value || 0, 10);

  if (w > 0 && h > 0) {
    appState.customizer.width = w;
    appState.customizer.height = h;
    appState.customizer.sizeLabel = `${w} x ${h} cm (Medida Personalizada)`;
    appState.customizer.orientation = w >= h ? "horizontal" : "vertical";
    appState.customizer.isCustomSize = true;

    renderCustomizerSizes();
    updateSimulatorPreview();
    calculatePriceEstimate();
  }
}

function renderCustomizerFrames() {
  const container = document.getElementById("customizer-frames-grid");
  if (!container) return;

  container.innerHTML = FRAMES_LIST.map((frame) => {
    const isSelected = appState.customizer.frameId === frame.id;
    return `
      <div 
        onclick="selectCustomizerFrame('${frame.id}')"
        class="relative p-4 rounded-xl cursor-pointer transition-all border ${
          isSelected 
            ? 'border-amber-400 bg-amber-500/10 ring-1 ring-amber-400/40 text-stone-100' 
            : 'border-stone-800 hover:border-stone-700 bg-stone-900/60 text-stone-300'
        } flex items-start gap-3.5"
      >
        <div 
          class="w-10 h-10 rounded-lg shadow-inner flex-shrink-0 border-2 border-stone-700 flex items-center justify-center"
          style="background-color: ${frame.color};"
        >
          ${isSelected ? `<i data-lucide="check" class="w-5 h-5 text-stone-900 stroke-[3]"></i>` : ''}
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <h5 class="font-bold text-sm text-stone-100">${frame.name}</h5>
            <span class="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-amber-400">${frame.tag}</span>
          </div>
          <p class="text-xs text-stone-400 mt-1 leading-relaxed">${frame.desc}</p>
        </div>
      </div>
    `;
  }).join('');

  initLucideIcons();
}

function selectCustomizerFrame(frameId) {
  const frame = FRAMES_LIST.find(f => f.id === frameId);
  if (frame) {
    appState.customizer.frameId = frame.id;
    appState.customizer.frameName = frame.name;
    appState.customizer.frameColor = frame.color;
    renderCustomizerFrames();
    updateSimulatorPreview();
    calculatePriceEstimate();
  }
}

function renderCustomizerRooms() {
  const container = document.getElementById("customizer-rooms-grid");
  if (!container) return;

  container.innerHTML = ROOMS_LIST.map((room) => {
    const isSelected = appState.customizer.roomId === room.id;
    return `
      <div 
        onclick="selectCustomizerRoom('${room.id}', '${room.name}')"
        class="p-3.5 rounded-xl cursor-pointer transition-all border text-center ${
          isSelected 
            ? 'border-amber-400 bg-amber-500/10 text-amber-300 font-semibold' 
            : 'border-stone-800 hover:border-stone-700 bg-stone-900/60 text-stone-300'
        }"
      >
        <div class="flex flex-col items-center gap-2">
          <i data-lucide="${room.icon}" class="w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-stone-400'}"></i>
          <span class="text-xs">${room.name}</span>
        </div>
      </div>
    `;
  }).join('');

  initLucideIcons();
}

function selectCustomizerRoom(roomId, roomName) {
  appState.customizer.roomId = roomId;
  appState.customizer.roomName = roomName;
  renderCustomizerRooms();
  updateSimulatorPreview();
}

function renderCustomizerPalettes() {
  const container = document.getElementById("customizer-palettes-grid");
  if (!container) return;

  container.innerHTML = PALETTES_LIST.map((pal) => {
    const isSelected = appState.customizer.paletteId === pal.id;
    return `
      <div 
        onclick="selectCustomizerPalette('${pal.id}', '${pal.name}')"
        class="p-3.5 rounded-xl cursor-pointer transition-all border ${
          isSelected 
            ? 'border-amber-400 bg-amber-500/10 text-stone-100' 
            : 'border-stone-800 hover:border-stone-700 bg-stone-900/60 text-stone-300'
        } flex items-center justify-between gap-3"
      >
        <span class="text-xs font-medium">${pal.name}</span>
        <div class="flex items-center gap-1">
          ${pal.colors.map(c => `<span class="w-4 h-4 rounded-full border border-white/20" style="background-color: ${c};"></span>`).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function selectCustomizerPalette(paletteId, paletteName) {
  appState.customizer.paletteId = paletteId;
  appState.customizer.paletteName = paletteName;
  renderCustomizerPalettes();
  updateSimulatorPreview();
}

function calculatePriceEstimate() {
  const w = appState.customizer.width;
  const h = appState.customizer.height;
  const areaM2 = (w * h) / 10000;
  
  // Base calculation factor + frame factor
  let baseMultiplier = 560;
  if (appState.customizer.styleId === "texturizado_ouro") baseMultiplier = 640;
  if (appState.customizer.styleId === "retrato_realista") baseMultiplier = 750;
  if (appState.customizer.styleId === "diptico_triptico") baseMultiplier = 690;

  const min = Math.round(areaM2 * baseMultiplier);
  const max = Math.round(min * 1.28);

  const priceFormatted = `R$ ${min.toLocaleString("pt-BR")} - R$ ${max.toLocaleString("pt-BR")}`;
  appState.customizer.estimatedPrice = priceFormatted;

  const priceDisplay = document.getElementById("sim-summary-price");
  if (priceDisplay) {
    priceDisplay.textContent = priceFormatted;
  }
}

function updateSimulatorPreview() {
  const c = appState.customizer;

  // Imagem & Moldura do Preview
  const previewImg = document.getElementById("simulator-preview-img");
  const previewFrame = document.getElementById("simulator-preview-frame");
  const previewSizeLabel = document.getElementById("simulator-preview-size-tag");
  const previewStyleLabel = document.getElementById("simulator-preview-style-tag");

  if (previewImg) {
    previewImg.src = c.styleImage;
  }

  if (previewFrame) {
    // Remove classes anteriores de moldura
    previewFrame.className = "painting-frame-preview w-full h-full rounded-sm overflow-hidden flex items-center justify-center";
    
    switch (c.frameId) {
      case "filete_dourada":
        previewFrame.classList.add("frame-filete-dourada");
        break;
      case "filete_preta":
        previewFrame.classList.add("frame-filete-preta");
        break;
      case "filete_amadeirada":
        previewFrame.classList.add("frame-filete-amadeirada");
        break;
      case "filete_branca":
        previewFrame.classList.add("frame-filete-branca");
        break;
      case "filete_prata":
        previewFrame.classList.add("frame-filete-prata");
        break;
      default:
        previewFrame.classList.add("frame-sem-moldura");
        break;
    }
  }

  if (previewSizeLabel) previewSizeLabel.textContent = c.sizeLabel;
  if (previewStyleLabel) previewStyleLabel.textContent = c.styleName;

  // Atualizar resumo lateral / review
  const sumStyle = document.getElementById("sim-summary-style");
  const sumSize = document.getElementById("sim-summary-size");
  const sumFrame = document.getElementById("sim-summary-frame");
  const sumRoom = document.getElementById("sim-summary-room");
  const sumPalette = document.getElementById("sim-summary-palette");

  if (sumStyle) sumStyle.textContent = c.styleName;
  if (sumSize) sumSize.textContent = c.sizeLabel;
  if (sumFrame) sumFrame.textContent = c.frameName;
  if (sumRoom) sumRoom.textContent = c.roomName;
  if (sumPalette) sumPalette.textContent = c.paletteName;
}

function goToCustomizerStep(stepNumber) {
  if (stepNumber < 1 || stepNumber > 5) return;
  
  appState.customizer.step = stepNumber;

  // Atualiza painéis visíveis
  for (let i = 1; i <= 5; i++) {
    const stepPanel = document.getElementById(`customizer-step-${i}`);
    if (stepPanel) {
      if (i === stepNumber) {
        stepPanel.classList.remove("hidden");
      } else {
        stepPanel.classList.add("hidden");
      }
    }
  }

  // Atualiza indicadores de progresso
  const stepDots = document.querySelectorAll(".step-dot");
  stepDots.forEach((dot, idx) => {
    const dotStep = idx + 1;
    dot.classList.remove("active", "completed");
    if (dotStep === stepNumber) {
      dot.classList.add("active");
    } else if (dotStep < stepNumber) {
      dot.classList.add("completed");
    }
  });

  const stepTitle = document.getElementById("customizer-step-title");
  const titles = [
    "Passo 1 de 5: Escolha o Estilo Artístico",
    "Passo 2 de 5: Defina o Tamanho e Formato",
    "Passo 3 de 5: Escolha a Moldura Premium",
    "Passo 4 de 5: Ambiente e Paleta de Cores",
    "Passo 5 de 5: Seus Dados e Envio para WhatsApp"
  ];
  if (stepTitle) stepTitle.textContent = titles[stepNumber - 1];

  updateSimulatorPreview();
  initLucideIcons();
}

function submitCustomizerToWhatsApp() {
  const nameInput = document.getElementById("cust-name");
  const phoneInput = document.getElementById("cust-phone");
  const cityInput = document.getElementById("cust-city");
  const notesInput = document.getElementById("cust-notes");

  appState.customizer.customerName = nameInput ? nameInput.value.trim() : "";
  appState.customizer.customerPhone = phoneInput ? phoneInput.value.trim() : "";
  appState.customizer.customerCity = cityInput ? cityInput.value.trim() : "";
  appState.customizer.notes = notesInput ? notesInput.value.trim() : "";

  // Validação simples
  if (!appState.customizer.customerName) {
    alert("Por favor, digite seu nome para que o artista possa te atender adequadamente.");
    if (nameInput) nameInput.focus();
    return;
  }

  WhatsAppService.sendCustomQuote({
    name: appState.customizer.customerName,
    phone: appState.customizer.customerPhone,
    city: appState.customizer.customerCity,
    notes: appState.customizer.notes,
    styleName: appState.customizer.styleName,
    dimensions: appState.customizer.sizeLabel,
    orientation: appState.customizer.orientation,
    frameName: appState.customizer.frameName,
    roomName: appState.customizer.roomName,
    paletteName: appState.customizer.paletteName,
    estimatedPrice: appState.customizer.estimatedPrice
  });
}

/* ==========================================================================
   3. VIRTUAL ROOM WALL VISUALIZER ("VEJA NA SUA PAREDE")
   ========================================================================== */

function initWallVisualizer() {
  updateWallVisualizer();
}

function setWallColor(colorPreset, el) {
  appState.wallVisualizer.wallColor = colorPreset;

  const colorButtons = document.querySelectorAll(".wall-color-btn");
  colorButtons.forEach(b => b.classList.remove("ring-2", "ring-amber-400", "scale-110"));
  if (el) el.classList.add("ring-2", "ring-amber-400", "scale-110");

  const wallContainer = document.getElementById("wall-room-scene");
  if (wallContainer) {
    // Remove classes anteriores
    wallContainer.className = "wall-scene relative";
    wallContainer.classList.add(`wall-color-${colorPreset}`);
  }
}

function setWallFurniture(furnitureType, el) {
  appState.wallVisualizer.furniture = furnitureType;

  const furnButtons = document.querySelectorAll(".wall-furniture-btn");
  furnButtons.forEach(b => {
    b.classList.remove("bg-amber-500", "text-stone-950");
    b.classList.add("bg-stone-800", "text-stone-300");
  });
  if (el) {
    el.classList.remove("bg-stone-800", "text-stone-300");
    el.classList.add("bg-amber-500", "text-stone-950");
  }

  const furnImg = document.getElementById("wall-furniture-img");
  if (furnImg) {
    const furnitureMap = {
      sofa: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
      aparador: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80",
      cama: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80"
    };
    furnImg.src = furnitureMap[furnitureType] || furnitureMap.sofa;
  }
}

function setWallFrame(frameClass, el) {
  appState.wallVisualizer.currentFrame = frameClass;

  const frameBtns = document.querySelectorAll(".wall-frame-toggle-btn");
  frameBtns.forEach(b => b.classList.remove("border-amber-400", "bg-amber-500/20"));
  if (el) el.classList.add("border-amber-400", "bg-amber-500/20");

  const wallPaintingFrame = document.getElementById("wall-painting-frame");
  if (wallPaintingFrame) {
    wallPaintingFrame.className = `painting-frame-preview max-w-sm sm:max-w-md w-full aspect-[16/10] overflow-hidden rounded-sm transition-all duration-300 ${frameClass}`;
  }
}

function updateWallVisualizer() {
  const catalog = getActiveCatalog();
  const currentArt = catalog.find(a => a.id === appState.wallVisualizer.currentArtworkId) || catalog[0];
  const wallPaintingImg = document.getElementById("wall-painting-img");
  const wallArtTitle = document.getElementById("wall-art-title");

  if (wallPaintingImg) {
    wallPaintingImg.src = currentArt.image;
    wallPaintingImg.alt = currentArt.title;
  }

  if (wallArtTitle) {
    wallArtTitle.textContent = `${currentArt.title} (${currentArt.popularSizes[0]})`;
  }
}

function orderArtworkFromWallVisualizer() {
  const catalog = getActiveCatalog();
  const currentArt = catalog.find(a => a.id === appState.wallVisualizer.currentArtworkId) || catalog[0];
  const wallColor = appState.wallVisualizer.wallColor;
  
  const customMessage = `
🎨 *PEDIDO VIA SIMULADOR DE PAREDE — ARTE EXPRESSO*
🖼️ *Obra:* ${currentArt.title} (Cód: ${currentArt.id})
• *Ambiente / Cor de Parede Testada:* Tom ${wallColor.toUpperCase()}
• *Tamanho Sugerido:* ${currentArt.popularSizes[0]}

💬 _Gostei muito da simulação no site e quero saber o valor final com moldura para entregar na minha casa!_
  `.trim();

  WhatsAppService.openWhatsApp(customMessage);
}

/* ==========================================================================
   4. MODALS, LIGHTBOX & TESTIMONIALS
   ========================================================================== */

function openArtworkModal(artworkId) {
  const art = getActiveCatalog().find(a => a.id === artworkId);
  if (!art) return;

  const modal = document.getElementById("artwork-detail-modal");
  const modalContent = document.getElementById("artwork-modal-content");

  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 sm:p-8">
      <div class="relative rounded-2xl overflow-hidden bg-stone-950 border border-stone-800">
        <img src="${art.image}" alt="${art.title}" class="w-full h-full object-cover max-h-[500px]" />
        <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-stone-950/80 text-amber-300 border border-amber-500/30">
          ${art.categoryLabel}
        </span>
      </div>

      <div class="flex flex-col justify-between space-y-5">
        <div>
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono text-amber-400">CÓDIGO: ${art.id}</span>
            <span class="px-2.5 py-0.5 rounded text-xs bg-emerald-500/20 text-emerald-300 font-medium">100% Artesanal</span>
          </div>

          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-stone-100 mt-2">${art.title}</h2>
          
          <div class="mt-3 p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 text-xs text-stone-300 space-y-1.5">
            <p><strong class="text-amber-400">Técnica:</strong> ${art.technique}</p>
            <p><strong class="text-amber-400">Materiais:</strong> Tela 100% algodão, tintas importadas de alta durabilidade, chassi de madeira imunizada.</p>
          </div>

          <p class="text-sm text-stone-300 mt-4 leading-relaxed">${art.description}</p>

          <div class="mt-5 space-y-2">
            <span class="text-xs font-semibold text-stone-400 uppercase tracking-wider">Tamanhos Populares:</span>
            <div class="flex flex-wrap gap-2">
              ${art.popularSizes.map(s => `
                <span class="px-3 py-1.5 rounded-lg bg-stone-800 text-xs text-stone-200 border border-stone-700">
                  ${s}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-stone-800 space-y-3">
          <div class="flex items-baseline justify-between">
            <span class="text-xs text-stone-400">Investimento de referência:</span>
            <span class="text-lg font-bold text-amber-400">${art.priceFrom}</span>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <button 
              onclick="orderCatalogItem('${art.id}'); closeArtworkModal();"
              class="btn-shimmer flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50"
            >
              <i data-lucide="message-circle" class="w-4 h-4"></i>
              <span>Pedir Orçamento no WhatsApp</span>
            </button>
            <button 
              onclick="testOnWall('${art.id}'); closeArtworkModal();"
              class="py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-sm transition-all flex items-center justify-center gap-2 border border-stone-700"
            >
              <i data-lucide="eye" class="w-4 h-4"></i>
              <span>Simular na Parede</span>
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

  container.innerHTML = TESTIMONIALS.map(t => `
    <div class="glass-panel p-6 rounded-2xl border border-stone-800/80 flex flex-col justify-between space-y-4 hover:border-amber-500/30 transition-all">
      <div>
        <div class="flex items-center gap-1 text-amber-400 mb-3">
          ${Array(t.rating).fill(0).map(() => `<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>`).join('')}
        </div>
        <p class="text-sm text-stone-300 italic leading-relaxed">
          "${t.comment}"
        </p>
      </div>

      <div class="pt-4 border-t border-stone-800/80 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="${t.avatar}" alt="${t.name}" class="w-10 h-10 rounded-full object-cover border border-amber-500/30" />
          <div>
            <h5 class="text-sm font-bold text-stone-100 flex items-center gap-1.5">
              ${t.name}
              <i data-lucide="badge-check" class="w-4 h-4 text-emerald-400"></i>
            </h5>
            <p class="text-xs text-stone-400">${t.role} • ${t.city}</p>
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

  container.innerHTML = FAQS.map((faq, idx) => `
    <div class="glass-panel rounded-xl border border-stone-800/80 overflow-hidden">
      <button 
        onclick="toggleFAQ(${idx})"
        class="w-full p-5 text-left font-serif font-bold text-sm sm:text-base text-stone-100 flex items-center justify-between gap-4 hover:text-amber-300 transition-colors"
      >
        <span>${faq.q}</span>
        <i id="faq-icon-${idx}" data-lucide="chevron-down" class="w-5 h-5 text-amber-400 transition-transform duration-300"></i>
      </button>
      <div id="faq-ans-${idx}" class="hidden px-5 pb-5 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800/40 pt-3">
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
