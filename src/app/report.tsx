import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { CarterBubble } from '@/components/carter';
import { BackHeader } from '@/components/header';
import { OptionList } from '@/components/option';
import { Screen } from '@/components/screen';
import { actions, useTask } from '@/state/app-store';
import { colors } from '@/theme/tokens';

type Answer = 'done' | 'partial' | 'notDone';

/** Hesap verme: "Saat geldi, iş ne durumda?" */
export default function ReportScreen() {
  const { id, proof, minutes } = useLocalSearchParams<{ id?: string; proof?: string; minutes?: string }>();
  const task = useTask(id);
  const [answer, setAnswer] = useState<Answer | null>(null);

  const focusMinutes = Number(minutes);
  const proofNote =
    proof === 'focus' && focusMinutes > 0 ? `Kanıt: ${focusMinutes} dakikalık odak seansı eklendi` : undefined;

  const options = [
    { value: 'done', label: 'Bitirdim', description: proofNote },
    { value: 'partial', label: 'Kısmen yaptım' },
    { value: 'notDone', label: 'Yapamadım' },
  ] as const satisfies readonly { value: Answer; label: string; description?: string }[];

  const submit = () => {
    if (!task) return router.dismissTo('/');
    // MOCK: cevap sunucuya gidecek; "kısmen" için Carter bir sonraki adımı önerecek.
    if (answer === 'done') {
      actions.completeTask(task.id);
      router.dismissTo('/');
    } else if (answer === 'notDone') {
      router.replace({ pathname: '/missed', params: { id: task.id } });
    } else {
      router.dismissTo('/');
    }
  };

  return (
    <Screen
      header={
        <BackHeader
          title="Hesap randevusu"
          right={
            <AppText variant="caption" color={colors.muted}>
              60 saniye
            </AppText>
          }
        />
      }
      footer={<Button title="Gönder" disabled={!answer} onPress={submit} />}>
      <CarterBubble message={task ? `Saat geldi. ${task.title} ne durumda?` : 'Bugün açık işin kalmadı.'} />
      {task ? <OptionList options={options} value={answer} onChange={setAnswer} /> : null}
    </Screen>
  );
}
