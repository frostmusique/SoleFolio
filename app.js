const STORAGE_KEY = "solefolio_items_v1";

const $ = (id) => document.getElementById(id);

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

function ticketHTML(item) {
  const q = Number(item.quantity || 1);
  const invested = Number(item.purchasePrice || 0) * q;
  const value = Number(item.marketPrice || 0) * q;
  const gain = value - invested;
  const gainPct = invested > 0 ? (gain / invested) * 100 : 0;
  const isGain = gain >= 0;

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
        <span>${item.purchaseDate || "date ?"}</span>
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

$("searchInput").addEventListener("input", (e) => {
  currentSearch = e.target.value;
  render();
});
$("sortSelect").addEventListener("change", (e) => {
  currentSort = e.target.value;
  render();
});

render();
