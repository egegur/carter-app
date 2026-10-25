import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/plus-jakarta-sans';
import * as Notifications from 'expo-notifications';
import { router, Stack, type Href } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { isSupported } from '@/services/notifications';
import { hydrate, useAppState } from '@/state/app-store';
import { colors } from '@/theme/tokens';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });
  const onboarded = useAppState((s) => s.onboarded);
  const hydrated = useAppState((s) => s.hydrated);
  const ready = (fontsLoaded || fontError !== null) && hydrated;

  useEffect(() => {
    hydrate();
  }, []);

  // Bildirime dokununca ilgili ekranı aç (kurulum bitmişse).
  useEffect(() => {
    if (!isSupported || !ready || !onboarded) return;
    const open = (response: Notifications.NotificationResponse | null) => {
      const url = response?.notification.request.content.data?.url;
      if (typeof url === 'string' && url.startsWith('/')) router.push(url as Href);
    };
    Notifications.getLastNotificationResponseAsync().then(open).catch(() => {});
    const sub = Notifications.addNotificationResponseReceivedListener(open);
    return () => sub.remove();
  }, [ready, onboarded]);

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.ground } }}>
        {/* Hukuki metinler her zaman açılabilir (kurulumda da gerekir). */}
        <Stack.Screen name="legal/[doc]" options={{ presentation: 'modal' }} />

        {/* Kurulum bitmeden sadece kurulum ekranları açılır. */}
        <Stack.Protected guard={!onboarded}>
          <Stack.Screen name="onboarding" />
        </Stack.Protected>

        <Stack.Protected guard={onboarded}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="checkin" />
          <Stack.Screen name="focus" options={{ gestureEnabled: false }} />
          <Stack.Screen name="report" />
          <Stack.Screen name="proof" options={{ presentation: 'fullScreenModal' }} />
          <Stack.Screen name="missed" />
          <Stack.Screen name="day-close" />
          <Stack.Screen name="chat" />
          <Stack.Screen name="duel" />
          <Stack.Screen name="team-streak" />
          <Stack.Screen name="community" />
          <Stack.Screen name="weekly" />
        </Stack.Protected>
      </Stack>
    </>
  );
}
