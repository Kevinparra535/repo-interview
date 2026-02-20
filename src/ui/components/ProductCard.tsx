import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ms } from 'react-native-size-matters';

import Colors from '@/ui/styles/Colors';
import Fonts from '@/ui/styles/Fonts';

import BorderRadius from '../styles/BorderRadius';
import Shadows from '../styles/Shadows';
import Spacings from '../styles/Spacings';

type Props = {
  iconName: keyof typeof Ionicons.glyphMap;
  iconBgColor: string;
  name: string;
  productId: string;
  description: string;
  onPress?: () => void;
};

const ProductCard = ({ iconName, iconBgColor, name, productId, description, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        <Ionicons name={iconName} size={28} color={Colors.bank.textPrimary} />
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.productId} numberOfLines={1}>
          {productId}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {description}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={22} color={Colors.bank.accent} />
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    padding: Spacings.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacings.sm + 4,
    width: '100%',
    backgroundColor: Colors.bank.bgCard,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.bank.cardBorder,
    ...Shadows.bankCard,
  },

  iconContainer: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.sm,
  },

  info: {
    flex: 1,
    gap: 3,
  },

  name: {
    ...Fonts.bodyTextBold,
    color: Colors.bank.textPrimary,
  },

  productId: {
    ...Fonts.bodyText,
    fontSize: ms(12),
    color: Colors.bank.textSecondary,
  },

  description: {
    ...Fonts.smallBodyText,
    color: Colors.bank.textSecondary,
  },
});
