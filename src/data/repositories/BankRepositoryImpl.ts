import { inject, injectable } from 'inversify';

import { TYPES } from '@/config/types';
import { BankModel } from '@/data/models/bankModel';
import { BankService } from '@/data/services/BankService';
import { Bank } from '@/domain/entities/Bank';
import { BankRepository } from '@/domain/repositories/BankRepository';

@injectable()
export class BankRepositoryImpl implements BankRepository {
  constructor(@inject(TYPES.BankService) private readonly bankService: BankService) {}

  async getAll(): Promise<Bank[]> {
    const models = await this.bankService.getAll();
    return models.map((model) => model.toDomain());
  }

  async getById(id: string): Promise<Bank | null> {
    const model = await this.bankService.getById(id);

    if (!model) {
      return null;
    }

    return model.toDomain();
  }

  async verifyIdExists(id: string): Promise<boolean> {
    return this.bankService.verifyIdExists(id);
  }

  async create(bank: Bank): Promise<Bank> {
    const created = await this.bankService.create(BankModel.fromJson(bank));
    return created.toDomain();
  }

  async update(id: string, bank: Bank): Promise<Bank> {
    const updated = await this.bankService.update(id, BankModel.fromJson(bank));
    return updated.toDomain();
  }

  async delete(id: string): Promise<void> {
    await this.bankService.delete(id);
  }
}
