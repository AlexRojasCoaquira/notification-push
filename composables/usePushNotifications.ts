import { getToken, onMessage } from "firebase/messaging";
import type { MessagePayload, Messaging } from "firebase/messaging";
import axios from "axios"

interface Notification {
  title: string;
  body: string;
  image?: string;
  token?: string,
  topic?: string
}

export function useFirebaseMessaging() {
  const nuxtApp = useNuxtApp();
  const $messaging = nuxtApp.$messaging as Messaging | null
  const vapidKey = "BGKjMcyZmCL5C7PD3lVS5sjhDdjwHi5VNZFfBlIqmPXT2ylLswTaIHNlYhxq61rFnKIGmHw2VwdpaVGE0YReZzE";
  const getTokenNotification = async (): Promise<string> => {
    if (!$messaging) throw new Error("Firebase Messaging no está disponible.");
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') throw new Error('Permiso denegado')
    // const reg = await navigator.serviceWorker.getRegistration();
    const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

    if (!reg) throw new Error('Service Worker no registrado')

    const token = await getToken($messaging, {
      vapidKey,
      serviceWorkerRegistration: reg,
    });

    console.log('📲 Token FCM:', token);
    return token;
  };

  const sendPushNotification = async(payload: Notification) => {
    try {
      const { topic, title, body, image, token } = payload;
      const data = {
        topic,
        data: {
          title,
          body,
          image,
        },
        token
      }
      const url = `https://notification-api-production-1ded.up.railway.app/send-topic`;
      const res = await axios.post(url, data);
      console.log("✅ Notificación enviada:", res.data)
    } catch (err) {
      console.error("❌ Error al enviar notificación:", err)
    }
  };

  const listenForMessages = async () => {
    if (!$messaging) return;
    if (document.visibilityState === 'visible') {
      onMessage($messaging, async(payload: MessagePayload) => {
        console.log('📬 Mensaje recibido:', payload)
        const title = payload.data?.title || "Notificación";
        const body = payload.data?.body || "";
        const image = payload.data?.image || "";
        const reg = await navigator.serviceWorker.getRegistration();
        if (!reg) throw new Error('Service Worker no registrado')
        console.log('MENSAJES EN PRIMER PLANO')
        reg.showNotification(title, {
          body,
          icon: image,
          data: payload.data,
        });
      });
    }
  }
  const suscribeToTopic = async (topic: string, token: string, unsuscribe = '1') => {
    try {
      const url = `https://notification-api-production-1ded.up.railway.app/suscribe?suscribe=${unsuscribe}`;
      const payload = {
        topic,
        token
      };
      const res = await axios.post(url, payload);
      console.log("✅ Suscripción exitosa:", res);
      return res.data;
    } catch (err) {
      console.error("❌ Error al enviar notificación:", err);
    }
  };

  return {
    getTokenNotification,
    sendPushNotification,
    suscribeToTopic,
    listenForMessages,
  }
}

