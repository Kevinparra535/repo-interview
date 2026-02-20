import { Ionicons } from '@expo/vector-icons';
import { Modal, StyleSheet, Text, View } from 'react-native';

import PrimaryButton from '@/ui/components/PrimaryButton';
import SecondaryButton from '@/ui/components/SecondaryButton';
import BorderRadius from '@/ui/styles/BorderRadius';
import Colors from '@/ui/styles/Colors';
import Fonts from '@/ui/styles/Fonts';
import { ms } from '@/ui/styles/FontsScale';
import Spacings from '@/ui/styles/Spacings';
import { hexToRgba } from '@/ui/utils/colorUtils';

type Props = {
  visible: boolean;
  productName: string;
  loading?: boolean;
  /** Called when user confirms deletion */
  onConfirm: () => void;
  /** Called when user cancels or presses the backdrop */
  onCancel: () => void;
};

/**
 * Delete confirmation modal.
 *
 * Shows the product name and requires explicit confirmation before calling `onConfirm`.
 */
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
    {/* Backdrop */}
    <View style={styles.backdrop}>
      {/* Card */}
      <View style={styles.card}>
        {/* Trash icon circle */}
        <View style={styles.iconCircle}>
          <Ionicons name="trash-outline" size={32} color="#E53935" />
        </View>

        <Text style={styles.title}>Eliminar Producto</Text>
        <Text style={styles.message}>
          {'¿Estás seguro de que deseas eliminar '}
          <Text style={styles.productName}>{productName}</Text>
          {'? Esta acción no se puede deshacer.'}
        </Text>

        <View style={styles.actions}>
          <SecondaryButton
            label="Cancelar"
            onPress={onCancel}
            variant="outlined"
            style={styles.actionBtn}
            disabled={loading}
          />
          <PrimaryButton
            label="Eliminar"
            onPress={onConfirm}
            variant="destructive"
            iconName="trash-outline"
            loading={loading}
            style={styles.actionBtn}
          />
        </View>
      </View>
    </View>
  </Modal>
);

export default DeleteConfirmModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: hexToRgba('#000000', 0.7),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacings.md,
  },

  card: {
    width: '100%',
    padding: Spacings.xl,
    backgroundColor: '#111F38',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: hexToRgba('#FFFFFF', 0.1),
    alignItems: 'center',
    gap: Spacings.sm,
  },

  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: hexToRgba('#E53935', 0.12),
    borderWidth: 1,
    borderColor: hexToRgba('#E53935', 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacings.xs,
  },

  title: {
    ...Fonts.bodyTextBold,
    fontSize: ms(18),
    color: Colors.base.textPrimary,
    textAlign: 'center',
  },

  message: {
    ...Fonts.bodyText,
    fontSize: ms(14),
    color: Colors.base.textSecondary,
    textAlign: 'center',
    lineHeight: ms(20),
    marginBottom: Spacings.xs,
  },

  productName: {
    ...Fonts.bodyTextBold,
    fontSize: ms(14),
    color: Colors.base.textPrimary,
  },

  actions: {
    flexDirection: 'row',
    gap: Spacings.sm,
    width: '100%',
    marginTop: Spacings.xs,
  },

  actionBtn: {
    flex: 1,
    height: 48,
  },
});
