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
import { useFormErrors } from '@/hooks/use-form-errors';
import { useAppState, useTask } from '@/state/app-store';
import { colors, space } from '@/theme/tokens';
import { checkText, checkTime, normalizeTime, TEXT_RULES, trLower } from '@/utils/validation';

const stripEndDot = (t: string) => t.trim().replace(/[.!\s]+$/, '');
// Cümle içine alırken ilk harfi küçült; "IELTS" gibi kısaltmalara dokunma.
const trLowerFirst = (t: string) => (!t || /^[A-ZÇĞİÖŞÜ]{2}/.test(t) ? t : trLower(t.charAt(0)) + t.slice(1));

const PROOFS = [
  { value: 'focus', label: 'Odak seansı' },
  { value: 'photo', label: 'Fotoğraf' },
  { value: 'word', label: 'Sözüm' },
] as const satisfies readonly { value: ProofType; label: string }[];

const MAX_TASKS = 3;

/** Sabah planı: ne, ne zaman, nerede + kanıt türü */
export default function CheckInScreen() {
  const name = useAppState((s) => s.profile.name);
  // Sıradaki işle önceden doldurulur; kullanıcı değiştirebilir.
  const next = useTask(undefined);
  const [what, setWhat] = useState(next?.title ?? '');
  const [when, setWhen] = useState(next?.time ?? '');
  const [where, setWhere] = useState(next?.place ?? '');
  const [proof, setProof] = useState<ProofType>(next?.proof ?? 'focus');
  const [extras, setExtras] = useState<string[]>([]);

  const errors: Record<string, string | null> = {
    what: checkText(what, TEXT_RULES.task),
    when: checkTime(when),
    where: checkText(where, TEXT_RULES.place),
  };
  // Eklenen işler boş bırakılabilir (sayılmaz); yazıldıysa anlamlı olmalı.
  extras.forEach((v, i) => {
    errors[`extra${i}`] = v.trim() ? checkText(v, TEXT_RULES.task) : null;
  });
  const form = useFormErrors(errors);

  // Doğal Türkçe cümleyi ileride sunucudaki koç üretecek; şimdilik ek gerektirmeyen bir kalıp.
  const time = normalizeTime(when) ?? '…';
  const task = trLowerFirst(stripEndDot(what)) || '…';
  const place = stripEndDot(where);
  const promise = `Saat ${time} olunca başlıyorum: ${task}.${place ? ` Yer: ${place}.` : ''}`;

  return (
    <Screen
      header={<BackHeader title="Sabah planı · 08:30" />}
      footer={
        <Button
          title="Planı onayla"
          // MOCK: plan sunucuya kaydedilecek ve hatırlatmalar kurulacak.
          onPress={() => form.submit(() => router.back())}
        />
      }>
      <CarterBubble
        message={`Günaydın ${name}! Bugünün işi ne, ne zaman, nerede? Üçünü söylersen başlamak çok daha kolay oluyor.`}
      />

      <Field
        label="Ne yapacaksın?"
        value={what}
        onChangeText={setWhat}
        onBlur={() => form.touch('what')}
        error={form.errorFor('what')}
        maxLength={TEXT_RULES.task.maxLength}
        placeholder="Örn. Rapor taslağı"
      />
      <View style={{ flexDirection: 'row', gap: space.sm }}>
        <View style={{ flex: 1 }}>
          {/* TODO: native saat seçici (DateTimePicker) gelince serbest metin kalkacak. */}
          <Field
            label="Ne zaman?"
            value={when}
            onChangeText={setWhen}
            onBlur={() => form.touch('when')}
            error={form.errorFor('when')}
            keyboardType="numbers-and-punctuation"
            maxLength={5}
            placeholder="09:30"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Field
            label="Nerede?"
            value={where}
            onChangeText={setWhere}
            onBlur={() => form.touch('where')}
            error={form.errorFor('where')}
            maxLength={TEXT_RULES.place.maxLength}
            placeholder="Ofis"
          />
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
          onBlur={() => form.touch(`extra${i}`)}
          error={form.errorFor(`extra${i}`)}
          maxLength={TEXT_RULES.task.maxLength}
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
