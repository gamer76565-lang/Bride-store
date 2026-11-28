(function () {
  const S = window.STORE;
  S.delivery = S.delivery || { cities: [], other: null };
  S.orders = S.orders || { endpoint: "", showWhatsApp: false };
  S.freeDelivery = S.freeDelivery || { min: 0 };
  S.announce = S.announce || { ar: "", en: "" };
  S.social = S.social || { facebook: "", tiktok: "" };
  S.pages = S.pages || {};
  S.reviews = Array.isArray(S.reviews) ? S.reviews : [];
  if (!Array.isArray(S.phones)) S.phones = ["0925788834", "0915788834"];
  const DEF_PAGES = {
    about: { ar: "برايد متجر بجامات ناعمة وأنيقة بلمسة وردية. نختار لك أجمل التصاميم والخامات المريحة لتنامي براحة وأناقة. اطلبي من الموقع ونتواصل معك لتأكيد طلبك وتوصيله.", en: "Bride is a store for soft, stylish pajamas with a pink touch. We pick the prettiest designs and the coziest fabrics. Order from the website and we will contact you to confirm and deliver your order." },
    policy: { ar: "للاستفسار عن تبديل أو إرجاع أي قطعة، تواصلي معنا عبر واتساب أو ماسنجر مع كود طلبك وسنساعدك بأسرع وقت.", en: "To ask about exchanging or returning an item, contact us on WhatsApp or Messenger with your order code and we will help you as soon as possible." }
  };
  const pageTxt = (k) => { const x = (S.pages && S.pages[k]) || {}; return (x[lang] || x.ar || "").trim() || DEF_PAGES[k][lang]; };
  const ordersOn = () => !!(S.orders && S.orders.endpoint);
  const UI = {
    ar: {
      freeHint: "أضيفي منتجات بقيمة {n} للحصول على توصيل مجاني 🚚", freeDone: "🎉 مبروك! توصيلك مجاني",
      bLow: "بقي قطع قليلة", bBest: "الأكثر طلبًا", bNew: "جديد", shareL: "شاركي:", shareWa: "واتساب", shareFb: "فيسبوك", copyLink: "نسخ الرابط", linkCopied: "تم نسخ الرابط ✅", shareTxt: "شوفي هذا المنتج من برايد 💕",
      aboutT: "من نحن", policyT: "سياسة الإرجاع والتبديل", followUs: "تابعينا:", fbL: "فيسبوك", ttL: "تيك توك", waL: "واتساب", callUs: "اتصلي بنا:",
      announce: "اطلبي بسهولة عبر واتساب", tag: "🌙 عالم البجامات", shopNow: "تسوقي الآن", hello: "أهلًا بك! 💕",
      cart: "السلة", products: "منتجاتنا", search: "ابحثي عن منتج...", empty: "لا توجد منتجات مطابقة",
      all: "الكل", offers: "العروض 🔥", add: "أضيفي للسلة", pickSize: "اختاري المقاس أولًا 💕", pickColor: "اختاري اللون أولًا 💕", added: "تمت الإضافة للسلة 🎀",
      off: "خصم", sold: "نفذت الكمية", yourCart: "سلتك", total: "الإجمالي", subtotal: "مجموع المنتجات", delivery: "التوصيل", cartEmpty: "السلة فارغة",
      send: "إرسال الطلب عبر واتساب", name: "الاسم (اختياري)", phone: "رقم الهاتف", city: "مدينة أخرى: اكتبي اسم مدينتك", areaPh: "من {c}؟ اختاري منطقتك", placeLbl: "📍 مكان التوصيل (اختاري إحدى الخانتين)", orWord: "أو",
      needPlace: "اختاري منطقتك في {c} أو اكتبي اسم مدينتك", needAreaHint: "لمدينة {c} اختاري منطقتك من الخانة الثانية 👇",
      payLbl: "💳 طريقة الدفع", needPay: "اختاري طريقة الدفع", pickArea: "اختاري المنطقة 👇",
      sendOrder: "تأكيد الطلب ✅", sending: "جاري إرسال طلبك...", sendFail: "تعذّر إرسال الطلب. تأكدي من الإنترنت وحاولي مرة أخرى",
      doneWa: "💬 إرسال الكود عبر واتساب", doneMs: "✉️ إرسال الكود عبر ماسنجر", doneFb: "لا يفتح ماسنجر؟ افتحي صفحتنا على فيسبوك وراسلينا من هناك", pasteIt: "تم نسخ الكود ✅ الصقيه في المحادثة", waMsg: "مرحبًا، أريد تأكيد طلبي رقم", copyId: "📋 نسخ كود الطلب", copied: "تم نسخ الكود ✅",
      confT: "⚠️ مهم: طلبك لم يُؤكَّد بعد",
      confS1: "احفظي الفاتورة أدناه كصورة (زر «حفظ الفاتورة») أو خذي لقطة شاشة لها.",
      confS2: "أرسلي كود الطلب أو صورة الفاتورة إلى واتساب أو ماسنجر صفحتنا من الزرّين أدناه.",
      confS3: "بعد وصول رسالتك نؤكد طلبك ونتواصل معك مباشرة بخصوص التوصيل أو أي تأخير أو عدم توفر قطعة.",
      confNote: "📱 التأكيد يتم من صاحبة الطلب نفسها وليس المستلم. فإذا كان المستلم شخصًا آخر (أب أو أخ...) أرسلي أنتِ الكود من رقمك.",
      iTitle: "فاتورة طلب", iNo: "رقم الطلب", iDate: "التاريخ", iStatus: "⏳ قيد التأكيد", iCust: "بيانات الطلب", iName: "الاسم", iPhone: "الهاتف", iPlace: "المدينة / المنطقة", iAddr: "العنوان", iPay: "طريقة الدفع",
      iItems: "المنتجات", iSize: "المقاس", iColor: "اللون", iSub: "مجموع المنتجات", iDel: "التوصيل", iTot: "الإجمالي", iFree: "مجاني", iLater: "يُحدد لاحقًا", iNoDel: "بدون التوصيل", iNote: "ملاحظات",
      iThanks: "شكرًا لاختيارك برايد 💕", iKeep: "احتفظي بهذه الفاتورة وأرسلي كود الطلب لتأكيده",
      sizeOut: "هذا المقاس نفذ", sortL: "الترتيب", sortDef: "الافتراضي", sortLow: "الأرخص أولًا", sortHigh: "الأغلى أولًا", sortOff: "الأكبر خصمًا", sizeAll: "كل المقاسات",
      reviewsT: "آراء زبوناتنا 💕", installL: "📲 ثبّتي موقعنا كتطبيق", iosHint: "لتثبيت الموقع على الآيفون: اضغطي زر المشاركة ⬆️ أسفل سفاري، ثم اختاري «إضافة إلى الشاشة الرئيسية».",
      forget: "🗑️ مسح بياناتي المحفوظة على هذا الجهاز", forgot: "تم مسح بياناتك المحفوظة ✅",
      saveInv: "🖼️ حفظ الفاتورة كصورة", printInv: "🖨️ طباعة / PDF", imgFail: "تعذر حفظ الصورة، خذي لقطة شاشة للفاتورة", imgSaved: "تم حفظ الفاتورة ✅",
      confP: "احتفظي بكود الطلب أو بصورة لهذه الشاشة. ولتأكيد طلبك أرسلي الكود (أو صورة الشاشة) إلى واتساب أو ماسنجر صفحتنا، من نفس صاحبة الطلب، لنتواصل معك مباشرة بخصوص الطلب أو أي تأخير أو عدم توفر.",
      doneT: "تم استلام طلبك! 🎉", doneNo: "رقم طلبك", doneP: "سنتواصل معك على رقم هاتفك لتأكيد الطلب.", keepShop: "متابعة التسوق",
      announceOrder: "اطلبي بسهولة من الموقع", heroSubOrder: "اختاري مقاسك واطلبي بسهولة", w2tOrder: "طلبك يصلنا مباشرة", w2pOrder: "نتواصل معك على هاتفك لتأكيد الطلب", payL: "الدفع", areaL: "المنطقة", payNote: "سنرسل لك بيانات الدفع عبر واتساب بعد تأكيد الطلب",
      address: "العنوان التفصيلي (الشارع، أقرب معلم، رقم المبنى)", note: "ملاحظات (اختياري)",
      phoneBad: "اكتبي رقم هاتف صحيح", needCity: "اكتبي اسم مدينتك", needAddr: "اكتبي العنوان التفصيلي",
      size: "المقاس", colorL: "اللون", order: "طلب جديد من الموقع", customer: "الاسم", tel: "الهاتف", cityL: "المدينة", addr: "العنوان", items: "المنتجات", noteL: "ملاحظات",
      delTo: "سعر التوصيل إلى", delOther: "سعر التوصيل لمدينتك", delAsk: "سنؤكد لك سعر التوصيل عبر واتساب", free: "توصيل مجاني", delLater: "يُحدد لاحقًا", totalNoDel: "الإجمالي (بدون التوصيل)",
      w1t: "اختاري واطلبي", w1p: "اختاري القطعة والمقاس واللون وأضيفيها للسلة", w2t: "الطلب عبر واتساب", w2p: "يصلنا طلبك مباشرة ونتواصل معك لتأكيده",
      w3t: "عروض مستمرة", w3p: "تابعي قسم العروض لأحدث الخصومات", chat: "تواصلي معنا على واتساب",
      foot: "بجامات ناعمة بلمسة وردية 💕", heroTitle: "بجامات ناعمة بأحلى التصاميم", heroSub: "اختاري مقاسك واطلبي عبر واتساب"
    },
    en: {
      freeHint: "Add {n} more to get free delivery 🚚", freeDone: "🎉 Your delivery is free!",
      bLow: "Only a few left", bBest: "Best seller", bNew: "New", shareL: "Share:", shareWa: "WhatsApp", shareFb: "Facebook", copyLink: "Copy link", linkCopied: "Link copied ✅", shareTxt: "Check out this product from Bride 💕",
      aboutT: "About us", policyT: "Return & exchange policy", followUs: "Follow us:", fbL: "Facebook", ttL: "TikTok", waL: "WhatsApp", callUs: "Call us:",
      announce: "Order easily on WhatsApp", tag: "🌙 Pajama World", shopNow: "Shop now", hello: "Welcome! 💕",
      cart: "Cart", products: "Our products", search: "Search for a product...", empty: "No matching products",
      all: "All", offers: "Offers 🔥", add: "Add to cart", pickSize: "Please pick a size first 💕", pickColor: "Please pick a color first 💕", added: "Added to cart 🎀",
      off: "OFF", sold: "Sold out", yourCart: "Your cart", total: "Total", subtotal: "Items subtotal", delivery: "Delivery", cartEmpty: "Your cart is empty",
      send: "Send order via WhatsApp", name: "Name (optional)", phone: "Phone number", city: "Other city: type your city", areaPh: "In {c}? Choose your area", placeLbl: "📍 Delivery location (choose one of the two)", orWord: "or",
      needPlace: "Choose your area in {c} or type your city", needAreaHint: "For {c}, please choose your area in the second field 👇",
      payLbl: "💳 Payment method", needPay: "Please choose a payment method", pickArea: "Choose area 👇",
      sendOrder: "Confirm order ✅", sending: "Sending your order...", sendFail: "Could not send the order. Check your connection and try again",
      doneWa: "💬 Send the code via WhatsApp", doneMs: "✉️ Send the code via Messenger", doneFb: "Messenger not opening? Visit our Facebook page and message us there", pasteIt: "Code copied ✅ paste it in the chat", waMsg: "Hello, I'd like to confirm my order no.", copyId: "📋 Copy order code", copied: "Code copied ✅",
      confT: "⚠️ Important: your order is not confirmed yet",
      confS1: "Save the invoice below as an image (\"Save invoice\" button) or take a screenshot of it.",
      confS2: "Send the order code or the invoice image to our WhatsApp or Messenger using the buttons below.",
      confS3: "Once we receive your message we confirm your order and contact you directly about delivery, any delay or if an item is unavailable.",
      confNote: "📱 The order is confirmed by the customer herself, not the recipient. If the recipient is someone else (father, brother...), please send the code yourself from your own number.",
      iTitle: "Order invoice", iNo: "Order no.", iDate: "Date", iStatus: "⏳ Pending confirmation", iCust: "Order details", iName: "Name", iPhone: "Phone", iPlace: "City / Area", iAddr: "Address", iPay: "Payment",
      iItems: "Items", iSize: "Size", iColor: "Color", iSub: "Subtotal", iDel: "Delivery", iTot: "Total", iFree: "Free", iLater: "To be confirmed", iNoDel: "excl. delivery", iNote: "Notes",
      iThanks: "Thank you for choosing Bride 💕", iKeep: "Keep this invoice and send the order code to confirm",
      sizeOut: "This size is sold out", sortL: "Sort", sortDef: "Default", sortLow: "Price: low to high", sortHigh: "Price: high to low", sortOff: "Biggest discount", sizeAll: "All sizes",
      reviewsT: "What our customers say 💕", installL: "📲 Install our site as an app", iosHint: "To install on iPhone: tap the Share button ⬆️ in Safari, then choose \"Add to Home Screen\".",
      forget: "🗑️ Clear my saved details on this device", forgot: "Your saved details were cleared ✅",
      saveInv: "🖼️ Save invoice as image", printInv: "🖨️ Print / PDF", imgFail: "Could not save the image, please take a screenshot", imgSaved: "Invoice saved ✅",
      confP: "Keep your order code or take a screenshot of this screen. To confirm your order, send the code (or the screenshot) to our WhatsApp or Messenger, from the customer's own account, so we can reach you directly about the order, any delay or if an item is unavailable.",
      doneT: "We received your order! 🎉", doneNo: "Your order number", doneP: "We will contact you on your phone number to confirm.", keepShop: "Continue shopping",
      announceOrder: "Order easily from the website", heroSubOrder: "Pick your size and order easily", w2tOrder: "Your order reaches us directly", w2pOrder: "We call you to confirm the order", payL: "Payment", areaL: "Area", payNote: "We will send you the payment details on WhatsApp after confirming your order",
      address: "Detailed address (street, landmark, building no.)", note: "Notes (optional)",
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
  let cat = "all", q = "", cart = [], sortBy = "def", sizeF = "";
  try { cart = JSON.parse(localStorage.getItem("cart") || "[]"); } catch (e) {}
  const picked = {}, pickedColor = {};

  const $ = (s) => document.querySelector(s);
  const t = (k) => UI[lang][k];
  const money = (n) => n + " " + S.currency[lang];
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const prod = (id) => S.products.find((p) => p.id === id);
  const sizeOut = (p, s) => (p.soldSizes || []).includes(s);
  const isOut = (p) => !!p.soldOut || (p.sizes.length > 0 && p.sizes.every((x) => sizeOut(p, x)));
  const disc = (p) => (p.oldPrice > p.price ? 1 - p.price / p.oldPrice : 0);
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
  const loc = () => (S.delivery && S.delivery.local) || null;
  const areas = () => (loc() && loc().areas) || [];
  const localName = () => (loc() && loc().name ? loc().name[lang] || loc().name.ar : "");
  const isLocalName = (v) => {
    const n = norm(v), L = loc();
    return !!(areas().length && n && L && L.name && (n === norm(L.name.ar) || n === norm(L.name.en)));
  };
  const hasLocalOther = () => loc() && loc().other !== null && loc().other !== undefined && loc().other !== "";
  const shownCities = () => cities().filter((c) => !isLocalName(c.ar) && !isLocalName(c.en));
  const updatePlaceUI = () => { $("#areaBlock").hidden = !areas().length; };
  const hasOther = () => S.delivery && S.delivery.other !== null && S.delivery.other !== undefined && S.delivery.other !== "";
  function findCity(v) {
    const n = norm(v);
    if (!n) return null;
    return shownCities().find((c) => norm(c.ar) === n || norm(c.en) === n) || null;
  }
  const freeMin = () => +(S.freeDelivery && S.freeDelivery.min) || 0;
  function deliveryInfo() {
    const d = deliveryInfo0();
    if (freeMin() > 0 && cart.length && subtotal() >= freeMin() && (d.kind === "city" || d.kind === "other" || d.kind === "ask")) {
      return Object.assign({}, d, { kind: d.kind === "ask" ? "other" : d.kind, price: 0, free: true });
    }
    return d;
  }
  function deliveryInfo0() {
    const rawA = ($("#area").value || "").trim();
    const raw = ($("#city").value || "").trim();
    if (rawA && areas().length) {
      const a = areas().find((x) => norm(x.ar) === norm(rawA) || norm(x.en) === norm(rawA));
      if (a) return { kind: "city", price: +a.price || 0, name: localName() + " - " + (a[lang] || a.ar) };
      if (document.activeElement === $("#area") && areas().some((x) => match(x, norm(rawA)) >= 0)) return { kind: "none" };
      if (hasLocalOther()) return { kind: "other", price: +loc().other || 0 };
      return { kind: "ask" };
    }
    if (raw && isLocalName(raw)) return { kind: "needArea" };
    if (!raw || (!shownCities().length && !hasOther())) return { kind: "none" };
    const c = findCity(raw);
    if (c) return { kind: "city", price: +c.price || 0, name: c[lang] || c.ar };
    if (document.activeElement === $("#city") && shownCities().some((x) => match(x, norm(raw)) >= 0)) return { kind: "none" };
    if (hasOther()) return { kind: "other", price: +S.delivery.other || 0 };
    return { kind: "ask" };
  }
  const subtotal = () => cart.reduce((a, i) => a + prod(i.id).price * i.qty, 0);
  const delText = (d) => (d.price ? money(d.price) : t("free"));

  function renderTotals() {
    const sub = subtotal(), d = deliveryInfo();
    const priced = d.kind === "city" || d.kind === "other";
    $("#sub").textContent = money(sub);
    const fm = freeMin(), fh = $("#freeHint");
    fh.hidden = !(fm > 0 && cart.length);
    if (!fh.hidden) { fh.textContent = sub >= fm ? t("freeDone") : t("freeHint").replace("{n}", money(fm - sub)); fh.classList.toggle("ok", sub >= fm); }
    $("#delRow").hidden = d.kind === "none" || d.kind === "needArea";
    $("#delPrice").textContent = priced ? delText(d) : t("delLater");
    $("#total").textContent = money(sub + (priced ? d.price : 0));
    $("#totalLbl").textContent = d.kind === "ask" ? t("totalNoDel") : t("total");
    const box = $("#delInfo");
    box.hidden = d.kind === "none";
    box.textContent = d.kind === "city" ? `🚚 ${t("delTo")} ${d.name}: ${delText(d)}` : d.kind === "other" ? `🚚 ${t("delOther")}: ${delText(d)}` : d.kind === "ask" ? `🚚 ${t("delAsk")}` : d.kind === "needArea" ? t("needAreaHint").replace("{c}", localName()) : "";
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = S.name.ar + " | " + S.name.en;
    $("#langBtn").textContent = lang === "ar" ? "EN" : "عربي";
    document.querySelectorAll("[data-t]").forEach((e) => { if (t(e.dataset.t) != null) e.textContent = t(e.dataset.t); });
    document.querySelectorAll("[data-tp]").forEach((e) => (e.placeholder = t(e.dataset.tp)));
    $("#announce").textContent = (S.announce && (S.announce[lang] || S.announce.ar || "").trim()) || t(ordersOn() ? "announceOrder" : "announce");
    $("#aboutTxt").textContent = pageTxt("about"); $("#policyTxt").textContent = pageTxt("policy");
    renderSocial();
    if (lastOrder) renderInvoice();
    const ph = (S.phones || []).map((x) => String(x).trim()).filter(Boolean);
    $("#phones").hidden = !ph.length;
    $("#phones").innerHTML = ph.length ? `<span>📞 ${t("callUs")}</span>` + ph.map((x) => `<a href="tel:${esc(x.replace(/[^\d+]/g, ""))}" dir="ltr">${esc(x)}</a>`).join("") : "";
    $("#heroTitle").textContent = (S.hero && S.hero.title && S.hero.title[lang]) || t("heroTitle");
    $("#heroSub").textContent = (S.hero && S.hero.sub && S.hero.sub[lang]) || t(ordersOn() ? "heroSubOrder" : "heroSub");
    $("#footTxt").textContent = t("foot");
    if (ordersOn()) {
      $("#w2t").textContent = t("w2tOrder"); $("#w2p").textContent = t("w2pOrder");
      $("#sendBtn").textContent = t("sendOrder");
    }
    $("#sendBtn").classList.toggle("wa", !ordersOn());
    const showWa = !ordersOn() || !!(S.orders && S.orders.showWhatsApp);
    $("#waFloat").hidden = !showWa; $("#waLink").hidden = !showWa;
    $("#copy").textContent = "© " + new Date().getFullYear() + " " + S.name[lang];
    $("#area").placeholder = t("areaPh").replace("{c}", localName());
    updatePlaceUI(); renderPay();
    renderCats(); renderFilters(); renderGrid(); renderCart(); renderReviews();
    if (pmId !== null) renderModal();
  }

  const ICON_FB = '<svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>';
  const ICON_TT = '<svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>';
  const fixUrl = (v, base) => { v = String(v || "").trim(); if (!v) return ""; if (/^https?:\/\//i.test(v)) return v; return base + v.replace(/^@/, ""); };
  function fbUrl() {
    const f = (S.social && S.social.facebook) || "", m = String(S.messenger || "").trim();
    if (f.trim()) return fixUrl(f, "https://www.facebook.com/");
    if (/^\d{8,}$/.test(m)) return "https://www.facebook.com/profile.php?id=" + m;
    return m ? fixUrl(m, "https://www.facebook.com/") : "";
  }
  function renderSocial() {
    const fb = fbUrl(), tt = fixUrl(S.social && S.social.tiktok, "https://www.tiktok.com/@");
    const box = $("#social"), wa = S.whatsapp ? "https://wa.me/" + S.whatsapp : "";
    box.hidden = !(fb || tt || wa);
    box.innerHTML = (wa ? `<a href="${esc(wa)}" target="_blank" rel="noopener"><span class="ic-wa">💬</span>${t("waL")}</a>` : "") + (fb ? `<a href="${esc(fb)}" target="_blank" rel="noopener">${ICON_FB}${t("fbL")}</a>` : "") + (tt ? `<a href="${esc(tt)}" target="_blank" rel="noopener">${ICON_TT}${t("ttL")}</a>` : "");
  }
  const tagHtml = (p) => (p.badge === "low" || p.badge === "best" || p.badge === "new") ? `<span class="tagb ${p.badge}">${t({ low: "bLow", best: "bBest", new: "bNew" }[p.badge])}</span>` : "";

  function renderCats() {
    const list = [{ id: "all", ar: "الكل", en: "All", icon: "💖" }, { id: "offers", ar: "العروض", en: "Offers", icon: "🔥" }].concat(S.categories);
    $("#cats").innerHTML = list.map((c) => `<button type="button" class="chip ${cat === c.id ? "on" : ""}" data-c="${esc(c.id)}">${c.icon ? esc(c.icon) + " " : ""}${esc(c[lang])}</button>`).join("");
    $("#cats").querySelectorAll("button").forEach((b) => (b.onclick = () => { cat = b.dataset.c; renderCats(); renderGrid(); }));
  }

  function renderFilters() {
    const sizes = []; S.products.forEach((p) => p.sizes.forEach((x) => { if (!sizes.includes(x)) sizes.push(x); }));
    $("#sortSel").innerHTML = [["def", "sortDef"], ["low", "sortLow"], ["high", "sortHigh"], ["off", "sortOff"]].map(([v, k]) => `<option value="${v}" ${sortBy === v ? "selected" : ""}>${t("sortL")}: ${t(k)}</option>`).join("");
    const ss = $("#sizeSel"); ss.hidden = sizes.length < 2;
    ss.innerHTML = `<option value="">${t("sizeAll")}</option>` + sizes.map((x) => `<option value="${esc(x)}" ${sizeF === x ? "selected" : ""}>${t("size")}: ${esc(x)}</option>`).join("");
  }
  function renderReviews() {
    const list = (S.reviews || []).filter((r) => r && r.img);
    $("#reviewsSec").hidden = !list.length;
    $("#reviews").innerHTML = list.map((r, i) => `<figure class="rv"><img src="${esc(r.img)}" alt="" loading="lazy" decoding="async" data-rv="${i}">${r.name || r.text ? `<figcaption>${r.text ? "“" + esc(r.text) + "”" : ""}${r.name ? `<b>— ${esc(r.name)}</b>` : ""}</figcaption>` : ""}</figure>`).join("");
    $("#reviews").querySelectorAll("[data-rv]").forEach((im) => (im.onclick = () => openLb(list.map((r) => r.img), +im.dataset.rv)));
  }

  /* تكبير الصور */
  let lbList = [], lbIdx = 0, lbZoom = false;
  function showLb() {
    $("#lbImg").src = lbList[lbIdx]; $("#lb").classList.toggle("z", lbZoom);
    $("#lbP").hidden = $("#lbN").hidden = lbList.length < 2;
  }
  function openLb(list, i) { lbList = list; lbIdx = i || 0; lbZoom = false; $("#lb").hidden = false; showLb(); }
  const closeLb = () => { $("#lb").hidden = true; lbZoom = false; $("#lb").classList.remove("z"); };
  const stepLb = (d) => { lbIdx = (lbIdx + d + lbList.length) % lbList.length; lbZoom = false; showLb(); };
  $("#lbX").onclick = closeLb; $("#lbP").onclick = () => stepLb(-1); $("#lbN").onclick = () => stepLb(1);
  $("#lbBox").onclick = (e) => { if (e.target.id === "lbBox" && !lbZoom) closeLb(); };
  $("#lbImg").onclick = (e) => {
    const r = e.target.getBoundingClientRect(), fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height, b = $("#lbBox");
    lbZoom = !lbZoom; $("#lb").classList.toggle("z", lbZoom);
    if (lbZoom) { b.scrollLeft = fx * b.scrollWidth - b.clientWidth / 2; b.scrollTop = fy * b.scrollHeight - b.clientHeight / 2; }
  };
  let lbx = null;
  $("#lbBox").addEventListener("touchstart", (e) => { lbx = lbZoom ? null : e.touches[0].clientX; }, { passive: true });
  $("#lbBox").addEventListener("touchend", (e) => { if (lbx === null) return; const dx = e.changedTouches[0].clientX - lbx; lbx = null; if (Math.abs(dx) > 50 && lbList.length > 1) stepLb(dx < 0 ? 1 : -1); });
  document.addEventListener("keydown", (e) => {
    if ($("#lb").hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") stepLb(-1);
    if (e.key === "ArrowRight") stepLb(1);
  });

  function renderGrid() {
    const items = S.products.filter((p) => {
      if (cat === "offers" && !(p.oldPrice > p.price)) return false;
      if (cat !== "all" && cat !== "offers" && p.category !== cat) return false;
      if (sizeF && !(p.sizes.includes(sizeF) && !sizeOut(p, sizeF))) return false;
      return !q || (p.name.ar + " " + p.name.en).toLowerCase().includes(q.toLowerCase());
    });
    if (sortBy === "low") items.sort((a, b) => a.price - b.price);
    else if (sortBy === "high") items.sort((a, b) => b.price - a.price);
    else if (sortBy === "off") items.sort((a, b) => disc(b) - disc(a));
    $("#empty").hidden = items.length > 0;
    $("#grid").innerHTML = items.map((p) => {
      const off = p.oldPrice > p.price ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
      const im = imgsOf(p);
      const pic = im.length ? `<img src="${esc(im[0])}" alt="${esc(p.name[lang])}" loading="lazy" decoding="async">`
        : `<svg class="sp a"><use href="#spark"/></svg><svg class="sp b"><use href="#spark"/></svg>${esc(p.emoji || "🎀")}`;
      const cols = p.colors || [];
      return `<article class="card" data-card="${p.id}">
        ${off ? `<span class="badge"><svg class="ic"><use href="#bow"/></svg>${off}% ${t("off")}</span>` : ""}${tagHtml(p)}
        <div class="pic" data-open="${p.id}">${pic}${im.length > 1 ? `<span class="multi">📷 ${im.length}</span>` : ""}${isOut(p) ? `<div class="soldtag">${t("sold")}</div>` : ""}</div>
        <div class="info">
          <h4 data-open="${p.id}">${esc(p.name[lang])}</h4>
          <div class="price"><b>${money(p.price)}</b>${off ? `<s>${money(p.oldPrice)}</s>` : ""}</div>
          <div class="sizes">${p.sizes.map((s) => `<button type="button" class="size ${picked[p.id] === s ? "on" : ""}${sizeOut(p, s) ? " out" : ""}" data-p="${p.id}" data-s="${esc(s)}" ${sizeOut(p, s) ? `disabled title="${t("sizeOut")}"` : ""}>${esc(s)}</button>`).join("")}</div>
          ${cols.length ? `<div class="colors">${cols.map((c) => clrChip("data-pc", p.id, c, pickedColor[p.id] === c)).join("")}</div>` : ""}
          <button type="button" class="add" data-add="${p.id}" ${isOut(p) ? "disabled" : ""}>${isOut(p) ? t("sold") : t("add")}</button>
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
    if (!p || isOut(p)) return;
    const size = picked[id] || (p.sizes.length === 1 ? p.sizes[0] : "");
    const cols = p.colors || [];
    const color = pickedColor[id] || (cols.length === 1 ? cols[0] : "");
    const wrap = btn.closest(".card, .pm-info");
    const shake = (sel) => {
      const box = wrap && wrap.querySelector(sel);
      if (box) { box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake"); }
    };
    if (!size) { shake(".sizes"); return toast(t("pickSize")); }
    if (sizeOut(p, size)) return toast(t("sizeOut"));
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
        ${tagHtml(p)}<h3>${esc(p.name[lang])}</h3>
        <div class="price"><b>${money(p.price)}</b>${off ? `<s>${money(p.oldPrice)}</s><span class="badge" style="position:static">${off}% ${t("off")}</span>` : ""}</div>
        ${desc ? `<p class="pm-desc">${esc(desc).replace(/\n/g, "<br>")}</p>` : ""}
        <div class="pm-lbl">${t("size")}</div>
        <div class="sizes">${p.sizes.map((s) => `<button type="button" class="size ${picked[p.id] === s ? "on" : ""}${sizeOut(p, s) ? " out" : ""}" data-ms="${esc(s)}" ${sizeOut(p, s) ? `disabled title="${t("sizeOut")}"` : ""}>${esc(s)}</button>`).join("")}</div>
        ${cols.length ? `<div class="pm-lbl">${t("colorL")}</div><div class="colors">${cols.map((c) => clrChip("data-mc", p.id, c, pickedColor[p.id] === c)).join("")}</div>` : ""}
        <button type="button" class="add" id="pmAdd" ${isOut(p) ? "disabled" : ""}>${isOut(p) ? t("sold") : t("add")}</button>
        <div class="share"><small>${t("shareL")}</small>
          <a class="sh" id="shWa" target="_blank" rel="noopener">${t("shareWa")}</a>
          <a class="sh" id="shFb" target="_blank" rel="noopener">${t("shareFb")}</a>
          <button type="button" class="sh" id="shCp">${t("copyLink")}</button></div>
      </div>`;
    const link = location.origin + location.pathname + "?p=" + p.id, txt = t("shareTxt") + " " + p.name[lang];
    $("#shWa").href = "https://wa.me/?text=" + encodeURIComponent(txt + "\n" + link);
    $("#shFb").href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(link);
    $("#shCp").onclick = async () => {
      try { await navigator.clipboard.writeText(link); }
      catch (e) { const ta = document.createElement("textarea"); ta.value = link; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e2) {} ta.remove(); }
      toast(t("linkCopied"));
    };
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
    const mi = document.querySelector(".pm-main img"); if (mi) mi.onclick = () => openLb(im, pmIdx);
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
    if ($("#pm").hidden || !$("#lb").hidden) return;
    if (e.key === "Escape") closeProduct();
    if (e.key === "ArrowLeft") stepImg(lang === "ar" ? 1 : -1);
    if (e.key === "ArrowRight") stepImg(lang === "ar" ? -1 : 1);
  });

  /* إرسال الطلب إلى جدول المتجر (بدون واتساب) */
  async function sendOrder(order) {
    const opts = { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(order) };
    try {
      const r = await fetch(S.orders.endpoint, opts);
      const j = await r.json();
      return !!(j && j.ok);
    } catch (e) {
      if (!(e instanceof TypeError)) return false;
      // مشكلة اتصال/CORS: نعيد المحاولة مرة بدون قراءة الرد، والسكربت يتجاهل التكرار بنفس رقم الطلب
      try { await fetch(S.orders.endpoint, Object.assign({}, opts, { mode: "no-cors" })); return true; } catch (e2) { return false; }
    }
  }
  let lastId = "", lastOrder = null;
  /* ===== الفاتورة ===== */
  const payName = (id) => (PAYS.find((p) => p.id === id) || {})[lang] || id || "";
  const phoneList = () => (S.phones || []).map((x) => String(x).trim()).filter(Boolean);
  function invTotals() {
    const o = lastOrder, d = o.priced ? o.delPrice : 0;
    return { del: o.priced ? (o.delPrice ? money(o.delPrice) : t("iFree")) : t("iLater"), total: money(o.sub + d) + (o.askDel ? " (" + t("iNoDel") + ")" : "") };
  }
  function invoiceHtml() {
    const o = lastOrder, tt = invTotals();
    const info = [[t("iName"), o.name], [t("iPhone"), o.phone], [t("iPlace"), o.place], [t("iAddr"), o.addr], [t("iPay"), payName(o.payId)]]
      .filter((x) => x[1]).map(([k, v]) => `<div class="inv-r"><span>${k}</span><b>${esc(v)}</b></div>`).join("");
    const rows = o.items.map((i) => `<tr><td><b>${esc(i.n[lang] || i.n.ar)}</b><small>${t("iSize")}: ${esc(i.size)}${i.color ? " · " + t("iColor") + ": " + esc(i.color) : ""}</small></td><td>×${i.qty}</td><td>${money(i.total)}</td></tr>`).join("");
    return `<div class="inv-head"><div><h4>${t("iTitle")}</h4><small>${t("iNo")}: ${esc(o.id)}</small><small>${t("iDate")}: ${esc(o.date)}</small><span class="inv-st">${t("iStatus")}</span></div><img src="logo.png" alt=""></div>
      <div class="inv-sec"><h5>${t("iCust")}</h5>${info}</div>
      <div class="inv-sec"><h5>${t("iItems")}</h5><table>${rows}</table>
        <div class="inv-r" style="margin-top:6px"><span>${t("iSub")}</span><b>${money(o.sub)}</b></div>
        <div class="inv-r"><span>${t("iDel")}</span><b>${tt.del}</b></div>
        <div class="inv-r inv-tot"><span>${t("iTot")}</span><b>${tt.total}</b></div></div>
      ${o.note ? `<div class="inv-sec"><h5>${t("iNote")}</h5><div>${esc(o.note)}</div></div>` : ""}
      <div class="inv-foot">${t("iThanks")}<br>${t("iKeep")}${phoneList().length ? "<br>📞 " + phoneList().map(esc).join(" · ") : ""}</div>`;
  }
  function renderInvoice() { if (lastOrder) $("#invoice").innerHTML = invoiceHtml(); }
  function applyDoneTexts() { $("#doneId").textContent = t("doneNo") + ": " + lastId; }

  /* رسم الفاتورة كصورة */
  function paintInvoice(ctx, draw, logo) {
    const o = lastOrder, tt = invTotals(), W = 900, P = 44, R = lang === "ar";
    const FONT = (w, sz) => w + " " + sz + 'px Cairo, Tahoma, Arial, sans-serif';
    const startA = R ? "right" : "left", endA = R ? "left" : "right", xs = R ? W - P : P, xe = R ? P : W - P;
    ctx.direction = R ? "rtl" : "ltr";
    const text = (str, x, y, font, color, al) => { ctx.font = font; if (!draw) return; ctx.fillStyle = color; ctx.textAlign = al; ctx.fillText(str, x, y); };
    const wrap = (str, font, maxW) => {
      ctx.font = font; const words = String(str).split(/\s+/), lines = []; let cur = "";
      words.forEach((w) => { const tryL = cur ? cur + " " + w : w; if (ctx.measureText(tryL).width > maxW && cur) { lines.push(cur); cur = w; } else cur = tryL; });
      if (cur) lines.push(cur); return lines;
    };
    const rect = (x, y, w, h, c) => { if (draw) { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); } };
    const line = (y, c) => rect(P, y, W - 2 * P, 2, c || "#fbe3ea");
    let y = 0;
    if (draw) { const g = ctx.createLinearGradient(0, 0, W, 0); g.addColorStop(0, "#ffd6e1"); g.addColorStop(1, "#fff0f4"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 190); }
    if (draw && logo) { const lh = 120, lw = logo.width / logo.height * lh; ctx.drawImage(logo, R ? P : W - P - lw, 35, lw, lh); }
    text(t("iTitle"), xs, 70, FONT("800", 40), "#d9506e", startA);
    text(t("iNo") + ": " + o.id, xs, 112, FONT("700", 26), "#6b3a4f", startA);
    text(t("iDate") + ": " + o.date, xs, 148, FONT("600", 24), "#8a6a77", startA);
    y = 190;
    // الحالة
    rect(P, y + 18, W - 2 * P, 52, "#fff3cd"); text(t("iStatus") + " — " + t("iKeep"), W / 2, y + 53, FONT("700", 22), "#8a5a00", "center");
    y += 125;
    const field = (label, val) => {
      text(label, xs, y, FONT("600", 21), "#9a7a87", startA); y += 34;
      wrap(val, FONT("700", 26), W - 2 * P).forEach((l) => { text(l, xs, y, FONT("700", 26), "#3d2230", startA); y += 38; });
      y += 10;
    };
    text(t("iCust"), xs, y, FONT("800", 28), "#d9506e", startA); y += 20; line(y); y += 36;
    [[t("iName"), o.name], [t("iPhone"), o.phone], [t("iPlace"), o.place], [t("iAddr"), o.addr], [t("iPay"), payName(o.payId)]].filter((x) => x[1]).forEach(([k, v]) => field(k, v));
    y += 6; text(t("iItems"), xs, y, FONT("800", 28), "#d9506e", startA); y += 20; line(y); y += 40;
    o.items.forEach((i) => {
      const nm = wrap(i.n[lang] || i.n.ar, FONT("700", 26), 540);
      text(money(i.total), xe, y, FONT("800", 26), "#3d2230", endA);
      nm.forEach((l) => { text(l, xs, y, FONT("700", 26), "#3d2230", startA); y += 36; });
      text(t("iSize") + ": " + i.size + (i.color ? " · " + t("iColor") + ": " + i.color : "") + "  ×" + i.qty, xs, y, FONT("600", 21), "#9a7a87", startA); y += 20; line(y + 6); y += 38;
    });
    const trow = (k, v, big) => { text(k, xs, y, FONT(big ? "800" : "600", big ? 32 : 25), big ? "#d9506e" : "#6b3a4f", startA); text(v, xe, y, FONT("800", big ? 32 : 25), big ? "#d9506e" : "#3d2230", endA); y += big ? 50 : 42; };
    trow(t("iSub"), money(o.sub)); trow(t("iDel"), tt.del); line(y - 12, "#f7b6c8"); y += 42; trow(t("iTot"), tt.total, true);
    if (o.note) { y += 10; text(t("iNote"), xs, y, FONT("600", 21), "#9a7a87", startA); y += 34; wrap(o.note, FONT("600", 24), W - 2 * P).forEach((l) => { text(l, xs, y, FONT("600", 24), "#3d2230", startA); y += 34; }); }
    y += 24; rect(0, y, W, 130, "#fff8fa");
    text(t("iThanks"), W / 2, y + 48, FONT("800", 28), "#d9506e", "center");
    const ph = phoneList(); if (ph.length) text("📞 " + ph.join("  ·  "), W / 2, y + 92, FONT("700", 24), "#6b3a4f", "center");
    y += 130; return y;
  }
  async function invoiceBlob() {
    try { await document.fonts.load("800 28px Cairo"); await document.fonts.load("600 22px Cairo"); } catch (e) {}
    const logo = await new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = "logo.png"; });
    const m = document.createElement("canvas").getContext("2d"), H = paintInvoice(m, false, logo);
    const c = document.createElement("canvas"), sc = 2; c.width = 900 * sc; c.height = H * sc;
    const ctx = c.getContext("2d"); ctx.scale(sc, sc); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, 900, H);
    paintInvoice(ctx, true, logo);
    return new Promise((res) => c.toBlob(res, "image/png"));
  }
  $("#saveInv").onclick = async () => {
    if (!lastOrder) return;
    try {
      const blob = await invoiceBlob(), file = new File([blob], "Bride-" + lastOrder.id + ".png", { type: "image/png" });
      if (navigator.maxTouchPoints > 0 && navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: "Bride " + lastOrder.id }); return; }
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = file.name; document.body.appendChild(a); a.click(); a.remove();
      toast(t("imgSaved"));
    } catch (e) { if (e && e.name === "AbortError") return; toast(t("imgFail")); }
  };
  $("#printInv").onclick = () => {
    if (!lastOrder) return;
    const w = window.open("", "_blank"); if (!w) return toast(t("imgFail"));
    w.document.write(`<!doctype html><html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}"><head><meta charset="utf-8"><title>${esc(lastOrder.id)}</title><link rel="stylesheet" href="${new URL("style.css", location.href).href}"><style>body{background:#fff;padding:12px;max-width:640px;margin:auto}</style></head><body><div class="inv">${invoiceHtml()}</div><script>window.onload=function(){setTimeout(function(){window.print()},500)}<\/script></body></html>`);
    w.document.close();
  };

  async function submitOrder(form, v) {
    const btn = $("#sendBtn");
    btn.disabled = true; btn.textContent = t("sending");
    const id = "BR-" + new Date().toISOString().slice(2, 10).replace(/-/g, "") + "-" + Math.floor(1000 + Math.random() * 9000);
    const items = cart.map((i) => { const p = prod(i.id); return { name: p.name.ar + (p.code ? " — كود " + p.code : ""), size: i.size, color: i.color || "", qty: i.qty, price: p.price, total: p.price * i.qty }; });
    const order = {
      id, phone: v.phone, name: v.name, city: v.area ? (loc() && loc().name.ar) || "" : v.city, area: v.area, address: v.addr,
      pay: (PAYS.find((p) => p.id === v.payId) || {}).ar || v.payId, items, subtotal: v.sub,
      delivery: v.priced ? v.d.price : null, deliveryText: v.priced ? (v.d.price ? String(v.d.price) : "مجاني") : "يُحدد لاحقًا",
      total: v.sub + (v.priced ? v.d.price : 0), totalNote: v.d.kind === "ask" ? "بدون التوصيل" : "",
      note: v.note, currency: S.currency.ar, site: S.name.ar, hp: v.hp
    };
    const snap = {
      id, date: (() => { const d = new Date(), z = (n) => String(n).padStart(2, "0"); return d.getFullYear() + "-" + z(d.getMonth() + 1) + "-" + z(d.getDate()) + " " + z(d.getHours()) + ":" + z(d.getMinutes()); })(),
      name: v.name, phone: v.phone, place: v.area ? [(loc() && loc().name[lang]) || "", v.area].filter(Boolean).join(" - ") : v.city, addr: v.addr, payId: v.payId, note: v.note,
      items: cart.map((i) => { const p = prod(i.id); return { n: p.name, size: i.size, color: i.color || "", qty: i.qty, total: p.price * i.qty }; }),
      sub: v.sub, priced: !!v.priced, delPrice: v.priced ? v.d.price : null, askDel: v.d.kind === "ask"
    };
    const ok = await sendOrder(order);
    btn.disabled = false; btn.textContent = t("sendOrder");
    if (!ok) return toast(t("sendFail"));
    cart = []; saveCart(); form.reset(); payVal = ""; renderPay(); saveCust(v); prefill(); renderCart();
    $("#doneId").textContent = t("doneNo") + ": " + id;
    const dw = $("#doneWa");
    dw.hidden = !S.whatsapp;
    dw.href = "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(t("waMsg") + " " + id);
    const dm = $("#doneMs"), mid = String(S.messenger || "").trim().replace(/^https?:\/\/(www\.)?(m\.me|facebook\.com|fb\.com)\//i, "").replace(/\/+$/, "");
    dm.hidden = !mid; dm.href = "https://m.me/" + encodeURIComponent(mid);
    const df = $("#doneFb"); df.hidden = !mid; df.href = "https://www.facebook.com/" + encodeURIComponent(mid);
    lastId = id; lastOrder = snap; renderInvoice(); applyDoneTexts();
    $("#cartBody").hidden = true; $("#done").hidden = false;
  }

  /* إرسال الطلب */
  /* اقتراحات المدن والمناطق أثناء الكتابة (تعمل على الجوال) */
  const match = (c, q) => {
    const a = norm(c.ar), e = norm(c.en);
    if (a.startsWith(q) || e.startsWith(q)) return 0;
    if (a.includes(q) || e.includes(q)) return 1;
    return -1;
  };
  function setupSuggest(inp, box, getItems, other) {
    const render = () => {
      const q = norm(inp.value);
      const list = getItems().map((c) => ({ c, s: q ? match(c, q) : 0 })).filter((x) => x.s >= 0).sort((a, b) => a.s - b.s).slice(0, 40);
      box.innerHTML = list.map(({ c }) => `<button type="button" class="sug-i" data-v="${esc(c[lang] || c.ar)}"${c.isLocal ? ' data-local="1"' : ""}><span>${esc(c[lang] || c.ar)}</span><small>${c.isLocal ? t("pickArea") : money(+c.price || 0)}</small></button>`).join("");
      box.hidden = !list.length;
    };
    inp.addEventListener("focus", render);
    inp.addEventListener("input", () => { if (inp.value.trim()) other.value = ""; render(); renderTotals(); });
    inp.addEventListener("blur", () => setTimeout(() => { box.hidden = true; renderTotals(); }, 180));
    box.addEventListener("pointerdown", (e) => {
      const b = e.target.closest(".sug-i");
      if (!b) return;
      e.preventDefault();
      if (b.dataset.local) { inp.value = ""; box.hidden = true; renderTotals(); other.focus(); return; }
      inp.value = b.dataset.v; other.value = ""; box.hidden = true; inp.blur(); renderTotals();
    });
  }
  setupSuggest($("#city"), $("#citySug"), () => shownCities().concat(areas().length ? [{ ar: loc().name.ar, en: loc().name.en, price: 0, isLocal: true }] : []), $("#area"));
  setupSuggest($("#area"), $("#areaSug"), areas, $("#city"));

  /* طريقة الدفع */
  const PAYS = [{ id: "cash", ar: "كاش", en: "Cash" }, { id: "transfer", ar: "تحويل", en: "Bank transfer" }, { id: "mobi", ar: "موبي كاش", en: "Mobi Cash" }];
  let payVal = "";
  function updatePayNote() {
    const n = $("#payNote");
    n.hidden = !(payVal === "transfer" || payVal === "mobi");
    n.textContent = t("payNote");
  }
  function renderPay() {
    $("#payOpts").innerHTML = PAYS.map((p) => `<label class="po"><input type="radio" name="pay" value="${p.id}" required ${payVal === p.id ? "checked" : ""}><span>${p[lang]}</span></label>`).join("");
    document.querySelectorAll("input[name=pay]").forEach((r) => (r.onchange = () => { payVal = r.value; updatePayNote(); }));
    updatePayNote();
  }
  $("#orderForm").onsubmit = (e) => {
    e.preventDefault();
    if (!cart.length) return toast(t("cartEmpty"));
    const f = new FormData(e.target);
    const phone = String(f.get("phone") || "").trim();
    const city = String(f.get("city") || "").trim();
    const area = String(f.get("area") || "").trim();
    const addr = String(f.get("address") || "").trim();
    const payId = String(f.get("pay") || "");
    if (phone.replace(/\D/g, "").length < 7) return toast(t("phoneBad"));
    if (!city && !area) return toast(areas().length ? t("needPlace").replace("{c}", localName()) : t("needCity"));
    if (deliveryInfo().kind === "needArea") return toast(t("needAreaHint").replace("{c}", localName()));
    if (!addr) return toast(t("needAddr"));
    if (!payId) return toast(t("needPay"));
    const d = deliveryInfo(), priced = d.kind === "city" || d.kind === "other", sub = subtotal();
    if (ordersOn()) {
      submitOrder(e.target, { phone, name: String(f.get("name") || "").trim(), city, area, addr, payId, note: String(f.get("note") || "").trim(), hp: String(f.get("website") || ""), d, priced, sub });
      return;
    }
    const lines = cart.map((i) => `• ${prod(i.id).name[lang]} | ${t("size")}: ${i.size}${i.color ? ` | ${t("colorL")}: ${i.color}` : ""} | x${i.qty} | ${money(prod(i.id).price * i.qty)}`).join("\n");
    const msg = `*${S.name[lang]} - ${t("order")}* 🎀\n` +
      (f.get("name") ? `${t("customer")}: ${f.get("name")}\n` : "") +
      `${t("tel")}: ${phone}\n` +
      (area ? `${t("cityL")}: ${localName()}\n${t("areaL")}: ${area}\n` : `${t("cityL")}: ${city}\n`) +
      `${t("addr")}: ${addr}\n${t("payL")}: ${(PAYS.find((p) => p.id === payId) || {})[lang] || payId}\n` +
      `\n${t("items")}:\n${lines}\n\n${t("subtotal")}: ${money(sub)}\n${t("delivery")}: ${priced ? delText(d) : t("delLater")}\n` +
      `*${d.kind === "ask" ? t("totalNoDel") : t("total")}: ${money(sub + (priced ? d.price : 0))}*` +
      (f.get("note") ? `\n${t("noteL")}: ${f.get("note")}` : "");
    window.open("https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(msg), "_blank");
  };

  $("#copyId").onclick = async () => {
    try { await navigator.clipboard.writeText(lastId); }
    catch (e) { const ta = document.createElement("textarea"); ta.value = lastId; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e2) {} ta.remove(); }
    toast(t("copied"));
  };
  $("#doneMs").addEventListener("click", async () => { try { await navigator.clipboard.writeText(lastId); toast(t("pasteIt")); } catch (e) {} });
  const wa = "https://wa.me/" + S.whatsapp;
  $("#waLink").href = wa; $("#waFloat").href = wa;
  $("#langBtn").onclick = () => { lang = lang === "ar" ? "en" : "ar"; try { localStorage.setItem("lang", lang); } catch (e) {} applyLang(); };
  $("#cartBtn").onclick = () => { $("#done").hidden = true; $("#cartBody").hidden = false; $("#drawer").hidden = false; };
  $("#doneBtn").onclick = () => { $("#done").hidden = true; $("#cartBody").hidden = false; $("#drawer").hidden = true; };
  $("#closeCart").onclick = () => ($("#drawer").hidden = true);
  $("#drawer").onclick = (e) => { if (e.target.id === "drawer") $("#drawer").hidden = true; };
  $("#search").oninput = (e) => { q = e.target.value; renderGrid(); };
  $("#sortSel").onchange = (e) => { sortBy = e.target.value; renderGrid(); };
  $("#sizeSel").onchange = (e) => { sizeF = e.target.value; renderGrid(); };

  /* تذكّر بيانات الزبونة على جهازها */
  const CUST = "brideCust";
  function saveCust(v) { try { localStorage.setItem(CUST, JSON.stringify({ phone: v.phone, name: v.name, city: v.city, area: v.area, addr: v.addr, payId: v.payId })); } catch (e) {} }
  function prefill() {
    let c = null; try { c = JSON.parse(localStorage.getItem(CUST) || "null"); } catch (e) {}
    $("#forgetMe").hidden = !c; if (!c) return;
    const E = $("#orderForm").elements;
    E["phone"].value = c.phone || ""; E["name"].value = c.name || ""; E["city"].value = c.city || ""; E["area"].value = c.area || ""; E["address"].value = c.addr || "";
    payVal = c.payId || ""; renderPay(); updatePlaceUI(); renderTotals();
  }
  $("#forgetMe").onclick = () => {
    try { localStorage.removeItem(CUST); } catch (e) {}
    $("#orderForm").reset(); payVal = ""; renderPay(); updatePlaceUI(); renderTotals(); $("#forgetMe").hidden = true; toast(t("forgot"));
  };

  /* تثبيت الموقع كتطبيق */
  let deferredInstall = null;
  const standalone = () => (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone;
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferredInstall = e; if (!standalone()) $("#installBtn").hidden = false; });
  window.addEventListener("appinstalled", () => ($("#installBtn").hidden = true));
  if (/iphone|ipad|ipod/i.test(navigator.userAgent) && !standalone()) $("#installBtn").hidden = false;
  $("#installBtn").onclick = async () => {
    if (deferredInstall) { deferredInstall.prompt(); try { await deferredInstall.userChoice; } catch (e) {} deferredInstall = null; $("#installBtn").hidden = true; }
    else alert(t("iosHint"));
  };
  if ("serviceWorker" in navigator && /^https?:/.test(location.protocol)) navigator.serviceWorker.register("sw.js").catch(() => {});

  prefill();
  applyLang();
  try { const pid = +new URLSearchParams(location.search).get("p"); if (pid && prod(pid)) openProduct(pid); } catch (e) {}
})();
