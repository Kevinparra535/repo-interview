import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { container } from '@/config/di';
import { TYPES } from '@/config/types';
import { Bank } from '@/domain/entities/Bank';
import GradientView from '@/ui/components/GradientView';
import PrimaryButton from '@/ui/components/PrimaryButton';
import ProductCard from '@/ui/components/ProductCard';
import SearchBar from '@/ui/components/SearchBar';
import Colors from '@/ui/styles/Colors';

import { HomeViewModel } from './HomeViewModel';
import { PRODUCT_CONFIGS, styles } from './styles';

const HomeScreen = () => {
  const navigation = useNavigation();
  const viewModel = useMemo(() => container.get<HomeViewModel>(TYPES.HomeViewModel), []);

  useEffect(() => {
    viewModel.load();
  }, [viewModel]);

  const renderItem = ({ item, index }: { item: Bank; index: number }) => {
    const config = PRODUCT_CONFIGS[index % PRODUCT_CONFIGS.length];

    return (
      <ProductCard
        iconName={config.iconName}
        iconBgColor={config.iconBgColor}
        name={item.name}
        productId={item.id}
        description={item.desription}
        onPress={() => {}}
      />
    );
  };

  const renderEmptyState = () => {
    if (viewModel.loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={Colors.bank.accent} />
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <Ionicons name="file-tray-outline" size={56} color={Colors.bank.iconMuted} />
        </View>
        <View style={styles.emptyTextContainer}>
          <Text style={styles.emptyTitle}>Sin productos</Text>
          <Text style={styles.emptySubtitle}>Agrega tu primer producto financiero</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header */}
      <GradientView preset="header" style={styles.header}>
        <View style={styles.logoArea}>
          <View style={styles.logoIconContainer}>
            <Ionicons name="business" size={20} color={Colors.bank.textPrimary} />
          </View>
          <Text style={styles.logoText}>Banco</Text>
        </View>
        <View style={styles.avatar}>
          <Ionicons name="person" size={20} color={Colors.bank.textPrimary} />
        </View>
      </GradientView>

      {/* Products List */}
      <FlatList
        renderItem={renderItem}
        data={viewModel.filteredBanks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<SearchBar viewModel={viewModel} />}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />

      {/* Add Button */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          label="Agregar"
          iconName="add"
          onPress={() => navigation.navigate('AddProduct' as never)}
        />
      </View>
    </SafeAreaView>
  );
};

export default observer(HomeScreen);
