import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Button } from '@/components/button';
import { Screen } from '@/components/screen';
import { actions, useTask } from '@/state/app-store';
import { colors, radius, space } from '@/theme/tokens';

/**
 * Fotoğraf kanıtı. Sadece o an çekilen fotoğraf kabul edilir (galeriden seçim yok).
 * TODO(native): expo-camera önizlemesi + cihaz içi uygunsuz içerik kontrolü (docs/TASKS.md).
 */
export default function ProofScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const task = useTask(id);

  const capture = () => {
    // MOCK: fotoğraf çekilmiş ve kontrolden geçmiş sayılıyor.
    if (task) actions.completeTask(task.id);
    router.back();
  };

  return (
    <Screen background={colors.night} scroll={false}>
      <View style={styles.top}>
        <Button title="Vazgeç" variant="ghost" onPress={() => router.back()} style={styles.cancel} />
        <AppText variant="heading" color={colors.nightText}>
          {task?.title ?? 'Fotoğraf kanıtı'}
        </AppText>
        <View style={styles.cancel} />
      </View>

      <View style={styles.camera}>
        <AppText variant="label" color={colors.nightMuted}>
          Canlı kamera görüntüsü
        </AppText>
        <AppText variant="caption" color={colors.nightMuted} align="center">
          Sadece şu an çekilen fotoğraf kabul edilir
        </AppText>
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel="Fotoğraf çek" onPress={capture} style={styles.shutter}>
        <View style={styles.shutterInner} />
      </Pressable>

      <AppText variant="caption" color={colors.nightMuted} align="center">
        Bu fotoğraf sadece senin telefonunda kalır. Kimse görmez.
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cancel: { width: 80, alignItems: 'flex-start', paddingHorizontal: 0 },
  camera: {
    flex: 1,
    borderRadius: radius.xl,
    backgroundColor: colors.nightSurface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.xs,
    padding: space.xl,
  },
  shutter: {
    alignSelf: 'center',
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: colors.onDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.onDark },
});
