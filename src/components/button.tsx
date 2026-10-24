import { router, type Href } from 'expo-router';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors, fonts, minTouch, radius } from '@/theme/tokens';

/** accent ve darkSecondary: koyu zeminli ekranlar (odak, kamera) için. */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dashed' | 'accent' | 'darkSecondary';

type Props = {
  title: string;
  variant?: ButtonVariant;
  /** Verilirse butona basınca bu ekrana gider. */
  href?: Href;
  /** href ile birlikte: geri dönülemeyecek şekilde ekranı değiştirir (ör. kurulum bitince). */
  replace?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

/** Her ekranda tek bir "primary" buton olur; diğerleri secondary veya ghost. */
export function Button({
  title,
  variant = 'primary',
  href,
  replace,
  onPress,
  disabled,
  style,
  accessibilityLabel,
}: Props) {
  const handlePress = () => {
    onPress?.();
    if (href) {
      if (replace) router.replace(href);
      else router.push(href);
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      <AppText style={[styles.label, labelStyles[variant]]}>{title}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primary: { backgroundColor: colors.ink },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  ghost: { backgroundColor: 'transparent', minHeight: minTouch },
  dashed: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.borderDashed,
    minHeight: 48,
  },
  accent: { backgroundColor: colors.accent },
  darkSecondary: { backgroundColor: colors.nightSurface, borderWidth: 1, borderColor: colors.nightBorder },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.4 },
  label: { fontFamily: fonts.bold, fontSize: 16, lineHeight: 22 },
});

const labelStyles = StyleSheet.create({
  primary: { color: colors.onDark },
  secondary: { color: colors.ink, fontFamily: fonts.semibold },
  ghost: { color: colors.accent, fontFamily: fonts.semibold, fontSize: 15 },
  dashed: { color: colors.ink, fontFamily: fonts.semibold, fontSize: 15 },
  accent: { color: colors.onDark },
  darkSecondary: { color: colors.nightText, fontFamily: fonts.semibold },
});
