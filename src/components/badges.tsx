import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { colors, fonts, radius, space } from '@/theme/tokens';

/** "6 gün seri" rozeti. */
export function StreakPill({ days }: { days: number }) {
  return (
    <View style={styles.pill} accessibilityLabel={`${days} gün seri`}>
      <Icon name="flame" size={14} color={colors.streakNumber} />
      <AppText style={styles.pillText}>{`${days} gün seri`}</AppText>
    </View>
  );
}

/** Kişi baş harfi; arkadaş ve kullanıcı avatarları. */
export function Initial({ letter, size = 40, friend }: { letter: string; size?: number; friend?: boolean }) {
  return (
    <View
      style={[
        styles.initial,
        { width: size, height: size, borderRadius: size / 2 },
        { backgroundColor: friend ? colors.friendBg : colors.ink },
      ]}>
      <AppText style={{ fontFamily: fonts.bold, fontSize: size * 0.4, color: friend ? colors.friendInk : colors.onDark }}>
        {letter}
      </AppText>
    </View>
  );
}

/** Büyük sayı + kısa açıklama. */
export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <AppText variant="title">{value}</AppText>
      <AppText variant="caption" color={colors.muted}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    backgroundColor: colors.streakBg,
    borderRadius: radius.pill,
    paddingHorizontal: space.md,
    paddingVertical: 6,
  },
  pillText: { fontFamily: fonts.bold, fontSize: 13, color: colors.streakInk },
  initial: { alignItems: 'center', justifyContent: 'center' },
  stat: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: space.md,
    gap: 2,
  },
});
