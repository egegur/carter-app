import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Icon } from '@/components/icon';
import type { LegalDocKey } from '@/content/legal';
import { colors, fonts, minTouch, space } from '@/theme/tokens';

/** Hukuki metne giden, metin içinde duran bağlantı. */
export function LegalLink({ doc, label }: { doc: LegalDocKey; label: string }) {
  return (
    <AppText
      accessibilityRole="link"
      onPress={() => router.push({ pathname: '/legal/[doc]', params: { doc } })}
      style={styles.link}>
      {label}
    </AppText>
  );
}

type ConsentProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Onay kutusunun yanındaki cümle. */
  label: string;
  doc: LegalDocKey;
  docLabel: string;
};

/** Açık rıza onay kutusu: metni okuma bağlantısıyla birlikte. Varsayılan işaretsizdir. */
export function ConsentCheck({ checked, onChange, label, doc, docLabel }: ConsentProps) {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        accessibilityLabel={label}
        hitSlop={8}
        onPress={() => onChange(!checked)}
        style={styles.boxHit}>
        <View style={[styles.box, checked && styles.boxOn]}>
          {checked ? <Icon name="check" size={14} color={colors.onDark} /> : null}
        </View>
      </Pressable>
      <AppText variant="caption" style={styles.text}>
        {label} <LegalLink doc={doc} label={docLabel} />
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  link: { fontFamily: fonts.semibold, color: colors.accent, textDecorationLine: 'underline' },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: space.sm },
  boxHit: { minWidth: minTouch / 1.5, minHeight: minTouch / 1.5, paddingTop: 2 },
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
  text: { flex: 1, color: colors.ink },
});
