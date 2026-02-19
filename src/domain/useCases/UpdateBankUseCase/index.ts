import { inject, injectable } from 'inversify';

import { TYPES } from '@/config/types';
import { Bank } from '@/domain/entities/Bank';
import { BankRepository } from '@/domain/repositories/BankRepository';
import { UseCase } from '@/domain/useCases/UseCase';

type UpdateBankUseCaseParams = {
  id: string;
  bank: Bank;
};

@injectable()
export class UpdateBankUseCase implements UseCase<UpdateBankUseCaseParams, Bank> {
  constructor(@inject(TYPES.BankRepository) private readonly bankRepository: BankRepository) {}

  run(data: UpdateBankUseCaseParams): Promise<Bank> {
    return this.bankRepository.update(data.id, data.bank);
  }
}
