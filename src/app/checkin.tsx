import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { CarterBubble } from '@/components/carter';
import { Field } from '@/components/field';
import { BackHeader } from '@/components/header';
import { ChipGroup } from '@/components/option';
import { Screen } from '@/components/screen';
import type { ProofType } from '@/data/mock';
import { useAppState } from '@/state/app-store';
import { colors, space } from '@/theme/tokens';

const PROOFS = [
  { value: 'focus', label: 'Odak seansı' },
  { value: 'photo', label: 'Fotoğraf' },
  { value: 'word', label: 'Sözüm' },
] as const satisfies readonly { value: ProofType; label: string }[];

const MAX_TASKS = 3;

/** Sabah planı: ne, ne zaman, nerede + kanıt türü */
export default function CheckInScreen() {
  const name = useAppState((s) => s.profile.name);
  const [what, setWhat] = useState('Rapor taslağı');
  const [when, setWhen] = useState('09:30');
  const [where, setWhere] = useState('Ofis');
  const [proof, setProof] = useState<ProofType>('focus');
  const [extras, setExtras] = useState<string[]>([]);

  const ready = what.trim() && when.trim() && where.trim();
  // Doğal Türkçe cümleyi ileride sunucudaki koç üretecek; şimdilik ek gerektirmeyen bir kalıp.
  const promise = `Saat ${when || '…'} olunca ${what || '…'} işine başlayacağım. Yer: ${where || '…'}.`;

  return (
    <Screen
      header={<BackHeader title="Sabah planı · 08:30" />}
      footer={
        <Button
          title="Planı onayla"
          disabled={!ready}
          // MOCK: plan sunucuya kaydedilecek ve hatırlatmalar kurulacak.
          onPress={() => router.back()}
        />
      }>
      <CarterBubble
        message={`Günaydın ${name}! Bugünün işi ne, ne zaman, nerede? Üçünü söylersen başlamak çok daha kolay oluyor.`}
      />

      <Field label="Ne yapacaksın?" value={what} onChangeText={setWhat} placeholder="Örn. Rapor taslağı" />
      <View style={{ flexDirection: 'row', gap: space.sm }}>
        <View style={{ flex: 1 }}>
          <Field label="Ne zaman?" value={when} onChangeText={setWhen} placeholder="09:30" />
        </View>
        <View style={{ flex: 1 }}>
          <Field label="Nerede?" value={where} onChangeText={setWhere} placeholder="Ofis" />
        </View>
      </View>

      <View style={{ gap: space.sm }}>
        <AppText variant="label">Nasıl göstereceksin?</AppText>
        <ChipGroup options={PROOFS} value={proof} onChange={setProof} />
      </View>

      <Card tone="soft">
        <AppText variant="overline" color={colors.accentInkMuted}>
          BUGÜNKÜ SÖZÜN
        </AppText>
        <AppText variant="bodyStrong" color={colors.accentInk}>
          {promise}
        </AppText>
      </Card>

      {extras.map((value, i) => (
        <Field
          key={i}
          label={`${i + 2}. iş`}
          value={value}
          onChangeText={(t) => setExtras((list) => list.map((v, j) => (j === i ? t : v)))}
          placeholder="Örn. Akşam yürüyüşü"
        />
      ))}

      {extras.length + 1 < MAX_TASKS ? (
        <Button
          title={`+ İş ekle (en fazla ${MAX_TASKS})`}
          variant="dashed"
          onPress={() => setExtras((list) => [...list, ''])}
        />
      ) : null}
    </Screen>
  );
}
