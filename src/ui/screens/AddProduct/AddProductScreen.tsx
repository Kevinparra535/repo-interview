import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { container } from '@/config/di';
import { TYPES } from '@/config/types';
import AppDateInput from '@/ui/components/AppDateInput';
import { FormInput } from '@/ui/components/FormInput';
import PrimaryButton from '@/ui/components/PrimaryButton';
import SecondaryButton from '@/ui/components/SecondaryButton';
import { BankProductFormData, bankProductSchema } from '@/ui/validators/bankProductSchema';
import { zodResolver } from '@/ui/validators/zodResolver';

import { AddProductViewModel } from './AddProductViewModel';
import styles from './styles';

type Props = {
  route: {
    params: {
      bankId?: string;
    };
  };
};

const AddProductScreen = ({ route }: Props) => {
  const viewModel = useMemo(
    () => container.get<AddProductViewModel>(TYPES.AddProductViewModel),
    [],
  );

  const navigation = useNavigation();

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<BankProductFormData>({
    mode: 'onChange',
    resolver: zodResolver(bankProductSchema),
    defaultValues: {
      id: '',
      name: '',
      description: '',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      date_release: undefined,
      date_revision: undefined,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await viewModel.submit(values);
  });

  const handleSavePress = useCallback(() => {
    void onSubmit();
  }, [onSubmit]);

  useEffect(() => {
    if (viewModel.submitSuccessMessage) {
      Alert.alert('Éxito', viewModel.submitSuccessMessage);
      viewModel.consumeSubmitResult();
      reset();
      navigation.goBack();
    }
  }, [navigation, reset, viewModel.submitSuccessMessage, viewModel]);

  useEffect(() => {
    void viewModel.initialize(route.params?.bankId);
  }, [route.params?.bankId, viewModel]);

  useEffect(() => {
    reset(viewModel.formValues);
  }, [reset, viewModel.formValues]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formCard}>
            <Controller
              control={control}
              name="id"
              render={({ field: { onBlur, onChange, value } }) => (
                <FormInput
                  required
                  label="ID"
                  placeholder="ej. trj-cred"
                  onBlur={onBlur}
                  value={value}
                  error={errors.id?.message}
                  onChangeText={onChange}
                  maxLength={10}
                />
              )}
            />

            <Controller
              control={control}
              name="name"
              render={({ field: { onBlur, onChange, value } }) => (
                <FormInput
                  required
                  label="Nombre"
                  placeholder="ej. Cuenta de Ahorros Premium"
                  onBlur={onBlur}
                  value={value}
                  error={errors.name?.message}
                  onChangeText={onChange}
                  maxLength={100}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field: { onBlur, onChange, value } }) => (
                <FormInput
                  required
                  label="Descripción"
                  placeholder="ej. Descripción del producto bancario"
                  onBlur={onBlur}
                  value={value}
                  error={errors.description?.message}
                  onChangeText={onChange}
                  maxLength={200}
                />
              )}
            />

            <Controller
              control={control}
              name="logo"
              render={({ field: { onBlur, onChange, value } }) => (
                <FormInput
                  required
                  label="Logo (URL)"
                  placeholder="https://..."
                  onBlur={onBlur}
                  value={value}
                  error={errors.logo?.message}
                  onChangeText={onChange}
                  keyboardType="url"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />

            <Controller
              control={control}
              name="date_release"
              render={({ field: { onBlur, onChange, value } }) => (
                <AppDateInput
                  label="Fecha de Liberación"
                  value={value}
                  onChangeDate={onChange}
                  onBlur={onBlur}
                  error={errors.date_release?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="date_revision"
              render={({ field: { onBlur, onChange, value } }) => (
                <AppDateInput
                  label="Fecha de Revisión"
                  value={value}
                  onChangeDate={onChange}
                  onBlur={onBlur}
                  error={errors.date_revision?.message}
                />
              )}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {viewModel.submitError ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{viewModel.submitError}</Text>
        </View>
      ) : null}

      <View style={styles.actionRow}>
        <SecondaryButton
          label="Reiniciar"
          variant="outlined"
          onPress={() => viewModel.reset()}
          style={[styles.actionBtn, { height: 48 }]}
          borderRadius={12}
        />
        <PrimaryButton
          label="Enviar"
          onPress={handleSavePress}
          loading={viewModel.isSubmitLoading}
          style={styles.actionBtn}
          height={48}
          borderRadius={12}
        />
      </View>
    </SafeAreaView>
  );
};

export default observer(AddProductScreen);
