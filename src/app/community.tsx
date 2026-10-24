import { router } from 'expo-router';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Initial } from '@/components/badges';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { BackHeader } from '@/components/header';
import { Icon } from '@/components/icon';
import { ProgressBar } from '@/components/progress-bar';
import { Screen } from '@/components/screen';
import { community } from '@/data/mock';
import { colors, fonts, minTouch, space } from '@/theme/tokens';
import { formatNumber } from '@/utils/format';

const RULES = [
  'Saygılı ol, kimseyi aşağılama.',
  'Sadece kendi yaptığın işi paylaş.',
  'Uygunsuz içerik ve kişisel bilgi paylaşma.',
].join('\n');

/** Topluluk challenge'ı */
export default function CommunityScreen() {
  const report = (name: string) =>
    Alert.alert(`${name} paylaşımı`, 'Bu paylaşımı uygunsuz buluyorsan bildir. İnceleyip kaldırırız.', [
      { text: 'Vazgeç', style: 'cancel' },
      // MOCK: bildirim moderasyon kuyruğuna gidecek.
      { text: 'Bildir', style: 'destructive' },
    ]);

  return (
    <Screen
      header={<BackHeader title="Topluluk challenge'ı" />}
      footer={
        <>
          <Button title="Katkını ekle" onPress={() => router.dismissTo('/')} />
          <Button title="Topluluk kuralları" variant="ghost" onPress={() => Alert.alert('Topluluk kuralları', RULES)} />
        </>
      }>
      <View style={{ gap: space.sm }}>
        <AppText variant="title">{`Hep birlikte ${formatNumber(community.goal)} iş`}</AppText>
        <AppText style={styles.big}>{formatNumber(community.done)}</AppText>
        <AppText variant="caption" color={colors.muted}>
          {`/ ${formatNumber(community.goal)} · ${community.daysLeft} gün kaldı`}
        </AppText>
        <ProgressBar value={community.done / community.goal} height={10} />
      </View>

      <Card tone="soft">
        <AppText variant="bodyStrong" color={colors.accentInk}>
          {`Senin katkın: ${community.mine} iş`}
        </AppText>
      </Card>

      <View style={{ gap: space.sm }}>
        <AppText variant="label">Az önce bitirenler</AppText>
        <Card>
          {community.recent.map((r) => (
            <View key={r.name} style={styles.row}>
              <Initial letter={r.name.charAt(0)} size={36} friend />
              <AppText variant="body" style={{ flex: 1 }}>
                <AppText variant="bodyStrong">{r.name}</AppText> {r.text}
              </AppText>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${r.name} paylaşımı için seçenekler`}
                onPress={() => report(r.name)}
                style={styles.more}>
                <Icon name="more" size={18} color={colors.muted} />
              </Pressable>
            </View>
          ))}
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  big: { fontFamily: fonts.extrabold, fontSize: 40, lineHeight: 48, color: colors.accent },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.md, minHeight: 52 },
  more: { width: minTouch, height: minTouch, alignItems: 'center', justifyContent: 'center' },
});
