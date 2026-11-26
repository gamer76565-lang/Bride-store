// استقبال طلبات موقع برايد في جدول Google
// الطريقة مشروحة في ملف: طريقة-استقبال-الطلبات.txt
// الصقي هذا الكود كما هو، وغيّري فقط الإعدادات (CONFIG) في الأسفل.

const CONFIG = {
  SHEET_NAME: "الطلبات",
  EMAIL: "",               // اكتبي إيميلك بين علامتي التنصيص لتصلك رسالة عند كل طلب (اختياري)
  TELEGRAM_BOT_TOKEN: "",  // اختياري: رمز بوت تيليغرام
  TELEGRAM_CHAT_ID: ""     // اختياري: رقم المحادثة
};

const HEADERS = ["رقم الطلب", "التاريخ", "الحالة", "الهاتف", "الاسم", "المدينة", "المنطقة", "العنوان",
  "طريقة الدفع", "المنتجات", "مجموع المنتجات", "التوصيل", "الإجمالي", "ملاحظات"];

function doGet() {
  return out_({ ok: true, msg: "orders endpoint is running" });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const o = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (o.hp) return out_({ ok: true }); // روبوت: نتجاهله بصمت
    const err = validate_(o);
    if (err) return out_({ ok: false, error: err });

    const sh = sheet_();
    const last = sh.getLastRow();
    if (last > 1) {
      const ids = sh.getRange(2, 1, last - 1, 1).getValues().flat().map(String);
      if (ids.indexOf(String(o.id)) !== -1) return out_({ ok: true, id: o.id, duplicate: true });
    }

    const cur = o.currency || "";
    const itemsText = o.items.map(function (i) {
      return "• " + clip_(i.name) + " | المقاس: " + clip_(i.size) + (i.color ? " | اللون: " + clip_(i.color) : "") +
        " | x" + Number(i.qty) + " | " + Number(i.total) + " " + cur;
    }).join("\n");
    const delivery = (o.delivery === null || o.delivery === undefined) ? clip_(o.deliveryText || "يُحدد لاحقًا") : Number(o.delivery) + " " + cur;
    const total = Number(o.total) + " " + cur + (o.totalNote ? " (" + clip_(o.totalNote) + ")" : "");
    const when = Utilities.formatDate(new Date(), "Africa/Tripoli", "yyyy-MM-dd HH:mm");

    sh.appendRow([
      o.id, when, o.test ? "تجريبي" : "جديد", clip_(o.phone), clip_(o.name), clip_(o.city), clip_(o.area), clip_(o.address),
      clip_(o.pay), itemsText, Number(o.subtotal) + " " + cur, delivery, total, clip_(o.note)
    ].map(safe_));

    notify_(o, itemsText, delivery, total);
    return out_({ ok: true, id: o.id });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

function validate_(o) {
  if (!o || typeof o !== "object") return "bad request";
  if (!o.id || String(o.id).length > 40) return "bad id";
  if (String(o.phone || "").replace(/\D/g, "").length < 7) return "bad phone";
  if (!String(o.city || "").trim() && !String(o.area || "").trim()) return "missing city";
  if (!String(o.address || "").trim()) return "missing address";
  if (!Array.isArray(o.items) || o.items.length < 1 || o.items.length > 50) return "bad items";
  if (isNaN(Number(o.total)) || isNaN(Number(o.subtotal))) return "bad total";
  return "";
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sh) {
    // نستخدم أول ورقة إن كانت فارغة، وإلا ننشئ ورقة جديدة
    const first = ss.getSheets()[0];
    if (first && first.getLastRow() === 0) {
      sh = first;
      sh.setName(CONFIG.SHEET_NAME);
    } else {
      sh = ss.insertSheet(CONFIG.SHEET_NAME);
    }
  }
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#ffd6e1");
    sh.setFrozenRows(1);
    sh.getRange("A:A").setNumberFormat("@");
    sh.getRange("D:D").setNumberFormat("@");
    sh.getRange("J:J").setWrap(true);
    sh.setColumnWidth(10, 380);
    sh.setColumnWidth(8, 220);
    sh.setRightToLeft(true);
  }
  return sh;
}

function notify_(o, itemsText, delivery, total) {
  const text = (o.test ? "[تجريبي] " : "") + "🎀 طلب جديد " + o.id + "\n" +
    "الهاتف: " + clip_(o.phone) + (o.name ? "\nالاسم: " + clip_(o.name) : "") + "\n" +
    "المدينة: " + clip_(o.city) + (o.area ? "\nالمنطقة: " + clip_(o.area) : "") + "\n" +
    "العنوان: " + clip_(o.address) + "\n" +
    "الدفع: " + clip_(o.pay) + "\n\n" +
    itemsText + "\n\n" +
    "التوصيل: " + delivery + "\n" +
    "الإجمالي: " + total + (o.note ? "\nملاحظات: " + clip_(o.note) : "") +
    "\n\nجدول الطلبات: " + SpreadsheetApp.getActiveSpreadsheet().getUrl();

  if (CONFIG.EMAIL) {
    try { MailApp.sendEmail({ to: CONFIG.EMAIL, subject: "طلب جديد " + o.id, body: text }); } catch (e) {}
  }
  if (CONFIG.TELEGRAM_BOT_TOKEN && CONFIG.TELEGRAM_CHAT_ID) {
    try {
      UrlFetchApp.fetch("https://api.telegram.org/bot" + CONFIG.TELEGRAM_BOT_TOKEN + "/sendMessage", {
        method: "post",
        payload: { chat_id: CONFIG.TELEGRAM_CHAT_ID, text: text },
        muteHttpExceptions: true
      });
    } catch (e) {}
  }
}

function clip_(v) { return String(v == null ? "" : v).slice(0, 500); }
function safe_(v) { return (typeof v === "string" && /^[=+\-@]/.test(v)) ? "'" + v : v; }
function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// تشغيل يدوي لاختبار الإذن (اختياري): اضغطي Run على هذه الدالة مرة واحدة لمنح الصلاحيات
function authorize() {
  SpreadsheetApp.getActiveSpreadsheet();
  if (CONFIG.EMAIL) MailApp.getRemainingDailyQuota();
}
