import { getApps, initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'
import type { FirebaseApp } from 'firebase/app'
import type { Messaging } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyD53nwtoAiw7l-mTiuBXyCUGQay1WKZ60Y',
  authDomain: 'notification-6940d.firebaseapp.com',
  projectId: 'notification-6940d',
  storageBucket: 'notification-6940d.firebasestorage.app',
  messagingSenderId: '696752567839',
  appId: '1:696752567839:web:48ac2e3673989db2f2072a',
  measurementId: 'G-GRYMLD57LL'
}

export default defineNuxtPlugin(nuxtApp => {
  let messaging: Messaging | null = null;

  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    const apps = getApps();
    const app: FirebaseApp = apps.length ? apps[0] : initializeApp(firebaseConfig);
    messaging = getMessaging(app);
  }

  nuxtApp.provide('messaging', messaging)
})
