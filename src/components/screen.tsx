import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { colors, space } from '@/theme/tokens';

type Props = {
  children: ReactNode;
  /** Ekranın üstüne sabitlenen alan (geri butonu, adım çubuğu). Kaydırmayla kaybolmaz. */
  header?: ReactNode;
  /** Ekranın altına sabitlenen alan; genelde tek ana buton. */
  footer?: ReactNode;
  /** Sekme ekranlarında alt boşluğu sekme çubuğu yönetir: ['top'] verin. */
  edges?: Edge[];
  background?: string;
  scroll?: boolean;
  gap?: number;
};

/** Tüm ekranların ortak iskeleti: güvenli alan, klavye, kaydırma, kenar boşluğu ve alt buton alanı. */
export function Screen({
  children,
  header,
  footer,
  edges = ['top', 'bottom'],
  background = colors.ground,
  scroll = true,
  gap = space.lg,
}: Props) {
  const body = scroll ? (
    <ScrollView
      style={styles.fill}
      contentContainerStyle={[styles.content, { gap }]}
      keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, styles.fill, { gap }]}>{children}</View>
  );

  return (
    <SafeAreaView edges={edges} style={[styles.fill, { backgroundColor: background }]}>
      <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {header ? <View style={styles.header}>{header}</View> : null}
        {body}
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  header: { paddingHorizontal: space.xl, paddingTop: space.sm },
  content: { paddingHorizontal: space.xl, paddingTop: space.lg, paddingBottom: space.xxl },
  footer: { paddingHorizontal: space.xl, paddingBottom: space.lg, paddingTop: space.sm, gap: space.sm },
});
