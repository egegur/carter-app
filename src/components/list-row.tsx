import { router, type Href } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { colors, space } from '@/theme/tokens';

type ListRowProps = {
  title: string;
  subtitle?: string;
  /** Sağda gösterilen kısa değer (ör. "Yumuşak"). */
  value?: string;
  left?: ReactNode;
  href?: Href;
  onPress?: () => void;
};

/** Ayar ve liste satırı. href veya onPress verilirse sağda ok çıkar. */
export function ListRow({ title, subtitle, value, left, href, onPress }: ListRowProps) {
  const pressable = Boolean(href || onPress);
  const handlePress = () => {
    onPress?.();
    if (href) router.push(href);
  };

  return (
    <Pressable
      accessibilityRole={pressable ? 'button' : undefined}
      disabled={!pressable}
      onPress={handlePress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      {left}
      <View style={styles.text}>
        <AppText variant="label">{title}</AppText>
        {subtitle ? (
          <AppText variant="caption" color={colors.muted}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {value ? (
        <AppText variant="caption" color={colors.muted}>
          {value}
        </AppText>
      ) : null}
      {pressable ? <Icon name="forward" size={16} color={colors.muted} /> : null}
    </Pressable>
  );
}

type ToggleRowProps = {
  title: string;
  subtitle?: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export function ToggleRow({ title, subtitle, value, onChange }: ToggleRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.text}>
        <AppText variant="bodyStrong">{title}</AppText>
        {subtitle ? (
          <AppText variant="caption" color={colors.muted}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      <Switch
        accessibilityLabel={title}
        value={value}
        onValueChange={onChange}
        trackColor={{ true: colors.accent, false: colors.track }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md, minHeight: 52, paddingVertical: space.sm },
  text: { flex: 1, gap: 2 },
  pressed: { opacity: 0.6 },
});
