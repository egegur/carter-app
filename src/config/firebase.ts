/**
 * Firebase proje kimlikleri (Firebase konsolu → Proje ayarları → Web uygulaması).
 * Bunlar gizli anahtar DEĞİLDİR; her web/mobil uygulamada açıkça bulunur.
 * Güvenliği Firestore kuralları sağlar: firestore.rules.
 * Gerçek gizli anahtarlar (yapay zekâ vb.) asla buraya yazılmaz; sunucuda (Cloud Functions) durur.
 */
export const firebaseConfig = {
  apiKey: 'AIzaSyD3ZiHXNYxWk_s7TxNNm_PoeAbFS2B9WrA',
  authDomain: 'carter-d3718.firebaseapp.com',
  projectId: 'carter-d3718',
  storageBucket: 'carter-d3718.firebasestorage.app',
  messagingSenderId: '554582089036',
  appId: '1:554582089036:web:15af29ed204c126f9c03e9',
  // measurementId (Analytics) bilerek eklenmedi: Analytics kullanmıyoruz.
};

/** Değerler girilmeden uygulama çevrimdışı (sadece telefonda) çalışmaya devam eder. */
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
