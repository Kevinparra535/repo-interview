import { inject, injectable } from 'inversify';

import { TYPES } from '@/config/types';
import { Bank } from '@/domain/entities/Bank';
import { BankRepository } from '@/domain/repositories/BankRepository';
import { UseCase } from '@/domain/useCases/UseCase';

@injectable()
export class GetAllBankUseCase implements UseCase<void, Bank[]> {
  constructor(@inject(TYPES.BankRepository) private readonly bankRepository: BankRepository) {}

  run(): Promise<Bank[]> {
    return this.bankRepository.getAll();
  }
}
