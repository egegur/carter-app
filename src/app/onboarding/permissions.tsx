import { useState } from 'react';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { CarterBubble } from '@/components/carter';
import { StepHeader } from '@/components/header';
import { Screen } from '@/components/screen';
import { colors } from '@/theme/tokens';

type PermissionKey = 'notifications' | 'screenTime' | 'health';

const PERMISSIONS: { key: PermissionKey; title: string; body: string }[] = [
  { key: 'notifications', title: 'Bildirimler', body: 'Sabah planı ve hesap saatlerinde sana yazabilmem için.' },
  {
    key: 'screenTime',
    title: 'Ekran Süresi',
    body: 'Seçtiğin uygulamalarda fazla kaldığında araya girebilmem için. Neye baktığını göremem.',
  },
  { key: 'health', title: 'Sağlık: adım sayısı', body: 'Hareket hedeflerinde senin yerine kanıt toplamam için.' },
];

/** Adım 4: izinler */
export default function PermissionsScreen() {
  // MOCK: gerçek izin istekleri native modüllerle gelecek (docs/TASKS.md).
  const [granted, setGranted] = useState<Record<PermissionKey, boolean>>({
    notifications: false,
    screenTime: false,
    health: false,
  });

  return (
    <Screen
      header={<StepHeader step={4} total={5} />}
      footer={
        <>
          <Button title="Devam" href="/onboarding/toolbox" />
          <Button title="Şimdilik geç" variant="ghost" href="/onboarding/toolbox" />
        </>
      }>
      <CarterBubble message="Seni doğru anda dürtebilmem için üç şeye ihtiyacım var. Hepsini sonra da açabilirsin." />
      {PERMISSIONS.map((p) => (
        <Card key={p.key}>
          <AppText variant="bodyStrong">{p.title}</AppText>
          <AppText variant="caption" color={colors.muted}>
            {p.body}
          </AppText>
          <Button
            title={granted[p.key] ? 'Açık' : 'İzin ver'}
            variant="secondary"
            disabled={granted[p.key]}
            onPress={() => setGranted((g) => ({ ...g, [p.key]: true }))}
          />
        </Card>
      ))}
    </Screen>
  );
}
