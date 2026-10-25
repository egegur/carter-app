import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';


import { buildPlan } from '@/content/reminders';
import type { Profile } from '@/state/app-store';

/**
 * Carter'ın hatırlatmaları (telefonda planlanan yerel bildirimler; sunucu gerekmez).
 * Her bildirimin data.url alanı, dokununca açılacak ekranı söyler.
 * Kurulum bittiğinde ve hedefler değiştiğinde scheduleAll() tüm planı baştan kurar.
 */

const CHANNEL_ID = 'carter-reminders';
export const isSupported = Platform.OS === 'ios' || Platform.OS === 'android';

// Uygulama açıkken gelen bildirim de üstte gösterilsin.
if (isSupported) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export type PermissionResult = 'granted' | 'denied' | 'unsupported';

/** Bildirim izni ister. Android 13+ için önce kanal oluşturulmalı. */
export async function requestPermission(): Promise<PermissionResult> {
  if (!isSupported) return 'unsupported';
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
        name: 'Carter hatırlatmaları',
        // eslint-plugin-import iç içe "export *" zincirini çözemiyor; tip kontrolü (tsc) doğruluyor.
        // eslint-disable-next-line import/namespace
        importance: Notifications.AndroidImportance.HIGH,
      });
    }
    const current = await Notifications.getPermissionsAsync();
    if (current.granted) return 'granted';
    const asked = await Notifications.requestPermissionsAsync();
    return asked.granted ? 'granted' : 'denied';
  } catch {
    return 'denied';
  }
}

/** Eski planı siler, yenisini kurar. İzin yoksa hiçbir şey yapmaz. */
export async function scheduleAll(profile: Profile): Promise<number> {
  if (!isSupported) return 0;
  try {
    const perm = await Notifications.getPermissionsAsync();
    if (!perm.granted) return 0;
    await Notifications.cancelAllScheduledNotificationsAsync();
    let count = 0;
    for (const p of buildPlan(profile)) {
      const content = { title: p.title, body: p.body, data: { url: p.url } };
      const channel = Platform.OS === 'android' ? { channelId: CHANNEL_ID } : {};
      if (p.weekdays) {
        for (const weekday of p.weekdays) {
          await Notifications.scheduleNotificationAsync({
            content,
            trigger: { type: Notifications.SchedulableTriggerInputTypes.WEEKLY, weekday, hour: p.hour, minute: p.minute, ...channel },
          });
          count++;
        }
      } else {
        await Notifications.scheduleNotificationAsync({
          content,
          trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: p.hour, minute: p.minute, ...channel },
        });
        count++;
      }
    }
    return count;
  } catch {
    return 0;
  }
}

export async function cancelAll() {
  if (!isSupported) return;
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch {
    // Yoksay.
  }
}
