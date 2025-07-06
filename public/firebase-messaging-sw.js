importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyD53nwtoAiw7l-mTiuBXyCUGQay1WKZ60Y",
  authDomain: "notification-6940d.firebaseapp.com",
  projectId: "notification-6940d",
  storageBucket: "notification-6940d.firebasestorage.app",
  messagingSenderId: "696752567839",
  appId: "1:696752567839:web:48ac2e3673989db2f2072a",
  measurementId: "G-GRYMLD57LL",
};

self.firebase.initializeApp(firebaseConfig);
const messaging = self.firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  const { title, body, image, eventId } = payload.data;
  self.registration.showNotification(title, {
    body,
    icon: image,
    data: { eventId },
    actions: [
      { action: "view", title: "Ver evento" },
      { action: "dismiss", title: "No me interesa" }
    ],
  });
});
self.addEventListener("notificationclick", (event) => {
  console.log('🖱 Click en notificación:', event);
  const action = event.action;
  const data = event.notification.data || {};
  event.notification.close();

  if (action === 'view') {
    event.waitUntil(clients.openWindow(`/eventos/${data.eventId || '123'}`))
  } else if (action === 'dismiss') {
    event.waitUntil(clients.openWindow(`/no-interesa/${data.eventId || '123'}`))
  } else {
    event.waitUntil(clients.openWindow('/'));
  }
});
