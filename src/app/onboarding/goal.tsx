import { View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { CarterBubble } from '@/components/carter';
import { Field } from '@/components/field';
import { StepHeader } from '@/components/header';
import { ChipGroup } from '@/components/option';
import { Screen } from '@/components/screen';
import { actions, useAppState, type Frequency } from '@/state/app-store';
import { space } from '@/theme/tokens';

const FREQUENCIES = [
  { value: 'daily', label: 'Her gün' },
  { value: 'weekdays', label: 'Hafta içi' },
  { value: 'three', label: 'Haftada 3' },
] as const satisfies readonly { value: Frequency; label: string }[];

/** Adım 2: hedef, sıklık ve en küçük adım */
export default function GoalScreen() {
  const profile = useAppState((s) => s.profile);

  return (
    <Screen
      header={<StepHeader step={2} total={5} />}
      footer={<Button title="Devam" disabled={profile.goal.trim().length < 3} href="/onboarding/why" />}>
      <CarterBubble message="Tam olarak neyi, ne sıklıkla yapmak istiyorsun?" />

      <Field
        label="Hedefin"
        placeholder="Örn. Her gün 25 dakika rapora çalışmak"
        value={profile.goal}
        onChangeText={(goal) => actions.updateProfile({ goal })}
      />

      <View style={{ gap: space.sm }}>
        <AppText variant="label">Ne sıklıkla?</AppText>
        <ChipGroup
          options={FREQUENCIES}
          value={profile.frequency}
          onChange={(frequency) => actions.updateProfile({ frequency })}
        />
      </View>

      <Field
        label="Kötü bir günde bile yapabileceğin en küçük adım"
        hint="Zor anlarda seni buradan başlatacağım."
        placeholder="Örn. Raporun ilk başlığını yazmak"
        value={profile.smallestStep}
        onChangeText={(smallestStep) => actions.updateProfile({ smallestStep })}
      />
    </Screen>
  );
}
