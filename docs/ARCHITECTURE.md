# Mimari

## İlke: ince istemci, akıllı sunucu

Koçun "beyni" (mesaj üretimi, ton, plan önerisi, haftalık özet) **sunucuda** yaşar. Uygulama sadece gösterir, veri toplar ve native tetikleyicileri çalıştırır. Böylece:

- Koçu güncellemek için mağaza onayı beklemeyiz.
- Yapay zekâ anahtarları uygulamada bulunmaz.
- iOS ve Android aynı koçla konuşur.

```
[Uygulama (Expo / React Native)]
   ├─ Ekranlar (src/app)            → sadece arayüz
   ├─ Durum + API istemcisi         → sunucuyla konuşur
   └─ modules/carter-native         → tek native modül (Swift + Kotlin)
          ├─ iOS: FamilyControls, DeviceActivityMonitor, ShieldConfiguration/ShieldAction uzantıları, HealthKit
          └─ Android: UsageStats, overlay, Health Connect
                    ▲
                    │ App Group / paylaşılan depolama: önceden hazırlanmış Carter metinleri
                    │ (uzantılar ağa çıkmadan okur)
[Sunucu]
   ├─ Kimlik (Apple / Google / e-posta)
   ├─ Veritabanı (hedef, iş, plan, seri, challenge)
   ├─ Koç servisi (LLM orkestrasyonu, kullanıcı başı günlük limit)
   ├─ Bildirim zamanlayıcı (sabah planı, hesap randevusu, akşam hesabı)
   └─ Moderasyon kuyruğu (topluluk bildirimleri)
```

Sunucu seçimi: Supabase veya Firebase (karar bekliyor; öneri Supabase — Postgres, Edge Functions, kimlik hazır).

## Uygulama tarafı (bugünkü durum)

- Expo SDK 58, React Native 0.88, React 19, TypeScript strict, React Compiler açık.
- Yönlendirme: expo-router, typed routes. Native alt sekmeler: `expo-router/native-tabs` (web'de `_layout.web.tsx` ile JS sekmeleri).
- Yazı: Plus Jakarta Sans (`@expo-google-fonts/plus-jakarta-sans`, `useFonts`).
- İkonlar: `expo-symbols` (iOS SF Symbols, Android/web Material Symbols). Liste: `src/components/icon.tsx`.
- Durum: `src/state/app-store.ts` — `useSyncExternalStore` ile küçük bir store. Şimdilik bellekte; kalıcı değil.
- Kurulum koruması: `Stack.Protected` — kurulum bitmeden sekmelere gidilemez.

## Ekran haritası

| Grup | Rota | Ekran |
|---|---|---|
| Kurulum | `/onboarding` | Karşılama |
| | `/onboarding/signup` | Kayıt + doğum yılı |
| | `/onboarding/category` | Adım 1: alan |
| | `/onboarding/goal` | Adım 2: hedef, sıklık, en küçük adım |
| | `/onboarding/why` | Adım 3: neden çapası + ton |
| | `/onboarding/permissions` | Adım 4: izinler |
| | `/onboarding/toolbox` | Adım 5: araç kutusu |
| | `/onboarding/paywall` | Deneme ve abonelik |
| Sekmeler | `/` | Bugün |
| | `/challenges` | Challenge |
| | `/progress` | İlerleme |
| | `/profile` | Profil |
| Günlük | `/checkin` | Sabah planı |
| | `/focus?id&minutes` | Odak seansı |
| | `/report?id&proof&minutes` | Hesap verme |
| | `/proof?id` | Fotoğraf kanıtı |
| | `/missed?id` | Kaçırma anı |
| | `/day-close` | Akşam hesabı |
| | `/chat` | Carter ile sohbet |
| Challenge | `/duel`, `/team-streak`, `/community` | Düello, takım serisi, topluluk |
| İlerleme | `/weekly` | Haftalık özet |
| Uygulama dışı | — | Kilit ekranı / bildirim (Live Activity), Shield (engel ekranı): **native**, React Native değil |

## Native parçalar (plan)

- **iOS Screen Time**: `FamilyControls` (izin + uygulama seçimi), `DeviceActivityMonitor` uzantısı (süre aşımı), `ShieldConfiguration` + `ShieldAction` uzantıları (engel ekranı ve "5 dakika işe dön"). Dağıtım için Apple'dan **Family Controls entitlement** başvurusu gerekir.
- **iOS kilit ekranı**: odak seansı için Live Activity (ActivityKit).
- **Android**: `UsageStatsManager` + erişilebilirlik/overlay ile frenleme ekranı; odak için sürekli bildirim.
- **Sağlık**: HealthKit / Health Connect adım sayısı.
- Bildirim sesi özel olacaksa 30 saniyeden kısa olmalı.
- Uzantılar ağa çıkmaz; gösterecekleri Carter metinlerini uygulama App Group'a önceden yazar.

## Kurallar

- Expo SDK sabit; yılda 1–2 kez, ayrı PR ile yükseltilir.
- Kritik native parçaları kendimiz yazarız; az bakılan üçüncü parti native kütüphanelere bağlanmayız.
- Tek bileşen seti (`src/components`). Ana akışlar için test.
