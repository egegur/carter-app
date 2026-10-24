@AGENTS.md

# Carter — Claude Code çalışma kuralları

Koç Carter: ertelenen günlük işleri bitirten, Türkçe konuşan yapay zekâ koçu. iOS ve Android aynı anda çıkacak.
Ürün kararları: `docs/PRODUCT.md` · Mimari: `docs/ARCHITECTURE.md` · Sıradaki işler: `docs/TASKS.md`

## Komutlar

```bash
npm install
npx expo start          # Expo Go veya dev build ile aç
npm run typecheck       # tsc --noEmit
npm run lint            # expo lint (ESLint)
npm run test:rules      # metin kuralları testi (scripts/test-validation.mts)
npx expo run:ios        # native modül eklendikten sonra (Mac + Xcode)
```

Bir işi "bitti" demeden önce `npm run typecheck`, `npm run lint` ve `npm run test:rules` temiz geçmeli.

## Klasörler

- `src/app/` — sadece ekranlar (expo-router). `(tabs)/` alt sekmeler, `onboarding/` kurulum, diğerleri üstüne açılan ekranlar.
- `src/components/` — ortak bileşenler. Yeni ekran yazmadan önce buradakileri kullan.
- `src/theme/tokens.ts` — renk, yazı, boşluk, köşe. **Tek kaynak.**
- `src/state/app-store.ts` — geçici, bellekteki uygulama durumu.
- `src/data/mock.ts` — örnek veri. Sunucu gelince silinecek.
- `src/content/` — alanlar, sıklık seçenekleri, hukuki metinler (veri, ekran değil).
- `src/hooks/` — ekranlar arası ortak hook'lar (`useFormErrors`).
- `src/utils/` — saf yardımcılar (Türkçe sayı/ek biçimlendirme, metin kuralları).

## Kurallar

1. **Ekranlarda sabit renk (hex) veya `fontFamily` yazma.** `colors`, `fonts`, `space`, `radius` kullan; metin için `AppText`.
2. Her ekranda **tek bir ana (primary) buton** olur. Diğerleri `secondary` / `ghost`.
3. Dokunma alanı en az 44 pt (`minTouch`). Dokunulabilir her şeye `accessibilityRole` ve gerekiyorsa `accessibilityLabel` ver.
4. Arayüz metni Türkçe, kısa ve suçlamasız. Carter cezalandırmaz; kaçırmada en küçük adımı önerir.
5. Sayıya ek gelen yerlerde `withPossessiveAccusative` gibi yardımcıları kullan ("2'sini", "11'ini"). Ekleri elle birleştirme.
6. `useAppState` seçicileri **yeni dizi/nesne üretmemeli** (`filter`, `map`, `{...}` seçicinin içinde değil, dışında). Aksi hâlde sonsuz render olur.
7. Sunucu/native gerektiren ama şimdilik taklit edilen her yere `// MOCK:` yorumu koy. Liste: `grep -rn "MOCK:" src`.
8. Uygulamada **hiçbir gizli anahtar** (API key, LLM anahtarı) bulunmaz. Yapay zekâ çağrıları sunucudan yapılır.
9. `ios/` ve `android/` klasörlerini elle düzenleme; native ayar `app.json` + config plugin ile yapılır.
10. Native kod tek yerde: `modules/carter-native` (henüz yok, bkz. TASKS). Ekranlar native API'yi doğrudan çağırmaz, bu modülün TypeScript arayüzünü çağırır.
11. Kilit ekranı ve engel (Shield) ekranı React Native ekranı değildir; native uzantılarla yapılır (bkz. ARCHITECTURE).
12. **Serbest metin alanı = kural.** Kullanıcının yazdığı her alan `src/utils/validation.ts` içindeki `checkText` + `TEXT_RULES` ile kontrol edilir ("." veya "asdf" geçmez). Hatalar `useFormErrors` ile alan dışına çıkınca ya da butona basınca gösterilir; ana buton devre dışı bırakılmaz, basınca hatayı gösterir. Kuralı değiştirirsen `scripts/test-validation.mts` listesine örnek ekle ve `npm run test:rules` çalıştır.
13. Alana göre değişen her şey (yer tutucu metin, gereken izin, varsayılan kanıt türü) `src/content/categories.ts` içindedir; ekranlarda `if (category === ...)` yazma.
14. Hukuki metinler `src/content/legal.ts` içinde, **taslak**. Kişisel veri isteyen yeni bir izin eklersen aydınlatma metnini güncelle; sağlık gibi özel nitelikli veri için açık rıza onay kutusu (`ConsentCheck`, varsayılan işaretsiz) zorunlu.

## Çalışma şekli

- `main` dalına doğrudan commit yok. Her iş: yeni dal → PR → Claude incelemesi → birleştir.
- Bir PR tek bir işi yapar. Ekran değiştiyse PR açıklamasına ekran görüntüsü ekle.
- Expo SDK sürümü sabittir (şu an 58). Yükseltme yılda 1–2 kez, ayrı PR ile yapılır.
- `npx expo install` ağ hatası verirse (kısıtlı ortam), paketi `npm install` ile kur ve sürümü SDK ile uyumlu seç.
