import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import { colors, fonts, minTouch, radius, space } from '@/theme/tokens';

type Option<T extends string> = { value: T; label: string; description?: string };

type ListProps<T extends string> = {
  options: readonly Option<T>[];
  value: T | null;
  onChange: (value: T) => void;
};

/** Alt alta seçenekler; tek seçim. Kurulum ve kaçırma ekranlarında kullanılır. */
export function OptionList<T extends string>({ options, value, onChange }: ListProps<T>) {
  return (
    <View accessibilityRole="radiogroup" style={styles.list}>
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            onPress={() => onChange(o.value)}
            style={[styles.row, selected && styles.rowSelected]}>
            <View style={styles.rowText}>
              <AppText variant={selected ? 'bodyStrong' : 'body'}>{o.label}</AppText>
              {o.description ? (
                <AppText variant="caption" color={colors.muted}>
                  {o.description}
                </AppText>
              ) : null}
            </View>
            {selected ? <Icon name="check" size={18} color={colors.accent} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

type ChipProps<T extends string> = ListProps<T>;

/** Yan yana kısa seçenekler (sıklık, ton, kanıt türü). */
export function ChipGroup<T extends string>({ options, value, onChange }: ChipProps<T>) {
  return (
    <View accessibilityRole="radiogroup" style={styles.chips}>
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            onPress={() => onChange(o.value)}
            style={[styles.chip, selected && styles.chipSelected]}>
            <AppText style={[styles.chipLabel, selected && styles.chipLabelSelected]}>{o.label}</AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: space.sm },
  row: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  rowSelected: { borderWidth: 2, borderColor: colors.accent, backgroundColor: colors.accentSoft },
  rowText: { flex: 1, gap: 2 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  chip: {
    minHeight: minTouch,
    paddingHorizontal: space.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSelected: { backgroundColor: colors.ink, borderColor: colors.ink },
  chipLabel: { fontFamily: fonts.semibold, fontSize: 14, color: colors.ink },
  chipLabelSelected: { color: colors.onDark },
});
