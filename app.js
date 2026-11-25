(function () {
  const S = window.STORE;
  S.delivery = S.delivery || { cities: [], other: null };
  const UI = {
    ar: {
      announce: "اطلبي بسهولة عبر واتساب", tag: "🌙 عالم البجامات", shopNow: "تسوقي الآن", hello: "أهلًا بك! 💕",
      cart: "السلة", products: "منتجاتنا", search: "ابحثي عن منتج...", empty: "لا توجد منتجات مطابقة",
      all: "الكل", offers: "العروض 🔥", add: "أضيفي للسلة", pickSize: "اختاري المقاس أولًا 💕", pickColor: "اختاري اللون أولًا 💕", added: "تمت الإضافة للسلة 🎀",
      off: "خصم", sold: "نفذت الكمية", yourCart: "سلتك", total: "الإجمالي", subtotal: "مجموع المنتجات", delivery: "التوصيل", cartEmpty: "السلة فارغة",
      send: "إرسال الطلب عبر واتساب", name: "الاسم (اختياري)", phone: "رقم الهاتف", city: "المدينة (اكتبي اسم مدينتك)", address: "العنوان التفصيلي (المنطقة، الشارع، أقرب معلم)", note: "ملاحظات (اختياري)",
      phoneBad: "اكتبي رقم هاتف صحيح", needCity: "اكتبي اسم مدينتك", needAddr: "اكتبي العنوان التفصيلي",
      size: "المقاس", colorL: "اللون", order: "طلب جديد من الموقع", customer: "الاسم", tel: "الهاتف", cityL: "المدينة", addr: "العنوان", items: "المنتجات", noteL: "ملاحظات",
      delTo: "سعر التوصيل إلى", delOther: "سعر التوصيل لمدينتك", delAsk: "سنؤكد لك سعر التوصيل عبر واتساب", free: "توصيل مجاني", delLater: "يُحدد لاحقًا", totalNoDel: "الإجمالي (بدون التوصيل)",
      w1t: "اختاري واطلبي", w1p: "اختاري القطعة والمقاس واللون وأضيفيها للسلة", w2t: "الطلب عبر واتساب", w2p: "يصلنا طلبك مباشرة ونتواصل معك لتأكيده",
      w3t: "عروض مستمرة", w3p: "تابعي قسم العروض لأحدث الخصومات", chat: "تواصلي معنا على واتساب",
      foot: "بجامات ناعمة بلمسة وردية 💕", heroTitle: "بجامات ناعمة بأحلى التصاميم", heroSub: "اختاري مقاسك واطلبي عبر واتساب"
    },
    en: {
      announce: "Order easily on WhatsApp", tag: "🌙 Pajama World", shopNow: "Shop now", hello: "Welcome! 💕",
      cart: "Cart", products: "Our products", search: "Search for a product...", empty: "No matching products",
      all: "All", offers: "Offers 🔥", add: "Add to cart", pickSize: "Please pick a size first 💕", pickColor: "Please pick a color first 💕", added: "Added to cart 🎀",
      off: "OFF", sold: "Sold out", yourCart: "Your cart", total: "Total", subtotal: "Items subtotal", delivery: "Delivery", cartEmpty: "Your cart is empty",
      send: "Send order via WhatsApp", name: "Name (optional)", phone: "Phone number", city: "City (type your city)", address: "Detailed address (area, street, landmark)", note: "Notes (optional)",
      phoneBad: "Please enter a valid phone number", needCity: "Please enter your city", needAddr: "Please enter your detailed address",
      size: "Size", colorL: "Color", order: "New website order", customer: "Name", tel: "Phone", cityL: "City", addr: "Address", items: "Items", noteL: "Notes",
      delTo: "Delivery price to", delOther: "Delivery price to your city", delAsk: "We will confirm the delivery price on WhatsApp", free: "Free delivery", delLater: "To be confirmed", totalNoDel: "Total (without delivery)",
      w1t: "Pick & order", w1p: "Choose the item, size and color, then add to cart", w2t: "Order on WhatsApp", w2p: "Your order reaches us directly and we confirm with you",
      w3t: "Ongoing offers", w3p: "Check the Offers tab for the latest discounts", chat: "Chat with us on WhatsApp",
      foot: "Soft pajamas with a pink touch 💕", heroTitle: "Soft pajamas in the sweetest designs", heroSub: "Pick your size and order on WhatsApp"
    }
  };
  const HEX = {
    "وردي": "#ff8fab", "زهري": "#ff8fab", "أبيض": "#ffffff", "ابيض": "#ffffff", "أسود": "#222222", "اسود": "#222222", "أحمر": "#e53935", "احمر": "#e53935",
    "أزرق": "#2f6fdd", "ازرق": "#2f6fdd", "سماوي": "#7ed3f4", "تركوازي": "#26c6da", "أخضر": "#43a047", "اخضر": "#43a047", "أصفر": "#ffd43b", "اصفر": "#ffd43b",
    "بنفسجي": "#8e5bd1", "موف": "#b57edc", "لافندر": "#c9b6ee", "رمادي": "#9e9e9e", "بيج": "#e8d5b5", "بني": "#8d5a3b", "برتقالي": "#fb8c00", "ذهبي": "#d4af37",
    "فضي": "#c0c0c0", "كحلي": "#1f2a5a", "عنابي": "#7b1e3a", "خمري": "#7b1e3a", "فوشيا": "#e91e8c", "كريمي": "#fff3d6", "نيلي": "#3f51b5", "زيتي": "#6b7a2b",
    pink: "#ff8fab", white: "#ffffff", black: "#222222", red: "#e53935", blue: "#2f6fdd", green: "#43a047", yellow: "#ffd43b", purple: "#8e5bd1", gray: "#9e9e9e", grey: "#9e9e9e",
    beige: "#e8d5b5", brown: "#8d5a3b", orange: "#fb8c00", gold: "#d4af37", silver: "#c0c0c0", navy: "#1f2a5a", lilac: "#c9b6ee", cream: "#fff3d6"
  };

  let lang = "ar";
  try { lang = localStorage.getItem("lang") || "ar"; } catch (e) {}
  let cat = "all", q = "", cart = [];
  try { cart = JSON.parse(localStorage.getItem("cart") || "[]"); } catch (e) {}
  const picked = {}, pickedColor = {};

  const $ = (s) => document.querySelector(s);
  const t = (k) => UI[lang][k];
  const money = (n) => n + " " + S.currency[lang];
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const prod = (id) => S.products.find((p) => p.id === id);
  const imgsOf = (p) => (p.images && p.images.length ? p.images : p.image ? [p.image] : []);
  const saveCart = () => { try { localStorage.setItem("cart", JSON.stringify(cart)); } catch (e) {} };
  const hexOf = (c) => HEX[String(c).trim().toLowerCase()] || "";
  const clrChip = (attr, pid, c, on) => {
    const h = hexOf(c);
    return `<button type="button" class="clr ${on ? "on" : ""}" ${attr}="${esc(c)}" data-pid="${pid}">${h ? `<i class="dot" style="background:${h}"></i>` : ""}${esc(c)}</button>`;
  };

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg; el.hidden = false;
    clearTimeout(toast.t); toast.t = setTimeout(() => (el.hidden = true), 1900);
  }

  /* التوصيل */
  const norm = (s) => String(s || "").toLowerCase().trim().replace(/[ً-ٟـ]/g, "").replace(/[إأآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/\s+/g, " ").replace(/^ال/, "");
  const cities = () => (S.delivery && S.delivery.cities) || [];
  const hasOther = () => S.delivery && S.delivery.other !== null && S.delivery.other !== undefined && S.delivery.other !== "";
  function findCity(v) {
    const n = norm(v);
    if (!n) return null;
    return cities().find((c) => norm(c.ar) === n || norm(c.en) === n) || null;
  }
  function deliveryInfo() {
    const raw = ($("#city").value || "").trim();
    if (!raw || (!cities().length && !hasOther())) return { kind: "none" };
    const c = findCity(raw);
    if (c) return { kind: "city", price: +c.price || 0, name: c[lang] || c.ar };
    if (hasOther()) return { kind: "other", price: +S.delivery.other || 0 };
    return { kind: "ask" };
  }
  const subtotal = () => cart.reduce((a, i) => a + prod(i.id).price * i.qty, 0);
  const delText = (d) => (d.price ? money(d.price) : t("free"));

  function renderTotals() {
    const sub = subtotal(), d = deliveryInfo();
    const priced = d.kind === "city" || d.kind === "other";
    $("#sub").textContent = money(sub);
    $("#delRow").hidden = d.kind === "none";
    $("#delPrice").textContent = priced ? delText(d) : t("delLater");
    $("#total").textContent = money(sub + (priced ? d.price : 0));
    $("#totalLbl").textContent = d.kind === "ask" ? t("totalNoDel") : t("total");
    const box = $("#delInfo");
    box.hidden = d.kind === "none";
    box.textContent = d.kind === "city" ? `🚚 ${t("delTo")} ${d.name}: ${delText(d)}` : d.kind === "other" ? `🚚 ${t("delOther")}: ${delText(d)}` : d.kind === "ask" ? `🚚 ${t("delAsk")}` : "";
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = S.name.ar + " | " + S.name.en;
    $("#langBtn").textContent = lang === "ar" ? "EN" : "عربي";
    document.querySelectorAll("[data-t]").forEach((e) => { if (t(e.dataset.t) != null) e.textContent = t(e.dataset.t); });
    document.querySelectorAll("[data-tp]").forEach((e) => (e.placeholder = t(e.dataset.tp)));
    $("#announce").textContent = t("announce");
    $("#heroTitle").textContent = (S.hero && S.hero.title && S.hero.title[lang]) || t("heroTitle");
    $("#heroSub").textContent = (S.hero && S.hero.sub && S.hero.sub[lang]) || t("heroSub");
    $("#footTxt").textContent = t("foot");
    $("#copy").textContent = "© " + new Date().getFullYear() + " " + S.name[lang];
    $("#cityList").innerHTML = cities().map((c) => `<option value="${esc(c[lang] || c.ar)}"></option>`).join("");
    renderCats(); renderGrid(); renderCart();
    if (pmId !== null) renderModal();
  }

  function renderCats() {
    const list = [{ id: "all", ar: "الكل", en: "All", icon: "💖" }, { id: "offers", ar: "العروض", en: "Offers", icon: "🔥" }].concat(S.categories);
    $("#cats").innerHTML = list.map((c) => `<button type="button" class="chip ${cat === c.id ? "on" : ""}" data-c="${esc(c.id)}">${c.icon ? esc(c.icon) + " " : ""}${esc(c[lang])}</button>`).join("");
    $("#cats").querySelectorAll("button").forEach((b) => (b.onclick = () => { cat = b.dataset.c; renderCats(); renderGrid(); }));
  }

  function renderGrid() {
    const items = S.products.filter((p) => {
      if (cat === "offers" && !(p.oldPrice > p.price)) return false;
      if (cat !== "all" && cat !== "offers" && p.category !== cat) return false;
      return !q || (p.name.ar + " " + p.name.en).toLowerCase().includes(q.toLowerCase());
    });
    $("#empty").hidden = items.length > 0;
    $("#grid").innerHTML = items.map((p) => {
      const off = p.oldPrice > p.price ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
      const im = imgsOf(p);
      const pic = im.length ? `<img src="${esc(im[0])}" alt="${esc(p.name[lang])}" loading="lazy">`
        : `<svg class="sp a"><use href="#spark"/></svg><svg class="sp b"><use href="#spark"/></svg>${esc(p.emoji || "🎀")}`;
      const cols = p.colors || [];
      return `<article class="card" data-card="${p.id}">
        ${off ? `<span class="badge"><svg class="ic"><use href="#bow"/></svg>${off}% ${t("off")}</span>` : ""}
        <div class="pic" data-open="${p.id}">${pic}${im.length > 1 ? `<span class="multi">📷 ${im.length}</span>` : ""}${p.soldOut ? `<div class="soldtag">${t("sold")}</div>` : ""}</div>
        <div class="info">
          <h4 data-open="${p.id}">${esc(p.name[lang])}</h4>
          <div class="price"><b>${money(p.price)}</b>${off ? `<s>${money(p.oldPrice)}</s>` : ""}</div>
          <div class="sizes">${p.sizes.map((s) => `<button type="button" class="size ${picked[p.id] === s ? "on" : ""}" data-p="${p.id}" data-s="${esc(s)}">${esc(s)}</button>`).join("")}</div>
          ${cols.length ? `<div class="colors">${cols.map((c) => clrChip("data-pc", p.id, c, pickedColor[p.id] === c)).join("")}</div>` : ""}
          <button type="button" class="add" data-add="${p.id}" ${p.soldOut ? "disabled" : ""}>${p.soldOut ? t("sold") : t("add")}</button>
        </div></article>`;
    }).join("");
    document.querySelectorAll(".size[data-p]").forEach((b) => (b.onclick = () => {
      picked[b.dataset.p] = b.dataset.s;
      b.parentElement.querySelectorAll(".size").forEach((x) => x.classList.toggle("on", x === b));
    }));
    document.querySelectorAll("[data-pc]").forEach((b) => (b.onclick = () => {
      pickedColor[b.dataset.pid] = b.dataset.pc;
      b.parentElement.querySelectorAll(".clr").forEach((x) => x.classList.toggle("on", x === b));
    }));
    document.querySelectorAll("[data-add]").forEach((b) => (b.onclick = () => addToCart(+b.dataset.add, b)));
    document.querySelectorAll("[data-open]").forEach((b) => (b.onclick = () => openProduct(+b.dataset.open)));
  }

  function addToCart(id, btn) {
    const p = prod(id);
    if (!p || p.soldOut) return;
    const size = picked[id] || (p.sizes.length === 1 ? p.sizes[0] : "");
    const cols = p.colors || [];
    const color = pickedColor[id] || (cols.length === 1 ? cols[0] : "");
    const wrap = btn.closest(".card, .pm-info");
    const shake = (sel) => {
      const box = wrap && wrap.querySelector(sel);
      if (box) { box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake"); }
    };
    if (!size) { shake(".sizes"); return toast(t("pickSize")); }
    if (cols.length && !color) { shake(".colors"); return toast(t("pickColor")); }
    const ex = cart.find((i) => i.id === id && i.size === size && (i.color || "") === color);
    ex ? ex.qty++ : cart.push({ id, size, color, qty: 1 });
    saveCart(); renderCart(); toast(t("added"));
  }

  function renderCart() {
    cart = cart.filter((i) => prod(i.id));
    $("#cartCount").textContent = cart.reduce((a, i) => a + i.qty, 0);
    $("#cartItems").innerHTML = cart.length ? cart.map((i, idx) => {
      const p = prod(i.id);
      return `<div class="line"><div>${esc(p.name[lang])}<small>${t("size")}: ${esc(i.size)}${i.color ? " · " + t("colorL") + ": " + esc(i.color) : ""} · ${money(p.price)}</small></div>
        <div class="qty"><button type="button" data-m="${idx}">−</button><span>${i.qty}</span><button type="button" data-pl="${idx}">+</button></div></div>`;
    }).join("") : `<p class="empty">${t("cartEmpty")}</p>`;
    renderTotals();
    document.querySelectorAll("[data-m]").forEach((b) => (b.onclick = () => { const k = +b.dataset.m; if (--cart[k].qty <= 0) cart.splice(k, 1); saveCart(); renderCart(); }));
    document.querySelectorAll("[data-pl]").forEach((b) => (b.onclick = () => { cart[+b.dataset.pl].qty++; saveCart(); renderCart(); }));
  }

  /* نافذة تفاصيل المنتج */
  let pmId = null, pmIdx = 0;
  function openProduct(id) { pmId = id; pmIdx = 0; renderModal(); $("#pm").hidden = false; document.body.style.overflow = "hidden"; }
  function closeProduct() { $("#pm").hidden = true; pmId = null; document.body.style.overflow = ""; renderGrid(); }
  function stepImg(d) { const n = imgsOf(prod(pmId)).length; if (n > 1) { pmIdx = (pmIdx + d + n) % n; renderModal(); } }
  function renderModal() {
    const p = prod(pmId);
    if (!p) return closeProduct();
    const im = imgsOf(p), rtl = lang === "ar", cols = p.colors || [];
    const off = p.oldPrice > p.price ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
    const desc = (p.desc && (p.desc[lang] || p.desc.ar || p.desc.en)) || "";
    const main = im.length ? `<img src="${esc(im[pmIdx])}" alt="">` : `<div class="pm-emoji">${esc(p.emoji || "🎀")}</div>`;
    $("#pmBody").innerHTML = `
      <div class="pm-gal">
        <div class="pm-main">${main}${im.length > 1 ? `<button type="button" class="pm-nav prev" data-nav="-1">${rtl ? "›" : "‹"}</button><button type="button" class="pm-nav next" data-nav="1">${rtl ? "‹" : "›"}</button>` : ""}</div>
        ${im.length > 1 ? `<div class="pm-thumbs">${im.map((s, i) => `<button type="button" class="pm-th ${i === pmIdx ? "on" : ""}" data-th="${i}"><img src="${esc(s)}" alt=""></button>`).join("")}</div>` : ""}
      </div>
      <div class="pm-info">
        <h3>${esc(p.name[lang])}</h3>
        <div class="price"><b>${money(p.price)}</b>${off ? `<s>${money(p.oldPrice)}</s><span class="badge" style="position:static">${off}% ${t("off")}</span>` : ""}</div>
        ${desc ? `<p class="pm-desc">${esc(desc).replace(/\n/g, "<br>")}</p>` : ""}
        <div class="pm-lbl">${t("size")}</div>
        <div class="sizes">${p.sizes.map((s) => `<button type="button" class="size ${picked[p.id] === s ? "on" : ""}" data-ms="${esc(s)}">${esc(s)}</button>`).join("")}</div>
        ${cols.length ? `<div class="pm-lbl">${t("colorL")}</div><div class="colors">${cols.map((c) => clrChip("data-mc", p.id, c, pickedColor[p.id] === c)).join("")}</div>` : ""}
        <button type="button" class="add" id="pmAdd" ${p.soldOut ? "disabled" : ""}>${p.soldOut ? t("sold") : t("add")}</button>
      </div>`;
    document.querySelectorAll("[data-nav]").forEach((b) => (b.onclick = () => stepImg(+b.dataset.nav)));
    document.querySelectorAll("[data-th]").forEach((b) => (b.onclick = () => { pmIdx = +b.dataset.th; renderModal(); }));
    document.querySelectorAll("[data-ms]").forEach((b) => (b.onclick = () => {
      picked[p.id] = b.dataset.ms;
      document.querySelectorAll("[data-ms]").forEach((x) => x.classList.toggle("on", x === b));
    }));
    document.querySelectorAll("[data-mc]").forEach((b) => (b.onclick = () => {
      pickedColor[p.id] = b.dataset.mc;
      document.querySelectorAll("[data-mc]").forEach((x) => x.classList.toggle("on", x === b));
    }));
    $("#pmAdd").onclick = (e) => addToCart(p.id, e.currentTarget);
    const mn = document.querySelector(".pm-main");
    let x0 = null;
    mn.ontouchstart = (e) => (x0 = e.touches[0].clientX);
    mn.ontouchend = (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) stepImg((dx < 0 ? 1 : -1) * (rtl ? -1 : 1));
    };
  }
  $("#pmClose").onclick = closeProduct;
  $("#pm").onclick = (e) => { if (e.target.id === "pm") closeProduct(); };
  document.addEventListener("keydown", (e) => {
    if ($("#pm").hidden) return;
    if (e.key === "Escape") closeProduct();
    if (e.key === "ArrowLeft") stepImg(lang === "ar" ? 1 : -1);
    if (e.key === "ArrowRight") stepImg(lang === "ar" ? -1 : 1);
  });

  /* إرسال الطلب */
  $("#city").addEventListener("input", renderTotals);
  $("#city").addEventListener("change", renderTotals);
  $("#orderForm").onsubmit = (e) => {
    e.preventDefault();
    if (!cart.length) return toast(t("cartEmpty"));
    const f = new FormData(e.target);
    const phone = String(f.get("phone") || "").trim();
    const city = String(f.get("city") || "").trim();
    const addr = String(f.get("address") || "").trim();
    if (phone.replace(/\D/g, "").length < 7) return toast(t("phoneBad"));
    if (!city) return toast(t("needCity"));
    if (!addr) return toast(t("needAddr"));
    const d = deliveryInfo(), priced = d.kind === "city" || d.kind === "other", sub = subtotal();
    const lines = cart.map((i) => `• ${prod(i.id).name[lang]} | ${t("size")}: ${i.size}${i.color ? ` | ${t("colorL")}: ${i.color}` : ""} | x${i.qty} | ${money(prod(i.id).price * i.qty)}`).join("\n");
    const msg = `*${S.name[lang]} - ${t("order")}* 🎀\n` +
      (f.get("name") ? `${t("customer")}: ${f.get("name")}\n` : "") +
      `${t("tel")}: ${phone}\n${t("cityL")}: ${city}\n${t("addr")}: ${addr}\n` +
      `\n${t("items")}:\n${lines}\n\n${t("subtotal")}: ${money(sub)}\n${t("delivery")}: ${priced ? delText(d) : t("delLater")}\n` +
      `*${d.kind === "ask" ? t("totalNoDel") : t("total")}: ${money(sub + (priced ? d.price : 0))}*` +
      (f.get("note") ? `\n${t("noteL")}: ${f.get("note")}` : "");
    window.open("https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(msg), "_blank");
  };

  const wa = "https://wa.me/" + S.whatsapp;
  $("#waLink").href = wa; $("#waFloat").href = wa;
  $("#langBtn").onclick = () => { lang = lang === "ar" ? "en" : "ar"; try { localStorage.setItem("lang", lang); } catch (e) {} applyLang(); };
  $("#cartBtn").onclick = () => ($("#drawer").hidden = false);
  $("#closeCart").onclick = () => ($("#drawer").hidden = true);
  $("#drawer").onclick = (e) => { if (e.target.id === "drawer") $("#drawer").hidden = true; };
  $("#search").oninput = (e) => { q = e.target.value; renderGrid(); };
  applyLang();
})();
