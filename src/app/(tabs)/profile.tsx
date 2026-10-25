import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Initial } from '@/components/badges';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { ListRow } from '@/components/list-row';
import { Screen } from '@/components/screen';
import { cancelAll } from '@/services/notifications';
import { actions, useAppState, type Tone } from '@/state/app-store';
import { colors, space } from '@/theme/tokens';

const TONE_LABEL: Record<Tone, string> = { soft: 'Yumuşak', friendly: 'Samimi', tough: 'Sert' };

/** Profil ve ayarlar. Alt ekranlar henüz tasarlanmadı (docs/TASKS.md). */
export default function ProfileScreen() {
  const profile = useAppState((s) => s.profile);
  // Silme geri alınamaz: ilk dokunuş sorar, ikincisi siler (web'de Alert çalışmadığı için sayfa içinde).
  const [confirmReset, setConfirmReset] = useState(false);

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
        <ListRow title="Hedeflerim" value={`${profile.categories.length} aktif`} />
        <ListRow title="Nedenim ve Carter'ın tonu" value={TONE_LABEL[profile.tone]} />
        <ListRow title="Araç kutusu" value="2 açık" />
        <ListRow title="Sabah ve akşam saatleri" value="08:30 · 21:00" />
      </Card>

      <Card>
        <ListRow title="Abonelik" />
        <ListRow title="İzinler" />
        <ListRow
          title="Gizlilik ve verilerim"
          href={{ pathname: '/legal/[doc]', params: { doc: 'aydinlatma' } }}
        />
        <ListRow
          title="Kullanım Şartları"
          href={{ pathname: '/legal/[doc]', params: { doc: 'kullanim-sartlari' } }}
        />
        <ListRow title="Yardım ve iletişim" />
      </Card>

      <View style={{ gap: space.xs }}>
        <Button
          title={confirmReset ? 'Emin misin? Tekrar dokun, her şey silinsin' : 'Verilerimi sil ve baştan başla'}
          variant="ghost"
          onPress={() => (confirmReset ? (cancelAll(), actions.resetAll()) : setConfirmReset(true))}
        />
        {confirmReset ? (
          <AppText variant="caption" color={colors.muted} align="center">
            Hedeflerin, nedenin ve serin bu telefondan silinir.
          </AppText>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', gap: space.lg },
});
