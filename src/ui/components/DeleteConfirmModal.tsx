import { BlurView } from 'expo-blur';
import { Trash2, TriangleAlert } from 'lucide-react-native';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import GradientView from '@/ui/components/GradientView';
import PrimaryButton from '@/ui/components/PrimaryButton';
import SecondaryButton from '@/ui/components/SecondaryButton';
import Colors from '@/ui/styles/Colors';
import Fonts from '@/ui/styles/Fonts';
import { ms } from '@/ui/styles/FontsScale';
import Shadows from '@/ui/styles/Shadows';
import Spacings from '@/ui/styles/Spacings';

type Props = {
  visible: boolean;
  productName: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteConfirmModal = ({
  visible,
  productName,
  loading = false,
  onConfirm,
  onCancel,
}: Props) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    statusBarTranslucent
    onRequestClose={onCancel}
  >
    <Pressable style={styles.backdrop} onPress={onCancel}>
      <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.backdropOverlay} />

      <View onStartShouldSetResponder={() => true} style={styles.card}>
        <View style={styles.iconOuter}>
          <GradientView preset="destructive" style={styles.iconInner}>
            <TriangleAlert size={28} color={Colors.base.textPrimary} />
          </GradientView>
        </View>

        <View style={styles.textContent}>
          <Text style={styles.title}>¿Eliminar Producto?</Text>
          <Text style={styles.productNameText}>{productName}</Text>
          <Text style={styles.body}>
            Esta acción es permanente y no se puede deshacer. El producto será eliminado de forma
            irreversible.
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.buttonGroup}>
          <SecondaryButton
            label="Cancelar"
            onPress={onCancel}
            variant="neutral"
            borderRadius={14}
            disabled={loading}
          />
          <PrimaryButton
            label="Eliminar"
            onPress={onConfirm}
            variant="destructive"
            icon={Trash2}
            loading={loading}
            borderRadius={14}
          />
        </View>
      </View>

      <View style={styles.dismissHintWrapper} pointerEvents="none">
        <Text style={styles.dismissHint}>Toca fuera para cancelar</Text>
      </View>
    </Pressable>
  </Modal>
);

export default DeleteConfirmModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacings.spacex3, // ~30 → card ≈334px on 393-wide screen
  },

  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.base.modalBackdrop,
  },

  card: {
    paddingTop: 32,
    paddingHorizontal: 24,
    paddingBottom: 24,
    width: '100%',
    backgroundColor: Colors.base.modalCardBg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.base.modalCardBorder,
    alignItems: 'center',
    gap: 16,
  },

  iconOuter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 76,
    height: 76,
    backgroundColor: Colors.base.dangerDim,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: Colors.base.dangerDimBorder,
    ...Shadows.destructiveButton,
  },

  iconInner: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  textContent: {
    gap: Spacings.xs + 3, // 8
    width: '100%',
    alignItems: 'center',
  },

  title: {
    ...Fonts.header5,
    fontSize: ms(20),
    color: Colors.base.textPrimary,
    textAlign: 'center',
  },

  productNameText: {
    ...Fonts.bodyTextBold,
    fontSize: ms(16),
    color: Colors.base.accent,
    textAlign: 'center',
  },

  body: {
    ...Fonts.smallBodyText,
    fontSize: ms(14),
    color: Colors.base.textSecondary,
    textAlign: 'center',
    lineHeight: ms(14) * 1.5,
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.base.dividerLight,
  },

  buttonGroup: {
    gap: Spacings.sm + 2, // 12
    width: '100%',
  },

  dismissHintWrapper: {
    position: 'absolute',
    bottom: 44,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  dismissHint: {
    ...Fonts.links,
    color: Colors.base.textMuted,
  },
});
