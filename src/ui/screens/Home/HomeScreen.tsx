import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { container } from '@/config/di';
import { TYPES } from '@/config/types';
import { Bank } from '@/domain/entities/Bank';
import ProductCard from '@/ui/components/ProductCard';
import Colors from '@/ui/styles/Colors';

import { HomeViewModel } from './HomeViewModel';
import { PRODUCT_CONFIGS, styles } from './styles';

const HomeScreen = () => {
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

  const renderSearchHeader = () => (
    <View style={styles.searchSection}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color={Colors.bank.iconMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar producto..."
          placeholderTextColor={Colors.bank.textMuted}
          value={viewModel.searchQuery}
          onChangeText={(text) => viewModel.setSearchQuery(text)}
          returnKeyType="search"
          autoCorrect={false}
        />
      </View>
      <View
        style={[
          styles.resultsBadge,
          viewModel.filteredBanks.length === 0 && styles.resultsBadgeEmpty,
        ]}
      >
        <Text style={styles.resultsBadgeText}>
          {viewModel.filteredBanks.length === 1
            ? '1 producto encontrado'
            : `${viewModel.filteredBanks.length} productos encontrados`}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header */}
      <LinearGradient
        colors={[Colors.bank.bgPrimary, Colors.bank.bgGradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <View style={styles.logoArea}>
          <View style={styles.logoIconContainer}>
            <Ionicons name="business" size={20} color={Colors.bank.textPrimary} />
          </View>
          <Text style={styles.logoText}>Banco</Text>
        </View>
        <View style={styles.avatar}>
          <Ionicons name="person" size={20} color={Colors.bank.textPrimary} />
        </View>
      </LinearGradient>

      {/* Products List */}
      <FlatList
        data={viewModel.filteredBanks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderSearchHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />

      {/* Add Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => {}} style={styles.addButtonWrapper}>
          <LinearGradient
            colors={[Colors.bank.accentGradientStart, Colors.bank.accentGradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.addButton}
          >
            <Ionicons name="add" size={20} color={Colors.bank.textPrimary} />
            <Text style={styles.addButtonText}>Agregar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default observer(HomeScreen);
