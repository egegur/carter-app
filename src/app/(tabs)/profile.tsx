import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Initial } from '@/components/badges';
import { Card } from '@/components/card';
import { ListRow } from '@/components/list-row';
import { Screen } from '@/components/screen';
import { useAppState, type Tone } from '@/state/app-store';
import { colors, space } from '@/theme/tokens';

const TONE_LABEL: Record<Tone, string> = { soft: 'Yumuşak', friendly: 'Samimi', tough: 'Sert' };

/** Profil ve ayarlar. Alt ekranlar henüz tasarlanmadı (docs/TASKS.md). */
export default function ProfileScreen() {
  const profile = useAppState((s) => s.profile);

  return (
    <Screen edges={['top']}>
      <View style={styles.head}>
        <Initial letter={profile.name.charAt(0)} size={56} />
        <View style={{ gap: 2 }}>
          <AppText variant="title">{profile.name}</AppText>
          <AppText variant="caption" color={colors.muted}>
            Deneme sürümü · 23 gün kaldı
          </AppText>
        </View>
      </View>

      <Card>
        <ListRow title="Hedeflerim" value="2 aktif" />
        <ListRow title="Nedenim ve Carter'ın tonu" value={TONE_LABEL[profile.tone]} />
        <ListRow title="Araç kutusu" value="2 açık" />
        <ListRow title="Sabah ve akşam saatleri" value="08:30 · 21:00" />
      </Card>

      <Card>
        <ListRow title="Abonelik" />
        <ListRow title="İzinler" />
        <ListRow title="Gizlilik ve verilerim" />
        <ListRow title="Yardım ve iletişim" />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', gap: space.lg },
});
