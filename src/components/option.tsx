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

type MultiProps<T extends string> = {
  options: readonly Option<T>[];
  values: readonly T[];
  onToggle: (value: T) => void;
};

type RowProps = {
  option: Option<string>;
  selected: boolean;
  multi: boolean;
  onPress: () => void;
};

function OptionRow({ option, selected, multi, onPress }: RowProps) {
  return (
    <Pressable
      accessibilityRole={multi ? 'checkbox' : 'radio'}
      accessibilityState={multi ? { checked: selected } : { selected }}
      onPress={onPress}
      style={[styles.row, selected && styles.rowSelected]}>
      {multi ? (
        <View style={[styles.box, selected && styles.boxOn]}>
          {selected ? <Icon name="check" size={14} color={colors.onDark} /> : null}
        </View>
      ) : null}
      <View style={styles.rowText}>
        <AppText variant={selected ? 'bodyStrong' : 'body'}>{option.label}</AppText>
        {option.description ? (
          <AppText variant="caption" color={colors.muted}>
            {option.description}
          </AppText>
        ) : null}
      </View>
      {!multi && selected ? <Icon name="check" size={18} color={colors.accent} /> : null}
    </Pressable>
  );
}

/** Alt alta seçenekler; tek seçim. */
export function OptionList<T extends string>({ options, value, onChange }: ListProps<T>) {
  return (
    <View accessibilityRole="radiogroup" style={styles.list}>
      {options.map((o) => (
        <OptionRow key={o.value} option={o} selected={o.value === value} multi={false} onPress={() => onChange(o.value)} />
      ))}
    </View>
  );
}

/** Alt alta seçenekler; çoklu seçim (onay kutulu). */
export function CheckList<T extends string>({ options, values, onToggle }: MultiProps<T>) {
  return (
    <View style={styles.list}>
      {options.map((o) => (
        <OptionRow key={o.value} option={o} selected={values.includes(o.value)} multi onPress={() => onToggle(o.value)} />
      ))}
    </View>
  );
}

type ChipProps = { label: string; selected: boolean; multi: boolean; onPress: () => void };

function Chip({ label, selected, multi, onPress }: ChipProps) {
  return (
    <Pressable
      accessibilityRole={multi ? 'checkbox' : 'radio'}
      accessibilityState={multi ? { checked: selected } : { selected }}
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}>
      <AppText style={[styles.chipLabel, selected && styles.chipLabelSelected]}>{label}</AppText>
    </Pressable>
  );
}

/** Yan yana kısa seçenekler; tek seçim (ton, kanıt türü, sıklık). */
export function ChipGroup<T extends string>({ options, value, onChange }: ListProps<T>) {
  return (
    <View accessibilityRole="radiogroup" style={styles.chips}>
      {options.map((o) => (
        <Chip key={o.value} label={o.label} selected={o.value === value} multi={false} onPress={() => onChange(o.value)} />
      ))}
    </View>
  );
}

/** Yan yana kısa seçenekler; çoklu seçim (günler). */
export function MultiChipGroup<T extends string>({ options, values, onToggle }: MultiProps<T>) {
  return (
    <View style={styles.chips}>
      {options.map((o) => (
        <Chip key={o.value} label={o.label} selected={values.includes(o.value)} multi onPress={() => onToggle(o.value)} />
      ))}
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
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxOn: { backgroundColor: colors.accent, borderColor: colors.accent },
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
