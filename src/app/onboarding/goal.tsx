import { router, useLocalSearchParams } from 'expo-router';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { CarterBubble } from '@/components/carter';
import { Field } from '@/components/field';
import { FrequencyPicker } from '@/components/frequency-picker';
import { StepHeader } from '@/components/header';
import { Screen } from '@/components/screen';
import { categoryDisplay, categoryInfo } from '@/content/categories';
import { checkFrequency } from '@/content/frequency';
import { useFormErrors } from '@/hooks/use-form-errors';
import { actions, EMPTY_GOAL, useAppState } from '@/state/app-store';
import { colors } from '@/theme/tokens';
import { trUpper } from '@/utils/format';
import { checkText, TEXT_RULES } from '@/utils/validation';

/** Adım 2: seçilen her alan için hedef, sıklık ve en küçük adım. ?i= kaçıncı alan olduğunu söyler. */
export default function GoalScreen() {
  const { i } = useLocalSearchParams<{ i?: string }>();
  const index = Number(i) || 0;
  const categories = useAppState((s) => s.profile.categories);
  const goals = useAppState((s) => s.profile.goals);
  const otherLabel = useAppState((s) => s.profile.otherLabel);

  const category = categories[index] ?? categories[0] ?? 'other';
  const info = categoryInfo(category);
  const display = categoryDisplay(category, otherLabel);
  const goal = goals[category] ?? EMPTY_GOAL;
  const total = categories.length;

  const form = useFormErrors({
    text: checkText(goal.text, TEXT_RULES.goal),
    frequency: checkFrequency(goal.frequency),
    smallestStep: checkText(goal.smallestStep, TEXT_RULES.smallestStep),
  });

  const next = () =>
    form.submit(() => {
      if (index + 1 < total) router.push({ pathname: '/onboarding/goal', params: { i: String(index + 1) } });
      else router.push('/onboarding/why');
    });

  return (
    <Screen
      header={<StepHeader step={2} total={5} />}
      footer={<Button title={index + 1 < total ? 'Sıradaki hedef' : 'Devam'} onPress={next} />}>
      {total > 1 ? (
        <AppText variant="overline" color={colors.accent}>
          {`HEDEF ${index + 1} / ${total} · ${trUpper(display.label)}`}
        </AppText>
      ) : null}

      <CarterBubble message={`${display.lead} tam olarak neyi, ne sıklıkla yapmak istiyorsun?`} />

      <Field
        label="Hedefin"
        placeholder={info.goalPlaceholder}
        maxLength={TEXT_RULES.goal.maxLength}
        value={goal.text}
        error={form.errorFor('text')}
        onChangeText={(text) => actions.updateGoal(category, { text })}
        onBlur={() => form.touch('text')}
      />

      <FrequencyPicker
        value={goal.frequency}
        onChange={(frequency) => actions.updateGoal(category, { frequency })}
        error={form.errorFor('frequency')}
      />

      <Field
        label="Kötü bir günde bile yapabileceğin en küçük adım"
        hint="Zor anlarda seni buradan başlatacağım."
        placeholder={info.stepPlaceholder}
        maxLength={TEXT_RULES.smallestStep.maxLength}
        value={goal.smallestStep}
        error={form.errorFor('smallestStep')}
        onChangeText={(smallestStep) => actions.updateGoal(category, { smallestStep })}
        onBlur={() => form.touch('smallestStep')}
      />
    </Screen>
  );
}
