export default defineNuxtPlugin(() => {
  if ("serviceWorker" in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register("/firebase-messaging-sw.js")
        .then(reg => console.log("✅ Service Worker registrado:", reg))
        .catch(err => console.error("❌ Error registrando Service Worker:", err));
    });
  }
})
// REGISTRAR EL WORKER
