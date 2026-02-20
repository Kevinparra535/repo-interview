import { inject, injectable } from 'inversify';

import { TYPES } from '@/config/types';
import { BankRepository } from '@/domain/repositories/BankRepository';
import { UseCase } from '@/domain/useCases/UseCase';

type VerifyBankIdUseCaseParams = {
  id: string;
};

@injectable()
export class VerifyBankIdUseCase implements UseCase<VerifyBankIdUseCaseParams, boolean> {
  constructor(@inject(TYPES.BankRepository) private readonly bankRepository: BankRepository) {}

  run(data: VerifyBankIdUseCaseParams): Promise<boolean> {
    return this.bankRepository.verifyIdExists(data.id);
  }
}
