import { Bank } from '@/domain/entities/Bank';
import { HomeViewModel } from '@/ui/screens/Home/HomeViewModel';

const buildBanks = () => [
  new Bank({
    id: 'A1',
    name: 'Cuenta Ahorros',
    description: 'Producto para ahorrar',
    logo: 'https://example.com/a.png',
    date_release: new Date('2026-01-01'),
    date_revision: new Date('2027-01-01'),
  }),
  new Bank({
    id: 'B2',
    name: 'Crédito Hogar',
    description: 'Producto para vivienda',
    logo: 'https://example.com/b.png',
    date_release: new Date('2026-01-01'),
    date_revision: new Date('2027-01-01'),
  }),
];

describe('HomeViewModel', () => {
  it('initialize triggers load only when not loaded and not loading', () => {
    const getAllBankUseCase = { run: jest.fn().mockResolvedValue(buildBanks()) };
    const vm = new HomeViewModel(getAllBankUseCase as any);

    const spy = jest.spyOn(vm, 'getAllBanks').mockResolvedValue();

    vm.initialize();
    vm.isBanksLoading = true;
    vm.initialize();
    vm.isBanksLoading = false;
    vm.isBanksResponse = buildBanks();
    vm.initialize();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('loads banks successfully', async () => {
    const response = buildBanks();
    const getAllBankUseCase = { run: jest.fn().mockResolvedValue(response) };

    const vm = new HomeViewModel(getAllBankUseCase as any);

    await vm.getAllBanks();

    expect(getAllBankUseCase.run).toHaveBeenCalledTimes(1);
    expect(vm.isBanksLoading).toBe(false);
    expect(vm.isBanksError).toBeNull();
    expect(vm.isBanksResponse).toEqual(response);
    expect(vm.filteredBanks).toHaveLength(2);
  });

  it('sets error when loading fails', async () => {
    const getAllBankUseCase = { run: jest.fn().mockRejectedValue(new Error('network')) };

    const vm = new HomeViewModel(getAllBankUseCase as any);

    await vm.getAllBanks();

    expect(vm.isBanksLoading).toBe(false);
    expect(vm.isBanksError).toContain('network');
  });

  it('filters with debounced query', async () => {
    jest.useFakeTimers();
    const response = buildBanks();
    const getAllBankUseCase = { run: jest.fn().mockResolvedValue(response) };

    const vm = new HomeViewModel(getAllBankUseCase as any);
    await vm.getAllBanks();

    vm.setSearchQuery('B2');
    jest.advanceTimersByTime(301);

    expect(vm.filteredBanks).toHaveLength(1);
    expect(vm.filteredBanks[0].id).toBe('B2');

    jest.useRealTimers();
  });

  it('clears debounced query when search is empty and hasBanks reflects no data', async () => {
    jest.useFakeTimers();
    const response = buildBanks();
    const getAllBankUseCase = { run: jest.fn().mockResolvedValue(response) };
    const vm = new HomeViewModel(getAllBankUseCase as any);

    await vm.getAllBanks();
    vm.setSearchQuery('A1');
    jest.advanceTimersByTime(301);
    expect(vm.filteredBanks).toHaveLength(1);

    vm.setSearchQuery('   ');
    expect(vm.filteredBanks).toHaveLength(2);

    vm.isBanksResponse = [];
    expect(vm.hasBanks).toBe(false);
    jest.useRealTimers();
  });

  it('ignores stale debounced query updates', async () => {
    jest.useFakeTimers();
    const getAllBankUseCase = { run: jest.fn().mockResolvedValue(buildBanks()) };
    const vm = new HomeViewModel(getAllBankUseCase as any);
    await vm.getAllBanks();

    vm.setSearchQuery('A1');
    vm.setSearchQuery('B2');
    jest.advanceTimersByTime(301);

    expect(vm.filteredBanks).toHaveLength(1);
    expect(vm.filteredBanks[0].id).toBe('B2');
    jest.useRealTimers();
  });
});
