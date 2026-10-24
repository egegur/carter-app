import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Card } from '@/components/card';
import { BackHeader } from '@/components/header';
import { Screen } from '@/components/screen';
import { LEGAL_DOCS, type LegalDocKey } from '@/content/legal';
import { colors, space } from '@/theme/tokens';

/** Hukuki metin görüntüleyici (aydınlatma, açık rıza, kullanım şartları). Kurulumdan da açılır. */
export default function LegalScreen() {
  const { doc } = useLocalSearchParams<{ doc: string }>();
  const content = doc in LEGAL_DOCS ? LEGAL_DOCS[doc as LegalDocKey] : null;

  return (
    <Screen header={<BackHeader title={content?.title ?? 'Metin bulunamadı'} />}>
      {content ? (
        <>
          {/* Avukat kontrolü bitince bu kart kaldırılacak. */}
          <Card tone="warm">
            <AppText variant="caption" color={colors.warmInk}>
              Taslak metin. Yayından önce hukuk kontrolünden geçecek.
            </AppText>
          </Card>
          {content.sections.map((s) => (
            <View key={s.heading} style={{ gap: space.sm }}>
              <AppText variant="heading">{s.heading}</AppText>
              {s.body.map((p, i) => (
                <AppText key={i} variant="body" color={colors.ink}>
                  {p}
                </AppText>
              ))}
            </View>
          ))}
        </>
      ) : (
        <AppText color={colors.muted}>Bu metin bulunamadı.</AppText>
      )}
    </Screen>
  );
}
