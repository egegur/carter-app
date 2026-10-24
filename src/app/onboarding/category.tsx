import { router } from 'expo-router';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { CarterBubble } from '@/components/carter';
import { StepHeader } from '@/components/header';
import { Field } from '@/components/field';
import { CheckList } from '@/components/option';
import { Screen } from '@/components/screen';
import { CATEGORIES } from '@/content/categories';
import { useFormErrors } from '@/hooks/use-form-errors';
import { actions, useAppState } from '@/state/app-store';
import { colors } from '@/theme/tokens';
import { checkText, TEXT_RULES } from '@/utils/validation';

/** Adım 1: alan seçimi (çoklu) */
export default function CategoryScreen() {
  const categories = useAppState((s) => s.profile.categories);
  const otherLabel = useAppState((s) => s.profile.otherLabel);
  const hasOther = categories.includes('other');
  const form = useFormErrors({
    categories: categories.length === 0 ? 'En az bir alan seç.' : null,
    otherLabel: hasOther ? checkText(otherLabel, TEXT_RULES.task) : null,
  });

  return (
    <Screen
      header={<StepHeader step={1} total={5} />}
      footer={
        <Button
          title={categories.length > 1 ? `${categories.length} alanla devam et` : 'Devam'}
          onPress={() => form.submit(() => router.push({ pathname: '/onboarding/goal', params: { i: '0' } }))}
        />
      }>
      <CarterBubble message="Neleri erteliyorsun? Birden fazla seçebilirsin; her biri için ayrı hedef koyacağız." />
      <CheckList options={CATEGORIES} values={categories} onToggle={actions.toggleCategory} />
      {hasOther ? (
        <Field
          label="Başka ne erteliyorsun?"
          placeholder="Örn. Kitap okumak, gitar çalışmak"
          maxLength={TEXT_RULES.task.maxLength}
          value={otherLabel}
          error={form.errorFor('otherLabel')}
          onChangeText={(otherLabel) => actions.updateProfile({ otherLabel })}
          onBlur={() => form.touch('otherLabel')}
        />
      ) : null}
      {form.errorFor('categories') ? (
        <AppText variant="caption" color={colors.danger} accessibilityLiveRegion="polite">
          {form.errorFor('categories')}
        </AppText>
      ) : null}
    </Screen>
  );
}
