/**
 * Carter tasarım tokenları.
 * Tek kaynak: renk, yazı, boşluk ve köşe değerleri sadece buradan okunur.
 * Ekranlarda sabit renk (hex) veya fontFamily yazmayın.
 */

export const colors = {
  ground: '#F4F6F8',
  surface: '#FFFFFF',
  ink: '#13202E',
  muted: '#5A6675',
  border: '#E3E7EC',
  borderStrong: '#C9D1DA',
  borderDashed: '#9AA6B2',
  divider: '#EEF1F4',
  track: '#DDE2E8',

  accent: '#0B7A66',
  accentPressed: '#075E4E',
  accentSoft: '#E6F2EF',
  accentInk: '#073F35',
  accentInkMuted: '#0B5C4D',
  accentLight: '#9FD3C7',

  warmSoft: '#FFF4E2',
  warmInk: '#4A3000',
  warmInkMuted: '#6B4500',
  streakBg: '#FFE3B8',
  streakInk: '#5C3A00',
  streakNumber: '#8A5300',

  friendBg: '#DCE4F5',
  friendInk: '#1E3A78',

  night: '#0E1620',
  nightSurface: '#1E2A38',
  nightBorder: '#3E4D5E',
  nightText: '#F2F5F8',
  nightMuted: '#B7C2CE',

  /** Form hataları. Suçlayıcı değil, yol gösterici metinle kullanılır. */
  danger: '#B42318',

  onDark: '#FFFFFF',
} as const;

export const fonts = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
} as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radius = {
  sm: 12,
  md: 16,
  lg: 18,
  xl: 20,
  pill: 999,
} as const;

/** En küçük dokunma alanı (Apple ve Google yönergeleri). */
export const minTouch = 44;
