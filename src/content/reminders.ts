import { categoryDisplay, categoryInfo, type Category } from '@/content/categories';
import type { DayKey, Frequency } from '@/content/frequency';
import type { Profile, Tone } from '@/state/app-store';

/**
 * Carter'ın hatırlatma planı: hangi bildirim, hangi saatte, hangi metinle, hangi ekrana.
 * Saf veri/fonksiyon; bildirimi planlayan kod src/services/notifications.ts içinde.
 */

// Sabit saatler. Kullanıcı ayarı gelince profilden okunacak (docs/TASKS.md).
const MORNING = { hour: 8, minute: 30 };
const CHECK_IN = { hour: 14, minute: 0 };
const EVENING = { hour: 21, minute: 0 };

const COPY: Record<Tone, { morning: string; checkIn: string; evening: string; start: (goal: string, step: string) => string }> = {
  soft: {
    morning: 'Günaydın. Bugünün planını birlikte yapalım, bir dakika sürer.',
    checkIn: 'Hesap saati geldi. İşin ne durumda?',
    evening: 'Günü kapatalım mı? Neler yaptığına birlikte bakalım.',
    start: (goal, step) => `${goal} zamanı. Sadece şununla başla: ${step}`,
  },
  friendly: {
    morning: 'Günaydın! Bugün ne yapıyoruz? Planı bir dakikada çıkaralım.',
    checkIn: 'Hey, saat geldi. Nasıl gidiyor?',
    evening: 'Akşam oldu. Günü birlikte kapatalım mı?',
    start: (goal, step) => `${goal} için sıra geldi. İlk adım küçük: ${step}`,
  },
  tough: {
    morning: 'Günaydın. Plan yapılmadan gün başlamaz. Bir dakikanı al.',
    checkIn: 'Saat geldi. Söz verdiğin iş ne durumda?',
    evening: 'Gün bitiyor. Hesabını ver, sonra dinlen.',
    start: (goal, step) => `${goal}. Şimdi başla: ${step}`,
  },
};

const WEEKDAY: Record<DayKey, number> = { sun: 1, mon: 2, tue: 3, wed: 4, thu: 5, fri: 6, sat: 7 };

/** Sıklığa göre hangi günler (1=Pazar … 7=Cumartesi). null = her gün. */
function daysFor(f: Frequency): number[] | null {
  switch (f.kind) {
    case 'weekdays':
      return [2, 3, 4, 5, 6];
    case 'weekends':
      return [1, 7];
    case 'days':
      return f.days.map((d) => WEEKDAY[d]);
    default:
      // Her gün; "haftada N gün" için de her gün hatırlatırız, kullanıcı o gün yapmayabilir.
      return null;
  }
}

export type Plan = { title: string; body: string; url: string; hour: number; minute: number; weekdays: number[] | null };

/** Profildeki hedeflerden günlük bildirim planını çıkarır (saf fonksiyon). */
export function buildPlan(profile: Profile): Plan[] {
  const copy = COPY[profile.tone];
  const plan: Plan[] = [
    { title: 'Sabah planı', body: copy.morning, url: '/checkin', ...MORNING, weekdays: null },
    { title: 'Hesap saati', body: copy.checkIn, url: '/report', ...CHECK_IN, weekdays: null },
    { title: 'Akşam hesabı', body: copy.evening, url: '/day-close', ...EVENING, weekdays: null },
  ];
  profile.categories.forEach((category: Category, i) => {
    const goal = profile.goals[category];
    if (!goal?.text.trim()) return;
    const info = categoryInfo(category);
    const [hour, minute] = info.defaultTime.split(':').map(Number);
    const id = `g${i}`;
    const url = info.defaultProof === 'focus' ? `/focus?id=${id}` : info.defaultProof === 'photo' ? `/proof?id=${id}` : `/report?id=${id}`;
    plan.push({
      title: categoryDisplay(category, profile.otherLabel).label,
      body: copy.start(goal.text.trim(), goal.smallestStep.trim() || 'ilk 5 dakika'),
      url,
      hour,
      minute,
      weekdays: daysFor(goal.frequency),
    });
  });
  return plan;
}

