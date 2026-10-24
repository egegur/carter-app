import { router } from 'expo-router';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { CarterBubble } from '@/components/carter';
import { BackHeader } from '@/components/header';
import { ListRow } from '@/components/list-row';
import { Screen } from '@/components/screen';
import { weekly } from '@/data/mock';
import { colors } from '@/theme/tokens';
import { withPossessiveAccusative } from '@/utils/format';

/** Haftalık özet */
export default function WeeklyScreen() {
  const diff =
    weekly.diffFromLastWeek > 0
      ? ` Geçen haftadan ${weekly.diffFromLastWeek} fazla.`
      : weekly.diffFromLastWeek < 0
        ? ` Geçen haftadan ${-weekly.diffFromLastWeek} eksik; sorun değil.`
        : '';

  return (
    <Screen
      header={<BackHeader title="Haftalık özet" />}
      footer={<Button title="Gelecek haftayı planla" onPress={() => router.push('/checkin')} />}>
      <AppText variant="title">Haftan</AppText>

      <CarterBubble
        message={`Bu hafta ${weekly.total} işin ${withPossessiveAccusative(weekly.done)} bitirdin.${diff}`}
      />

      <Card>
        <ListRow title="En iyi günün" value={weekly.bestDay} />
        <ListRow title="En sık engel" value={weekly.topBlocker} />
        <ListRow title="En çok işe yarayan" value={weekly.bestTool} />
      </Card>

      <Card tone="soft">
        <AppText variant="overline" color={colors.accentInkMuted}>
          GELECEK HAFTA İÇİN ÖNERİM
        </AppText>
        <AppText variant="bodyStrong" color={colors.accentInk}>
          {weekly.suggestion}
        </AppText>
      </Card>
    </Screen>
  );
}
