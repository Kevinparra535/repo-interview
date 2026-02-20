import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppTextInput from '@/ui/components/AppTextInput';
import { HomeViewModel } from '@/ui/screens/Home/HomeViewModel';
import Colors from '@/ui/styles/Colors';
import Fonts from '@/ui/styles/Fonts';
import Spacings from '@/ui/styles/Spacings';

type Props = {
  viewModel: HomeViewModel;
};

const SearchBar = ({ viewModel }: Props) => {
  return (
    <View style={styles.searchSection}>
      <AppTextInput
        variant="search"
        placeholder="Buscar producto..."
        value={viewModel.searchQuery}
        onChangeText={(text) => viewModel.setSearchQuery(text)}
        returnKeyType="search"
      />
      <View
        style={[
          styles.resultsBadge,
          viewModel.filteredBanks?.length === 0 && styles.resultsBadgeEmpty,
        ]}
      >
        <Text style={styles.resultsBadgeText}>
          {viewModel.filteredBanks?.length === 1
            ? '1 producto encontrado'
            : `${viewModel.filteredBanks?.length ?? 0} productos encontrados`}
        </Text>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchSection: {
    paddingBottom: Spacings.sm + 2,
    gap: Spacings.sm + 2,
  },

  resultsBadge: {
    paddingHorizontal: Spacings.sm + 4,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    height: 28,
    backgroundColor: Colors.base.accent,
    borderRadius: 14,
  },

  resultsBadgeEmpty: {
    backgroundColor: Colors.base.badgeEmpty,
  },

  resultsBadgeText: {
    ...Fonts.links,
    color: Colors.base.textPrimary,
  },
});
