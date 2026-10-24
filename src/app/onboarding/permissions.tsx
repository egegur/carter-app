import { useState } from 'react';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { CarterBubble } from '@/components/carter';
import { ConsentCheck, LegalLink } from '@/components/consent';
import { StepHeader } from '@/components/header';
import { Screen } from '@/components/screen';
import { categoryInfo, type Category } from '@/content/categories';
import { requestPermission } from '@/services/notifications';
import { actions, useAppState } from '@/state/app-store';
import { colors } from '@/theme/tokens';

type PermissionKey = 'notifications' | 'screenTime' | 'health';

type Permission = { key: PermissionKey; title: string; body: string };

const NOTIFICATIONS: Permission = {
  key: 'notifications',
  title: 'Bildirimler',
  body: 'Sabah planı ve hesap saatlerinde sana yazabilmem için.',
};
const SCREEN_TIME: Permission = {
  key: 'screenTime',
  title: 'Ekran Süresi',
  body: 'Seçtiğin uygulamalarda fazla kaldığında araya girebilmem için. Hangi uygulamada ne yaptığını göremem; bu bilgi telefonundan çıkmaz.',
};
const HEALTH: Permission = {
  key: 'health',
  title: 'Sağlık: adım sayısı',
  body: 'Hareket hedeflerinde senin yerine kanıt toplamam için. Sadece günlük toplam adım sayını okurum.',
};

const COUNT_WORD = ['', 'bir', 'iki', 'üç'];

/** Seçilen alanlara göre gereken izinler. Adım sayısı sadece hareketle ilgili alanlarda istenir. */
function permissionsFor(categories: Category[]): Permission[] {
  const list = [NOTIFICATIONS, SCREEN_TIME];
  if (categories.some((c) => categoryInfo(c).usesSteps)) list.push(HEALTH);
  return list;
}

/** Adım 4: izinler */
export default function PermissionsScreen() {
  const categories = useAppState((s) => s.profile.categories);
  const healthConsent = useAppState((s) => s.profile.healthConsent);
  const [granted, setGranted] = useState<Partial<Record<PermissionKey, boolean>>>({});
  const [denied, setDenied] = useState(false);

  const permissions = permissionsFor(categories);

  const grant = async (key: PermissionKey) => {
    if (key === 'notifications') {
      const result = await requestPermission();
      // Web önizlemesinde bildirim yok; akış devam etsin diye açık sayılır.
      setGranted((g) => ({ ...g, notifications: result !== 'denied' }));
      if (result === 'denied') setDenied(true);
      return;
    }
    // MOCK: Ekran Süresi ve Sağlık izinleri native modülle gelecek (docs/TASKS.md).
    setGranted((g) => ({ ...g, [key]: true }));
  };

  return (
    <Screen
      header={<StepHeader step={4} total={5} />}
      footer={
        <>
          <Button title="Devam" href="/onboarding/toolbox" />
          <Button title="Şimdilik geç" variant="ghost" href="/onboarding/toolbox" />
        </>
      }>
      <CarterBubble
        message={`Seni doğru anda dürtebilmem için ${COUNT_WORD[permissions.length]} izne ihtiyacım var. Hepsini sonra da açabilirsin.`}
      />

      {permissions.map((p) => {
        const isHealth = p.key === 'health';
        // Sağlık verisi için açık rıza şart (KVKK m.6); rıza yoksa izin istenmez.
        const blocked = isHealth && !healthConsent;
        return (
          <Card key={p.key}>
            <AppText variant="bodyStrong">{p.title}</AppText>
            <AppText variant="caption" color={colors.muted}>
              {p.body}
            </AppText>
            {isHealth ? (
              <ConsentCheck
                checked={healthConsent}
                onChange={(healthConsent) => actions.updateProfile({ healthConsent })}
                label="Adım sayımın hedeflerimi takip etmek için işlenmesine açık rıza veriyorum."
                doc="acik-riza-saglik"
                docLabel="Açık rıza metnini oku"
              />
            ) : null}
            <Button
              title={granted[p.key] ? 'Açık' : 'İzin ver'}
              variant="secondary"
              disabled={granted[p.key] || blocked}
              onPress={() => grant(p.key)}
            />
          </Card>
        );
      })}

      {denied ? (
        <AppText variant="caption" color={colors.muted} accessibilityLiveRegion="polite">
          Bildirim izni kapalı. Sonra telefonunun Ayarlar → Carter → Bildirimler bölümünden açabilirsin.
        </AppText>
      ) : null}

      <AppText variant="caption" color={colors.muted} align="center">
        Verilerinin nasıl işlendiğini <LegalLink doc="aydinlatma" label="Aydınlatma Metni" />
        &apos;nde okuyabilirsin.
      </AppText>
    </Screen>
  );
}
