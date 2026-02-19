import { inject, injectable } from 'inversify';

import { TYPES } from '@/config/types';
import { Bank } from '@/domain/entities/Bank';
import { BankRepository } from '@/domain/repositories/BankRepository';
import { UseCase } from '@/domain/useCases/UseCase';

type GetBankUseCaseParams = {
  id: string;
};

@injectable()
export class GetBankUseCase implements UseCase<GetBankUseCaseParams, Bank | null> {
  constructor(@inject(TYPES.BankRepository) private readonly bankRepository: BankRepository) {}

  run(data: GetBankUseCaseParams): Promise<Bank | null> {
    return this.bankRepository.getById(data.id);
  }
}
