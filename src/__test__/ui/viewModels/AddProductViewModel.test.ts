import { Bank } from '@/domain/entities/Bank';
import { AddProductViewModel } from '@/ui/screens/AddProduct/AddProductViewModel';

const buildBank = (overrides?: Partial<Bank>) =>
  new Bank({
    id: 'bank-1',
    name: 'Producto Uno',
    description: 'Descripcion del producto uno',
    logo: 'https://example.com/logo.png',
    date_release: new Date('2026-02-01'),
    date_revision: new Date('2027-02-01'),
    ...overrides,
  });

describe('AddProductViewModel', () => {
  it('exposes computed state for create and update modes', () => {
    const createUseCase = { run: jest.fn() };
    const updateUseCase = { run: jest.fn() };
    const getUseCase = { run: jest.fn() };
    const verifyUseCase = { run: jest.fn() };

    const vm = new AddProductViewModel(
      createUseCase as any,
      updateUseCase as any,
      getUseCase as any,
      verifyUseCase as any,
    );

    expect(vm.isEditMode).toBe(false);
    expect(vm.isSubmitLoading).toBe(false);
    expect(vm.submitError).toBeNull();
    expect(vm.hasSubmitSuccess).toBe(false);
    expect(vm.submitSuccessMessage).toBeNull();

    vm.submitMode = 'update';
    vm.isBankUpdateLoading = true;
    vm.isBankUpdateError = 'update error';
    vm.isBankUpdateResponse = buildBank();

    expect(vm.isEditMode).toBe(true);
    expect(vm.isSubmitLoading).toBe(true);
    expect(vm.submitError).toBe('update error');
    expect(vm.hasSubmitSuccess).toBe(true);
    expect(vm.submitSuccessMessage).toContain('actualizado');
  });

  it('returns default form values when bank is not loaded', () => {
    const vm = new AddProductViewModel(
      { run: jest.fn() } as any,
      { run: jest.fn() } as any,
      { run: jest.fn() } as any,
      { run: jest.fn() } as any,
    );

    expect(vm.formValues.id).toBe('');
    expect(vm.formValues.name).toBe('');
    expect(vm.formValues.logo).toContain('visa-signature');
  });

  it('initialize without id keeps create mode and clears bank state', async () => {
    const createUseCase = { run: jest.fn() };
    const updateUseCase = { run: jest.fn() };
    const getUseCase = { run: jest.fn() };
    const verifyUseCase = { run: jest.fn() };

    const vm = new AddProductViewModel(
      createUseCase as any,
      updateUseCase as any,
      getUseCase as any,
      verifyUseCase as any,
    );

    vm.isBankResponse = buildBank();
    vm.submitMode = 'update';

    await vm.initialize();

    expect(vm.submitMode).toBe('create');
    expect(vm.isBankResponse).toBeNull();
    expect(vm.isBankError).toBeNull();
  });

  it('initialize with id loads bank and sets update mode', async () => {
    const bank = buildBank();
    const createUseCase = { run: jest.fn() };
    const updateUseCase = { run: jest.fn() };
    const getUseCase = { run: jest.fn().mockResolvedValue(bank) };
    const verifyUseCase = { run: jest.fn() };

    const vm = new AddProductViewModel(
      createUseCase as any,
      updateUseCase as any,
      getUseCase as any,
      verifyUseCase as any,
    );

    await vm.initialize('bank-1');

    expect(vm.submitMode).toBe('update');
    expect(getUseCase.run).toHaveBeenCalledWith({ id: 'bank-1' });
    expect(vm.isBankResponse).toEqual(bank);
    expect(vm.isBankLoading).toBe(false);
    expect(vm.isBankError).toBeNull();
  });

  it('submit in create mode stores create response', async () => {
    const createUseCase = { run: jest.fn().mockResolvedValue(undefined) };
    const updateUseCase = { run: jest.fn() };
    const getUseCase = { run: jest.fn() };
    const verifyUseCase = { run: jest.fn() };

    const vm = new AddProductViewModel(
      createUseCase as any,
      updateUseCase as any,
      getUseCase as any,
      verifyUseCase as any,
    );

    const success = await vm.submit({
      id: 'bank-1',
      name: 'Producto Uno',
      description: 'Descripcion del producto uno',
      logo: 'https://example.com/logo.png',
      date_release: new Date('2026-02-01'),
      date_revision: new Date('2027-02-01'),
    });

    expect(success).toBe(true);
    expect(createUseCase.run).toHaveBeenCalledTimes(1);
    expect(vm.isCreateBankResponse?.id).toBe('bank-1');
    expect(vm.isCreateBankLoading).toBe(false);
    expect(vm.isCreateBankError).toBeNull();
  });

  it('submit in update mode uses update use case and stores update response', async () => {
    const createUseCase = { run: jest.fn() };
    const updateUseCase = { run: jest.fn().mockResolvedValue(undefined) };
    const getUseCase = { run: jest.fn() };
    const verifyUseCase = { run: jest.fn() };

    const vm = new AddProductViewModel(
      createUseCase as any,
      updateUseCase as any,
      getUseCase as any,
      verifyUseCase as any,
    );

    vm.submitMode = 'update';
    vm.isBankResponse = buildBank({ id: 'bank-1' });

    const success = await vm.submit({
      id: 'ignored-id',
      name: 'Producto Uno',
      description: 'Descripcion del producto uno',
      logo: 'https://example.com/logo.png',
      date_release: new Date('2026-02-01'),
      date_revision: new Date('2027-02-01'),
    });

    expect(success).toBe(true);
    expect(updateUseCase.run).toHaveBeenCalledTimes(1);
    expect(updateUseCase.run).toHaveBeenCalledWith(expect.objectContaining({ id: 'bank-1' }));
    expect(vm.isBankUpdateResponse?.id).toBe('ignored-id');
    expect(vm.isBankUpdateLoading).toBe(false);
    expect(vm.isBankUpdateError).toBeNull();
  });

  it('verifyIdAvailable returns false when id exists', async () => {
    const createUseCase = { run: jest.fn() };
    const updateUseCase = { run: jest.fn() };
    const getUseCase = { run: jest.fn() };
    const verifyUseCase = { run: jest.fn().mockResolvedValue(true) };

    const vm = new AddProductViewModel(
      createUseCase as any,
      updateUseCase as any,
      getUseCase as any,
      verifyUseCase as any,
    );

    const isAvailable = await vm.verifyIdAvailable('bank-1');

    expect(isAvailable).toBe(false);
  });

  it('loadBank sets not found error when use case returns null', async () => {
    const vm = new AddProductViewModel(
      { run: jest.fn() } as any,
      { run: jest.fn() } as any,
      { run: jest.fn().mockResolvedValue(null) } as any,
      { run: jest.fn() } as any,
    );

    await vm.loadBank('missing-id');

    expect(vm.isBankResponse).toBeNull();
    expect(vm.isBankError).toBe('Producto no encontrado');
  });

  it('loadBank captures unknown errors as string', async () => {
    const vm = new AddProductViewModel(
      { run: jest.fn() } as any,
      { run: jest.fn() } as any,
      { run: jest.fn().mockRejectedValue('boom') } as any,
      { run: jest.fn() } as any,
    );

    await vm.loadBank('bank-1');

    expect(vm.isBankLoading).toBe(false);
    expect(vm.isBankError).toBe('boom');
  });

  it('submit in update mode uses form id when bank response is absent', async () => {
    const updateUseCase = { run: jest.fn().mockResolvedValue(undefined) };
    const vm = new AddProductViewModel(
      { run: jest.fn() } as any,
      updateUseCase as any,
      { run: jest.fn() } as any,
      { run: jest.fn() } as any,
    );

    vm.submitMode = 'update';

    await vm.submit({
      id: 'manual-id',
      name: 'Producto Uno',
      description: 'Descripcion del producto uno',
      logo: 'https://example.com/logo.png',
      date_release: new Date('2026-02-01'),
      date_revision: new Date('2027-02-01'),
    });

    expect(updateUseCase.run).toHaveBeenCalledWith(expect.objectContaining({ id: 'manual-id' }));
  });

  it('createBank and updateBank return false when use cases fail', async () => {
    const vm = new AddProductViewModel(
      { run: jest.fn().mockRejectedValue(new Error('create failed')) } as any,
      { run: jest.fn().mockRejectedValue(new Error('update failed')) } as any,
      { run: jest.fn() } as any,
      { run: jest.fn() } as any,
    );

    const createResult = await vm.createBank(buildBank());
    const updateResult = await vm.updateBank('bank-1', buildBank());

    expect(createResult).toBe(false);
    expect(updateResult).toBe(false);
    expect(vm.isCreateBankError).toContain('create failed');
    expect(vm.isBankUpdateError).toContain('update failed');
  });

  it('verifyIdAvailable returns true on verify errors', async () => {
    const vm = new AddProductViewModel(
      { run: jest.fn() } as any,
      { run: jest.fn() } as any,
      { run: jest.fn() } as any,
      { run: jest.fn().mockRejectedValue(new Error('network')) } as any,
    );

    await expect(vm.verifyIdAvailable('bank-1')).resolves.toBe(true);
  });

  it('consumeSubmitResult clears create and update responses', () => {
    const vm = new AddProductViewModel(
      { run: jest.fn() } as any,
      { run: jest.fn() } as any,
      { run: jest.fn() } as any,
      { run: jest.fn() } as any,
    );

    vm.isCreateBankResponse = buildBank({ id: 'create-id' });
    vm.isBankUpdateResponse = buildBank({ id: 'update-id' });

    vm.consumeSubmitResult();

    expect(vm.isCreateBankResponse).toBeNull();
    expect(vm.isBankUpdateResponse).toBeNull();
  });

  it('reset clears transient state', () => {
    const createUseCase = { run: jest.fn() };
    const updateUseCase = { run: jest.fn() };
    const getUseCase = { run: jest.fn() };
    const verifyUseCase = { run: jest.fn() };

    const vm = new AddProductViewModel(
      createUseCase as any,
      updateUseCase as any,
      getUseCase as any,
      verifyUseCase as any,
    );

    vm.isCreateBankLoading = true;
    vm.isCreateBankError = 'error';
    vm.isCreateBankResponse = buildBank();
    vm.isBankUpdateLoading = true;
    vm.isBankUpdateError = 'update error';
    vm.isBankUpdateResponse = buildBank();

    vm.reset();

    expect(vm.isCreateBankLoading).toBe(false);
    expect(vm.isCreateBankError).toBeNull();
    expect(vm.isCreateBankResponse).toBeNull();
    expect(vm.isBankUpdateLoading).toBe(false);
    expect(vm.isBankUpdateError).toBeNull();
    expect(vm.isBankUpdateResponse).toBeNull();
  });

  it('maps loaded bank into formValues with Date instances', () => {
    const vm = new AddProductViewModel(
      { run: jest.fn() } as any,
      { run: jest.fn() } as any,
      { run: jest.fn() } as any,
      { run: jest.fn() } as any,
    );

    vm.isBankResponse = buildBank({
      date_release: new Date('2026-01-01'),
      date_revision: new Date('2027-01-01'),
    });

    expect(vm.formValues.id).toBe('bank-1');
    expect(vm.formValues.date_release).toBeInstanceOf(Date);
    expect(vm.formValues.date_revision).toBeInstanceOf(Date);
  });
});
