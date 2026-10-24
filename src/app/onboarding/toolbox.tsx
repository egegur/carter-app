import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { CarterBubble } from '@/components/carter';
import { StepHeader } from '@/components/header';
import { ToggleRow } from '@/components/list-row';
import { Screen } from '@/components/screen';
import { colors, fonts, radius, space } from '@/theme/tokens';

/** Adım 5: araç kutusu (ceza yok, kullanıcı seçer) */
export default function ToolboxScreen() {
  const [reward, setReward] = useState(true);
  const [friction, setFriction] = useState(true);
  const [team, setTeam] = useState(false);
  // MOCK: uygulama seçimi iOS'ta FamilyActivityPicker, Android'de UsageStats listesiyle yapılacak.
  const apps = ['Instagram', 'TikTok'];

  return (
    <Screen
      header={<StepHeader step={5} total={5} />}
      footer={<Button title="Kurulumu bitir" href="/onboarding/paywall" />}>
      <CarterBubble message="İş yapılmadığında seni cezalandırmam. Ama istersen şunları kullanırım." />

      <Card>
        <ToggleRow
          title="Zevk emaneti"
          subtitle="Sevdiğin bir şey, işin bitince açılır."
          value={reward}
          onChange={setReward}
        />
      </Card>

      <Card>
        <ToggleRow
          title="Kademeli frenleme"
          subtitle="Bu uygulamaları açınca önce bugünkü işin görünür, bekleme her seferinde uzar."
          value={friction}
          onChange={setFriction}
        />
        {friction ? (
          <View style={styles.apps}>
            {apps.map((a) => (
              <View key={a} style={styles.app}>
                <AppText style={styles.appText}>{a}</AppText>
              </View>
            ))}
            <Button title="+ Uygulama seç" variant="dashed" disabled style={styles.add} />
          </View>
        ) : null}
      </Card>

      <Card>
        <ToggleRow
          title="Takım serisi"
          subtitle="Bir arkadaşınla ortak seri. Biri kaçırırsa diğeri dürter."
          value={team}
          onChange={setTeam}
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  apps: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, alignItems: 'center' },
  app: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.pill,
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
  },
  appText: { fontFamily: fonts.semibold, fontSize: 13, color: colors.accentInk },
  add: { minHeight: 36, paddingHorizontal: space.md },
});
