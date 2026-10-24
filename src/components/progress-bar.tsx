import { StyleSheet, View } from 'react-native';

import { colors, radius } from '@/theme/tokens';

type Props = {
  /** 0 ile 1 arası. */
  value: number;
  height?: number;
  color?: string;
  trackColor?: string;
};

export function ProgressBar({ value, height = 6, color = colors.accent, trackColor = colors.track }: Props) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(pct) }}
      style={[styles.track, { height, backgroundColor: trackColor }]}>
      <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: '100%', borderRadius: radius.pill, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: radius.pill },
});
