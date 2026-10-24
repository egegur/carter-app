import { useSyncExternalStore } from 'react';

import { initialTasks, type Task } from '@/data/mock';

export type { Task };

/**
 * Uygulamanın geçici durumu (sadece bellekte).
 * Sunucu bağlanınca bu dosyanın yerini API + kalıcı depolama alacak (docs/TASKS.md).
 */

export type Category = 'sport' | 'nutrition' | 'work' | 'study' | 'home' | 'other';
export type Frequency = 'daily' | 'weekdays' | 'three';
export type Tone = 'soft' | 'friendly' | 'tough';

export type Profile = {
  name: string;
  category: Category | null;
  goal: string;
  frequency: Frequency;
  smallestStep: string;
  why: string;
  tone: Tone;
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
    category: null,
    goal: '',
    frequency: 'daily',
    smallestStep: '',
    why: '',
    tone: 'soft',
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
  finishOnboarding() {
    setState((s) => ({ ...s, onboarded: true }));
  },
  completeTask(id: string) {
    setState((s) => ({ ...s, tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: true } : t)) }));
  },
  spendJoker() {
    setState((s) => ({ ...s, jokersLeft: Math.max(0, s.jokersLeft - 1) }));
  },
};

/**
 * id verilen işi döner; yoksa sıradaki bitmemiş işi.
 * Not: seçiciler yeni dizi/nesne üretmemeli, yoksa sonsuz render olur.
 */
export function useTask(id: string | undefined): Task | undefined {
  const tasks = useAppState((s) => s.tasks);
  return tasks.find((t) => t.id === id) ?? tasks.find((t) => !t.done);
}
