import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Stat } from '@/components/badges';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { CarterBubble } from '@/components/carter';
import { Field } from '@/components/field';
import { BackHeader } from '@/components/header';
import { Screen } from '@/components/screen';
import { useAppState } from '@/state/app-store';
import { colors, space } from '@/theme/tokens';
import { withPossessiveAccusative } from '@/utils/format';

/** Gün kapanışı (akşam hesabı) */
export default function DayCloseScreen() {
  const tasks = useAppState((s) => s.tasks);
  const streak = useAppState((s) => s.streakDays);
  const [tomorrow, setTomorrow] = useState('');

  const done = tasks.filter((t) => t.done).length;
  const total = tasks.length;
  const carried = tasks.find((t) => !t.done);

  const message =
    done === total
      ? 'Bugün bütün işlerini bitirdin. Bu senin başarın.'
      : done === 0
        ? 'Bugün işler planladığın gibi gitmedi. Olur; yarın küçük bir adımla başlarız.'
        : `Bugün ${total} işin ${withPossessiveAccusative(done)} bitirdin. Bu senin başarın.`;

  return (
    <Screen
      header={<BackHeader title="Akşam hesabı · 21:00" />}
      // MOCK: gün kapanışı ve yarının ilk işi sunucuya kaydedilecek.
      footer={<Button title="Günü kapat" onPress={() => router.dismissTo('/')} />}>
      <CarterBubble message={message} />

      <View style={styles.stats}>
        <Stat value={`${done}/${total}`} label="iş bitti" />
        <Stat value={String(streak)} label="gün seri" />
      </View>

      {done > 0 ? (
        <Card tone="warm">
          <AppText variant="overline" color={colors.warmInkMuted}>
            EMANET TESLİM
          </AppText>
          <AppText variant="bodyStrong" color={colors.warmInk}>
            Dizinin yeni bölümü artık senin. Keyfini çıkar.
          </AppText>
        </Card>
      ) : null}

      <Field
        label="Yarın ilk iş ne olsun?"
        hint={carried ? `${carried.title} yarına taşındı. Sabah sana hatırlatırım.` : undefined}
        placeholder="Örn. Raporun ikinci bölümü"
        value={tomorrow}
        onChangeText={setTomorrow}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  stats: { flexDirection: 'row', gap: space.sm },
});
