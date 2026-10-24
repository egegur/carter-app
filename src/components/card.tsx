import { router, type Href } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius, space } from '@/theme/tokens';

export type CardTone = 'default' | 'highlight' | 'soft' | 'warm' | 'dark';

type Props = {
  children: ReactNode;
  tone?: CardTone;
  /** Verilirse kartın tamamı dokunulabilir olur ve bu ekrana gider. */
  href?: Href;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * default: beyaz kart · highlight: ana işi vurgulayan yeşil çerçeve
 * soft: yeşil zemin (bilgi) · warm: turuncu zemin (ödül, emanet, challenge)
 * dark: koyu ekranlardaki kart
 */
export function Card({ children, tone = 'default', href, accessibilityLabel, style }: Props) {
  if (href) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={() => router.push(href)}
        style={({ pressed }) => [styles.base, styles[tone], pressed && styles.pressed, style]}>
        {children}
      </Pressable>
    );
  }
  return <View style={[styles.base, styles[tone], style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.md, padding: space.lg, gap: space.sm },
  default: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  highlight: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.accent,
    borderRadius: radius.xl,
    padding: 18,
  },
  soft: { backgroundColor: colors.accentSoft },
  warm: { backgroundColor: colors.warmSoft },
  dark: { backgroundColor: colors.nightSurface },
  pressed: { opacity: 0.85 },
});
