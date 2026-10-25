/**
 * Firebase proje kimlikleri (Firebase konsolu → Proje ayarları → Web uygulaması).
 * Bunlar gizli anahtar DEĞİLDİR; her web/mobil uygulamada açıkça bulunur.
 * Güvenliği Firestore kuralları sağlar: firestore.rules.
 * Gerçek gizli anahtarlar (yapay zekâ vb.) asla buraya yazılmaz; sunucuda (Cloud Functions) durur.
 */
export const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

/** Değerler girilmeden uygulama çevrimdışı (sadece telefonda) çalışmaya devam eder. */
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
