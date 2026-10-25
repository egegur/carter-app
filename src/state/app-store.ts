import AsyncStorage from '@react-native-async-storage/async-storage';
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
  /** Telefondaki kayıt okundu mu? Okunana kadar açılış ekranı gösterilir. */
  hydrated: boolean;
  onboarded: boolean;
  profile: Profile;
  tasks: Task[];
  /** Görevlerin ait olduğu gün (YYYY-AA-GG). Gün değişince işler sıfırlanır. */
  tasksDate: string;
  streakDays: number;
  jokersLeft: number;
};

const INITIAL: State = {
  hydrated: false,
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
  tasksDate: today(),
  streakDays: 6,
  jokersLeft: 1,
};

let state: State = INITIAL;

const listeners = new Set<() => void>();

function setState(update: (s: State) => State) {
  state = update(state);
  listeners.forEach((l) => l());
  if (state.hydrated) scheduleSave();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Hook dışından (servislerden) okumak için anlık profil. */
export function getProfile(): Profile {
  return state.profile;
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
  /** Telefondaki tüm Carter verisini siler ve kurulumu baştan başlatır. */
  async resetAll() {
    await clearSaved();
    setState(() => ({ ...INITIAL, hydrated: true, tasksDate: today() }));
  },
};

/** Uygulama açılırken bir kez çağrılır: telefondaki kaydı okur. */
export async function hydrate() {
  const saved = await loadSaved();
  setState((s) => {
    if (!saved) return { ...s, hydrated: true };
    const next: State = { ...s, ...saved, hydrated: true };
    // Yeni gün: hedeflerden bugünün işleri yeniden oluşur.
    if (next.onboarded && next.tasksDate !== today()) {
      const fresh = tasksFromGoals(next.profile);
      return { ...next, tasks: fresh.length ? fresh : next.tasks.map((t) => ({ ...t, done: false })), tasksDate: today() };
    }
    return next;
  });
}

// --- Kalıcı kayıt (AsyncStorage) ---
// MOCK: sunucu gelince asıl kayıt sunucuda olacak; bu yerel kopya çevrimdışı kullanım için kalır.

const STORAGE_KEY = 'carter:state:v1';
type Saved = Omit<State, 'hydrated'>;
let saveTimer: ReturnType<typeof setTimeout> | null = null;

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function scheduleSave() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    const { hydrated: _, ...saved } = state;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(saved)).catch(() => {});
  }, 300);
}

async function loadSaved(): Promise<Partial<Saved> | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Saved>;
    // Eksik alanlar varsayılanla tamamlanır (sürüm farkı olursa uygulama çökmesin).
    return { ...parsed, profile: { ...INITIAL.profile, ...parsed.profile } };
  } catch {
    return null;
  }
}

async function clearSaved() {
  if (saveTimer) clearTimeout(saveTimer);
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silinemese bile bellekteki durum sıfırlanır.
  }
}

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
