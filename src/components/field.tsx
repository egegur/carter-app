import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors, fonts, radius, space } from '@/theme/tokens';

type Props = TextInputProps & {
  label: string;
  hint?: string;
};

export function Field({ label, hint, multiline, style, ...rest }: Props) {
  return (
    <View style={styles.wrap}>
      <AppText variant="label">{label}</AppText>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={colors.muted}
        multiline={multiline}
        style={[styles.input, multiline && styles.multiline, style]}
        {...rest}
      />
      {hint ? (
        <AppText variant="caption" color={colors.muted}>
          {hint}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  input: {
    minHeight: 52,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: space.md,
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.ink,
  },
  multiline: { minHeight: 96, textAlignVertical: 'top' },
});
