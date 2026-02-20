import { Bank } from '@/domain/entities/Bank';
import { ProductDetailViewModel } from '@/ui/screens/ProductDetail/ProductDetailViewModel';

const buildBank = () =>
  new Bank({
    id: 'bank-1',
    name: 'Cuenta Premium',
    description: 'Cuenta con beneficios',
    logo: 'https://example.com/logo.png',
    date_release: new Date('2026-01-01'),
    date_revision: new Date('2027-01-01'),
  });

describe('ProductDetailViewModel', () => {
  it('loads bank successfully', async () => {
    const bank = buildBank();
    const getBankUseCase = { run: jest.fn().mockResolvedValue(bank) };
    const deleteBankUseCase = { run: jest.fn() };

    const vm = new ProductDetailViewModel(getBankUseCase as any, deleteBankUseCase as any);

    await vm.getBank('bank-1');

    expect(getBankUseCase.run).toHaveBeenCalledWith({ id: 'bank-1' });
    expect(vm.isBankResponse).toEqual(bank);
    expect(vm.isBankError).toBeNull();
    expect(vm.isBankLoading).toBe(false);
  });

  it('sets error when delete fails', async () => {
    const getBankUseCase = { run: jest.fn() };
    const deleteBankUseCase = { run: jest.fn().mockRejectedValue(new Error('delete failed')) };

    const vm = new ProductDetailViewModel(getBankUseCase as any, deleteBankUseCase as any);

    const success = await vm.delete('bank-1');

    expect(success).toBe(false);
    expect(vm.isDeleteBankLoading).toBe(false);
    expect(vm.isDeleteBankError).toContain('delete failed');
    expect(vm.isDeleteBankResponse).toBe(false);
  });

  it('marks delete success and allows consume result', async () => {
    const getBankUseCase = { run: jest.fn() };
    const deleteBankUseCase = { run: jest.fn().mockResolvedValue(undefined) };

    const vm = new ProductDetailViewModel(getBankUseCase as any, deleteBankUseCase as any);

    const success = await vm.delete('bank-1');

    expect(success).toBe(true);
    expect(vm.isDeleteBankError).toBeNull();
    expect(vm.isDeleteBankLoading).toBe(false);
    expect(vm.isDeleteBankResponse).toBe(true);

    vm.consumeDeleteResult();
    expect(vm.isDeleteBankResponse).toBe(false);
  });
});
