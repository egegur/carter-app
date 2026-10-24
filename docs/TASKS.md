# Sıradaki işler

Sıra önemli: üstteki işler alttakilerin önünü açar. Her madde ayrı dal + PR.
Taklit edilen yerlerin tam listesi: `grep -rn "MOCK:\|TODO(" src`

## 0. Mac'te kurulum (ilk gün)

- [ ] Repoyu klonla, `npm install`, `npx expo start` → telefonda Expo Go ile aç, tüm akışı gez.
- [ ] `npx expo-doctor` çalıştır, uyarı varsa düzelt.
- [ ] GitHub Actions: her PR'da `npm run typecheck` + `npm run lint`.
- [ ] EAS projesi: `npx eas-cli@latest init`, `eas.json` (development / preview / production profilleri).

## 1. Temel altyapı

- [x] **Kalıcı durum**: kurulum, hedefler ve günün işleri telefonda saklanıyor (AsyncStorage, `carter:state:v1`). Gün değişince işler hedeflerden yeniden oluşuyor. Profil → "Verilerimi sil ve baştan başla".
- [ ] **Sunucu seçimi ve kurulum** (öneri: Supabase): tablolar — users, goals, tasks, daily_plans, reports, streaks, challenges.
- [ ] **Kimlik**: Apple ile giriş, Google ile giriş, e-posta. "Hesabım var, giriş yap" ayrı ekran.
- [ ] `src/data/mock.ts` yerine API istemcisi; ekranlar aynı kalsın.

## 2. Koç (sunucu)

- [ ] Koç servisi: LLM orkestrasyonu, ton (Yumuşak/Samimi/Sert), kullanıcı başı günlük limit, Türkçe doğal cümle (ör. "Saat 09:30 olunca ofiste rapor taslağına başlayacağım").
- [ ] Sohbet ekranını servise bağla (`src/app/chat.tsx`).
- [ ] Haftalık özet ve "gelecek hafta önerisi" üretimi.
- [ ] Yapay zekâ sağlayıcı testi (Türkçe kalite + maliyet).

## 3. Günlük döngünün gerçek hâli

- [ ] **Bildirimler** (`expo-notifications`): sabah planı, hesap randevusu, akşam hesabı; bildirimden doğru ekrana derin link.
- [ ] **Ses kaydı** (`expo-audio`): neden çapası, en fazla 25 sn, sadece cihazda (`src/app/onboarding/why.tsx`).
- [ ] **Kamera kanıtı** (`expo-camera`): sadece anlık çekim, cihaz içi uygunsuz içerik kontrolü (`src/app/proof.tsx`).
- [ ] Odak seansı arka plana geçince süre doğru kalsın (bitiş zamanını sakla, kalan süreyi ondan hesapla).
- [ ] Sabah planında saat alanı serbest metin; native saat seçiciye geçir.
- [ ] Günlük işleri hedeflerin sıklığına göre üret (bugün o hedefin günü mü?). Şu an kurulum sonunda her hedeften bir iş oluşuyor.
- [ ] Profil → İzinler ekranı: verilen izinleri ve açık rızayı göster, geri alma.
- [ ] Kaçırma sebeplerini ve hesap cevaplarını sunucuya kaydet.

## 4. Native modül (`modules/carter-native`)

- [ ] Expo Module iskeleti: `npx create-expo-module@latest --local carter-native`.
- [ ] **Apple'a Family Controls (Distribution) entitlement başvurusu** — onay süresi uzun olabilir, erken başla.
- [ ] iOS: FamilyControls izni + FamilyActivityPicker (araç kutusundaki "Uygulama seç").
- [ ] iOS: DeviceActivityMonitor + ShieldConfiguration + ShieldAction uzantıları (engel ekranı tasarımı: tasarım tuvalindeki "Shield").
- [ ] iOS: odak seansı için Live Activity (kilit ekranı tasarımı: "LockScreen").
- [ ] Android: UsageStats izni, frenleme overlay'i, odak için sürekli bildirim.
- [ ] HealthKit / Health Connect adım sayısı (izinler ekranı).
- [ ] App Group'a önceden hazırlanmış Carter metinlerini yazma.

## 5. Gelir

- [ ] RevenueCat + mağaza ürünleri (yıllık / aylık, 1 ay deneme). Fiyatları sabit metinden kaldır (`src/app/onboarding/paywall.tsx`).
- [ ] Deneme bitmeden 1 gün önce hatırlatma bildirimi.

## 6. Sosyal

- [ ] Davet linki + derin link (düello, takım serisi). Şu an sadece paylaşım metni var.
- [ ] Düello / takım serisi / topluluk verisini sunucudan al.
- [ ] Arkadaşa "cesaret mesajı" bildirimi.
- [ ] Topluluk: bildir → moderasyon kuyruğu; topluluk kuralları metnini avukat kontrolüne ekle.
- [ ] İsimlere gelen ekler ("Ayşe'ye") için yardımcı fonksiyon (ünlü uyumu).

## 7. Profil ve ayarlar

- [ ] Alt ekranlar: hedeflerim, neden + ton, araç kutusu, saatler, abonelik, izinler, gizlilik ve verilerim (veri silme dahil), yardım.

## 8. Karakter ve cilalama

- [ ] Carter animasyonu (Rive veya Lottie) — `src/components/carter.tsx` içindeki `CarterAvatar` değişecek, ekranlar değişmeyecek.
- [ ] Uygulama ikonu ve açılış ekranı (şu an Expo varsayılanı).
- [ ] Ana akışlar için testler (jest-expo + Testing Library): kurulum, sıradaki iş → hesap, kaçırma.
- [ ] Yayından önce: avukat kontrolü (KVKK, kullanım şartları, aydınlatma metni). Taslaklar `src/content/legal.ts`; doldurulacak alanlar: [ŞİRKET UNVANI], [SAĞLAYICI LİSTESİ], [SÜRE], [E-POSTA ADRESİ], [YAŞ SINIRI]. Taslak uyarı kartı `src/app/legal/[doc].tsx` içinden kaldırılacak.
- [ ] Açık rıza kaydı: kullanıcının rıza verdiği metin sürümü ve tarih sunucuda saklanmalı (ispat yükü veri sorumlusunda).
