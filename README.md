# Carter

Ertelenen günlük işleri bitirten Türkçe yapay zekâ koçu. Expo (React Native) ile iOS ve Android.

## Çalıştır

```bash
npm install
npx expo start
```

Telefonda **Expo Go** ile QR kodu okut. Native modüller eklendikten sonra: `npx expo run:ios` (Mac + Xcode) veya `npx expo run:android`.

## Kontrol

```bash
npm run typecheck
npm run lint
```

## Belgeler

- `CLAUDE.md` — kod kuralları (Claude Code bunu otomatik okur)
- `docs/PRODUCT.md` — ürün kararları
- `docs/ARCHITECTURE.md` — mimari ve ekran haritası
- `docs/TASKS.md` — sıradaki işler

Şu anki durum: 23 ekranın tamamı örnek veriyle çalışıyor; sunucu, bildirim, kamera, ses ve Ekran Süresi henüz bağlı değil (`docs/TASKS.md`).
