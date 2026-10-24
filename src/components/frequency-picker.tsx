import { View } from 'react-native';

import { AppText } from '@/components/app-text';
import { ChipGroup, MultiChipGroup } from '@/components/option';
import { DAYS, FREQUENCY_KINDS, PER_WEEK_OPTIONS, type DayKey, type Frequency } from '@/content/frequency';
import { colors, space } from '@/theme/tokens';

type Props = {
  value: Frequency;
  onChange: (value: Frequency) => void;
  error?: string;
};

/** "Ne sıklıkla?" — hazır seçenek, haftada kaç gün ya da belirli günler. */
export function FrequencyPicker({ value, onChange, error }: Props) {
  const toggleDay = (day: DayKey) => {
    const days = value.days.includes(day) ? value.days.filter((d) => d !== day) : [...value.days, day];
    onChange({ ...value, days });
  };

  return (
    <View style={{ gap: space.md }}>
      <AppText variant="label">Ne sıklıkla?</AppText>
      <ChipGroup options={FREQUENCY_KINDS} value={value.kind} onChange={(kind) => onChange({ ...value, kind })} />

      {value.kind === 'perWeek' ? (
        <View style={{ gap: space.sm }}>
          <AppText variant="caption" color={colors.muted}>
            Haftada kaç gün?
          </AppText>
          <ChipGroup
            options={PER_WEEK_OPTIONS}
            value={String(value.perWeek)}
            onChange={(n) => onChange({ ...value, perWeek: Number(n) })}
          />
        </View>
      ) : null}

      {value.kind === 'days' ? (
        <View style={{ gap: space.sm }}>
          <AppText variant="caption" color={colors.muted}>
            Hangi günler?
          </AppText>
          <MultiChipGroup options={DAYS} values={value.days} onToggle={toggleDay} />
        </View>
      ) : null}

      {error ? (
        <AppText variant="caption" color={colors.danger} accessibilityLiveRegion="polite">
          {error}
        </AppText>
      ) : null}
    </View>
  );
}
