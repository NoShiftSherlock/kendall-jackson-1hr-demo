/* Kendall-Jackson × Vesper Commerce — 1-hour delivery mockup interactions */

// ---------- Product catalog (homepage grid) ----------
// `delivery: true` marks the five hero SKUs enabled for 1-hour delivery in the
// pilot. The rest of the catalog still ships from Wine Direct as it does today.
const PRODUCTS = [
  { line:"White", name:"Vintner's Reserve Chardonnay", img:"assets/bottle-chardonnay.png",  vintage:"2024", region:"California",     price:"$17.00", status:"Best seller", rating:"4.6 · 3,204", delivery:true },
  { line:"White", name:"Vintner's Reserve Sauvignon Blanc", img:"assets/bottle-sauvblanc.png", vintage:"2024", region:"California",  price:"$15.00", status:"", rating:"4.5 · 1,187", delivery:true },
  { line:"Red",   name:"Vintner's Reserve Pinot Noir", img:"assets/bottle-pinotnoir.png",    vintage:"2024", region:"California",     price:"$20.00", status:"Best seller", rating:"4.6 · 1,540", delivery:true },
  { line:"Red",   name:"Vintner's Reserve Cabernet Sauvignon", img:"assets/bottle-cabernet.png", vintage:"2023", region:"Sonoma County", price:"$20.00", status:"", rating:"4.5 · 972", delivery:true },
  { line:"Rosé",  name:"Vintner's Reserve Rosé", img:"assets/bottle-rose.png",               vintage:"2024", region:"California",     price:"$17.00", status:"New", rating:"4.4 · 318", delivery:false },
  { line:"White", name:"Vintner's Reserve Chenin Blanc", img:"assets/bottle-cheninblanc.png", vintage:"2024", region:"California",    price:"$17.00", status:"", rating:"4.3 · 240", delivery:true },
  { line:"Red",   name:"Vintner's Reserve Merlot", img:"assets/bottle-merlot.png",            vintage:"2023", region:"Sonoma County", price:"$20.00", status:"", rating:"4.4 · 501", delivery:false },
  { line:"White", name:"Vintner's Reserve Riesling", img:"assets/bottle-riesling.png",        vintage:"2024", region:"Monterey County", price:"$15.00", status:"", rating:"4.5 · 289", delivery:false },
];

function cardHTML(p) {
  const lineClass = p.line.toLowerCase() === "rosé" ? "rose" : p.line.toLowerCase();
  const statusTag = p.status ? `<span class="tag status">${p.status}</span>` : "";
  const deliveryTag = p.delivery
    ? `<span class="tag onehr">⚡ 1-hr</span>`
    : `<span class="tag ships">Ships in 2–4 days</span>`;
  return `
  <a class="card" href="product.html">
    <div class="thumb">
      <div class="badges">
        <span class="tag line ${lineClass}"><span class="dot"></span> ${p.line}</span>
        ${statusTag}
        ${deliveryTag}
      </div>
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
    </div>
    <div class="body">
      <div class="line-label">Vintner's Reserve · ${p.vintage}</div>
      <h3>${p.name.replace("Vintner's Reserve ", "")}</h3>
      <div class="stats"><span><b>${p.region}</b></span><span><b>750ml</b> bottle</span><span><b>13.5%</b> ABV</span></div>
      <div class="rating">★ ${p.rating} reviews</div>
      <div class="foot">
        <span class="price">${p.price}</span>
        <button class="add" onclick="event.preventDefault();addToCart()">Add</button>
      </div>
    </div>
  </a>`;
}

// ---------- On-demand catalog (KJ Now page) ----------
// The same five hero SKUs the NBA pages used, carried over as the evergreen
// delivery set. These are the wines with the deepest GoPuff + local coverage.
const NOW_PRODUCTS = [
  { line:"White", format:"750ml bottle", name:"Vintner's Reserve Chardonnay", img:"assets/bottle-chardonnay.png", size:"750ml", abv:"13.5% ABV", price:"$17.00", note:"America's most-loved Chardonnay" },
  { line:"Red",   format:"750ml bottle", name:"Vintner's Reserve Cabernet Sauvignon", img:"assets/bottle-cabernet.png", size:"750ml", abv:"13.5% ABV", price:"$20.00", note:"Sonoma County · dark fruit, cocoa" },
  { line:"White", format:"750ml bottle", name:"Vintner's Reserve Sauvignon Blanc", img:"assets/bottle-sauvblanc.png", size:"750ml", abv:"13% ABV", price:"$15.00", note:"Citrus, crisp, chilled and ready" },
  { line:"Red",   format:"750ml bottle", name:"Vintner's Reserve Pinot Noir", img:"assets/bottle-pinotnoir.png", size:"750ml", abv:"13.5% ABV", price:"$20.00", note:"Cherry and baking spice" },
  { line:"White", format:"750ml bottle", name:"Vintner's Reserve Chenin Blanc", img:"assets/bottle-cheninblanc.png", size:"750ml", abv:"12.5% ABV", price:"$17.00", note:"Melon and honeysuckle" },
];

// ---------- Evergreen occasions (replaces the NBA moment framing) ----------
const OCCASIONS = [
  { icon:"🍽️", title:"Dinner starts in an hour",  copy:"The bottle you meant to pick up on the way home, at your door before the oven timer.", pick:"Chardonnay" },
  { icon:"🎁", title:"Last-minute host gift",     copy:"Invited tonight and empty-handed? Send a bottle to their address, not yours.",        pick:"Cabernet Sauvignon" },
  { icon:"☀️", title:"The patio ran dry",          copy:"Everyone stayed later than planned. Restock without anyone leaving.",                  pick:"Sauvignon Blanc" },
  { icon:"🎉", title:"People are already here",    copy:"Four bottles, one hour, no run to the store in the middle of your own party.",        pick:"Pinot Noir" },
];

function occasionHTML(o) {
  return `
  <div class="occ-card">
    <div class="occ-icon" aria-hidden="true">${o.icon}</div>
    <h3>${o.title}</h3>
    <p>${o.copy}</p>
    <div class="occ-pick">Popular pick <b>${o.pick}</b></div>
  </div>`;
}

function nowCardHTML(p) {
  const lineClass = p.line.toLowerCase() === "rosé" ? "rose" : p.line.toLowerCase();
  return `
  <div class="now-card">
    <div class="now-thumb">
      <button class="now-add" onclick="addToCart()" aria-label="Add ${p.name}">Add</button>
      <span class="now-protein">${p.abv}<small>alc/vol</small></span>
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
    </div>
    <div class="now-body">
      <div class="now-format"><span class="tag line ${lineClass}"><span class="dot"></span> ${p.line}</span> · ${p.format}</div>
      <h3>${p.name.replace("Vintner's Reserve ", "")}</h3>
      ${p.note ? `<div class="now-note">${p.note}</div>` : ""}
      <div class="now-foot"><span class="now-size">${p.size}</span><span class="now-price">${p.price}</span></div>
    </div>
  </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("prodGrid");
  if (grid) grid.innerHTML = PRODUCTS.map(cardHTML).join("");
  const nowGrid = document.getElementById("nowGrid");
  if (nowGrid) nowGrid.innerHTML = NOW_PRODUCTS.map(nowCardHTML).join("");
  const occGrid = document.getElementById("occGrid");
  if (occGrid) occGrid.innerHTML = OCCASIONS.map(occasionHTML).join("");
  // restore cart count
  const c = sessionStorage.getItem("cartCount");
  if (c) setCartCount(parseInt(c, 10));
});

// ---------- NBA "Starting Five" (Tip-Off / All-Star campaign pages) ----------
const STARTING_FIVE_NAMES = [
  "Vintner's Reserve Chardonnay",
  "Vintner's Reserve Cabernet Sauvignon",
  "Vintner's Reserve Sauvignon Blanc",
  "Vintner's Reserve Pinot Noir",
  "Vintner's Reserve Chenin Blanc",
];
const STARTING_FIVE = PRODUCTS.filter(p => STARTING_FIVE_NAMES.includes(p.name));

function nbaCardHTML(p) {
  const lineClass = p.line.toLowerCase() === "rosé" ? "rose" : p.line.toLowerCase();
  return `
  <a class="card" href="product.html">
    <div class="thumb">
      <div class="badges">
        <span class="tag line ${lineClass}"><span class="dot"></span> ${p.line}</span>
        <span class="tag status">🏀 Starting Five</span>
        <span class="tag onehr">⚡ 1-hr</span>
      </div>
      <img src="${p.img}" alt="${p.name}" loading="lazy" />
    </div>
    <div class="body">
      <div class="line-label">Vintner's Reserve · ${p.vintage}</div>
      <h3>${p.name.replace("Vintner's Reserve ", "")}</h3>
      <div class="stats"><span><b>${p.region}</b></span><span><b>750ml</b> bottle</span><span><b>13.5%</b> ABV</span></div>
      <div class="rating">★ ${p.rating} reviews</div>
      <div class="foot">
        <span class="price">${p.price}</span>
        <button class="add" onclick="event.preventDefault();addToCart()">Add</button>
      </div>
    </div>
  </a>`;
}
document.addEventListener("DOMContentLoaded", () => {
  const nbaGrid = document.getElementById("nbaGrid");
  if (nbaGrid) nbaGrid.innerHTML = STARTING_FIVE.map(nbaCardHTML).join("");
});

// generic "check availability" reveal, used by the NBA campaign pages
function checkAddr(resultId) {
  const el = document.getElementById(resultId);
  if (el) el.classList.add("show");
}

// KJ Now address check -> reveal grid
function nowCheck() {
  const el = document.getElementById("nowAddrState");
  const grid = document.getElementById("nowGridWrap");
  if (el) el.classList.add("show");
  if (grid) grid.classList.add("show");
}

// ---------- Cart ----------
function setCartCount(n) {
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = n);
  sessionStorage.setItem("cartCount", n);
}
function addToCart() {
  const el = document.querySelector(".cart-count");
  const n = (el ? parseInt(el.textContent, 10) : 0) + 1;
  setCartCount(n);
  toast("Added to cart · eligible for 1-hour delivery ⚡");
}

// ---------- Homepage address availability ----------
function checkAvailability() {
  const box = document.getElementById("availResult");
  if (box) box.classList.add("show");
}

// ---------- PDP: purchase modes ----------
function setMode(mode) {
  document.querySelectorAll(".buy-mode").forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
  const isOneHr = mode === "onehr";
  const mod = document.getElementById("onehrModule");
  const stdBenefits = document.getElementById("stdBenefits");
  const stdBuyRow = document.getElementById("stdBuyRow");
  if (mod) mod.style.display = isOneHr ? "block" : "none";
  if (stdBenefits) stdBenefits.style.display = isOneHr ? "none" : "grid";
  if (stdBuyRow) stdBuyRow.style.display = isOneHr ? "none" : "flex";
  const addBtn = document.getElementById("addBtn");
  if (addBtn && !isOneHr) {
    addBtn.textContent = mode === "subscribe" ? "Subscribe — $15.30" : "Add to cart — $17.00";
  }
}
function pdpCheck() {
  const a = document.getElementById("pdpAvail");
  if (a) a.style.display = "block";
}
let q = 1;
function qty(d) {
  q = Math.max(1, q + d);
  const el = document.getElementById("qtyVal");
  if (el) el.textContent = q;
}

// ---------- Checkout v2: shipping + plan + totals ----------
const CO = { subtotal: 68.0, tax: 6.02, ship: 7.0, shipLabel: "1-Hour delivery" };

function selectShip(el) {
  document.querySelectorAll("#shipOpts .co-opt").forEach(o => o.classList.remove("selected"));
  el.classList.add("selected");
  CO.ship = parseFloat(el.dataset.cost);
  CO.shipLabel = el.dataset.label || "Shipping";
  // show/hide the 1-hour routing note
  const note = document.getElementById("routeNote");
  if (note) note.style.display = el.classList.contains("onehr") ? "flex" : "none";
  updateCheckoutTotals();
}
function updateCheckoutTotals() {
  const total = CO.subtotal + CO.ship + CO.tax;
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  set("sumShipLabel", CO.shipLabel);
  set("sumShip", CO.ship === 0 ? "FREE" : "$" + CO.ship.toFixed(2));
  set("sumTotal", "$" + total.toFixed(2));
  const inst = (total / 4).toFixed(2);
  set("instAmt", "$" + inst);
  const pb = document.getElementById("placeBtn");
  if (pb) pb.textContent = "Place order · $" + total.toFixed(2);
}
function selectPlan(el) {
  document.querySelectorAll("#planOpts .co-opt").forEach(o => o.classList.remove("selected"));
  el.classList.add("selected");
}
function placeOrder() {
  const oneHr = document.querySelector("#shipOpts .co-opt.selected.onehr");
  toast(oneHr ? "Order placed ⚡ Routing to nearest store — arriving in ~48 min"
              : "Order placed ✓ Thanks — your Kendall-Jackson order is confirmed.");
}
document.addEventListener("DOMContentLoaded", updateCheckoutTotals);

// ---------- Slide-out cart drawer + rewards meter ----------
const CART = { name: "Vintner's Reserve Chardonnay", line: "White", img: "assets/bottle-chardonnay.png", unit: 17.0, qty: 4, sub: false };
const TIERS = [
  { key: "ship", label: "Free Shipping",  at: 3,  pos: 16 },
  { key: "gift", label: "Free Gift",      at: 6,  pos: 58 },
  { key: "case", label: "Free Case Discount", at: 12, pos: 100 },
];

function injectCartDrawer() {
  if (document.getElementById("cartDrawer")) return;
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <div class="cart-overlay" id="cartOverlay" onclick="closeCart()"></div>
    <aside class="cart-drawer" id="cartDrawer" aria-label="Your cart">
      <div class="cart-head">
        <h2>Your cart <span id="cartQtyHead">(4)</span></h2>
        <button class="cart-close" onclick="closeCart()" aria-label="Close cart">✕</button>
      </div>
      <div class="meter">
        <div class="meter-tiers" id="meterTiers"></div>
        <div class="meter-track"><div class="meter-fill" id="meterFill"></div><div id="meterNodes"></div></div>
        <div class="meter-msg" id="meterMsg"></div>
      </div>
      <div class="cart-eligible"><span>⚡</span> <span>This item is eligible for <b>1-hour delivery</b> in New York.</span></div>
      <div class="cart-body" id="cartBody"></div>
      <div class="cart-foot">
        <div class="cart-sub-toggle">
          <label><input type="checkbox" id="cartSub" onchange="toggleSub()" /> Join Club '82 &amp; save.</label>
          <span class="save">Save 10%</span>
        </div>
        <button class="cart-checkout" onclick="location.href='checkout.html'" id="cartCheckoutBtn">Checkout — $68</button>
        <div class="cart-fineprint">Taxes, discounts and shipping calculated at checkout.</div>
      </div>
    </aside>`;
  document.body.appendChild(wrap);
  renderCart();
}

function renderCart() {
  const q = CART.qty;
  // tiers
  const tiers = document.getElementById("meterTiers");
  if (tiers) tiers.innerHTML = TIERS.map(t => `<div class="meter-tier ${q >= t.at ? "done" : ""}">${t.label}</div>`).join("");
  // nodes
  const nodes = document.getElementById("meterNodes");
  if (nodes) nodes.innerHTML = TIERS.map(t => {
    const state = q >= t.at ? (q === t.at ? "current" : "done") : "";
    return `<div class="meter-node ${state}" style="left:${t.pos}%"><span class="lbl">${t.at} Bottle${t.at>1?"s":""}</span></div>`;
  }).join("");
  // fill
  const fill = document.getElementById("meterFill");
  if (fill) {
    let pct = 6;
    if (q >= 12) pct = 100; else if (q >= 6) pct = 58; else if (q >= 3) pct = 16; else pct = 6;
    fill.style.width = pct + "%";
  }
  // message
  const msg = document.getElementById("meterMsg");
  if (msg) {
    if (q >= 12) msg.innerHTML = `🎉 You've unlocked the <b>free case discount</b>!`;
    else if (q >= 6) msg.innerHTML = `Add <b>${12 - q} more bottles</b> to unlock a case discount.`;
    else if (q >= 3) msg.innerHTML = `<span class="bolt">✓</span> Free shipping unlocked — add ${6 - q} more for a <b>free gift</b>.`;
    else msg.innerHTML = `Add <b>${3 - q} more bottle${3 - q === 1 ? "" : "s"}</b> for free shipping.`;
  }
  // line item
  const body = document.getElementById("cartBody");
  if (body) body.innerHTML = `
    <div class="cart-line">
      <div class="im"><img src="${CART.img}" alt="" /></div>
      <div class="info">
        <div class="ln"><span class="dot"></span> ${CART.line}</div>
        <h3>${CART.name}</h3>
        <div class="pr">$${CART.unit.toFixed(2)}&nbsp; | &nbsp;750ml bottle.</div>
        <div class="sub-row"><span>Membership:<br/>${CART.sub ? "Club '82 — Save 10%" : "One-Time Purchase"}</span><a href="#" onclick="event.preventDefault();toggleSubLink()">Edit</a></div>
        <div class="qty-row2">
          <div class="cart-stepper"><button onclick="cartQty(-1)">−</button><span id="cartLineQty">${CART.qty}</span><button onclick="cartQty(1)">+</button></div>
          <button class="rm" onclick="cartRemove()">Remove</button>
        </div>
      </div>
    </div>`;
  // header + checkout total
  const factor = CART.sub ? 0.9 : 1;
  const total = CART.qty * CART.unit * factor;
  const head = document.getElementById("cartQtyHead");
  if (head) head.textContent = `(${CART.qty})`;
  const btn = document.getElementById("cartCheckoutBtn");
  if (btn) btn.textContent = `Checkout — $${total.toFixed(total % 1 ? 2 : 0)}`;
  setCartCount(CART.qty);
}
function openCart() { injectCartDrawer(); requestAnimationFrame(() => { document.getElementById("cartOverlay").classList.add("open"); document.getElementById("cartDrawer").classList.add("open"); }); }
function closeCart() { const o=document.getElementById("cartOverlay"), d=document.getElementById("cartDrawer"); if(o)o.classList.remove("open"); if(d)d.classList.remove("open"); }
function cartQty(d) { CART.qty = Math.max(1, CART.qty + d); renderCart(); }
function cartRemove() { CART.qty = 1; renderCart(); }
function toggleSub() { CART.sub = document.getElementById("cartSub").checked; renderCart(); }
function toggleSubLink() { CART.sub = !CART.sub; const c=document.getElementById("cartSub"); if(c)c.checked=CART.sub; renderCart(); }

// ---------- Mobile hamburger menu ----------
function injectMobileMenu() {
  if (document.getElementById("mobileMenu")) return;
  const active = location.pathname.endsWith("kj-now.html") ? "kj-now" : "";
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <div class="menu-overlay" id="menuOverlay" onclick="closeMenu()"></div>
    <nav class="mobile-menu" id="mobileMenu" aria-label="Menu">
      <div class="mm-head">
        <img src="assets/logo.png" alt="Kendall-Jackson" style="filter:brightness(0) invert(1)" />
        <button class="mm-close" onclick="closeMenu()" aria-label="Close menu">✕</button>
      </div>
      <div class="mm-links">
        <a href="index.html#shop">Shop Wines</a>
        <a href="index.html#shop">About Us</a>
        <a href="index.html#shop">Club '82</a>
        <a href="index.html#shop">Visit Us</a>
        <a href="kj-now.html" class="${active === "kj-now" ? "active" : ""}">KJ Now</a>
        <a href="nba-tipoff.html" style="color:var(--gold)">🏀 NBA</a>
      </div>
      <div class="mm-cta"><a href="kj-now.html" class="btn btn-white btn-block">⚡ Check your address</a></div>
      <div class="mm-sub">
        <a href="#">Store locator</a>
        <a href="#">Trade &amp; wholesale</a>
        <a href="checkout.html" onclick="event.preventDefault();closeMenu();openCart()">Cart</a>
      </div>
    </nav>`;
  document.body.appendChild(wrap);
}
function openMenu() { injectMobileMenu(); requestAnimationFrame(() => { document.getElementById("menuOverlay").classList.add("open"); document.getElementById("mobileMenu").classList.add("open"); }); }
function closeMenu() { const o = document.getElementById("menuOverlay"), m = document.getElementById("mobileMenu"); if (o) o.classList.remove("open"); if (m) m.classList.remove("open"); }

// ---------- tiny toast ----------
function toast(msg) {
  let t = document.getElementById("__toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "__toast";
    t.style.cssText = "position:fixed;left:50%;bottom:70px;transform:translateX(-50%);background:#1a1512;color:#fff;padding:13px 22px;border-radius:999px;font-family:'Space Mono',monospace;font-size:13px;z-index:200;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:opacity .25s ease;";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = "1";
  clearTimeout(t._h);
  t._h = setTimeout(() => { t.style.opacity = "0"; }, 2600);
}
