import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { LegalLink } from '@/components/consent';
import { Field } from '@/components/field';
import { BackHeader } from '@/components/header';
import { Screen } from '@/components/screen';
import { useFormErrors } from '@/hooks/use-form-errors';
import { colors, space } from '@/theme/tokens';

const THIS_YEAR = new Date().getFullYear();

function checkBirthYear(raw: string): string | null {
  if (!raw) return 'Doğum yılını yaz.';
  const year = Number(raw);
  if (raw.length !== 4 || year < 1920 || year > THIS_YEAR) return '4 haneli doğum yılını yaz (ör. 1996).';
  return null;
}

/** Kayıt */
export default function SignupScreen() {
  const [birthYear, setBirthYear] = useState('');
  const form = useFormErrors({ birthYear: checkBirthYear(birthYear) });

  // TODO(auth): Apple / Google / e-posta girişi sunucu bağlanınca eklenecek (docs/TASKS.md).
  const next = () => form.submit(() => router.push('/onboarding/category'));

  return (
    <Screen header={<BackHeader />}>
      <View style={{ gap: space.sm }}>
        <AppText variant="title">Hesabını oluştur</AppText>
        <AppText color={colors.muted}>Serilerin ve hedeflerin telefon değişse de kaybolmasın.</AppText>
      </View>

      <Field
        label="Doğum yılın"
        hint="Sana uygun önerileri ve korumaları ayarlamak için soruyoruz."
        error={form.errorFor('birthYear')}
        placeholder="Örn. 1996"
        keyboardType="number-pad"
        maxLength={4}
        value={birthYear}
        onChangeText={(t) => setBirthYear(t.replace(/\D/g, ''))}
        onBlur={() => form.touch('birthYear')}
      />

      <View style={{ gap: space.sm }}>
        <Button title="Apple ile devam et" onPress={next} />
        <Button title="Google ile devam et" variant="secondary" onPress={next} />
        <Button title="E-posta ile devam et" variant="secondary" onPress={next} />
      </View>

      <AppText variant="caption" color={colors.muted} align="center">
        Devam ederek <LegalLink doc="kullanim-sartlari" label="Kullanım Şartları" />
        &apos;nı kabul etmiş olursun. Kişisel verilerin <LegalLink doc="aydinlatma" label="Aydınlatma Metni" />
        &apos;nde anlatıldığı gibi işlenir.
      </AppText>
    </Screen>
  );
}
