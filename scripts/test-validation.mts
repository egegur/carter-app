// Metin kuralları testi. Çalıştır: npm run test:rules (Node 22.6+ gerekir).
import { checkText, checkTime, normalizeTime, TEXT_RULES as R } from '../src/utils/validation.ts';

type Case = [string, keyof typeof R, boolean];
const cases: Case[] = [
  // geçmemesi gerekenler
  ['.', 'goal', false],
  ['...', 'goal', false],
  ['', 'goal', false],
  ['   ', 'goal', false],
  ['a', 'goal', false],
  ['asdf', 'goal', false],
  ['asdasd asdasd', 'goal', false],
  ['aaaaaa bbbb', 'goal', false],
  ['1234 5678', 'goal', false],
  ['spor', 'goal', false],
  ['sdf ghk', 'goal', false],
  ['xyz', 'task', false],
  ['rapor rapor rapor rapor', 'why', false],
  ['çünkü istiyorum', 'why', false],
  ['!!! ??? ...', 'why', false],
  ['ok', 'task', false],
  ['test', 'task', false],
  ['lalala lalala', 'goal', false],
  ['deneme', 'task', false],
  // rastgele klavye
  ['alksjd qwpoei', 'goal', false],
  ['ajsdhakjsd askdjh', 'goal', false],
  ['hfgdjs ldkfg', 'smallestStep', false],
  ['asdas dasd', 'goal', false],
  ['kdjf kdjf kdjf', 'goal', false],
  ['ghfj', 'task', false],
  ['lkajsd', 'task', false],
  ['mnbvc poiuy', 'goal', false],
  ['ertghy ujikol', 'goal', false],
  ['Deneme sınavı çözmek', 'goal', true],
  ['Elektrik faturasını ödemek', 'goal', true],
  ['Kontrol randevusuna gitmek', 'goal', true],
  ['Strateji dokümanını okumak', 'goal', true],
  ['Spor salonuna gitmek', 'goal', true],
  ['Almanca kurs ödevini yapmak', 'goal', true],
  ['Sırt egzersizi yapmak', 'goal', true],
  ['Yoga matını sermek', 'smallestStep', true],
  ['Dişlerimi fırçalamak', 'smallestStep', true],
  ['Kitap okumak', 'goal', true],
  ['Babamı aramak', 'goal', true],
  ['Dedemi ziyaret etmek', 'goal', true],
  // geçmesi gerekenler
  ['Her gün 25 dakika rapora çalışmak', 'goal', true],
  ['Haftada 3 gün koşmak', 'goal', true],
  ['İngilizce çalışmak', 'goal', true],
  ['İlk başlığı yazmak', 'smallestStep', true],
  ['5 şınav çekmek', 'smallestStep', true],
  ['Terfi değerlendirmesinden önce işlerimi zamanında teslim etmek istiyorum.', 'why', true],
  ['Sağlıklı olmak ve çocuklarımla daha çok oyun oynamak istiyorum', 'why', true],
  ['Koşu', 'task', true],
  ['Gym', 'task', true],
  ['Rapor taslağı', 'task', true],
  ['Ev', 'place', true],
  ['Ofis', 'place', true],
  ['IELTS hazırlığı yapmak', 'goal', true],
];

let fail = 0;
for (const [text, rule, ok] of cases) {
  const err = checkText(text, R[rule]);
  const pass = (err === null) === ok;
  if (!pass) fail++;
  console.log(`${pass ? 'OK  ' : 'FAIL'} [${rule}] ${JSON.stringify(text)} -> ${err ?? 'geçerli'}`);
}
const times: [string, string | null][] = [['09:30', '09:30'], ['9.30', '09:30'], ['24:00', null], ['930', null], ['23:59', '23:59']];
for (const [t, want] of times) {
  const got = normalizeTime(t);
  if (got !== want) fail++;
  console.log(`${got === want ? 'OK  ' : 'FAIL'} time ${t} -> ${got} (${checkTime(t) ?? 'geçerli'})`);
}
console.log(fail ? `${fail} HATA` : 'HEPSİ GEÇTİ');
process.exit(fail ? 1 : 0);
