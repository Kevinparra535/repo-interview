import { inject, injectable } from 'inversify';

import { TYPES } from '@/config/types';
import { Bank } from '@/domain/entities/Bank';
import { BankRepository } from '@/domain/repositories/BankRepository';
import { UseCase } from '@/domain/useCases/UseCase';

type CreateBankUseCaseParams = {
  bank: Bank;
};

@injectable()
export class CreateBankUseCase implements UseCase<CreateBankUseCaseParams, Bank> {
  constructor(@inject(TYPES.BankRepository) private readonly bankRepository: BankRepository) {}

  run(data: CreateBankUseCaseParams): Promise<Bank> {
    return this.bankRepository.create(data.bank);
  }
}
