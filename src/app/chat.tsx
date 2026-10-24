import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { CarterAvatar } from '@/components/carter';
import { BackHeader } from '@/components/header';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/screen';
import { chatSeed } from '@/data/mock';
import { useAppState, useTask, type Tone } from '@/state/app-store';
import { colors, fonts, minTouch, radius, space } from '@/theme/tokens';
import { hasContent } from '@/utils/validation';

type Message = { from: 'carter' | 'me'; text: string };

const TONE_LABEL: Record<Tone, string> = { soft: 'Yumuşak ton', friendly: 'Samimi ton', tough: 'Sert ton' };

/** Carter ile sohbet */
export default function ChatScreen() {
  const tone = useAppState((s) => s.profile.tone);
  const next = useTask(undefined);
  const [messages, setMessages] = useState<Message[]>([...chatSeed]);
  const [draft, setDraft] = useState('');

  const send = () => {
    const text = draft.trim();
    if (!hasContent(text)) return;
    // MOCK: Carter'ın cevabı sunucudaki koç servisinden gelecek (docs/ARCHITECTURE.md).
    setMessages((m) => [...m, { from: 'me', text }]);
    setDraft('');
  };

  return (
    <Screen
      header={
        <BackHeader
          title="Koç Carter"
          right={
            <AppText variant="caption" color={colors.muted}>
              {TONE_LABEL[tone]}
            </AppText>
          }
        />
      }
      gap={space.md}
      footer={
        <View style={styles.inputRow}>
          <TextInput
            accessibilityLabel="Mesaj"
            placeholder="Mesaj"
            placeholderTextColor={colors.muted}
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={send}
            returnKeyType="send"
            maxLength={500}
            style={styles.input}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Gönder"
            disabled={!hasContent(draft)}
            onPress={send}
            style={[styles.send, !hasContent(draft) && styles.sendDisabled]}>
            <Icon name="send" size={18} color={colors.onDark} />
          </Pressable>
        </View>
      }>
      {messages.map((m, i) =>
        m.from === 'carter' ? (
          <View key={i} style={styles.carterRow}>
            <CarterAvatar size={32} />
            <View style={[styles.bubble, styles.carterBubble]}>
              <AppText>{m.text}</AppText>
            </View>
          </View>
        ) : (
          <View key={i} style={[styles.bubble, styles.myBubble]}>
            <AppText color={colors.onDark}>{m.text}</AppText>
          </View>
        ),
      )}

      <View style={styles.quick}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace({ pathname: '/focus', params: { id: next?.id, minutes: 5 } })}
          style={styles.chip}>
          <AppText style={styles.chipText}>Olur, başlayalım</AppText>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => router.replace('/checkin')} style={styles.chip}>
          <AppText style={styles.chipText}>Önce plan yapalım</AppText>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  carterRow: { flexDirection: 'row', gap: space.sm, alignItems: 'flex-end', maxWidth: '88%' },
  bubble: { borderRadius: radius.lg, paddingVertical: space.md, paddingHorizontal: 14 },
  carterBubble: { flexShrink: 1, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  myBubble: { alignSelf: 'flex-end', maxWidth: '80%', backgroundColor: colors.ink },
  quick: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, justifyContent: 'flex-end' },
  chip: {
    minHeight: minTouch,
    justifyContent: 'center',
    paddingHorizontal: space.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: colors.surface,
  },
  chipText: { fontFamily: fonts.semibold, fontSize: 14, color: colors.accent },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  input: {
    flex: 1,
    minHeight: minTouch,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    paddingHorizontal: space.lg,
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.ink,
  },
  send: {
    width: minTouch,
    height: minTouch,
    borderRadius: minTouch / 2,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendDisabled: { opacity: 0.4 },
});
