import { View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { CarterBubble } from '@/components/carter';
import { Field } from '@/components/field';
import { StepHeader } from '@/components/header';
import { ChipGroup } from '@/components/option';
import { Screen } from '@/components/screen';
import { actions, useAppState, type Tone } from '@/state/app-store';
import { colors, space } from '@/theme/tokens';

const TONES = [
  { value: 'soft', label: 'Yumuşak' },
  { value: 'friendly', label: 'Samimi' },
  { value: 'tough', label: 'Sert' },
] as const satisfies readonly { value: Tone; label: string }[];

/** Adım 3: neden çapası ve Carter'ın tonu */
export default function WhyScreen() {
  const profile = useAppState((s) => s.profile);

  return (
    <Screen
      header={<StepHeader step={3} total={5} />}
      footer={<Button title="Devam" disabled={profile.why.trim().length < 3} href="/onboarding/permissions" />}>
      <CarterBubble message="Bunu gerçekten neden istiyorsun? Zor günlerde sana kendi sözünü ve sesini hatırlatacağım." />

      <Field
        label="Nedenin"
        multiline
        placeholder="Örn. Terfi değerlendirmesinden önce işlerimi son dakikaya bırakmadan, zamanında ve iyi teslim etmek istiyorum."
        value={profile.why}
        onChangeText={(why) => actions.updateProfile({ why })}
      />

      <Card>
        <AppText variant="bodyStrong">Sesinle de söyle</AppText>
        <AppText variant="caption" color={colors.muted}>
          En fazla 25 saniye. Kayıt sadece telefonunda saklanır.
        </AppText>
        {/* TODO(native): expo-audio ile 25 sn kayıt, cihazda saklama (docs/TASKS.md). */}
        <Button title="Ses kaydı yakında" variant="secondary" disabled />
      </Card>

      <View style={{ gap: space.sm }}>
        <AppText variant="label">Seninle nasıl konuşayım?</AppText>
        <ChipGroup options={TONES} value={profile.tone} onChange={(tone) => actions.updateProfile({ tone })} />
        <AppText variant="caption" color={colors.muted}>
          İstediğin zaman değiştirebilirsin.
        </AppText>
      </View>
    </Screen>
  );
}
