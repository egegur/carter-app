import { router } from 'expo-router';
import { Share, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Initial } from '@/components/badges';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { CarterBubble } from '@/components/carter';
import { BackHeader } from '@/components/header';
import { Screen } from '@/components/screen';
import { duel, friend } from '@/data/mock';
import { useAppState } from '@/state/app-store';
import { colors, fonts, space } from '@/theme/tokens';

/** Düello */
export default function DuelScreen() {
  const myInitial = useAppState((s) => s.profile.name.charAt(0));

  const invite = () =>
    Share.share({
      // TODO: mağaza linki ve davet kodu eklenecek.
      message: "Carter'da benimle 3 günlük bir düelloya var mısın? En çok işi bitiren kazanır.",
    });

  return (
    <Screen
      header={<BackHeader title="Düello" />}
      footer={
        <>
          <Button title="Bugünkü işlerime git" onPress={() => router.dismissTo('/')} />
          <Button title="Yeni düello başlat" variant="secondary" onPress={invite} />
        </>
      }>
      <AppText variant="overline" color={colors.muted} align="center">
        {`${duel.totalDays} GÜNLÜK DÜELLO · ${duel.daysLeft} GÜN KALDI`}
      </AppText>

      <Card>
        <View style={styles.board}>
          <View style={styles.side}>
            <Initial letter={myInitial} size={52} />
            <AppText variant="label">Sen</AppText>
            <AppText style={styles.score}>{duel.me}</AppText>
          </View>
          <AppText variant="heading" color={colors.muted}>
            vs
          </AppText>
          <View style={styles.side}>
            <Initial letter={friend.initial} size={52} friend />
            <AppText variant="label">{friend.name}</AppText>
            <AppText style={styles.score}>{duel.friend}</AppText>
          </View>
        </View>
      </Card>

      <AppText variant="caption" color={colors.muted} align="center">
        Kanıtlı bitirilen her iş 1 puan. Kaybeden, kazananın seçtiği bir kahveyi ısmarlar.
      </AppText>

      <CarterBubble message="Bugün akşam yürüyüşünü yaparsan farkı açarsın." />
    </Screen>
  );
}

const styles = StyleSheet.create({
  board: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: space.sm },
  side: { alignItems: 'center', gap: space.xs },
  score: { fontFamily: fonts.extrabold, fontSize: 40, lineHeight: 48, color: colors.ink },
});
