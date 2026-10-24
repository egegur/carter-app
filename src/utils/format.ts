/**
 * Türkçe metin yardımcıları.
 */

/** 3812 → "3.812" (Intl'e bağlı kalmadan, her platformda aynı sonuç). */
export function formatNumber(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Sayının okunuşundaki son kelimeye göre belirtme hâli + iyelik eki ("2'sini", "3'ünü").
const ONES: Record<number, string> = {
  1: 'ini', // bir
  2: 'sini', // iki
  3: 'ünü', // üç
  4: 'ünü', // dört
  5: 'ini', // beş
  6: 'sını', // altı
  7: 'sini', // yedi
  8: 'ini', // sekiz
  9: 'unu', // dokuz
};
const TENS: Record<number, string> = {
  1: 'unu', // on
  2: 'sini', // yirmi
  3: 'unu', // otuz
  4: 'ını', // kırk
  5: 'sini', // elli
  6: 'ını', // altmış
  7: 'ini', // yetmiş
  8: 'ini', // seksen
  9: 'ını', // doksan
};

/** "14 işin 11'ini" kalıbı için: 11 → "11'ini", 2 → "2'sini", 0 → "hiçbirini". */
export function withPossessiveAccusative(n: number): string {
  const v = Math.abs(Math.trunc(n));
  if (v === 0) return 'hiçbirini';
  const ones = v % 10;
  const tens = Math.floor(v / 10) % 10;
  let suffix: string;
  if (ones !== 0) suffix = ONES[ones];
  else if (tens !== 0) suffix = TENS[tens];
  else if (v % 1000 === 0) suffix = 'ini'; // bin
  else suffix = 'ünü'; // yüz
  return `${v}'${suffix}`;
}

/** "18:42" biçiminde kalan süre. */
export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
}

/** Türkçe kurala göre büyük harf (i → İ, ı → I); cihazın dil ayarından bağımsız. */
export function trUpper(text: string): string {
  return text.replace(/i/g, 'İ').replace(/ı/g, 'I').toUpperCase();
}
