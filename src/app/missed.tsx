import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { CarterBubble } from '@/components/carter';
import { BackHeader } from '@/components/header';
import { OptionList } from '@/components/option';
import { Screen } from '@/components/screen';
import { actions, useAppState, useTask } from '@/state/app-store';
import { colors } from '@/theme/tokens';

type Reason = 'time' | 'start' | 'forgot' | 'other';

const REASONS = [
  { value: 'time', label: 'Zamanım olmadı' },
  { value: 'start', label: 'Başlayamadım' },
  { value: 'forgot', label: 'Unuttum' },
  { value: 'other', label: 'Başka bir şey' },
] as const satisfies readonly { value: Reason; label: string }[];

const FALLBACK_STEP = 'Raporun ilk başlığını yaz. Gerisi bonus.';

/** Kaçırma anı: suçlama yok, en küçük adım + joker */
export default function MissedScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const task = useTask(id);
  const smallestStep = useAppState((s) => s.profile.smallestStep.trim()) || FALLBACK_STEP;
  const jokers = useAppState((s) => s.jokersLeft);
  // MOCK: sebep sunucuya gidip haftalık özette "en sık engel" olarak kullanılacak.
  const [reason, setReason] = useState<Reason | null>(null);

  return (
    <Screen header={<BackHeader />}>
      <CarterBubble message="Olur böyle günler, sorun değil. Ne engel oldu?" />
      <OptionList options={REASONS} value={reason} onChange={setReason} />

      <Card tone="warm">
        <AppText variant="overline" color={colors.warmInkMuted}>
          ŞİMDİ SADECE 5 DAKİKA
        </AppText>
        <AppText variant="bodyStrong" color={colors.warmInk}>
          {smallestStep}
        </AppText>
        <Button
          title="Hemen 5 dakika başla"
          onPress={() => router.replace({ pathname: '/focus', params: { id: task?.id, minutes: 5 } })}
        />
      </Card>

      <Card>
        <AppText variant="bodyStrong">
          {jokers > 0 ? `Bu hafta ${jokers} joker hakkın var` : 'Bu haftaki jokerini kullandın'}
        </AppText>
        <AppText variant="caption" color={colors.muted}>
          Serin bozulmaz; yarın iki kat yaparsın.
        </AppText>
        <Button
          title="Jokeri kullan"
          variant="secondary"
          disabled={jokers === 0}
          onPress={() => {
            actions.spendJoker();
            router.dismissTo('/');
          }}
        />
      </Card>

      <Button title="Yarın için planla" variant="ghost" onPress={() => router.dismissTo('/')} />
    </Screen>
  );
}
