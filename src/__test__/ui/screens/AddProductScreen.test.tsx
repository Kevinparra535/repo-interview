import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

import AddProductScreen from '@/ui/screens/AddProduct/AddProductScreen';

const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: mockGoBack }),
}));

jest.mock('@/config/di', () => ({
  container: {
    get: jest.fn(),
  },
}));

jest.mock('@/ui/components/PrimaryButton', () => {
  const React = require('react');
  const { Pressable, Text } = require('react-native');

  const PrimaryButtonMock = ({ label, onPress }: any) => (
    <Pressable testID="primary-button" onPress={onPress}>
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
    <Pressable testID="secondary-button" onPress={onPress}>
      <Text>{label}</Text>
    </Pressable>
  );
  SecondaryButtonMock.displayName = 'SecondaryButtonMock';
  return SecondaryButtonMock;
});

jest.mock('@/ui/components/FormInput', () => {
  const React = require('react');
  const { TextInput } = require('react-native');

  return {
    FormInput: ({ label, value, onChangeText, editable = true }: any) => (
      <TextInput
        testID={label === 'ID' ? 'id-input' : `input-${String(label).toLowerCase()}`}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
      />
    ),
  };
});

jest.mock('@/ui/components/AppDateInput', () => {
  const React = require('react');
  const { Pressable, Text, View } = require('react-native');

  const AppDateInputMock = ({ label, value, onChangeDate, editable = true }: any) => {
    const isRelease = String(label).includes('Liberación');
    const key = isRelease ? 'release' : 'revision';

    return (
      <View>
        <Text testID={`${key}-value`}>{value ? value.toISOString().slice(0, 10) : 'empty'}</Text>
        <Text testID={`${key}-editable`}>{String(editable)}</Text>
        {isRelease ? (
          <Pressable
            testID="release-set"
            onPress={() => onChangeDate(new Date('2026-03-10T00:00:00.000Z'))}
          >
            <Text>set-release</Text>
          </Pressable>
        ) : null}
      </View>
    );
  };
  AppDateInputMock.displayName = 'AppDateInputMock';
  return AppDateInputMock;
});

describe('AddProductScreen integration behavior', () => {
  const getViewModel = (isEditMode: boolean) => ({
    submitSuccessMessage: null,
    submitError: null,
    isSubmitLoading: false,
    isEditMode,
    formValues: {
      id: isEditMode ? 'bank-1' : '',
      name: '',
      description: '',
      logo: 'https://example.com/logo.png',
      date_release: undefined,
      date_revision: undefined,
    },
    initialize: jest.fn().mockResolvedValue(undefined),
    submit: jest.fn().mockResolvedValue(true),
    consumeSubmitResult: jest.fn(),
    reset: jest.fn(),
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('disables ID input while editing', async () => {
    const { container } = require('@/config/di');
    container.get.mockReturnValue(getViewModel(true));

    const screen = render(<AddProductScreen route={{ params: { bankId: 'bank-1' } } as any} />);

    const idInput = await screen.findByTestId('id-input');
    expect(idInput.props.editable).toBe(false);
  });

  it('auto-calculates revision date when release date changes', async () => {
    const { container } = require('@/config/di');
    container.get.mockReturnValue(getViewModel(false));

    const screen = render(<AddProductScreen route={{ params: {} } as any} />);

    expect(screen.getByTestId('revision-editable').props.children).toBe('false');
    expect(screen.getByTestId('revision-value').props.children).toBe('empty');

    fireEvent.press(screen.getByTestId('release-set'));

    await waitFor(() => {
      expect(screen.getByTestId('revision-value').props.children).toBe('2027-03-10');
    });
  });
});
