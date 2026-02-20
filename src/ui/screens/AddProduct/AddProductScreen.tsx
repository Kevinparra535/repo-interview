import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { container } from '@/config/di';
import { TYPES } from '@/config/types';
import { Bank } from '@/domain/entities/Bank';
import AppDateInput from '@/ui/components/AppDateInput';
import AppTextInput from '@/ui/components/AppTextInput';
import GradientView from '@/ui/components/GradientView';
import PrimaryButton from '@/ui/components/PrimaryButton';
import SecondaryButton from '@/ui/components/SecondaryButton';
import Colors from '@/ui/styles/Colors';
import { BankProductFormData, bankProductSchema } from '@/ui/validators/bankProductSchema';
import { zodResolver } from '@/ui/validators/zodResolver';

import { AddProductViewModel } from './AddProductViewModel';
import styles from './styles';

const AddProductScreen = observer(() => {
  const navigation = useNavigation();

  const viewModel = useMemo(
    () => container.get<AddProductViewModel>(TYPES.AddProductViewModel),
    [],
  );

  const {
    control,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BankProductFormData>({
    resolver: zodResolver(bankProductSchema),
    mode: 'onBlur',
    defaultValues: {
      id: '',
      name: '',
      description: '',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      date_release: undefined as unknown as Date,
      date_revision: undefined as unknown as Date,
    },
  });

  const dateRelease = watch('date_release');

  // Auto-fill date_revision as exactly 1 year after date_release (business rule)
  useEffect(() => {
    if (dateRelease instanceof Date) {
      const revision = new Date(dateRelease);
      revision.setFullYear(revision.getFullYear() + 1);
      setValue('date_revision', revision, { shouldValidate: false, shouldDirty: true });
    }
  }, [dateRelease, setValue]);

  const handleReset = () => {
    reset();
    viewModel.reset();
  };

  const onSubmit = async (data: BankProductFormData) => {
    // Verify ID uniqueness before calling domain layer
    const available = await viewModel.verifyIdAvailable(data.id);
    if (!available) {
      setError('id', { type: 'manual', message: 'El ID ya existe, ingresa un ID único' });
      return;
    }

    const bank = new Bank({
      id: data.id,
      name: data.name,
      description: data.description,
      logo: data.logo,
      date_release: data.date_release,
      date_revision: data.date_revision,
    });

    const success = await viewModel.submit(bank);
    if (success) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <GradientView preset="header" style={styles.navBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color={Colors.base.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.navTitle}>Agregar Producto</Text>

        <View style={styles.navSpacer} />
      </GradientView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              render={({ field }) => (
                <AppTextInput
                  label="ID"
                  placeholder="ej. trj-cred"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={async () => {
                    field.onBlur();
                    if (field.value?.length >= 3) {
                      const available = await viewModel.verifyIdAvailable(field.value);
                      if (!available) {
                        setError('id', { type: 'manual', message: 'El ID ya existe' });
                      }
                    }
                  }}
                  error={errors.id?.message}
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={10}
                />
              )}
            />

            <View style={styles.separator} />

            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <AppTextInput
                  label="Nombre"
                  placeholder="ej. Cuenta de Ahorros Premium"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.name?.message}
                  maxLength={100}
                />
              )}
            />

            <View style={styles.separator} />

            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <AppTextInput
                  label="Descripción"
                  placeholder="ej. Descripción del producto bancario"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.description?.message}
                  maxLength={200}
                />
              )}
            />

            <View style={styles.separator} />

            <Controller
              control={control}
              name="logo"
              render={({ field }) => (
                <AppTextInput
                  label="Logo (URL)"
                  placeholder="https://..."
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.logo?.message}
                  keyboardType="url"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />

            <View style={styles.separator} />

            <Controller
              control={control}
              name="date_release"
              render={({ field }) => (
                <AppDateInput
                  label="Fecha de Liberación"
                  value={field.value}
                  onChangeDate={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.date_release?.message}
                />
              )}
            />

            <View style={styles.separator} />

            <Controller
              control={control}
              name="date_revision"
              render={({ field }) => (
                <AppDateInput
                  label="Fecha de Revisión"
                  value={field.value}
                  onChangeDate={field.onChange}
                  onBlur={field.onBlur}
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
          onPress={handleReset}
          style={[styles.actionBtn, { height: 48 }]}
          borderRadius={12}
        />
        <PrimaryButton
          label="Enviar"
          onPress={handleSubmit(onSubmit)}
          loading={viewModel.loading || isSubmitting}
          style={styles.actionBtn}
          height={48}
          borderRadius={12}
        />
      </View>
    </SafeAreaView>
  );
});

export default AddProductScreen;
