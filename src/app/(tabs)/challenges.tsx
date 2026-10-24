import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Card } from '@/components/card';
import { ProgressBar } from '@/components/progress-bar';
import { Screen } from '@/components/screen';
import { community, duel, friend, teamStreak } from '@/data/mock';
import { colors, space } from '@/theme/tokens';
import { formatNumber } from '@/utils/format';

/** Challenge sekmesi */
export default function ChallengesScreen() {
  return (
    <Screen edges={['top']}>
      <AppText variant="title">Challenge</AppText>

      <Card tone="warm">
        <AppText variant="overline" color={colors.warmInkMuted}>
          BUGÜNÜN KİŞİSEL CHALLENGE&apos;I
        </AppText>
        <AppText variant="bodyStrong" color={colors.warmInk}>
          Odak seansını telefonu ters çevirip tek seferde bitir.
        </AppText>
      </Card>

      <Card href="/duel" accessibilityLabel="Düello">
        <AppText variant="overline" color={colors.muted}>
          {`DÜELLO · ${duel.day}. GÜN`}
        </AppText>
        <AppText variant="heading">{`Sen ${duel.me} – ${duel.friend} ${friend.name}`}</AppText>
        <AppText variant="caption" color={colors.muted}>
          {`${duel.totalDays} günde en çok iş bitiren kazanır.`}
        </AppText>
      </Card>

      <Card href="/team-streak" accessibilityLabel="Takım serisi">
        <AppText variant="overline" color={colors.muted}>
          TAKIM SERİSİ
        </AppText>
        <AppText variant="heading">{`Sen ve ${friend.name}: ${teamStreak.days} gün`}</AppText>
        <AppText variant="caption" color={colors.muted}>
          {teamStreak.friendDoneToday
            ? `Bugün ${friend.name} bitirdi, sıra sende.`
            : `Bugün ikiniz de henüz bitirmediniz.`}
        </AppText>
      </Card>

      <Card href="/community" accessibilityLabel="Topluluk challenge'ı">
        <AppText variant="overline" color={colors.muted}>
          {`TOPLULUK · ${community.month}`}
        </AppText>
        <AppText variant="heading">{`Hep birlikte ${formatNumber(community.goal)} iş`}</AppText>
        <View style={styles.progress}>
          <ProgressBar value={community.done / community.goal} height={8} />
          <AppText variant="caption" color={colors.muted}>
            {`${formatNumber(community.done)} / ${formatNumber(community.goal)} · senin katkın ${community.mine}`}
          </AppText>
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  progress: { gap: space.sm, marginTop: space.xs },
});
