import { Tabs } from 'expo-router/js-tabs';

import { Icon, type IconName } from '@/components/icon';
import { colors, fonts } from '@/theme/tokens';

/**
 * Web için sekme düzeni. NativeTabs'in web sürümü üstte durup içeriği örttüğü için
 * web'de klasik alt sekme çubuğu kullanıyoruz. Native (iOS/Android) _layout.tsx'i kullanır.
 */
const TABS: { name: string; title: string; icon: IconName }[] = [
  { name: 'index', title: 'Bugün', icon: 'home' },
  { name: 'challenges', title: 'Challenge', icon: 'trophy' },
  { name: 'progress', title: 'İlerleme', icon: 'chart' },
  { name: 'profile', title: 'Profil', icon: 'person' },
];

export default function TabsLayoutWeb() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontFamily: fonts.semibold, fontSize: 11, lineHeight: 14 },
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, height: 64, paddingBottom: 8 },
      }}>
      {TABS.map((t) => (
        <Tabs.Screen
          key={t.name}
          name={t.name}
          options={{
            title: t.title,
            tabBarIcon: ({ color }) => <Icon name={t.icon} size={22} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}
