import { getToken, onMessage } from "firebase/messaging";
import type { MessagePayload, Messaging } from "firebase/messaging";
import axios from "axios"

interface Notification {
  title: string;
  body: string;
  image?: string;
  topic: string
}

export function useFirebaseMessaging() {
  const nuxtApp = useNuxtApp();
  const $messaging = nuxtApp.$messaging as Messaging | null
  //   const pushExample = async (): Promise<string> => {
  //   const nuxtApp = useNuxtApp();
  //   const $messaging = nuxtApp.$messaging as Messaging | null

  //   const vapidKey = "BGKjMcyZmCL5C7PD3lVS5sjhDdjwHi5VNZFfBlIqmPXT2ylLswTaIHNlYhxq61rFnKIGmHw2VwdpaVGE0YReZzE";
  //   if (!$messaging) throw new Error("Firebase Messaging no está disponible.");

  //   const permission = await Notification.requestPermission()
  //   if (permission !== 'granted') throw new Error('Permiso denegado')
  //   // const reg = await navigator.serviceWorker.getRegistration();
  //   const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

  //   if (!reg) throw new Error('Service Worker no registrado')

  //   const token = await getToken($messaging, {
  //     vapidKey,
  //     serviceWorkerRegistration: reg,
  //   });

  //   console.log('📲 Token FCM:', token);

  //   onMessage($messaging, (payload: MessagePayload) => {
  //     console.log('📬 Mensaje recibido:', payload)
  //     const { title, body, image } = payload.notification || {}
  //     const data = payload.data || {}

  //     reg.showNotification(title || 'Notificación', {
  //       body,
  //       data,
  //       icon: image,
  //       actions: [
  //         { action: "view", title: "Ver evento" },
  //         { action: "dismiss", title: "No me interesa" },
  //       ],
  //     } as NotificationOptions)
  //   });

  //   return token;
  // };
  const getTokenNotification = async (): Promise<string> => {

    const vapidKey = "BGKjMcyZmCL5C7PD3lVS5sjhDdjwHi5VNZFfBlIqmPXT2ylLswTaIHNlYhxq61rFnKIGmHw2VwdpaVGE0YReZzE";
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
      console.log('payload', payload)
      const { topic, title, body, image } = payload;
      const data = {
        topic,
        data: {
          title,
          body,
          image,
        }
      }
      const url = `https://notification-api-production-1ded.up.railway.app/send-topic`;
      const res = await axios.post(url, data);
      console.log("✅ Notificación enviada:", res.data)
    } catch (err) {
      console.error("❌ Error al enviar notificación:", err)
    }
  };

  const suscribeToTopic = async (topic: string, token: string, unsuscribe = '1') => {
    try {
      const url = `https://notification-api-production-1ded.up.railway.app/suscribe?${unsuscribe}`;
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
    // pushExample,
  }
}

