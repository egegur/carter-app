/**
 * Kurulumdaki alanlar ve her alana özel metinler/izinler.
 * Bir alan eklemek için sadece bu listeye satır ekle.
 */

export type Category = 'sport' | 'nutrition' | 'work' | 'study' | 'home' | 'other';

export type CategoryInfo = {
  value: Category;
  label: string;
  /** Hedef sorusunun başı: "Spor için …" */
  lead: string;
  goalPlaceholder: string;
  stepPlaceholder: string;
  /** Adım sayısı (Sağlık) bu alanda işe yarar mı? */
  usesSteps: boolean;
  /** Bu alandaki işin varsayılan kanıt türü ve saati (sabah planında değiştirilebilir). */
  defaultProof: 'focus' | 'photo' | 'word';
  defaultTime: string;
};

export const CATEGORIES: readonly CategoryInfo[] = [
  {
    value: 'sport',
    defaultProof: 'word',
    defaultTime: '19:00',
    label: 'Spor',
    lead: 'Spor için',
    goalPlaceholder: 'Örn. Haftada 3 gün 30 dakika koşmak',
    stepPlaceholder: 'Örn. Spor ayakkabılarını giyip kapıdan çıkmak',
    usesSteps: true,
  },
  {
    value: 'nutrition',
    defaultProof: 'word',
    defaultTime: '13:00',
    label: 'Sağlıklı beslenme',
    lead: 'Beslenme için',
    goalPlaceholder: "Örn. Akşam 20.00'den sonra atıştırmamak",
    stepPlaceholder: 'Örn. Bir bardak su içmek',
    usesSteps: true,
  },
  {
    value: 'work',
    defaultProof: 'focus',
    defaultTime: '09:30',
    label: 'İş',
    lead: 'İş için',
    goalPlaceholder: 'Örn. Her gün 25 dakika rapora çalışmak',
    stepPlaceholder: 'Örn. Raporun ilk başlığını yazmak',
    usesSteps: false,
  },
  {
    value: 'study',
    defaultProof: 'focus',
    defaultTime: '20:00',
    label: 'Ders ve öğrenme',
    lead: 'Öğrenme için',
    goalPlaceholder: 'Örn. Her gün 20 dakika İngilizce çalışmak',
    stepPlaceholder: 'Örn. 5 yeni kelimeye bakmak',
    usesSteps: false,
  },
  {
    value: 'home',
    defaultProof: 'photo',
    defaultTime: '21:00',
    label: 'Ev işleri',
    lead: 'Ev işleri için',
    goalPlaceholder: 'Örn. Her akşam mutfağı toplamak',
    stepPlaceholder: 'Örn. Bulaşıkları makineye koymak',
    usesSteps: false,
  },
  {
    value: 'other',
    defaultProof: 'focus',
    defaultTime: '18:00',
    label: 'Başka bir şey',
    lead: 'Bu hedef için',
    goalPlaceholder: 'Örn. Her gün 15 dakika kitap okumak',
    stepPlaceholder: 'Örn. Kitabı açıp bir sayfa okumak',
    usesSteps: false,
  },
];

export function categoryInfo(value: Category): CategoryInfo {
  return CATEGORIES.find((c) => c.value === value) ?? CATEGORIES[CATEGORIES.length - 1];
}

/**
 * Ekranda gösterilecek ad ve soru başı. "Başka bir şey" seçildiyse kullanıcının yazdığı ad kullanılır.
 */
export function categoryDisplay(value: Category, otherLabel: string): { label: string; lead: string } {
  const info = categoryInfo(value);
  const custom = value === 'other' ? otherLabel.trim() : '';
  return custom ? { label: custom, lead: `${custom} için` } : { label: info.label, lead: info.lead };
}
