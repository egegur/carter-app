import { Button } from '@/components/button';
import { CarterBubble } from '@/components/carter';
import { StepHeader } from '@/components/header';
import { OptionList } from '@/components/option';
import { Screen } from '@/components/screen';
import { actions, useAppState, type Category } from '@/state/app-store';

const OPTIONS = [
  { value: 'sport', label: 'Spor' },
  { value: 'nutrition', label: 'Sağlıklı beslenme' },
  { value: 'work', label: 'İş' },
  { value: 'study', label: 'Ders ve öğrenme' },
  { value: 'home', label: 'Ev işleri' },
  { value: 'other', label: 'Başka bir şey' },
] as const satisfies readonly { value: Category; label: string }[];

/** Adım 1: alan seçimi */
export default function CategoryScreen() {
  const category = useAppState((s) => s.profile.category);

  return (
    <Screen
      header={<StepHeader step={1} total={5} />}
      footer={<Button title="Devam" disabled={!category} href="/onboarding/goal" />}>
      <CarterBubble message="En çok neyi erteliyorsun? Bir tanesiyle başlayalım, sonra ekleriz." />
      <OptionList options={OPTIONS} value={category} onChange={(c) => actions.updateProfile({ category: c })} />
    </Screen>
  );
}
