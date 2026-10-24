import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/screen';
import { scheduleAll } from '@/services/notifications';
import { actions, getProfile } from '@/state/app-store';
import { colors, fonts, radius, space } from '@/theme/tokens';

const BENEFITS = [
  'Seni tanıyan, sana özel konuşan koç',
  'Odak seansları ve hesap randevuları',
  'Challenge, düello ve takım serisi',
];

// Fiyatlar henüz belli değil; mağaza ürünleri tanımlanınca RevenueCat'ten okunacak.
const PLANS = [
  { key: 'yearly', title: 'Yıllık', price: '[YILLIK FİYAT]', badge: 'En avantajlı' },
  { key: 'monthly', title: 'Aylık', price: '[AYLIK FİYAT]' },
] as const;

type PlanKey = (typeof PLANS)[number]['key'];

/** Deneme ve abonelik */
export default function PaywallScreen() {
  const [plan, setPlan] = useState<PlanKey>('yearly');

  const finish = () => {
    // MOCK: satın alma / deneme başlatma RevenueCat ile gelecek (docs/TASKS.md).
    actions.finishOnboarding();
    scheduleAll(getProfile());
    router.replace('/');
  };

  return (
    <Screen
      footer={
        <>
          <Button title="1 ay ücretsiz başla" onPress={finish} />
          <Button title="Ücretsiz sürümle devam et" variant="ghost" onPress={finish} />
        </>
      }>
      <View style={{ gap: space.sm, paddingTop: space.xxl }}>
        <AppText variant="display">İlk ay benden.</AppText>
        <AppText color={colors.muted}>
          1 ay boyunca her şeyi ücretsiz kullan. Sonra devam edip etmemek senin kararın.
        </AppText>
      </View>

      <View style={{ gap: space.md }}>
        {BENEFITS.map((b) => (
          <View key={b} style={styles.benefit}>
            <Icon name="check" size={18} color={colors.accent} />
            <AppText variant="label" style={{ flex: 1 }}>
              {b}
            </AppText>
          </View>
        ))}
      </View>

      <View accessibilityRole="radiogroup" style={{ gap: space.sm }}>
        {PLANS.map((p) => {
          const selected = plan === p.key;
          return (
            <Pressable
              key={p.key}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              onPress={() => setPlan(p.key)}
              style={[styles.plan, selected && styles.planSelected]}>
              <View style={{ flex: 1, gap: 2 }}>
                <AppText variant="bodyStrong">{p.title}</AppText>
                {'badge' in p ? <AppText style={styles.badge}>{p.badge}</AppText> : null}
              </View>
              <AppText variant="label">{p.price}</AppText>
            </Pressable>
          );
        })}
      </View>

      <AppText variant="caption" color={colors.muted} align="center">
        Deneme bitmeden 1 gün önce sana hatırlatırım. İstediğin zaman iptal edebilirsin.
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  benefit: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  plan: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 64,
    padding: space.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  planSelected: { borderWidth: 2, borderColor: colors.accent },
  badge: { fontFamily: fonts.bold, fontSize: 12, color: colors.accent },
});
