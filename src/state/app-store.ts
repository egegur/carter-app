import { useSyncExternalStore } from 'react';

import { categoryInfo, type Category } from '@/content/categories';
import { DEFAULT_FREQUENCY, type Frequency } from '@/content/frequency';
import { initialTasks, type Task } from '@/data/mock';

export type { Category, Frequency, Task };

/**
 * Uygulamanın geçici durumu (sadece bellekte).
 * Sunucu bağlanınca bu dosyanın yerini API + kalıcı depolama alacak (docs/TASKS.md).
 */

export type Tone = 'soft' | 'friendly' | 'tough';

export type Goal = {
  text: string;
  frequency: Frequency;
  smallestStep: string;
};

export const EMPTY_GOAL: Goal = { text: '', frequency: DEFAULT_FREQUENCY, smallestStep: '' };

export type Profile = {
  name: string;
  /** Kurulumda seçilen alanlar (birden fazla olabilir), seçim sırasıyla. */
  categories: Category[];
  /** "Başka bir şey" seçildiyse kullanıcının yazdığı alan adı. */
  otherLabel: string;
  /** Her alan için bir hedef. */
  goals: Partial<Record<Category, Goal>>;
  why: string;
  tone: Tone;
  /** Adım sayısı için verilen açık rıza (KVKK m.6). */
  healthConsent: boolean;
};

type State = {
  onboarded: boolean;
  profile: Profile;
  tasks: Task[];
  streakDays: number;
  jokersLeft: number;
};

let state: State = {
  onboarded: false,
  profile: {
    name: 'Deniz',
    categories: [],
    otherLabel: '',
    goals: {},
    why: '',
    tone: 'soft',
    healthConsent: false,
  },
  tasks: initialTasks,
  streakDays: 6,
  jokersLeft: 1,
};

const listeners = new Set<() => void>();

function setState(update: (s: State) => State) {
  state = update(state);
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAppState<T>(select: (s: State) => T): T {
  return useSyncExternalStore(subscribe, () => select(state), () => select(state));
}

export const actions = {
  updateProfile(patch: Partial<Profile>) {
    setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }));
  },
  toggleCategory(category: Category) {
    setState((s) => {
      const has = s.profile.categories.includes(category);
      const categories = has
        ? s.profile.categories.filter((c) => c !== category)
        : [...s.profile.categories, category];
      return { ...s, profile: { ...s.profile, categories } };
    });
  },
  updateGoal(category: Category, patch: Partial<Goal>) {
    setState((s) => {
      const current = s.profile.goals[category] ?? EMPTY_GOAL;
      const goals = { ...s.profile.goals, [category]: { ...current, ...patch } };
      return { ...s, profile: { ...s.profile, goals } };
    });
  },
  /** Kurulum biter: her hedeften bugün için bir iş oluşur. Hedef yoksa örnek işler kalır. */
  finishOnboarding() {
    setState((s) => {
      const tasks = tasksFromGoals(s.profile);
      return { ...s, onboarded: true, tasks: tasks.length ? tasks : s.tasks };
    });
  },
  completeTask(id: string) {
    setState((s) => ({ ...s, tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: true } : t)) }));
  },
  spendJoker() {
    setState((s) => ({ ...s, jokersLeft: Math.max(0, s.jokersLeft - 1) }));
  },
};

// MOCK: günlük işleri ileride sunucu, sıklığa göre (bugün o hedefin günü mü?) üretecek.
function tasksFromGoals(profile: Profile): Task[] {
  return profile.categories
    .map((category, i): Task | null => {
      const goal = profile.goals[category];
      if (!goal?.text.trim()) return null;
      const info = categoryInfo(category);
      return {
        id: `g${i}`,
        category,
        title: goal.text.trim(),
        time: info.defaultTime,
        proof: info.defaultProof,
        durationMin: info.defaultProof === 'focus' ? 25 : undefined,
        done: false,
      };
    })
    .filter((t): t is Task => t !== null);
}

/**
 * id verilen işi döner; yoksa sıradaki bitmemiş işi.
 * Not: seçiciler yeni dizi/nesne üretmemeli, yoksa sonsuz render olur.
 */
export function useTask(id: string | undefined): Task | undefined {
  const tasks = useAppState((s) => s.tasks);
  return tasks.find((t) => t.id === id) ?? tasks.find((t) => !t.done);
}

/** İşin hedefindeki "en küçük adım"; yoksa ilk hedefinki (kaçırma ekranı için). */
export function useSmallestStep(task?: Task): string {
  const profile = useAppState((s) => s.profile);
  const own = task?.category ? profile.goals[task.category]?.smallestStep.trim() : '';
  if (own) return own;
  for (const c of profile.categories) {
    const step = profile.goals[c]?.smallestStep.trim();
    if (step) return step;
  }
  return '';
}
