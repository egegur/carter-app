import { router } from 'expo-router';
import { View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { CarterBubble } from '@/components/carter';
import { Field } from '@/components/field';
import { StepHeader } from '@/components/header';
import { ChipGroup } from '@/components/option';
import { Screen } from '@/components/screen';
import { useFormErrors } from '@/hooks/use-form-errors';
import { actions, useAppState, type Tone } from '@/state/app-store';
import { colors, space } from '@/theme/tokens';
import { checkText, TEXT_RULES } from '@/utils/validation';

const TONES = [
  { value: 'soft', label: 'Yumuşak' },
  { value: 'friendly', label: 'Samimi' },
  { value: 'tough', label: 'Sert' },
] as const satisfies readonly { value: Tone; label: string }[];

/** Adım 3: neden çapası ve Carter'ın tonu */
export default function WhyScreen() {
  const profile = useAppState((s) => s.profile);
  const form = useFormErrors({ why: checkText(profile.why, TEXT_RULES.why) });

  return (
    <Screen
      header={<StepHeader step={3} total={5} />}
      footer={<Button title="Devam" onPress={() => form.submit(() => router.push('/onboarding/permissions'))} />}>
      <CarterBubble message="Bunu gerçekten neden istiyorsun? Zor günlerde sana kendi sözünü ve sesini hatırlatacağım." />

      <Field
        label="Nedenin"
        hint="Kendi cümlenle yaz; zor günde bunu okuyacaksın."
        multiline
        maxLength={TEXT_RULES.why.maxLength}
        placeholder="Örn. Terfi değerlendirmesinden önce işlerimi son dakikaya bırakmadan, zamanında ve iyi teslim etmek istiyorum."
        value={profile.why}
        error={form.errorFor('why')}
        onChangeText={(why) => actions.updateProfile({ why })}
        onBlur={() => form.touch('why')}
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
