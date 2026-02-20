import { Bank } from '@/domain/entities/Bank';
import { CreateBankUseCase } from '@/domain/useCases/CreateBankUseCase';
import { DeleteBankUseCase } from '@/domain/useCases/DeleteBankUseCase';
import { GetAllBankUseCase } from '@/domain/useCases/GetAllBankUseCase';
import { GetBankUseCase } from '@/domain/useCases/GetBankUseCase';
import { UpdateBankUseCase } from '@/domain/useCases/UpdateBankUseCase';
import { VerifyBankIdUseCase } from '@/domain/useCases/VerifyBankIdUseCase';

const makeBank = () =>
  new Bank({
    id: 'bank-1',
    name: 'Cuenta Ahorros',
    description: 'Producto bancario de prueba',
    logo: 'https://example.com/logo.png',
    date_release: new Date('2026-01-01'),
    date_revision: new Date('2027-01-01'),
  });

describe('Bank UseCases', () => {
  it('GetAllBankUseCase delegates to repository', async () => {
    const banks = [makeBank()];
    const repo = { getAll: jest.fn().mockResolvedValue(banks) };
    const useCase = new GetAllBankUseCase(repo as any);

    const result = await useCase.run();

    expect(repo.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(banks);
  });

  it('GetBankUseCase delegates by id', async () => {
    const bank = makeBank();
    const repo = { getById: jest.fn().mockResolvedValue(bank) };
    const useCase = new GetBankUseCase(repo as any);

    const result = await useCase.run({ id: 'bank-1' });

    expect(repo.getById).toHaveBeenCalledWith('bank-1');
    expect(result).toEqual(bank);
  });

  it('CreateBankUseCase delegates with bank payload', async () => {
    const bank = makeBank();
    const repo = { create: jest.fn().mockResolvedValue(bank) };
    const useCase = new CreateBankUseCase(repo as any);

    const result = await useCase.run({ bank });

    expect(repo.create).toHaveBeenCalledWith(bank);
    expect(result).toEqual(bank);
  });

  it('UpdateBankUseCase delegates with id and bank payload', async () => {
    const bank = makeBank();
    const repo = { update: jest.fn().mockResolvedValue(bank) };
    const useCase = new UpdateBankUseCase(repo as any);

    const result = await useCase.run({ id: 'bank-1', bank });

    expect(repo.update).toHaveBeenCalledWith('bank-1', bank);
    expect(result).toEqual(bank);
  });

  it('DeleteBankUseCase delegates with id', async () => {
    const repo = { delete: jest.fn().mockResolvedValue(undefined) };
    const useCase = new DeleteBankUseCase(repo as any);

    await useCase.run({ id: 'bank-1' });

    expect(repo.delete).toHaveBeenCalledWith('bank-1');
  });

  it('VerifyBankIdUseCase delegates with id', async () => {
    const repo = { verifyIdExists: jest.fn().mockResolvedValue(true) };
    const useCase = new VerifyBankIdUseCase(repo as any);

    const result = await useCase.run({ id: 'bank-1' });

    expect(repo.verifyIdExists).toHaveBeenCalledWith('bank-1');
    expect(result).toBe(true);
  });

  it('propagates repository errors', async () => {
    const repo = { getAll: jest.fn().mockRejectedValue(new Error('repo failure')) };
    const useCase = new GetAllBankUseCase(repo as any);

    await expect(useCase.run()).rejects.toThrow('repo failure');
  });
});
