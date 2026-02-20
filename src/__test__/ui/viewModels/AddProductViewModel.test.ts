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
});
