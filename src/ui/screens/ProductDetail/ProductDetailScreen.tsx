import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  ArrowLeft,
  Hash,
  Image as IconImage,
  Landmark,
  Pencil,
  Trash2,
  WifiOff,
} from 'lucide-react-native';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { container } from '@/config/di';
import { TYPES } from '@/config/types';
import DeleteConfirmModal from '@/ui/components/DeleteConfirmModal';
import GradientView from '@/ui/components/GradientView';
import InfoRow from '@/ui/components/InfoRow';
import PrimaryButton from '@/ui/components/PrimaryButton';
import SecondaryButton from '@/ui/components/SecondaryButton';
import Colors from '@/ui/styles/Colors';

import { ProductDetailViewModel } from './ProductDetailViewModel';
import styles from './styles';

function formatDate(date: Date | undefined): string {
  if (!date) return '—';
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

type ProductDetailRoute = RouteProp<{ ProductDetail: { bankId: string } }, 'ProductDetail'>;

const ProductLogo = ({ logoUrl }: { logoUrl: string }) => {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <Image
        source={{ uri: logoUrl }}
        style={styles.logoImage}
        onError={() => setImgError(true)}
        resizeMode="contain"
      />
    );
  }
  return <Landmark size={38} color={Colors.base.accent} />;
};

const LogoRowValue = ({ logoUrl }: { logoUrl: string }) => (
  <View style={styles.logoValueRow}>
    <GradientView colors={['#2D7EF8', '#5B9BF9']} direction="vertical" style={styles.logoThumb}>
      <IconImage size={14} color="#FFFFFF" />
    </GradientView>
    <Text style={styles.logoUrlText} numberOfLines={1} ellipsizeMode="middle">
      {logoUrl}
    </Text>
  </View>
);

const ProductDetailScreen = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute<ProductDetailRoute>();
  const { bankId } = route.params;

  const viewModel = useMemo(
    () => container.get<ProductDetailViewModel>(TYPES.ProductDetailViewModel),
    [],
  );

  const handleDelete = async () => {
    const success = await viewModel.delete(bankId);
    if (success) {
      setDeleteModalVisible(false);
      navigation.goBack();
    }
  };

  // Load on first render
  useEffect(() => {
    viewModel.getBank(bankId);
  }, [bankId, viewModel]);

  if (viewModel.isBankLoading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <GradientView preset="detailHero" style={styles.heroHeader}>
          <View style={styles.navBar}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <ArrowLeft size={20} color={Colors.base.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.navTitle}>Detalle del Producto</Text>
            <View style={styles.navSpacer} />
          </View>
        </GradientView>
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color={Colors.base.accent} />
        </View>
      </SafeAreaView>
    );
  }

  if (viewModel.isBankError || !viewModel.isBankResponse) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <GradientView preset="detailHero" style={styles.heroHeader}>
          <View style={styles.navBar}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <ArrowLeft size={20} color={Colors.base.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.navTitle}>Detalle del Producto</Text>
            <View style={styles.navSpacer} />
          </View>
        </GradientView>
        <View style={styles.centeredContainer}>
          <WifiOff size={48} color={Colors.base.iconMuted} />
          <Text style={styles.errorText}>{viewModel.isBankError ?? 'Producto no encontrado'}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const bank = viewModel.isBankResponse;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Hero header */}
      <GradientView preset="detailHero" style={styles.heroHeader}>
        {/* Nav bar */}
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <ArrowLeft size={20} color={Colors.base.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Detalle del Producto</Text>
          <View style={styles.navSpacer} />
        </View>

        {/* Logo glow container */}
        <View style={styles.logoGlowContainer}>
          <View style={styles.logoCard}>
            <ProductLogo logoUrl={bank.logo} />
          </View>
        </View>
      </GradientView>

      {/* Scrollable body */}
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product name + ID badge */}
        <View style={styles.nameSection}>
          <Text style={styles.productName}>{bank.name}</Text>

          <View style={styles.idBadge}>
            <Hash size={13} color={Colors.base.accent} />
            <Text style={styles.idBadgeText}>{bank.id}</Text>
          </View>
        </View>

        {/* Info card */}
        <View style={styles.infoWrapper}>
          <View style={styles.infoCard}>
            <InfoRow label="ID" value={bank.id} />
            <InfoRow label="Nombre" value={bank.name} />
            <InfoRow label="Descripción" value={bank.description} />
            <InfoRow label="Logo" value={<LogoRowValue logoUrl={bank.logo} />} />
            <InfoRow label="Fecha de Liberación" value={formatDate(bank.date_release)} />
            <InfoRow
              label="Fecha de Revisión"
              value={formatDate(bank.date_revision)}
              showDivider={false}
            />
          </View>
        </View>
      </ScrollView>

      {/* Delete error banner */}
      {viewModel.isSubmitError ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{viewModel.isSubmitError}</Text>
        </View>
      ) : null}

      {/* Action buttons */}
      <View style={styles.actionButtons}>
        <SecondaryButton
          label="Editar"
          variant="outlined"
          icon={Pencil}
          onPress={() => navigation.navigate('AddProduct' as never)}
        />
        <PrimaryButton
          label="Eliminar"
          variant="destructive"
          icon={Trash2}
          onPress={() => setDeleteModalVisible(true)}
        />
      </View>

      {/* Delete confirm modal */}
      <DeleteConfirmModal
        visible={deleteModalVisible}
        productName={bank.name}
        loading={viewModel.isSubmitting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default observer(ProductDetailScreen);
