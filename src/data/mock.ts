/**
 * Örnek veriler. Ekranlar sunucuya bağlanana kadar bunları gösterir.
 * Gerçek veriye geçerken bu dosya silinecek.
 */

import type { Category } from '@/content/categories';

/** focus: odak seansı · photo: anlık fotoğraf · word: sözlü onay (hesap ekranı) */
export type ProofType = 'focus' | 'photo' | 'word';

export type Task = {
  id: string;
  proof: ProofType;
  /** Hangi hedeften geldiği (kurulumda seçilen alan). */
  category?: Category;
  title: string;
  time: string;
  place?: string;
  durationMin?: number;
  done: boolean;
};

export const initialTasks: Task[] = [
  { id: 't1', proof: 'focus', title: 'Rapor taslağı', time: '09:30', place: 'Ofis', durationMin: 25, done: false },
  { id: 't2', proof: 'word', title: 'Akşam yürüyüşü', time: '19:00', done: false },
  { id: 't3', proof: 'photo', title: 'Mutfağı topla', time: '21:00', done: false },
  { id: 't0', proof: 'word', title: 'Sabah 10 şınav', time: '07:30', done: true },
];

export const friend = { name: 'Ayşe', initial: 'A' };

export const duel = { me: 2, friend: 1, daysLeft: 1, totalDays: 3, day: 2 };

export const teamStreak = { days: 4, friendDoneToday: true, meDoneToday: false };

export const community = {
  month: 'KASIM',
  goal: 10000,
  done: 3812,
  mine: 14,
  daysLeft: 9,
  recent: [
    { name: 'Mert', text: '30 dakika İngilizce çalıştı' },
    { name: 'Zeynep', text: 'sabah koşusunu yaptı' },
    { name: 'Can', text: 'balkonu topladı' },
  ],
};

export const progress = {
  tasksDone: 42,
  streakDays: 7,
  phoneHoursSaved: 3,
  /** Son 4 hafta, her gün: 2 tamam · 1 kısmen · 0 kaçtı */
  weeks: [
    [2, 2, 1, 2, 0, 2, 1],
    [2, 1, 2, 2, 2, 0, 2],
    [1, 2, 2, 2, 1, 2, 2],
    [2, 2, 2, 1, 2, 2, 2],
  ] as const,
};

export const weekly = {
  done: 11,
  total: 14,
  diffFromLastWeek: 3,
  bestDay: 'Salı, 3/3',
  topBlocker: 'Başlayamamak',
  bestTool: 'Hemen 5 dakika',
  suggestion: "Akşam yürüyüşünü 19:00 yerine 18:30'a alalım; iki kez geç kaldığın için atlandı.",
};

export const chatSeed = [
  { from: 'carter', text: 'Rapora başlamadan önce aklını kurcalayan bir şey var mı?' },
  { from: 'me', text: 'Nereden başlayacağımı bilmiyorum, çok büyük geliyor.' },
  {
    from: 'carter',
    text: 'Çok normal. Bütün raporu değil, sadece ilk başlığı yazalım. 5 dakika, ben saati tutuyorum. Olur mu?',
  },
] as const;
