const STORAGE_KEY = "solefolio_items_v1";

// Catalogue de modèles populaires pour l'autocomplétion (brand + colorway se remplissent seuls)
const CATALOG = [
  { model: "Air Jordan 1 Retro Chicago (2013)", brand: "Jordan", colorway: "White / Varsity Red / Black", sku: "332550-163", year: "2013", retail: 110 },
  { model: "Air Jordan 1 Retro High Chicago", brand: "Jordan", colorway: "White / Black / Varsity Red", sku: "555088-101", year: "2015", retail: 160 },
  { model: "Air Jordan 1 Retro High Bred", brand: "Jordan", colorway: "Black / Varsity Red", sku: "555088-001", year: "2016", retail: 160 },
  { model: "Air Jordan 1 Retro High Royal", brand: "Jordan", colorway: "Black / Royal Blue / White", sku: "555088-007", year: "2017", retail: 160 },
  { model: "Air Jordan 4 Retro Bred", brand: "Jordan", colorway: "Black / Cement Grey / Fire Red", sku: "308497-060", year: "2019", retail: 200 },
  { model: "Air Jordan 4 Retro White Cement", brand: "Jordan", colorway: "White / Fire Red / Black", sku: "840606-192", year: "2016", retail: 190 },
  { model: "Air Jordan 11 Retro Concord", brand: "Jordan", colorway: "White / Black / Concord", sku: "378037-100", year: "2018", retail: 220 },
  { model: "Nike Dunk Low Panda", brand: "Nike", colorway: "Black / White", sku: "DD1391-100", year: "2021", retail: 110 },
  { model: "Nike Air Max 1 University Red", brand: "Nike", colorway: "White / University Red", sku: "908375-103", year: "2018", retail: 140 },
  { model: "Nike Air Force 1 '07 White", brand: "Nike", colorway: "White / White", sku: "315122-111", year: "2007", retail: 110 },
  { model: "Nike SB Dunk Low Travis Scott", brand: "Nike", colorway: "Cactus Jack", sku: "CT5053-001", year: "2020", retail: 150 },
  { model: "Adidas Yeezy Boost 350 V2 Zebra", brand: "Adidas", colorway: "White / Core Black / Red", sku: "CP9654", year: "2017", retail: 220 },
  { model: "Adidas Yeezy Boost 350 V2 Bred", brand: "Adidas", colorway: "Core Black / Red", sku: "CP9652", year: "2020", releaseDate: "05/12/2020", retail: 220, market: 75 },
  { model: "Adidas Samba OG", brand: "Adidas", colorway: "Cloud White / Core Black", sku: "B75806", year: "2018", retail: 100 },
  { model: "New Balance 550 White Green", brand: "New Balance", colorway: "White / Green", sku: "BB550WT1", year: "2021", retail: 120 },
  { model: "New Balance 990v5", brand: "New Balance", colorway: "Grey", sku: "M990GL5", year: "2019", retail: 185 },
  { model: "Nike Air Max 97 Silver Bullet", brand: "Nike", colorway: "Silver / White", sku: "884421-001", year: "2017", retail: 175 },
  { model: "Nike Air Max 1 Twine Baroque Brown", brand: "Nike", colorway: "Twine / Baroque Brown", sku: "DA4302-700", year: "2020", releaseDate: "08/08/2020", retail: 140, market: 105 },
  { model: "Nike Air Max 1 SP Concepts Oil Green", brand: "Nike", colorway: "Oil Green / Multi-Color / Sail", sku: "DN1803-300", year: "2022", releaseDate: "05/03/2022", retail: 170, market: 100 },
  { model: "Adidas YZY Foam RNR Carbon", brand: "Adidas", colorway: "Carbon / Carbon / Carbon", sku: "IG5349", year: "2023", releaseDate: "08/08/2023", retail: 90, market: 45 },
  { model: "Nike Air VaporMax FK Moc 2 ACRONYM", brand: "Nike", colorway: "Black / Black / Volt", sku: "AQ0996-007", year: "2018", releaseDate: "26/04/2018", retail: 225, market: 145 },
  { model: "Nike Air Force 1 '07 Lemon Wash", brand: "Nike", colorway: "Lemon Wash / Lemon Wash", sku: "DZ4493-700", year: "2022", releaseDate: "21/11/2022", retail: 110, market: 110 },
  { model: "Adidas Yeezy Boost 350 V2 Beluga Reflective", brand: "Adidas", colorway: "Grey / Solar Red", sku: "GW1229", year: "2021", releaseDate: "18/12/2021", retail: 220, market: 170 },
  { model: "Adidas Yeezy Boost 350 V2 Oreo", brand: "Adidas", colorway: "Core Black / White", sku: "BY1604", year: "2016", releaseDate: "18/12/2016", retail: 220, market: 68 },
  { model: "Adidas Yeezy 700 V3 Azael", brand: "Adidas", colorway: "Azael", sku: "FW4980", year: "2019", releaseDate: "23/12/2019", retail: 200, market: 110 },
  { model: "Adidas Yeezy Boost 700 Wave Runner", brand: "Adidas", colorway: "Magnet Grey / White / Black", sku: "B75571", year: "2017", releaseDate: "18/11/2017", retail: 300, market: 280 },
  { model: "Adidas Yeezy Boost 350 V2 Bred OG", brand: "Adidas", colorway: "Core Black / Red", sku: "BY9612", year: "2016", releaseDate: "23/11/2016", retail: 220, market: 165 },
  { model: "Adidas Yeezy Boost 350 V2 Dazzling Blue", brand: "Adidas", colorway: "Core Black / Dazzling Blue", sku: "GY7164", year: "2022", releaseDate: "26/02/2022", retail: 220, market: 140 },
  { model: "Adidas Yeezy Boost 700 V1 Kids Wave Runner", brand: "Adidas", colorway: "Magnet Grey / White / Black", sku: "FU9005", year: "2017", releaseDate: "18/11/2017", retail: 180, market: 110 },
  { model: "Adidas Yeezy Foam RNNR MX Cinder", brand: "Adidas", colorway: "MX Cinder (brown/tan)", sku: "ID4126", year: "2023", releaseDate: "31/05/2023", retail: 90, market: 65 },
];

const $ = (id) => document.getElementById(id);

// Import initial du stock scanné (13 paires identifiées sur les photos d'étiquettes envoyées)
const INITIAL_STOCK = [
  { brand: "Nike", model: "Air Max 1 Twine Baroque Brown", colorway: "Twine / Baroque Brown", size: "41", sku: "DA4302-700", retail: 140, market: 105 },
  { brand: "Nike", model: "Air Max 1 SP Concepts Oil Green", colorway: "Oil Green / Multi-Color / Sail", size: "41", sku: "DN1803-300", retail: 170, market: 100 },
  { brand: "Adidas", model: "YZY Foam RNR Carbon", colorway: "Carbon / Carbon / Carbon", size: "40⅔", sku: "IG5349", retail: 90, market: 45 },
  { brand: "Nike", model: "Air VaporMax FK Moc 2 / ACRONYM", colorway: "Black / Black / Volt", size: "41", sku: "AQ0996-007", retail: 225, market: 145 },
  { brand: "Nike", model: "Air Force 1 '07 Lemon Wash", colorway: "Lemon Wash / Lemon Wash", size: "41", sku: "DZ4493-700", retail: 110, market: 110 },
  { brand: "Adidas", model: "Yeezy Boost 350 V2 Bred (restock)", colorway: "Core Black / Red", size: "42", sku: "CP9652", retail: 220, market: 75 },
  { brand: "Adidas", model: "Yeezy Boost 350 V2 Beluga Reflective", colorway: "Grey / Solar Red", size: "41⅓", sku: "GW1229", retail: 220, market: 170 },
  { brand: "Adidas", model: "Yeezy Boost 350 V2 Oreo", colorway: "Core Black / White", size: "41⅓", sku: "BY1604", retail: 220, market: 68 },
  { brand: "Adidas", model: "Yeezy 700 V3 Azael", colorway: "Azael", size: "41⅓", sku: "FW4980", retail: 200, market: 110 },
  { brand: "Adidas", model: "Yeezy Boost 700 Wave Runner", colorway: "Magnet Grey / White / Black", size: "41⅓", sku: "B75571", retail: 300, market: 280 },
  { brand: "Adidas", model: "Yeezy Boost 350 V2 Bred (OG 2016)", colorway: "Core Black / Red", size: "41⅓", sku: "BY9612", retail: 220, market: 165 },
  { brand: "Adidas", model: "Yeezy Boost 350 V2 Dazzling Blue", colorway: "Core Black / Dazzling Blue", size: "41⅓", sku: "GY7164", retail: 220, market: 140 },
  { brand: "Adidas", model: "Yeezy Boost 700 V1 Kids Wave Runner", colorway: "Magnet Grey / White / Black", size: "31", sku: "FU9005", retail: 180, market: 110 },
  { brand: "Adidas", model: "Yeezy Foam RNNR MX Cinder", colorway: "MX Cinder (brown/tan)", size: "40⅔", sku: "ID4126", retail: 90, market: 65 },
];

function seedInitialStockIfEmpty() {
  const already = localStorage.getItem(STORAGE_KEY);
  const seedFlag = localStorage.getItem("solefolio_seeded_v1");
  if (already || seedFlag) return;
  const now = Date.now();
  const seeded = INITIAL_STOCK.map((s, i) => ({
    id: (now + i).toString(),
    createdAt: now + i,
    brand: s.brand,
    model: s.model,
    colorway: s.colorway,
    size: s.size,
    quantity: 1,
    imageUrl: "",
    purchaseDate: "",
    purchasePrice: s.retail || "",
    marketPrice: s.market || "",
    notes: `SKU ${s.sku} · retail ${s.retail}€`,
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  localStorage.setItem("solefolio_seeded_v1", "1");
}
seedInitialStockIfEmpty();

let items = load();
let currentSort = "recent";
let currentSearch = "";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function euros(n) {
  const num = Number(n);
  if (n === "" || n === null || n === undefined || isNaN(num)) return "—";
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(num);
}

function computeTotals(list) {
  let invested = 0, value = 0;
  list.forEach((it) => {
    const q = Number(it.quantity || 1);
    invested += Number(it.purchasePrice || 0) * q;
    value += Number(it.marketPrice || 0) * q;
  });
  return { invested, value, gain: value - invested };
}

function renderStats() {
  const t = computeTotals(items);
  $("statInvested").textContent = euros(t.invested);
  $("statValue").textContent = euros(t.value);
  const gainEl = $("statGain");
  gainEl.textContent = (t.gain >= 0 ? "+" : "") + euros(t.gain).replace("-", "");
  gainEl.className = "stat-value " + (t.gain >= 0 ? "positive" : "negative");
}

function placeholderSVG() {
  return `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 78 Q30 50 55 52 Q72 38 100 40 L150 44 Q172 45 180 62 L180 78 Q180 85 172 85 L28 85 Q20 85 20 78 Z"
      fill="none" stroke="#8A8478" stroke-width="3"/>
  </svg>`;
}

function getReleaseYear(item) {
  const skuMatch = (item.notes || "").match(/SKU\s+([A-Z0-9-]+)/i);
  if (!skuMatch) return null;
  const sku = skuMatch[1].toUpperCase();
  const cat = CATALOG.find((c) => c.sku && c.sku.toUpperCase() === sku);
  if (!cat) return null;
  return cat.releaseDate || cat.year || null;
}

function ticketHTML(item) {
  const q = Number(item.quantity || 1);
  const invested = Number(item.purchasePrice || 0) * q;
  const value = Number(item.marketPrice || 0) * q;
  const gain = value - invested;
  const gainPct = invested > 0 ? (gain / invested) * 100 : 0;
  const isGain = gain >= 0;
  const releaseYear = getReleaseYear(item);
  const dateLabel = item.purchaseDate || (releaseYear ? `sortie ${releaseYear}` : "date ?");

  return `
  <article class="ticket" data-id="${item.id}">
    <div class="ticket-image">
      ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${escapeHTML(item.model)}" loading="lazy" />` : placeholderSVG()}
      <div class="ticket-actions">
        <button class="icon-btn edit-btn" aria-label="Modifier">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
        </button>
        <button class="icon-btn danger delete-btn" aria-label="Supprimer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
        </button>
      </div>
    </div>
    <div class="ticket-body">
      <div>
        <p class="ticket-brand">${escapeHTML(item.brand || "—")}</p>
        <h3 class="ticket-model">${escapeHTML(item.model || "Modèle sans nom")}</h3>
        <p class="ticket-meta">${escapeHTML(item.colorway || "")}${item.size ? " · EU " + escapeHTML(item.size) : ""}</p>
      </div>
      <div class="ticket-divider">
        <span>${dateLabel}</span>
        <span>x${q}</span>
      </div>
      <div class="price-row">
        <div class="price-block">
          <p class="price-label">Acheté</p>
          <p class="price-value">${euros(item.purchasePrice)}</p>
        </div>
        <div class="price-block" style="text-align:right">
          <p class="price-label">Marché</p>
          <p class="price-value market">${euros(item.marketPrice)}</p>
        </div>
      </div>
      <div class="gain-badge ${isGain ? "positive" : "negative"}">
        <span class="lbl">Plus-value</span>
        <span>${isGain ? "+" : "-"}${euros(Math.abs(gain)).replace("-", "")} (${gainPct >= 0 ? "+" : ""}${gainPct.toFixed(0)}%)</span>
      </div>
    </div>
  </article>`;
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function getFilteredSorted() {
  let list = [...items];
  if (currentSearch) {
    const s = currentSearch.toLowerCase();
    list = list.filter((it) =>
      [it.brand, it.model, it.colorway].join(" ").toLowerCase().includes(s)
    );
  }
  switch (currentSort) {
    case "gain":
      list.sort((a, b) => {
        const ga = Number(a.marketPrice || 0) * Number(a.quantity || 1) - Number(a.purchasePrice || 0) * Number(a.quantity || 1);
        const gb = Number(b.marketPrice || 0) * Number(b.quantity || 1) - Number(b.purchasePrice || 0) * Number(b.quantity || 1);
        return gb - ga;
      });
      break;
    case "value":
      list.sort((a, b) => Number(b.marketPrice || 0) * Number(b.quantity || 1) - Number(a.marketPrice || 0) * Number(a.quantity || 1));
      break;
    case "name":
      list.sort((a, b) => (a.model || "").localeCompare(b.model || ""));
      break;
    default:
      list.sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0));
  }
  return list;
}

function render() {
  renderStats();
  const list = getFilteredSorted();
  const grid = $("grid");
  const empty = $("emptyState");
  if (items.length === 0) {
    grid.innerHTML = "";
    empty.hidden = false;
    empty.querySelector("p").textContent = "Aucune paire pour l'instant.";
  } else if (list.length === 0) {
    grid.innerHTML = "";
    empty.hidden = false;
    empty.querySelector("p").textContent = "Aucun résultat pour cette recherche.";
  } else {
    empty.hidden = true;
    grid.innerHTML = list.map(ticketHTML).join("");
  }
  attachCardEvents();
}

function attachCardEvents() {
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.closest(".ticket").dataset.id;
      openModal(items.find((it) => it.id === id));
    });
  });
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.closest(".ticket").dataset.id;
      if (confirm("Supprimer cette paire du portfolio ?")) {
        items = items.filter((it) => it.id !== id);
        persist();
        render();
      }
    });
  });
}

function openModal(item) {
  $("scanStatus").hidden = true;
  $("scanInput").value = "";
  $("modalTitle").textContent = item ? "Modifier la paire" : "Ajouter une paire";
  $("itemId").value = item ? item.id : "";
  $("fBrand").value = item?.brand || "";
  $("fModel").value = item?.model || "";
  $("fColorway").value = item?.colorway || "";
  $("fSize").value = item?.size || "";
  $("fQuantity").value = item?.quantity || 1;
  $("fImage").value = item?.imageUrl || "";
  $("fDate").value = item?.purchaseDate || "";
  $("fPurchase").value = item?.purchasePrice || "";
  $("fMarket").value = item?.marketPrice || "";
  $("fNotes").value = item?.notes || "";
  $("modalOverlay").hidden = false;
}

function closeModal() {
  $("modalOverlay").hidden = true;
  $("sneakerForm").reset();
}

$("addBtn").addEventListener("click", () => openModal(null));

$("resetBtn").addEventListener("click", () => {
  if (confirm("Réinitialiser le stock avec les 14 paires par défaut (dates et prix à jour) ? Toute modification ou photo déjà ajoutée sera perdue.")) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("solefolio_seeded_v1");
    seedInitialStockIfEmpty();
    items = load();
    render();
  }
});
$("closeModal").addEventListener("click", closeModal);
$("modalOverlay").addEventListener("click", (e) => {
  if (e.target.id === "modalOverlay") closeModal();
});

$("sneakerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = $("itemId").value;
  const data = {
    id: id || Date.now().toString(),
    createdAt: id ? items.find((it) => it.id === id)?.createdAt : Date.now(),
    brand: $("fBrand").value.trim(),
    model: $("fModel").value.trim(),
    colorway: $("fColorway").value.trim(),
    size: $("fSize").value.trim(),
    quantity: $("fQuantity").value || 1,
    imageUrl: $("fImage").value.trim(),
    purchaseDate: $("fDate").value,
    purchasePrice: $("fPurchase").value,
    marketPrice: $("fMarket").value,
    notes: $("fNotes").value.trim(),
  };
  if (id) {
    items = items.map((it) => (it.id === id ? data : it));
  } else {
    items.push(data);
  }
  persist();
  closeModal();
  render();
});

function findBySku(text) {
  const cleaned = text.toUpperCase();
  // formats: 555088-101, DD1391-100, CP9654, M990GL5...
  const patterns = [
    /\b[A-Z]{0,3}\d{4,6}-\d{2,3}\b/g,
    /\b[A-Z]{1,2}\d{4,6}\b/g,
  ];
  const candidates = new Set();
  patterns.forEach((re) => {
    const found = cleaned.match(re);
    if (found) found.forEach((f) => candidates.add(f));
  });
  for (const code of candidates) {
    const match = CATALOG.find((c) => c.sku && c.sku.toUpperCase() === code);
    if (match) return match;
  }
  return null;
}

function setScanStatus(msg, kind) {
  const el = $("scanStatus");
  el.hidden = false;
  el.textContent = msg;
  el.className = "scan-status" + (kind ? " " + kind : "");
}

$("scanInput").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setScanStatus("Analyse de l'étiquette en cours…");
  try {
    const { data } = await Tesseract.recognize(file, "eng");
    const text = data.text || "";
    const match = findBySku(text);
    if (match) {
      $("fModel").value = match.model;
      $("fBrand").value = match.brand;
      $("fColorway").value = match.colorway;
      const extras = [`SKU ${match.sku}`, match.year ? `sortie ${match.year}` : null, match.retail ? `retail ${match.retail}€` : null]
        .filter(Boolean).join(" · ");
      if (!$("fNotes").value) $("fNotes").value = extras;
      setScanStatus(`✓ Trouvé : ${match.model} (${extras})`, "found");
    } else {
      const skuGuess = text.match(/\b[A-Z0-9]{5,10}-?\d{0,3}\b/i);
      setScanStatus(
        skuGuess
          ? `Pas de correspondance pour "${skuGuess[0]}". Donne-moi ce code en conversation, je l'ajoute au catalogue.`
          : "Étiquette illisible, réessaie avec plus de lumière ou remplis manuellement.",
        "notfound"
      );
    }
  } catch (err) {
    setScanStatus("Erreur pendant l'analyse, réessaie ou remplis manuellement.", "notfound");
  }
});

function populateCatalog() {
  const datalist = $("modelSuggestions");
  datalist.innerHTML = CATALOG.map((c) => `<option value="${c.model}"></option>`).join("");
}
populateCatalog();

$("fModel").addEventListener("input", (e) => {
  const match = CATALOG.find((c) => c.model.toLowerCase() === e.target.value.toLowerCase());
  if (match) {
    if (!$("fBrand").value) $("fBrand").value = match.brand;
    if (!$("fColorway").value) $("fColorway").value = match.colorway;
    if (!$("fPurchase").value && match.retail) $("fPurchase").value = match.retail;
    if (!$("fMarket").value && match.market) $("fMarket").value = match.market;
    if (!$("fNotes").value) {
      const extras = [
        match.sku ? `SKU ${match.sku}` : null,
        match.releaseDate ? `sortie ${match.releaseDate}` : match.year ? `sortie ${match.year}` : null,
        match.retail ? `retail ${match.retail}€` : null,
      ].filter(Boolean).join(" · ");
      if (extras) $("fNotes").value = extras;
    }
  }
});

$("searchInput").addEventListener("input", (e) => {
  currentSearch = e.target.value;
  render();
});
$("sortSelect").addEventListener("change", (e) => {
  currentSort = e.target.value;
  render();
});

$("logoTrigger").addEventListener("click", () => {
  $("logoLightbox").hidden = false;
});
$("logoLightbox").addEventListener("click", () => {
  $("logoLightbox").hidden = true;
});

render();
