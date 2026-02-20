import { render } from '@testing-library/react-native';
import React from 'react';

import ProductDetailScreen from '@/ui/screens/ProductDetail/ProductDetailScreen';

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
const mockUseFocusEffect = jest.fn((callback: () => void) => {
  callback();
});

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: mockGoBack, navigate: mockNavigate }),
  useRoute: () => ({ params: { bankId: 'bank-1' } }),
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

jest.mock('@/ui/components/InfoRow', () => {
  const React = require('react');
  const { View, Text } = require('react-native');

  const InfoRowMock = ({ label }: any) => (
    <View>
      <Text>{label}</Text>
    </View>
  );
  InfoRowMock.displayName = 'InfoRowMock';
  return InfoRowMock;
});

jest.mock('@/ui/components/PrimaryButton', () => {
  const React = require('react');
  const { Pressable, Text } = require('react-native');

  const PrimaryButtonMock = ({ label, onPress }: any) => (
    <Pressable testID="product-detail-primary" onPress={onPress}>
      <Text>{label}</Text>
    </Pressable>
  );
  PrimaryButtonMock.displayName = 'PrimaryButtonMock';
  return PrimaryButtonMock;
});

jest.mock('@/ui/components/SecondaryButton', () => {
  const React = require('react');
  const { Pressable, Text } = require('react-native');

  const SecondaryButtonMock = ({ label, onPress }: any) => (
    <Pressable testID="product-detail-secondary" onPress={onPress}>
      <Text>{label}</Text>
    </Pressable>
  );
  SecondaryButtonMock.displayName = 'SecondaryButtonMock';
  return SecondaryButtonMock;
});

jest.mock('@/ui/components/DeleteConfirmModal', () => {
  const React = require('react');
  const { View } = require('react-native');

  const DeleteConfirmModalMock = () => <View testID="delete-modal" />;
  DeleteConfirmModalMock.displayName = 'DeleteConfirmModalMock';
  return DeleteConfirmModalMock;
});

describe('ProductDetailScreen integration behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('refreshes product data when screen gains focus', () => {
    const getBank = jest.fn().mockResolvedValue(undefined);

    const viewModel = {
      isBankLoading: false,
      isBankError: null,
      isBankResponse: {
        id: 'bank-1',
        name: 'Cuenta Premium',
        description: 'Cuenta con beneficios',
        logo: 'https://example.com/logo.png',
        date_release: new Date('2026-01-01'),
        date_revision: new Date('2027-01-01'),
      },
      isDeleteBankResponse: false,
      isDeleteBankError: null,
      isDeleteBankLoading: false,
      getBank,
      delete: jest.fn().mockResolvedValue(true),
      consumeDeleteResult: jest.fn(),
    };

    const { container } = require('@/config/di');
    container.get.mockReturnValue(viewModel);

    render(<ProductDetailScreen />);

    expect(mockUseFocusEffect).toHaveBeenCalledTimes(1);
    expect(getBank).toHaveBeenCalledWith('bank-1');
  });
});
