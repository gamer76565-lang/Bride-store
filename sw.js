// خدمة بسيطة لتثبيت الموقع كتطبيق. لا تخزّن أي ملفات، فتبقى التحديثات تصل فورًا.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});
