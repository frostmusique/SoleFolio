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
  { model: "Nike Air Force 1 '07 Chili Pepper", brand: "Nike", colorway: "Chili Pepper / Chili Pepper", sku: "DZ4493-700", year: "2022", releaseDate: "21/11/2022", retail: 110, market: 110 },
  { model: "Adidas Yeezy Boost 350 V2 Beluga Reflective", brand: "Adidas", colorway: "Grey / Solar Red", sku: "GW1229", year: "2021", releaseDate: "18/12/2021", retail: 220, market: 170 },
  { model: "Adidas Yeezy Boost 350 V2 Oreo", brand: "Adidas", colorway: "Core Black / White", sku: "BY1604", year: "2016", releaseDate: "18/12/2016", retail: 220, market: 68 },
  { model: "Adidas Yeezy 700 V3 Azael", brand: "Adidas", colorway: "Azael", sku: "FW4980", year: "2019", releaseDate: "23/12/2019", retail: 200, market: 110 },
  { model: "Adidas Yeezy Boost 700 Wave Runner", brand: "Adidas", colorway: "Magnet Grey / White / Black", sku: "B75571", year: "2017", releaseDate: "18/11/2017", retail: 300, market: 280 },
  { model: "Adidas Yeezy Boost 350 V2 Bred OG", brand: "Adidas", colorway: "Core Black / Red", sku: "BY9612", year: "2016", releaseDate: "23/11/2016", retail: 220, market: 165 },
  { model: "Adidas Yeezy Boost 350 V2 Dazzling Blue", brand: "Adidas", colorway: "Core Black / Dazzling Blue", sku: "GY7164", year: "2022", releaseDate: "26/02/2022", retail: 220, market: 140 },
  { model: "Adidas Yeezy Boost 700 V1 Kids Wave Runner", brand: "Adidas", colorway: "Magnet Grey / White / Black", sku: "FU9005", year: "2017", releaseDate: "18/11/2017", retail: 180, market: 110 },
  { model: "Adidas Yeezy Foam RNNR MX Cinder", brand: "Adidas", colorway: "MX Cinder (brown/tan)", sku: "ID4126", year: "2023", releaseDate: "31/05/2023", retail: 90, market: 65 },
  { model: "Nike SB Dunk Low Pro Wizard of Oz", brand: "Nike", colorway: "Gym Red / University Red / Multi", sku: "FZ1291-600", year: "2024", releaseDate: "23/12/2024", retail: 125, market: 87 },
  { model: "Adidas Yeezy Boost 350 V2 Clay", brand: "Adidas", colorway: "Clay / Clay / Clay", sku: "EG7490", year: "2019", releaseDate: "30/03/2019", retail: 220, market: 150 },
  { model: "Adidas Yeezy Boost 700 Bright Blue", brand: "Adidas", colorway: "Blue / Orange", sku: "GZ0541", year: "2021", releaseDate: "24/04/2021", retail: 240, market: 155 },
  { model: "Air Jordan 1 Retro High OG Black Toe Reimagined", brand: "Jordan", colorway: "White / Black / Varsity Red / Sail", sku: "DZ5485-106", year: "2025", releaseDate: "15/02/2025", retail: 180, market: 106 },
  { model: "Undefeated x Air Jordan 4 Retro OG SP", brand: "Jordan", colorway: "Deep Green / Clementine / Black / Sail", sku: "IB1519-200", year: "2025", releaseDate: "02/08/2025", retail: 225, market: 176 },
  { model: "Nike Classic Cortez Leather Forrest Gump", brand: "Nike", colorway: "White / Varsity Red", sku: "749571-154", year: "2018", releaseDate: "02/10/2018", retail: 80, market: 90 },
  { model: "Sp5der x Adidas Superstar Black", brand: "Adidas", colorway: "Core Black / Core Black / Supplier Colour", sku: "KJ7021", year: "2026", releaseDate: "03/03/2026", retail: 150, market: 182 },
  { model: "Jordan 1 Crib Bootie Patent Bred", brand: "Jordan", colorway: "Black / Varsity Red / White", sku: "AT3745-063", year: "2021", releaseDate: "30/12/2021", retail: 45, market: 40 },
  { model: "Air Jordan 1 Retro Low OG Chicago (2025)", brand: "Jordan", colorway: "Varsity Red / Black / Summit White", sku: "HQ6998-600", year: "2025", releaseDate: "15/11/2025", retail: 145, market: 103 },
  { model: "Nike Air Max 1 Anniversary University Red", brand: "Nike", colorway: "White / University Red", sku: "908375-103", year: "2017", releaseDate: "21/09/2017", retail: 140, market: 150 },
  { model: "Jordan 1 Crib Bootie Chicago Lost and Found", brand: "Jordan", colorway: "Varsity Red / Black / Sail", sku: "AT3745-612", year: "2022", releaseDate: "19/11/2022", retail: 30, market: 25 },
  { model: "Pharrell x Adidas NMD Hu Trail Holi Core Black", brand: "Adidas", colorway: "Core Black / Deepest Purple / Core Black", sku: "AC7033", year: "2018", releaseDate: "16/03/2018", retail: 250, market: 180 },
  { model: "Off-White x Converse Chuck 70 The Ten", brand: "Converse", colorway: "Clear / White / White", sku: "162204C", year: "2018", releaseDate: "12/05/2018", retail: 130, market: 300 },
  { model: "Alexander Wang x Adidas AW Run Clean", brand: "Adidas", colorway: "Core Black / Core Black / Core Black", sku: "AQ1230", year: "2018", releaseDate: "19/05/2018", retail: 180, market: 100 },
  { model: "Nike SB Dunk Low Pro Chicago J-Pack", brand: "Nike", colorway: "Varsity Red / White / Varsity Red / Black", sku: "BQ6817-600", year: "2020", releaseDate: "01/09/2020", retail: 95, market: 94 },
  { model: "Adidas Yeezy Boost 350 V2 Beluga 2.0", brand: "Adidas", colorway: "Grey / Bold Orange / Dark Grey", sku: "AH2203", year: "2017", releaseDate: "25/11/2017", retail: 220, market: 150 },
  { model: "Adidas Yeezy Boost 350 V2 Cream White", brand: "Adidas", colorway: "Cream White / Cream White", sku: "CP9366", year: "2017", releaseDate: "29/04/2017", retail: 220, market: 75 },
  { model: "Adidas Yeezy Boost 350 V2 Black Non-Reflective", brand: "Adidas", colorway: "Black / Black / Black", sku: "FU9006", year: "2019", releaseDate: "08/06/2019", retail: 220, market: 90 },
  { model: "Virgil Abloh Archive x Air Jordan 1 High OG Alaska", brand: "Jordan", colorway: "White / White", sku: "AA3834-100", year: "2026", releaseDate: "03/04/2026", retail: 230, market: 250 },
  { model: "BBC x Adidas NMD Hu Trail Heart/Mind", brand: "Adidas", colorway: "Cloud White / Scarlet / Blue", sku: "BB9544", year: "2018", releaseDate: "20/10/2018", retail: 250, market: 220 },
  { model: "Union LA x Air Jordan 1 High OG Chicago Shadow", brand: "Jordan", colorway: "Varsity Red / Black / Shadow Grey", sku: "HV8563-600", year: "2025", releaseDate: "27/02/2025", retail: 200, market: 220 },
  { model: "Nike Air Max Susan Missing Link", brand: "Nike", colorway: "Multi-Color / Multi-Color", sku: "CK6643-100", year: "2019", releaseDate: "09/04/2019", retail: 170, market: 240 },
  { model: "Air Jordan 1 High OG Lost & Found Chicago", brand: "Jordan", colorway: "Varsity Red / Black / Sail / Muslin", sku: "DZ5485-612", year: "2022", releaseDate: "19/11/2022", retail: 180, market: 160 },
  { model: "Nike Dunk Low Chicago Split", brand: "Nike", colorway: "University Red / Black / Light Silver / White", sku: "DZ2536-600", year: "2023", releaseDate: "14/07/2023", retail: 110, market: 100 },
  { model: "Off-White x Nike Dunk Low Lot 24 of 50", brand: "Nike", colorway: "Sail / Neutral Grey / Washed Coral", sku: "DM1602-119", year: "2021", releaseDate: "09/08/2021", retail: 180, market: 350 },
  { model: "NBA x Nike Dunk Low EMB Chicago Bulls", brand: "Nike", colorway: "Sail / Black / Chile Red / Black", sku: "DD3363-100", year: "2021", releaseDate: "23/10/2021", retail: 110, market: 90 },
  { model: "Adidas Yeezy Foam RNR Onyx", brand: "Adidas", colorway: "Onyx / Onyx / Onyx", sku: "HP8739", year: "2022", releaseDate: "08/06/2022", retail: 90, market: 60 },
  { model: "Adidas Yeezy Foam RNR Onyx Kids", brand: "Adidas", colorway: "Onyx / Onyx / Onyx", sku: "HP5347", year: "2022", releaseDate: "08/06/2022", retail: 60, market: 45 },
  { model: "Adidas Yeezy Knit RNR Fade Onyx", brand: "Adidas", colorway: "Fade Onyx / Fade Onyx / Fade Onyx", sku: "IE1663", year: "2023", releaseDate: "10/08/2023", retail: 210, market: 85 },
  { model: "Adidas Yeezy Slide Dark Onyx", brand: "Adidas", colorway: "Dark Onyx / Dark Onyx / Dark Onyx", sku: "ID5103", year: "2024", releaseDate: "07/03/2024", retail: 70, market: 60 },
  { model: "Adidas Yeezy Foam RNR Sand", brand: "Adidas", colorway: "Sand / Sand / Sand", sku: "FY4567", year: "2021", releaseDate: "26/03/2021", retail: 90, market: 65 },
  { model: "Air Jordan 1 High OG Spider-Man Across the Spider-Verse", brand: "Jordan", colorway: "University Red / Black / Summit White", sku: "DV1748-601", year: "2023", releaseDate: "20/05/2023", retail: 200, market: 112 },
  { model: "Adidas Yeezy Foam RNR Infant Stone Sage", brand: "Adidas", colorway: "Stone Sage / Stone Sage / Stone Sage", sku: "GX7296", year: "2022", releaseDate: "11/03/2022", retail: 45, market: 40 },
  { model: "Nike Air Force 1 Low x Supreme White", brand: "Nike", colorway: "White / White", sku: "CU9225-100", year: "2020", releaseDate: "05/03/2020", retail: 118, market: 150 },
  { model: "Adidas Yeezy Boost 350 Pirate Black", brand: "Adidas", colorway: "Pirate Black / Pirate Black / Pirate Black", sku: "BB5350", year: "2023", releaseDate: "31/05/2023", retail: 230, market: 100 },
  { model: "Air Jordan 4 Retro Fire Red", brand: "Jordan", colorway: "White / Varsity Red / Black", sku: "308497-110", year: "2012", releaseDate: "04/08/2012", retail: 160, market: 200 },
  { model: "Nike Blazer Mid '77 Vintage", brand: "Nike", colorway: "White / Black", sku: "BQ6806-100", year: "2019", releaseDate: "25/03/2019", retail: 100, market: 105 },
  { model: "Nike React Infinity Run FK 3 Prm Moving Company", brand: "Nike", colorway: "Phantom / Oatmeal / Citron Pulse / Ale Brown", sku: "DZ3025-001", year: "2023", releaseDate: "02/02/2023", retail: 180, market: 63 },
  { model: "Nike Air Max 98 University Red", brand: "Nike", colorway: "University Red / University Red", sku: "640744-602", year: "2019", releaseDate: "25/01/2019", retail: 160, market: 100 },
  { model: "Nike Air Max 97 Ultra '17 x Skepta", brand: "Nike", colorway: "Multi-Color / Black / Vivid Sulfur", sku: "AJ1988-900", year: "2017", releaseDate: "02/09/2017", retail: 180, market: 200 },
  { model: "Air Jordan 7 Retro x Patta Shimmer", brand: "Jordan", colorway: "Shimmer / Tough Red / Velvet Brown", sku: "AT3375-200", year: "2019", releaseDate: "15/06/2019", retail: 200, market: 149 },
];

const $ = (id) => document.getElementById(id);

// Photos ajoutees manuellement (uploadees par l'utilisateur), associees par SKU
const IMAGES_BY_SKU = {
  "ID4126": "assets/id4126.jpeg",
  "FU9005": "assets/fu9005.jpeg",
  "GY7164": "assets/gy7164.jpeg",
  "BY9612": "assets/by9612.jpeg",
  "B75571": "assets/b75571.jpeg",
  "FW4980": "assets/fw4980.jpeg",
  "BY1604": "assets/by1604.jpeg",
  "GW1229": "assets/gw1229.jpeg",
  "CP9652": "assets/cp9652.jpeg",
  "DZ4493-700": "assets/dz4493.jpeg",
  "AQ0996-007": "assets/aq0996.jpeg",
  "IG5349": "assets/ig5349.jpeg",
  "DN1803-300": "assets/dn1803.jpeg",
  "DA4302-700": "assets/da4302.jpeg",
};

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
let currentBrandFilter = "all";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function backfillImagesFromSku() {
  let changed = false;
  items = items.map((it) => {
    if (it.imageUrl) return it;
    const m = (it.notes || "").match(/SKU\s+([A-Z0-9-]+)/i);
    if (!m) return it;
    const img = IMAGES_BY_SKU[m[1].toUpperCase()];
    if (!img) return it;
    changed = true;
    return { ...it, imageUrl: img };
  });
  if (changed) persist();
}
backfillImagesFromSku();

// Nouvelles paires ajoutees via conversation, injectees automatiquement dans le stock existant si absentes
const PENDING_NEW_ITEMS = [
  { brand: "Nike", model: "SB Dunk Low Pro Wizard of Oz", colorway: "Gym Red / University Red / Multi", size: "41", sku: "FZ1291-600", retail: 125, market: 87 },
  { brand: "Adidas", model: "Yeezy Boost 350 V2 Clay", colorway: "Clay / Clay / Clay", size: "41⅓", sku: "EG7490", retail: 220, market: 150 },
  { brand: "Adidas", model: "Yeezy Boost 700 Bright Blue", colorway: "Blue / Orange", size: "38⅔", sku: "GZ0541", retail: 240, market: 155 },
  { brand: "Jordan", model: "Air Jordan 1 Retro High OG Black Toe Reimagined", colorway: "White / Black / Varsity Red / Sail", size: "41", sku: "DZ5485-106", retail: 180, market: 106 },
  { brand: "Jordan", model: "Undefeated x Air Jordan 4 Retro OG SP", colorway: "Deep Green / Clementine / Black / Sail", size: "41", sku: "IB1519-200", retail: 225, market: 176 },
  { brand: "Nike", model: "Classic Cortez Leather Forrest Gump", colorway: "White / Varsity Red", size: "41", sku: "749571-154", retail: 80, market: 90 },
  { brand: "Adidas", model: "Sp5der x Adidas Superstar Black", colorway: "Core Black / Core Black / Supplier Colour", size: "41⅓", sku: "KJ7021", retail: 150, market: 182 },
  { brand: "Jordan", model: "Jordan 1 Crib Bootie Patent Bred", colorway: "Black / Varsity Red / White", size: "2C", sku: "AT3745-063", retail: 45, market: 40 },
  { brand: "Jordan", model: "Air Jordan 1 Retro Low OG Chicago (2025)", colorway: "Varsity Red / Black / Summit White", size: "41", sku: "HQ6998-600", retail: 145, market: 103 },
  { brand: "Nike", model: "Air Max 1 Anniversary University Red", colorway: "White / University Red", size: "41", sku: "908375-103", retail: 140, market: 150 },
  { brand: "Jordan", model: "Jordan 1 Crib Bootie Chicago Lost and Found", colorway: "Varsity Red / Black / Sail", size: "1C", sku: "AT3745-612", retail: 30, market: 25 },
  { brand: "Adidas", model: "Pharrell x Adidas NMD Hu Trail Holi Core Black", colorway: "Core Black / Deepest Purple / Core Black", size: "41⅓", sku: "AC7033", retail: 250, market: 180 },
  { brand: "Converse", model: "Off-White x Converse Chuck 70 The Ten", colorway: "Clear / White / White", size: "41.5", sku: "162204C", retail: 130, market: 300 },
  { brand: "Adidas", model: "Alexander Wang x Adidas AW Run Clean", colorway: "Core Black / Core Black / Core Black", size: "41⅓", sku: "AQ1230", retail: 180, market: 100 },
  { brand: "Nike", model: "SB Dunk Low Pro Chicago J-Pack", colorway: "Varsity Red / White / Varsity Red / Black", size: "41", sku: "BQ6817-600", retail: 95, market: 94 },
  { brand: "Adidas", model: "Yeezy Boost 350 V2 Beluga 2.0", colorway: "Grey / Bold Orange / Dark Grey", size: "41⅓", sku: "AH2203", retail: 220, market: 150 },
  { brand: "Adidas", model: "Yeezy Boost 350 V2 Cream White", colorway: "Cream White / Cream White", size: "41⅓", sku: "CP9366", retail: 220, market: 75 },
  { brand: "Adidas", model: "Yeezy Boost 350 V2 Black Non-Reflective", colorway: "Black / Black / Black", size: "41⅓", sku: "FU9006", retail: 220, market: 90 },
  { brand: "Jordan", model: "Virgil Abloh Archive x Air Jordan 1 High OG Alaska", colorway: "White / White", size: "41", sku: "AA3834-100", retail: 230, market: 250 },
  { brand: "Adidas", model: "BBC x Adidas NMD Hu Trail Heart/Mind", colorway: "Cloud White / Scarlet / Blue", size: "41⅓", sku: "BB9544", retail: 250, market: 220 },
  { brand: "Jordan", model: "Union LA x Air Jordan 1 High OG Chicago Shadow", colorway: "Varsity Red / Black / Shadow Grey", size: "41", sku: "HV8563-600", retail: 200, market: 220 },
  { brand: "Nike", model: "Air Max Susan Missing Link", colorway: "Multi-Color / Multi-Color", size: "41", sku: "CK6643-100", retail: 170, market: 240 },
  { brand: "Jordan", model: "Air Jordan 1 High OG Lost & Found Chicago", colorway: "Varsity Red / Black / Sail / Muslin", size: "41", sku: "DZ5485-612", retail: 180, market: 160 },
  { brand: "Nike", model: "Dunk Low Chicago Split", colorway: "University Red / Black / Light Silver / White", size: "41", sku: "DZ2536-600", retail: 110, market: 100 },
  { brand: "Nike", model: "Off-White x Nike Dunk Low Lot 24 of 50", colorway: "Sail / Neutral Grey / Washed Coral", size: "41", sku: "DM1602-119", retail: 180, market: 350 },
  { brand: "Nike", model: "NBA x Nike Dunk Low EMB Chicago Bulls", colorway: "Sail / Black / Chile Red / Black", size: "41", sku: "DD3363-100", retail: 110, market: 90 },
  { brand: "Adidas", model: "Yeezy Foam RNR Onyx", colorway: "Onyx / Onyx / Onyx", size: "40⅔", sku: "HP8739", retail: 90, market: 60 },
  { brand: "Adidas", model: "Yeezy Foam RNR Onyx Kids", colorway: "Onyx / Onyx / Onyx", size: "35", sku: "HP5347", retail: 60, market: 45 },
  { brand: "Adidas", model: "Yeezy Knit RNR Fade Onyx", colorway: "Fade Onyx / Fade Onyx / Fade Onyx", size: "41⅓", sku: "IE1663", retail: 210, market: 85 },
  { brand: "Adidas", model: "Yeezy Slide Dark Onyx", colorway: "Dark Onyx / Dark Onyx / Dark Onyx", size: "40⅔", sku: "ID5103", retail: 70, market: 60 },
  { brand: "Adidas", model: "Yeezy Foam RNR Sand", colorway: "Sand / Sand / Sand", size: "40½", sku: "FY4567", retail: 90, market: 65 },
  { brand: "Jordan", model: "Air Jordan 1 High OG Spider-Man Across the Spider-Verse", colorway: "University Red / Black / Summit White", size: "41", sku: "DV1748-601", retail: 200, market: 112 },
  { brand: "Adidas", model: "Yeezy Foam RNR Infant Stone Sage", colorway: "Stone Sage / Stone Sage / Stone Sage", size: "19", sku: "GX7296", retail: 45, market: 40 },
  { brand: "Nike", model: "Air Force 1 Low x Supreme White", colorway: "White / White", size: "41", sku: "CU9225-100", retail: 118, market: 150, quantity: 2 },
  { brand: "Adidas", model: "Yeezy Boost 350 Pirate Black", colorway: "Pirate Black / Pirate Black / Pirate Black", size: "41⅓", sku: "BB5350", retail: 230, market: 100 },
  { brand: "Jordan", model: "Air Jordan 4 Retro Fire Red", colorway: "White / Varsity Red / Black", size: "41", sku: "308497-110", retail: 160, market: 200 },
  { brand: "Nike", model: "Blazer Mid '77 Vintage", colorway: "White / Black", size: "41", sku: "BQ6806-100", retail: 100, market: 105 },
  { brand: "Nike", model: "React Infinity Run FK 3 Prm Moving Company", colorway: "Phantom / Oatmeal / Citron Pulse / Ale Brown", size: "41", sku: "DZ3025-001", retail: 180, market: 63 },
  { brand: "Nike", model: "Air Max 98 University Red", colorway: "University Red / University Red", size: "41", sku: "640744-602", retail: 160, market: 100 },
  { brand: "Nike", model: "Air Max 97 Ultra '17 x Skepta", colorway: "Multi-Color / Black / Vivid Sulfur", size: "41", sku: "AJ1988-900", retail: 180, market: 200 },
  { brand: "Jordan", model: "Air Jordan 7 Retro x Patta Shimmer", colorway: "Shimmer / Tough Red / Velvet Brown", size: "41", sku: "AT3375-200", retail: 200, market: 149 },
];

function ensurePendingItemsExist() {
  let changed = false;
  PENDING_NEW_ITEMS.forEach((p) => {
    const exists = items.some((it) => (it.notes || "").toUpperCase().includes(`SKU ${p.sku}`.toUpperCase()));
    if (exists) return;
    changed = true;
    const now = Date.now();
    items.push({
      id: now.toString() + Math.random().toString(36).slice(2, 7),
      createdAt: now,
      brand: p.brand,
      model: p.model,
      colorway: p.colorway,
      size: p.size,
      quantity: p.quantity || 1,
      imageUrl: IMAGES_BY_SKU[p.sku] || "",
      purchaseDate: "",
      purchasePrice: p.retail || "",
      marketPrice: p.market || "",
      notes: `SKU ${p.sku} · retail ${p.retail}€`,
    });
  });
  if (changed) persist();
}
ensurePendingItemsExist();

function mergeDuplicateSkus() {
  const bySku = {};
  const noSku = [];
  items.forEach((it) => {
    const m = (it.notes || "").match(/SKU\s+([A-Z0-9-]+)/i);
    if (!m) {
      noSku.push(it);
      return;
    }
    const sku = m[1].toUpperCase();
    if (!bySku[sku]) bySku[sku] = [];
    bySku[sku].push(it);
  });

  let changed = false;
  const merged = [...noSku];
  Object.values(bySku).forEach((group) => {
    if (group.length === 1) {
      merged.push(group[0]);
      return;
    }
    changed = true;
    // garde la fiche la plus complete (avec photo si possible) comme base
    // NE PAS additionner les quantites : un doublon de fiche vient d'un import en double,
    // pas d'une vraie deuxieme paire. On garde la quantite max existante (jamais gonflee).
    const base = group.find((g) => g.imageUrl) || group[0];
    const maxQty = Math.max(...group.map((g) => Number(g.quantity || 1)));
    merged.push({ ...base, quantity: maxQty });
  });

  if (changed) {
    items = merged;
    persist();
  }
}
mergeDuplicateSkus();

// Correctifs ponctuels de quantite, confirmes manuellement par l'utilisateur.
// Ces valeurs ecrasent la quantite calculee automatiquement pour ces SKU precis.
function fixKnownQuantities() {
  const knownQuantities = {
    "332550-163": 1, // Chicago 2013 : une seule paire reelle (fusion en double corrigee)
    "FZ1291-600": 1, // Wizard of Oz : une seule paire reelle (fusion en double corrigee)
    "CU9225-100": 2, // Air Force 1 x Supreme White : confirmee x2 paires reelles
    "FW4980": 2, // Yeezy 700 V3 Azael : confirmee x2 paires reelles
    "B75571": 2, // Wave Runner : confirmee x2 paires reelles
    "GW1229": 2, // Beluga Reflective : confirmee x2 paires reelles
    "BY9612": 3, // Bred OG 2016 : confirmee x3 paires reelles (photographiee 3 fois)
    "CP9652": 2, // Bred restock : x2 confirmees, a verifier si 3eme paire existe
  };
  let changed = false;
  items = items.map((it) => {
    const m = (it.notes || "").match(/SKU\s+([A-Z0-9-]+)/i);
    if (m && knownQuantities.hasOwnProperty(m[1].toUpperCase())) {
      const target = knownQuantities[m[1].toUpperCase()];
      if (Number(it.quantity) !== target) {
        changed = true;
        return { ...it, quantity: target };
      }
    }
    return it;
  });
  if (changed) persist();
}
fixKnownQuantities();

// Correctif ponctuel de nom/colorway : le SKU DZ4493-700 avait ete mal identifie
// au depart comme "Lemon Wash", alors qu'il s'agit du coloris "Chili Pepper".
function fixKnownNames() {
  const knownFixes = {
    "DZ4493-700": { model: "Air Force 1 '07 Chili Pepper", colorway: "Chili Pepper / Chili Pepper" },
  };
  let changed = false;
  items = items.map((it) => {
    const m = (it.notes || "").match(/SKU\s+([A-Z0-9-]+)/i);
    if (m && knownFixes.hasOwnProperty(m[1].toUpperCase())) {
      const fix = knownFixes[m[1].toUpperCase()];
      if (it.model !== fix.model || it.colorway !== fix.colorway) {
        changed = true;
        return { ...it, model: fix.model, colorway: fix.colorway };
      }
    }
    return it;
  });
  if (changed) persist();
}
fixKnownNames();

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

  const totalPairs = items.reduce((sum, it) => sum + Number(it.quantity || 1), 0);
  $("pairCount").innerHTML = `<strong>${totalPairs}</strong> paire${totalPairs > 1 ? "s" : ""} en stock`;
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
  if (currentBrandFilter !== "all") {
    list = list.filter((it) => (it.brand || "").toLowerCase() === currentBrandFilter);
  }
  if (currentSearch) {
    const s = currentSearch.toLowerCase();
    list = list.filter((it) =>
      [it.brand, it.model, it.colorway, it.notes].join(" ").toLowerCase().includes(s)
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
    grid.innerHTML = list.map((it) => {
      try {
        return ticketHTML(it);
      } catch (err) {
        return `<div class="ticket" style="padding:16px;color:#B23A2F;font-size:12px;">Erreur d'affichage pour "${(it.model || "?")}" — ${err.message}</div>`;
      }
    }).join("");
  }
  attachCardEvents();
}

function attachCardEvents() {
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = e.target.closest(".ticket").dataset.id;
      openModal(items.find((it) => it.id === id));
    });
  });
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = e.target.closest(".ticket").dataset.id;
      if (confirm("Supprimer cette paire du portfolio ?")) {
        items = items.filter((it) => it.id !== id);
        persist();
        render();
      }
    });
  });
  document.querySelectorAll(".ticket").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      openDetail(items.find((it) => it.id === id));
    });
  });
}

function openDetail(item) {
  if (!item) return;
  const q = Number(item.quantity || 1);
  const invested = Number(item.purchasePrice || 0) * q;
  const value = Number(item.marketPrice || 0) * q;
  const gain = value - invested;
  const gainPct = invested > 0 ? (gain / invested) * 100 : 0;
  const isGain = gain >= 0;
  const releaseYear = getReleaseYear(item);
  const dateLabel = item.purchaseDate || (releaseYear ? `sortie ${releaseYear}` : "—");

  $("detailBrand").textContent = item.brand || "—";
  $("detailModel").textContent = item.model || "Modèle sans nom";
  $("detailMeta").textContent = [item.colorway, item.size ? `EU ${item.size}` : null].filter(Boolean).join(" · ");

  if (item.imageUrl) {
    $("detailImg").src = item.imageUrl;
    $("detailImg").alt = item.model || "";
    $("detailImg").hidden = false;
    $("detailPlaceholder").hidden = true;
  } else {
    $("detailImg").hidden = true;
    $("detailPlaceholder").hidden = false;
  }

  $("detailPurchase").textContent = euros(item.purchasePrice);
  $("detailMarket").textContent = euros(item.marketPrice);

  const gainEl = $("detailGain");
  gainEl.className = "detail-gain " + (isGain ? "positive" : "negative");
  gainEl.innerHTML = `<span class="lbl">Plus-value</span><span>${isGain ? "+" : "-"}${euros(Math.abs(gain)).replace("-", "")} (${gainPct >= 0 ? "+" : ""}${gainPct.toFixed(0)}%)</span>`;

  $("detailQuantity").textContent = `x${q}`;
  $("detailDate").textContent = dateLabel;
  $("detailNotes").textContent = item.notes || "";

  $("detailEditBtn").onclick = () => {
    $("detailOverlay").hidden = true;
    openModal(item);
  };

  $("detailOverlay").hidden = false;
}

$("closeDetail").addEventListener("click", () => {
  $("detailOverlay").hidden = true;
});
$("detailOverlay").addEventListener("click", (e) => {
  if (e.target.id === "detailOverlay") $("detailOverlay").hidden = true;
});

function openModal(item) {
  const submitBtn = $("sneakerForm").querySelector('button[type="submit"]');
  submitBtn.disabled = false;
  submitBtn.textContent = "Enregistrer";
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

$("exportBtn").addEventListener("click", () => {
  $("exportText").value = JSON.stringify(items, null, 2);
  $("exportOverlay").hidden = false;
});
$("closeExport").addEventListener("click", () => {
  $("exportOverlay").hidden = true;
});
$("exportOverlay").addEventListener("click", (e) => {
  if (e.target.id === "exportOverlay") $("exportOverlay").hidden = true;
});

$("copyExportBtn").addEventListener("click", async () => {
  const btn = $("copyExportBtn");
  const text = $("exportText").value;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      // Repli pour navigateurs sans API Clipboard
      const ta = $("exportText");
      ta.removeAttribute("readonly");
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, text.length);
      document.execCommand("copy");
      ta.setAttribute("readonly", "true");
    }
    btn.textContent = "Copié ✓";
    setTimeout(() => {
      btn.textContent = "Copier les données";
    }, 2000);
  } catch (err) {
    btn.textContent = "Échec — sélectionne le texte manuellement";
    setTimeout(() => {
      btn.textContent = "Copier les données";
    }, 3000);
  }
});

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

let isSaving = false;

function saveSneaker(e) {
  if (e) e.preventDefault();
  if (isSaving) return;
  const modelValue = $("fModel").value.trim();
  if (!modelValue) {
    alert("Le champ Modèle est obligatoire.");
    return;
  }
  isSaving = true;
  const submitBtn = $("sneakerForm").querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = "Enregistré ✓";

  try {
    const id = $("itemId").value;
    const data = {
      id: id || Date.now().toString(),
      createdAt: id ? items.find((it) => it.id === id)?.createdAt : Date.now(),
      brand: $("fBrand").value.trim(),
      model: modelValue,
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
  } catch (err) {
    alert("Erreur lors de l'enregistrement : " + err.message);
  }

  setTimeout(() => {
    try {
      closeModal();
      render();
    } catch (err) {
      alert("Erreur d'affichage : " + err.message);
    } finally {
      isSaving = false;
      submitBtn.disabled = false;
      submitBtn.textContent = "Enregistrer";
    }
  }, 250);
}

$("sneakerForm").addEventListener("submit", saveSneaker);

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

document.querySelectorAll(".filter-chip").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentBrandFilter = btn.dataset.brand;
    document.querySelectorAll(".filter-chip").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    render();
  });
});

$("logoTrigger").addEventListener("click", () => {
  $("logoLightbox").hidden = false;
});
$("logoLightbox").addEventListener("click", () => {
  $("logoLightbox").hidden = true;
});

render();
