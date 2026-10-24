import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { CarterAvatar } from '@/components/carter';
import { Screen } from '@/components/screen';
import { colors, space } from '@/theme/tokens';

/** Karşılama */
export default function WelcomeScreen() {
  return (
    <Screen
      scroll={false}
      footer={
        <>
          <Button title="Başlayalım" href="/onboarding/signup" />
          {/* TODO(auth): giriş akışı gelince ayrı ekrana gidecek. */}
          <Button title="Hesabım var, giriş yap" variant="ghost" href="/onboarding/signup" />
        </>
      }>
      <View style={styles.center}>
        <CarterAvatar size={88} />
        <AppText variant="display" align="center">
          Ertelediğin işleri bitir.
        </AppText>
        <AppText variant="body" color={colors.muted} align="center">
          Ben Carter. Seni tanırım, yanında çalışırım, gerektiğinde hesap sorarım.
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.lg, paddingHorizontal: space.sm },
});
