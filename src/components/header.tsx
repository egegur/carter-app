import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { ProgressBar } from '@/components/progress-bar';
import { colors, minTouch, space } from '@/theme/tokens';

type BackHeaderProps = {
  title?: string;
  /** Sağ köşedeki küçük alan (ör. "60 saniye" etiketi). */
  right?: ReactNode;
  /** Varsayılan: bir önceki ekrana döner. */
  onBack?: () => void;
  /** Koyu zeminli ekranlar için. */
  dark?: boolean;
};

export function BackHeader({ title, right, onBack, dark }: BackHeaderProps) {
  const tint = dark ? colors.nightText : colors.ink;
  const handleBack = onBack ?? (() => (router.canGoBack() ? router.back() : router.replace('/')));

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Geri"
        hitSlop={8}
        onPress={handleBack}
        style={styles.back}>
        <Icon name="back" size={22} color={tint} />
      </Pressable>
      <AppText variant="heading" color={tint} style={styles.title} numberOfLines={1}>
        {title ?? ''}
      </AppText>
      <View style={styles.right}>{right}</View>
    </View>
  );
}

type StepHeaderProps = { step: number; total: number };

/** Kurulum adımlarının üstü: geri, "Adım 2 / 5" ve ilerleme çubuğu. */
export function StepHeader({ step, total }: StepHeaderProps) {
  return (
    <View style={styles.step}>
      <BackHeader right={<AppText variant="caption" color={colors.muted}>{`Adım ${step} / ${total}`}</AppText>} />
      <ProgressBar value={step / total} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', minHeight: minTouch, gap: space.sm },
  back: { width: minTouch, height: minTouch, alignItems: 'flex-start', justifyContent: 'center' },
  title: { flex: 1, textAlign: 'center' },
  right: { minWidth: minTouch, alignItems: 'flex-end' },
  step: { gap: space.sm },
});
