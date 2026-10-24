import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { CarterAvatar } from '@/components/carter';
import { Screen } from '@/components/screen';
import { useAppState, useTask } from '@/state/app-store';
import { colors, fonts, space } from '@/theme/tokens';
import { formatClock } from '@/utils/format';

const FALLBACK_WHY = 'İşlerimi son dakikaya bırakmadan, zamanında ve iyi teslim etmek istiyorum.';

/** Odak seansı (koyu ekran, geri sayım) */
export default function FocusScreen() {
  const { id, minutes } = useLocalSearchParams<{ id?: string; minutes?: string }>();
  const task = useTask(id);
  const why = useAppState((s) => s.profile.why.trim()) || FALLBACK_WHY;

  const total = (Number(minutes) || task?.durationMin || 25) * 60;
  const [left, setLeft] = useState(total);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || left <= 0) return;
    const timer = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, [paused, left]);

  const finish = () => {
    router.replace({ pathname: '/report', params: { id: task?.id, proof: 'focus', minutes: Math.round((total - left) / 60) } });
  };

  return (
    <Screen
      background={colors.night}
      footer={
        <View style={styles.actions}>
          <Button
            title={paused ? 'Devam et' : 'Kısa ara'}
            variant="darkSecondary"
            style={styles.flex}
            onPress={() => setPaused((p) => !p)}
          />
          <Button title="Bitirdim" variant="accent" style={styles.flex} onPress={finish} />
        </View>
      }>
      <View style={styles.coach}>
        <CarterAvatar size={32} />
        <AppText variant="caption" color={colors.nightMuted}>
          Carter seninle çalışıyor
        </AppText>
      </View>

      <View style={styles.timerBox}>
        <AppText variant="heading" color={colors.nightText} align="center">
          {task?.title ?? 'Odak seansı'}
        </AppText>
        <AppText
          style={styles.timer}
          accessibilityRole="timer"
          accessibilityLabel={`${Math.ceil(left / 60)} dakika kaldı`}>
          {formatClock(left)}
        </AppText>
        <AppText variant="caption" color={colors.nightMuted} align="center">
          {left > 0 ? (paused ? 'ara verildi' : 'kaldı') : 'süre doldu'}
        </AppText>
      </View>

      <Card tone="dark">
        <AppText variant="overline" color={colors.accentLight}>
          GÜNÜN CHALLENGE&apos;I
        </AppText>
        <AppText variant="body" color={colors.nightText}>
          Bu seansı telefonu ters çevirip tek seferde bitir.
        </AppText>
      </Card>

      <Card tone="dark">
        <AppText variant="overline" color={colors.nightMuted}>
          SENİN NEDENİN
        </AppText>
        <AppText variant="body" color={colors.nightText}>{`“${why}”`}</AppText>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  coach: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  timerBox: { alignItems: 'center', gap: space.xs, paddingVertical: space.xxxl },
  timer: { fontFamily: fonts.extrabold, fontSize: 72, lineHeight: 84, color: colors.nightText, fontVariant: ['tabular-nums'] },
  actions: { flexDirection: 'row', gap: space.sm },
  flex: { flex: 1 },
});
