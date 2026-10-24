import { SymbolView } from 'expo-symbols';
import type { ColorValue } from 'react-native';

import { colors } from '@/theme/tokens';

/**
 * Uygulamada kullanılan ikonların tek listesi.
 * iOS'ta SF Symbols, Android ve web'de Material Symbols kullanılır.
 */
const ICONS = {
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  forward: { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  mic: { ios: 'mic.fill', android: 'mic', web: 'mic' },
  play: { ios: 'play.fill', android: 'play_arrow', web: 'play_arrow' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  flame: { ios: 'flame.fill', android: 'local_fire_department', web: 'local_fire_department' },
  send: { ios: 'arrow.up', android: 'send', web: 'send' },
  more: { ios: 'ellipsis', android: 'more_horiz', web: 'more_horiz' },
  // Sekme ikonları (web sekme çubuğu için; native'de NativeTabs kendi ikonlarını kullanır)
  home: { ios: 'house.fill', android: 'home', web: 'home' },
  trophy: { ios: 'trophy.fill', android: 'emoji_events', web: 'emoji_events' },
  chart: { ios: 'chart.bar.fill', android: 'bar_chart', web: 'bar_chart' },
  person: { ios: 'person.crop.circle', android: 'account_circle', web: 'account_circle' },
} as const;

export type IconName = keyof typeof ICONS;

type Props = {
  name: IconName;
  size?: number;
  color?: ColorValue;
};

export function Icon({ name, size = 20, color = colors.ink }: Props) {
  return <SymbolView name={ICONS[name]} size={size} tintColor={color} />;
}
