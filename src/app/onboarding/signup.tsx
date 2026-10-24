import { useState } from 'react';
import { View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Field } from '@/components/field';
import { BackHeader } from '@/components/header';
import { Screen } from '@/components/screen';
import { colors, space } from '@/theme/tokens';

const THIS_YEAR = new Date().getFullYear();

/** Kayıt */
export default function SignupScreen() {
  const [birthYear, setBirthYear] = useState('');
  const year = Number(birthYear);
  const validYear = birthYear.length === 4 && year >= 1920 && year <= THIS_YEAR;

  // TODO(auth): Apple / Google / e-posta girişi sunucu bağlanınca eklenecek (docs/TASKS.md).
  const next = '/onboarding/category' as const;

  return (
    <Screen header={<BackHeader />}>
      <View style={{ gap: space.sm }}>
        <AppText variant="title">Hesabını oluştur</AppText>
        <AppText color={colors.muted}>Serilerin ve hedeflerin telefon değişse de kaybolmasın.</AppText>
      </View>

      <Field
        label="Doğum yılın"
        hint="Sana uygun önerileri ve korumaları ayarlamak için soruyoruz."
        placeholder="Örn. 1996"
        keyboardType="number-pad"
        maxLength={4}
        value={birthYear}
        onChangeText={(t) => setBirthYear(t.replace(/\D/g, ''))}
      />

      <View style={{ gap: space.sm }}>
        <Button title="Apple ile devam et" disabled={!validYear} href={next} />
        <Button title="Google ile devam et" variant="secondary" disabled={!validYear} href={next} />
        <Button title="E-posta ile devam et" variant="secondary" disabled={!validYear} href={next} />
      </View>

      <AppText variant="caption" color={colors.muted} align="center">
        Devam ederek Kullanım Şartları ve Aydınlatma Metni&apos;ni kabul etmiş olursun.
      </AppText>
    </Screen>
  );
}
