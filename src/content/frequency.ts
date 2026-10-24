/**
 * Hedefin sıklığı: hazır seçenekler + "haftada kaç gün" + "günleri ben seçeyim".
 */

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type FrequencyKind = 'daily' | 'weekdays' | 'weekends' | 'perWeek' | 'days';

export type Frequency = {
  kind: FrequencyKind;
  /** kind = perWeek iken: haftada kaç gün (1–6). */
  perWeek: number;
  /** kind = days iken: seçilen günler. */
  days: DayKey[];
};

export const DEFAULT_FREQUENCY: Frequency = { kind: 'daily', perWeek: 3, days: [] };

export const FREQUENCY_KINDS = [
  { value: 'daily', label: 'Her gün' },
  { value: 'weekdays', label: 'Hafta içi' },
  { value: 'weekends', label: 'Hafta sonu' },
  { value: 'perWeek', label: 'Haftada birkaç gün' },
  { value: 'days', label: 'Günleri ben seçeyim' },
] as const satisfies readonly { value: FrequencyKind; label: string }[];

export const PER_WEEK_OPTIONS = [1, 2, 3, 4, 5, 6].map((n) => ({ value: String(n), label: `${n} gün` }));

export const DAYS = [
  { value: 'mon', label: 'Pzt' },
  { value: 'tue', label: 'Sal' },
  { value: 'wed', label: 'Çar' },
  { value: 'thu', label: 'Per' },
  { value: 'fri', label: 'Cum' },
  { value: 'sat', label: 'Cmt' },
  { value: 'sun', label: 'Paz' },
] as const satisfies readonly { value: DayKey; label: string }[];

export function checkFrequency(f: Frequency): string | null {
  if (f.kind === 'days' && f.days.length === 0) return 'En az bir gün seç.';
  return null;
}

export function frequencyLabel(f: Frequency): string {
  switch (f.kind) {
    case 'daily':
      return 'Her gün';
    case 'weekdays':
      return 'Hafta içi';
    case 'weekends':
      return 'Hafta sonu';
    case 'perWeek':
      return `Haftada ${f.perWeek} gün`;
    case 'days':
      return DAYS.filter((d) => f.days.includes(d.value))
        .map((d) => d.label)
        .join(', ');
  }
}
