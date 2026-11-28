// استقبال طلبات موقع برايد في جدول Google
// الطريقة مشروحة في ملف: طريقة-استقبال-الطلبات.txt
// الصقي هذا الكود كما هو، وغيّري فقط الإعدادات (CONFIG) في الأسفل.

const CONFIG = {
  SHEET_NAME: "الطلبات",
  EMAIL: "",               // اكتبي إيميلك بين علامتي التنصيص لتصلك رسالة عند كل طلب (اختياري)
  TELEGRAM_BOT_TOKEN: "",  // اختياري: رمز بوت تيليغرام
  TELEGRAM_CHAT_ID: "",    // اختياري: رقم المحادثة
  ATTACH_PDF: false        // true = يرفق مع الإيميل ملف PDF للفاتورة (جرّبيه، وإن ظهرت الحروف العربية غير سليمة فأعيديه false)
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

    notify_(o, itemsText, delivery, total, when);
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

function esc_(v) {
  return String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// فاتورة مرتبة بصيغة HTML (تُطبع مباشرة من الإيميل)
function invoiceHtml_(o, when, delivery, total) {
  const cur = esc_(o.currency || "");
  const place = [clip_(o.city), clip_(o.area)].filter(function (x) { return x; }).join(" - ");
  const info = [["الاسم", o.name], ["الهاتف", o.phone], ["المدينة / المنطقة", place], ["العنوان", o.address], ["طريقة الدفع", o.pay]]
    .filter(function (x) { return x[1]; })
    .map(function (x) { return '<tr><td style="color:#9a7a87;padding:4px 0;width:35%">' + x[0] + '</td><td style="font-weight:bold;padding:4px 0">' + esc_(clip_(x[1])) + '</td></tr>'; }).join("");
  const rows = o.items.map(function (i) {
    return '<tr><td style="padding:8px 0;border-bottom:1px solid #fbe3ea"><b>' + esc_(clip_(i.name)) + '</b><br><span style="color:#9a7a87;font-size:13px">المقاس: ' + esc_(clip_(i.size)) +
      (i.color ? " · اللون: " + esc_(clip_(i.color)) : "") + '</span></td><td style="text-align:center;border-bottom:1px solid #fbe3ea;color:#9a7a87">×' + Number(i.qty) +
      '</td><td style="text-align:left;border-bottom:1px solid #fbe3ea;font-weight:bold;white-space:nowrap">' + Number(i.total) + " " + cur + '</td></tr>';
  }).join("");
  return '<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;max-width:560px;margin:auto;border:2px solid #f7b6c8;border-radius:16px;overflow:hidden;color:#3d2230">' +
    '<div style="background:#ffe3ea;padding:16px 20px"><div style="font-size:22px;font-weight:bold;color:#d9506e">' + (o.test ? "[تجريبي] " : "") + 'فاتورة طلب — ' + esc_(clip_(o.site || "برايد")) + '</div>' +
    '<div style="margin-top:6px;font-weight:bold">رقم الطلب: <span dir="ltr">' + esc_(o.id) + '</span></div>' +
    '<div style="color:#8a6a77">التاريخ: <span dir="ltr">' + esc_(when) + '</span></div></div>' +
    '<div style="padding:12px 20px"><div style="color:#d9506e;font-weight:bold;margin-bottom:4px">بيانات الطلب</div><table style="width:100%;border-collapse:collapse">' + info + '</table></div>' +
    '<div style="padding:4px 20px 12px;border-top:1px dashed #f7b6c8"><div style="color:#d9506e;font-weight:bold;margin:8px 0 2px">المنتجات</div><table style="width:100%;border-collapse:collapse">' + rows + '</table>' +
    '<table style="width:100%;margin-top:8px;border-collapse:collapse"><tr><td>مجموع المنتجات</td><td style="text-align:left;font-weight:bold">' + Number(o.subtotal) + " " + cur + '</td></tr>' +
    '<tr><td>التوصيل</td><td style="text-align:left;font-weight:bold">' + esc_(delivery) + '</td></tr>' +
    '<tr><td style="font-size:18px;font-weight:bold;color:#d9506e;border-top:2px solid #f7b6c8;padding-top:8px">الإجمالي</td><td style="text-align:left;font-size:18px;font-weight:bold;color:#d9506e;border-top:2px solid #f7b6c8;padding-top:8px">' + esc_(total) + '</td></tr></table></div>' +
    (o.note ? '<div style="padding:8px 20px 12px;border-top:1px dashed #f7b6c8"><div style="color:#d9506e;font-weight:bold">ملاحظات</div>' + esc_(clip_(o.note)) + '</div>' : "") +
    '<div style="background:#fff8fa;padding:10px;text-align:center;color:#8a6a77;font-size:13px">جدول الطلبات: <a href="' + esc_(SpreadsheetApp.getActiveSpreadsheet().getUrl()) + '">افتحيه من هنا</a></div></div>';
}

function notify_(o, itemsText, delivery, total, when) {
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
    try {
      const html = invoiceHtml_(o, when, delivery, total);
      const mail = { to: CONFIG.EMAIL, subject: (o.test ? "[تجريبي] " : "") + "طلب جديد " + o.id + " — " + clip_(o.phone), body: text, htmlBody: html };
      if (CONFIG.ATTACH_PDF) {
        try { mail.attachments = [Utilities.newBlob("<meta charset='utf-8'>" + html, "text/html", "invoice.html").getAs("application/pdf").setName("فاتورة-" + o.id + ".pdf")]; } catch (e3) {}
      }
      MailApp.sendEmail(mail);
    } catch (e) {
      try { MailApp.sendEmail({ to: CONFIG.EMAIL, subject: "طلب جديد " + o.id, body: text }); } catch (e4) {}
    }
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
