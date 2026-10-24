import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { colors, fonts, radius, space } from '@/theme/tokens';

type AvatarProps = { size?: number };

/**
 * Koç Carter'ın görseli. Karakter tasarımı gelene kadar yer tutucu.
 * Karakter hazır olduğunda sadece bu bileşen değişecek.
 */
export function CarterAvatar({ size = 44 }: AvatarProps) {
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel="Koç Carter"
      style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <AppText style={{ color: colors.onDark, fontFamily: fonts.extrabold, fontSize: size * 0.4 }}>
        C
      </AppText>
    </View>
  );
}

type BubbleProps = { message: string };

/** Carter'ın her ekranın başında söylediği tek cümle. */
export function CarterBubble({ message }: BubbleProps) {
  return (
    <View style={styles.row}>
      <CarterAvatar />
      <View style={styles.bubble}>
        <AppText variant="body">{message}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: { backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', gap: space.md, alignItems: 'flex-start' },
  bubble: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    paddingHorizontal: space.lg,
  },
});
