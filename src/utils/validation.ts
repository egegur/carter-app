/**
 * Serbest metin alanları için "anlamlı metin" kuralları.
 * Amaç: "." ya da "asdf" yazıp geçilmesin; gerçek bir cümle istensin.
 * Saf fonksiyonlar; ekranlar sadece dönen hata mesajını gösterir.
 */

export type TextRule = {
  /** En az kaç kelime (2+ harfli). */
  minWords: number;
  /** En az kaç harf (rakam ve işaret sayılmaz). */
  minLetters: number;
  maxLength: number;
};

export const TEXT_RULES = {
  /** Kurulum: "Hedefin" — ör. "Her gün 25 dakika rapora çalışmak" */
  goal: { minWords: 2, minLetters: 8, maxLength: 80 },
  /** Kurulum: en küçük adım — ör. "İlk başlığı yazmak" */
  smallestStep: { minWords: 2, minLetters: 6, maxLength: 80 },
  /** Kurulum: neden çapası — kendi cümlesi olmalı */
  why: { minWords: 4, minLetters: 20, maxLength: 300 },
  /** Sabah planı: iş adı — tek kelime olabilir ("Koşu") */
  task: { minWords: 1, minLetters: 3, maxLength: 60 },
  /** Sabah planı: yer — "Ev", "Ofis" */
  place: { minWords: 1, minLetters: 2, maxLength: 40 },
} as const satisfies Record<string, TextRule>;

const LETTER = /[a-zA-ZçğıöşüâîûÇĞİÖŞÜÂÎÛ]/;
const LETTERS_G = /[a-zA-ZçğıöşüâîûÇĞİÖŞÜÂÎÛ]/g;
// Türkçe ve İngilizce ünlüler; "gym" gibi kelimeler için y de sayılır.
const VOWEL = /[aeıioöuüâîûy]/;
// Klavye karalaması: Türkçe ya da İngilizce kelimelerde geçmeyen dizilimler.
const MASH = ['qwer', 'asdf', 'sdfg', 'dfgh', 'fghj', 'ghjk', 'hjkl', 'zxcv', 'xcvb', 'cvbn', 'vbnm'];
// Tek başına yazıldığında anlam taşımayan dolgu metinler (cümle içinde geçebilirler: "deneme sınavı çözmek").
const FILLER = new Set(['abc', 'abcd', 'xyz', 'test', 'deneme', 'asd', 'qwe', 'bla', 'blabla', 'falan', 'falan filan', 'vs', 'yok', 'bilmiyorum']);

// Türkçede neredeyse hiç yan yana gelmeyen harf çiftleri (klavyede rastgele basınca sık çıkar).
const RARE_PAIRS = ['sd', 'df', 'fg', 'gh', 'hj', 'jk', 'kj', 'jh', 'hg', 'gf', 'fd', 'dj', 'jd', 'fj', 'jf', 'dh', 'hd', 'fh', 'hf', 'qw', 'wq', 'xz', 'zx', 'cv', 'vc', 'vb', 'bv', 'wx', 'jl', 'lj', 'jg', 'gj', 'zj', 'jz', 'fv', 'vf', 'pq', 'qp'];
const CONSONANT_RUN = /[^aeıioöuüâîûy]{4,}/;

/**
 * Rastgele yazılmış gibi görünen kelime mi?
 * Kurallar: 4+ ünsüz yan yana, ünlü oranı çok düşük ya da Türkçede olmayan harf çifti.
 */
function looksRandom(word: string): boolean {
  if (word.length < 4) return false;
  if (CONSONANT_RUN.test(word)) return true;
  const vowels = (word.match(/[aeıioöuüâîûy]/g) ?? []).length;
  if (word.length >= 5 && vowels / word.length < 0.25) return true;
  return RARE_PAIRS.some((p) => word.includes(p));
}

/** Türkçe büyük/küçük harf kuralıyla küçültür (I → ı, İ → i). */
export function trLower(text: string): string {
  return text.replace(/I/g, 'ı').replace(/İ/g, 'i').toLowerCase();
}

function words(text: string): string[] {
  return trLower(text)
    .split(/\s+/)
    .map((w) => (w.match(LETTERS_G) ?? []).join(''))
    .filter((w) => w.length >= 2);
}

/**
 * Metni kurala göre kontrol eder.
 * @returns Kullanıcıya gösterilecek kısa hata ya da geçerliyse null.
 */
export function checkText(raw: string, rule: TextRule): string | null {
  const text = raw.trim().replace(/\s+/g, ' ');
  if (!text) return 'Bu alanı doldur.';
  if (text.length > rule.maxLength) return `En fazla ${rule.maxLength} karakter yazabilirsin.`;

  const visible = text.replace(/\s/g, '');
  const letterCount = (visible.match(LETTERS_G) ?? []).length;
  if (letterCount === 0) return 'Harflerle yaz; sadece işaret ya da rakam yetmez.';
  if (letterCount / visible.length < 0.6) return 'Çok fazla işaret ya da rakam var; kelimelerle yaz.';
  if (/(.)\1{3,}/.test(trLower(visible))) return 'Aynı harfi art arda tekrarlama.';

  const lower = trLower(visible);
  if (MASH.some((m) => lower.includes(m))) return 'Anlamlı kelimelerle yaz.';

  const list = words(text);
  if (FILLER.has(list.join(' '))) return 'Anlamlı kelimelerle yaz.';
  // "asdasd", "lalala" gibi kendini tekrar eden kelimeler
  if (list.some((w) => /^(.{3,})\1+$/.test(w))) return 'Anlamlı kelimelerle yaz.';
  if (list.length < rule.minWords) {
    return rule.minWords === 1 ? 'Anlamlı bir kelime yaz.' : `En az ${rule.minWords} kelimeyle anlat.`;
  }
  if (letterCount < rule.minLetters) return 'Biraz daha açık yaz.';

  const longWords = list.filter((w) => w.length >= 3);
  const noVowel = longWords.filter((w) => !VOWEL.test(w)).length;
  if (longWords.length > 0 && noVowel / longWords.length > 0.5) return 'Anlamlı kelimelerle yaz.';

  // Kelimelerin üçte birinden fazlası rastgele görünüyorsa geçme.
  const randomCount = list.filter(looksRandom).length;
  if (randomCount > 0 && randomCount / list.length > 1 / 3) return 'Anlamlı kelimelerle yaz.';

  const unique = new Set(list).size;
  if (list.length >= 2 && (unique === 1 || unique / list.length < 0.5)) return 'Aynı kelimeyi tekrarlama.';

  return null;
}

/** "09:30" ya da "9.30" → "09:30"; geçersizse null. */
export function normalizeTime(raw: string): string | null {
  const m = raw.trim().match(/^([01]?\d|2[0-3])[:.]([0-5]\d)$/);
  if (!m) return null;
  return `${m[1].padStart(2, '0')}:${m[2]}`;
}

export function checkTime(raw: string): string | null {
  if (!raw.trim()) return 'Saati yaz.';
  return normalizeTime(raw) ? null : 'Saati 09:30 gibi yaz.';
}

/** Sohbet mesajı gibi kısa serbest alanlar: en az bir harf ya da rakam yeter. */
export function hasContent(raw: string): boolean {
  return LETTER.test(raw) || /\d/.test(raw);
}
