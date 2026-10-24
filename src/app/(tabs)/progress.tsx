import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Stat } from '@/components/badges';
import { Card } from '@/components/card';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/screen';
import { progress } from '@/data/mock';
import { colors, radius, space } from '@/theme/tokens';

const DAYS = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];
const LEVEL_LABEL = ['kaçtı', 'kısmen', 'tamam'] as const;

/** İlerleme sekmesi */
export default function ProgressScreen() {
  return (
    <Screen edges={['top']}>
      <AppText variant="title">İlerleme</AppText>

      <View style={styles.stats}>
        <Stat value={String(progress.tasksDone)} label="biten iş" />
        <Stat value={String(progress.streakDays)} label="gün seri" />
        <Stat value={`${progress.phoneHoursSaved} sa`} label="telefondan geri" />
      </View>

      <Card>
        <AppText variant="bodyStrong">Son 4 hafta</AppText>
        <View style={styles.grid}>
          <View style={styles.row}>
            {DAYS.map((d) => (
              <AppText key={d} variant="caption" color={colors.muted} align="center" style={styles.cell}>
                {d}
              </AppText>
            ))}
          </View>
          {progress.weeks.map((week, wi) => (
            <View key={wi} style={styles.row}>
              {week.map((level, di) => (
                <View
                  key={di}
                  accessible
                  accessibilityLabel={`${DAYS[di]}: ${LEVEL_LABEL[level]}`}
                  style={[styles.cell, styles.square, level === 2 && styles.full, level === 1 && styles.partial]}
                />
              ))}
            </View>
          ))}
        </View>
        <AppText variant="caption" color={colors.muted}>
          koyu: tamam · açık: kısmen · boş: kaçtı
        </AppText>
      </Card>

      <Card href="/weekly" tone="soft" accessibilityLabel="Haftalık özet">
        <View style={styles.weekly}>
          <View style={{ flex: 1, gap: 2 }}>
            <AppText variant="bodyStrong" color={colors.accentInk}>
              Bu haftanın özeti hazır
            </AppText>
            <AppText variant="caption" color={colors.accentInkMuted}>
              Carter&apos;ın notlarıyla
            </AppText>
          </View>
          <Icon name="forward" size={16} color={colors.accentInk} />
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stats: { flexDirection: 'row', gap: space.sm },
  grid: { gap: 6, marginVertical: space.sm },
  row: { flexDirection: 'row', gap: 6 },
  cell: { flex: 1 },
  square: {
    aspectRatio: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  full: { backgroundColor: colors.accent, borderColor: colors.accent },
  partial: { backgroundColor: colors.accentLight, borderColor: colors.accentLight },
  weekly: { flexDirection: 'row', alignItems: 'center', gap: space.md, borderRadius: radius.md },
});
