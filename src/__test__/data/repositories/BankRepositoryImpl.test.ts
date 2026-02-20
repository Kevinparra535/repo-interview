import { BankModel } from '@/data/models/bankModel';
import { BankRepositoryImpl } from '@/data/repositories/BankRepositoryImpl';
import { Bank } from '@/domain/entities/Bank';

const bankEntity = new Bank({
  id: 'bank-1',
  name: 'Cuenta Ahorros',
  description: 'Producto de prueba',
  logo: 'https://example.com/logo.png',
  date_release: new Date('2026-01-01'),
  date_revision: new Date('2027-01-01'),
});

const bankModel = BankModel.fromJson(bankEntity);

describe('BankRepositoryImpl', () => {
  it('getAll maps models to domain entities', async () => {
    const bankService = {
      getAll: jest.fn().mockResolvedValue([bankModel]),
    };
    const repo = new BankRepositoryImpl(bankService as any);

    const result = await repo.getAll();

    expect(bankService.getAll).toHaveBeenCalledTimes(1);
    expect(result[0]).toBeInstanceOf(Bank);
    expect(result[0].id).toBe('bank-1');
  });

  it('getById returns null when service returns null', async () => {
    const bankService = {
      getById: jest.fn().mockResolvedValue(null),
    };
    const repo = new BankRepositoryImpl(bankService as any);

    const result = await repo.getById('bank-1');

    expect(result).toBeNull();
  });

  it('create maps entity through model and returns domain', async () => {
    const bankService = {
      create: jest.fn().mockResolvedValue(bankModel),
    };
    const repo = new BankRepositoryImpl(bankService as any);

    const result = await repo.create(bankEntity);

    expect(bankService.create).toHaveBeenCalledTimes(1);
    expect(result).toBeInstanceOf(Bank);
    expect(result.id).toBe('bank-1');
  });

  it('update delegates and maps response', async () => {
    const bankService = {
      update: jest.fn().mockResolvedValue(bankModel),
    };
    const repo = new BankRepositoryImpl(bankService as any);

    const result = await repo.update('bank-1', bankEntity);

    expect(bankService.update).toHaveBeenCalledWith('bank-1', expect.any(BankModel));
    expect(result.id).toBe('bank-1');
  });

  it('verifyIdExists and delete delegate directly', async () => {
    const bankService = {
      verifyIdExists: jest.fn().mockResolvedValue(true),
      delete: jest.fn().mockResolvedValue(undefined),
    };
    const repo = new BankRepositoryImpl(bankService as any);

    const exists = await repo.verifyIdExists('bank-1');
    await repo.delete('bank-1');

    expect(exists).toBe(true);
    expect(bankService.verifyIdExists).toHaveBeenCalledWith('bank-1');
    expect(bankService.delete).toHaveBeenCalledWith('bank-1');
  });
});
