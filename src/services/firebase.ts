import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import * as FirebaseAuth from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { Platform } from 'react-native';

import { firebaseConfig, isFirebaseConfigured } from '@/config/firebase';

/**
 * Firebase bağlantısı (JS SDK — Expo Go'da da çalışır).
 * Ekranlar Firebase'i doğrudan çağırmaz; bu dosyadaki ve ileride eklenecek servis fonksiyonlarını kullanır.
 */

type Services = { app: FirebaseApp; auth: FirebaseAuth.Auth; db: Firestore };
let services: Services | null = null;

// getReactNativePersistence sadece React Native derlemesinde var; web tiplerinde yok.
const { getReactNativePersistence } = FirebaseAuth as unknown as {
  getReactNativePersistence: (storage: typeof AsyncStorage) => FirebaseAuth.Persistence;
};

/** Yapılandırılmışsa Firebase servislerini döner; değilse null (uygulama yerel modda kalır). */
export function firebase(): Services | null {
  if (!isFirebaseConfigured) return null;
  if (services) return services;
  const alreadyInitialized = getApps().length > 0;
  const app = alreadyInitialized ? getApp() : initializeApp(firebaseConfig);
  // Oturum telefonda saklansın: uygulama kapanınca çıkış yapılmasın.
  const auth =
    Platform.OS === 'web' || alreadyInitialized
      ? FirebaseAuth.getAuth(app)
      : FirebaseAuth.initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
  services = { app, auth, db: getFirestore(app) };
  return services;
}
