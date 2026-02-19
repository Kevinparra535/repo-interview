import { inject, injectable } from 'inversify';

import { TYPES } from '@/config/types';
import { BankRepository } from '@/domain/repositories/BankRepository';
import { UseCase } from '@/domain/useCases/UseCase';

type DeleteBankUseCaseParams = {
  id: string;
};

@injectable()
export class DeleteBankUseCase implements UseCase<DeleteBankUseCaseParams, void> {
  constructor(@inject(TYPES.BankRepository) private readonly bankRepository: BankRepository) {}

  run(data: DeleteBankUseCaseParams): Promise<void> {
    return this.bankRepository.delete(data.id);
  }
}
