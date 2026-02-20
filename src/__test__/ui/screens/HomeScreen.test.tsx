import { render } from '@testing-library/react-native';
import React from 'react';

import HomeScreen from '@/ui/screens/Home/HomeScreen';

const mockNavigate = jest.fn();
const mockUseFocusEffect = jest.fn((callback: () => void) => {
  callback();
});

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
  useFocusEffect: (cb: () => void) => mockUseFocusEffect(cb),
}));

jest.mock('@/config/di', () => ({
  container: {
    get: jest.fn(),
  },
}));

jest.mock('@/ui/components/GradientView', () => {
  const React = require('react');
  const { View } = require('react-native');

  const GradientViewMock = ({ children }: any) => <View>{children}</View>;
  GradientViewMock.displayName = 'GradientViewMock';
  return GradientViewMock;
});

jest.mock('@/ui/components/PrimaryButton', () => {
  const React = require('react');
  const { Pressable, Text } = require('react-native');

  const PrimaryButtonMock = ({ label, onPress }: any) => (
    <Pressable testID="home-primary-button" onPress={onPress}>
      <Text>{label}</Text>
    </Pressable>
  );
  PrimaryButtonMock.displayName = 'PrimaryButtonMock';
  return PrimaryButtonMock;
});

jest.mock('@/ui/components/ProductCard', () => {
  const React = require('react');
  const { View, Text } = require('react-native');

  const ProductCardMock = ({ name }: any) => (
    <View>
      <Text>{name}</Text>
    </View>
  );
  ProductCardMock.displayName = 'ProductCardMock';
  return ProductCardMock;
});

jest.mock('@/ui/components/SearchBar', () => {
  const React = require('react');
  const { View } = require('react-native');

  const SearchBarMock = () => <View testID="search-bar" />;
  SearchBarMock.displayName = 'SearchBarMock';
  return SearchBarMock;
});

describe('HomeScreen integration behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('refreshes bank list when screen gains focus', () => {
    const getAllBanks = jest.fn().mockResolvedValue(undefined);

    const viewModel = {
      filteredBanks: [],
      isBanksLoading: false,
      isBanksError: null,
      getAllBanks,
      searchQuery: '',
      setSearchQuery: jest.fn(),
    };

    const { container } = require('@/config/di');
    container.get.mockReturnValue(viewModel);

    render(<HomeScreen />);

    expect(mockUseFocusEffect).toHaveBeenCalledTimes(1);
    expect(getAllBanks).toHaveBeenCalledTimes(1);
  });
});
