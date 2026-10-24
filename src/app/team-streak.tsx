import { router } from 'expo-router';
import { useState } from 'react';
import { Share, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Initial } from '@/components/badges';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { BackHeader } from '@/components/header';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/screen';
import { friend, teamStreak } from '@/data/mock';
import { useAppState } from '@/state/app-store';
import { colors, fonts, space } from '@/theme/tokens';

/** Takım serisi */
export default function TeamStreakScreen() {
  const myInitial = useAppState((s) => s.profile.name.charAt(0));
  const meDone = useAppState((s) => s.tasks.some((t) => t.done)) || teamStreak.meDoneToday;
  const [cheered, setCheered] = useState(false);

  const members = [
    { name: friend.name, done: teamStreak.friendDoneToday },
    { name: 'Sen', done: meDone },
  ];

  return (
    <Screen
      header={<BackHeader title="Takım serisi" />}
      footer={<Button title="Serimizi korumaya git" onPress={() => router.dismissTo('/')} />}>
      <View style={styles.hero}>
        <View style={styles.avatars}>
          <Initial letter={myInitial} size={52} />
          <View style={styles.overlap}>
            <Initial letter={friend.initial} size={52} friend />
          </View>
        </View>
        <AppText style={styles.days}>{`${teamStreak.days} gün`}</AppText>
        <AppText variant="caption" color={colors.muted} align="center">
          İkiniz de her gün en az bir işinizi bitirdikçe seri büyür.
        </AppText>
      </View>

      <Card>
        {members.map((m) => (
          <View key={m.name} style={styles.member}>
            <AppText variant="label" style={{ flex: 1 }}>
              {m.name}
            </AppText>
            {m.done ? <Icon name="check" size={16} color={colors.accent} /> : null}
            <AppText variant="caption" color={m.done ? colors.accent : colors.muted}>
              {m.done ? 'Bugün bitirdi' : 'Henüz değil'}
            </AppText>
          </View>
        ))}
      </Card>

      <Button
        title={cheered ? 'Mesajın gitti' : `${friend.name}'ye cesaret mesajı gönder`}
        variant="secondary"
        disabled={cheered}
        // MOCK: arkadaşa uygulama içi bildirim sunucu üzerinden gidecek.
        onPress={() => setCheered(true)}
      />
      <Button
        title="+ Yeni takım arkadaşı davet et"
        variant="dashed"
        onPress={() =>
          Share.share({ message: "Carter'da benimle takım serisi başlatır mısın? Her gün birbirimizi dürteriz." })
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', gap: space.sm, paddingVertical: space.lg },
  avatars: { flexDirection: 'row' },
  overlap: { marginLeft: -12 },
  days: { fontFamily: fonts.extrabold, fontSize: 40, lineHeight: 48, color: colors.streakNumber },
  member: { flexDirection: 'row', alignItems: 'center', gap: space.sm, minHeight: 44 },
});
