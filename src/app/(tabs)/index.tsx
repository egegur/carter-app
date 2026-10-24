import { router, type Href } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { StreakPill } from '@/components/badges';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { CarterBubble } from '@/components/carter';
import { Icon } from '@/components/icon';
import { ListRow } from '@/components/list-row';
import { Screen } from '@/components/screen';
import type { Task } from '@/data/mock';
import { useAppState } from '@/state/app-store';
import { colors, radius, space } from '@/theme/tokens';

/** İşin kanıt türüne göre "başla" hedefi. */
function startHref(task: Task): Href {
  switch (task.proof) {
    case 'focus':
      return { pathname: '/focus', params: { id: task.id } };
    case 'photo':
      return { pathname: '/proof', params: { id: task.id } };
    case 'word':
      return { pathname: '/report', params: { id: task.id } };
  }
}

/** Bugün (ana ekran) */
export default function TodayScreen() {
  const name = useAppState((s) => s.profile.name);
  const streak = useAppState((s) => s.streakDays);
  const tasks = useAppState((s) => s.tasks);

  const sorted = [...tasks].sort((a, b) => a.time.localeCompare(b.time));
  const next = sorted.find((t) => !t.done);
  const others = sorted.filter((t) => t !== next);

  const meta = next ? [next.time, next.place, next.durationMin ? `${next.durationMin} dakika` : null].filter(Boolean).join(' · ') : '';

  return (
    <Screen edges={['top']}>
      <View style={styles.top}>
        <AppText variant="title">Bugün</AppText>
        <StreakPill days={streak} />
      </View>

      <CarterBubble
        message={
          next
            ? `Günaydın ${name}. Sıradaki işin hazır, ben yanındayım.`
            : `Bugünkü işlerin bitti ${name}. Akşam hesabında görüşürüz.`
        }
      />

      {next ? (
        <Card tone="highlight">
          <AppText variant="overline" color={colors.accent}>
            SIRADAKİ İŞ
          </AppText>
          <AppText variant="title">{next.title}</AppText>
          <AppText variant="caption" color={colors.muted}>
            {meta}
          </AppText>
          <View style={styles.actions}>
            <Button title="Başla" style={styles.flex} href={startHref(next)} />
            <Button
              title="Sonra"
              variant="secondary"
              style={styles.later}
              href={{ pathname: '/missed', params: { id: next.id } }}
            />
          </View>
        </Card>
      ) : null}

      <View style={styles.list}>
        {others.map((t) => (
          <Pressable
            key={t.id}
            accessibilityRole="button"
            accessibilityLabel={`${t.title}, ${t.time}${t.done ? ', bitti' : ''}`}
            disabled={t.done}
            onPress={() => router.push(startHref(t))}
            style={({ pressed }) => [styles.task, pressed && styles.pressed]}>
            <View style={[styles.dot, t.done && styles.dotDone]}>
              {t.done ? <Icon name="check" size={12} color={colors.onDark} /> : null}
            </View>
            <AppText
              variant="label"
              color={t.done ? colors.muted : colors.ink}
              style={[styles.flex, t.done && styles.doneText]}>
              {t.title}
            </AppText>
            <AppText variant="caption" color={t.done ? colors.accent : colors.muted}>
              {t.done ? 'Bitti' : t.time}
            </AppText>
          </Pressable>
        ))}
      </View>

      {/* Bu satırlar normalde bildirimle açılır; burada da elle ulaşılabilsin. */}
      <Card>
        <AppText variant="overline" color={colors.muted}>
          GÜNÜN AKIŞI
        </AppText>
        <ListRow title="Sabah planı" value="08:30" href="/checkin" />
        <ListRow title="Hesap randevusu" value="14:00" href={next ? { pathname: '/report', params: { id: next.id } } : '/report'} />
        <ListRow title="Akşam hesabı" value="21:00" href="/day-close" />
        <ListRow title="Carter'a yaz" href="/chat" />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  actions: { flexDirection: 'row', gap: space.sm, marginTop: space.sm },
  flex: { flex: 1 },
  later: { paddingHorizontal: space.xl },
  list: { gap: space.sm },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    minHeight: 56,
    paddingHorizontal: space.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.7 },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotDone: { backgroundColor: colors.accent, borderColor: colors.accent },
  doneText: { textDecorationLine: 'line-through' },
});
