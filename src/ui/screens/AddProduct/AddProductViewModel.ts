import { inject, injectable } from 'inversify';
import { makeAutoObservable, runInAction } from 'mobx';

import { TYPES } from '@/config/types';
import { Bank } from '@/domain/entities/Bank';
import { CreateBankUseCase } from '@/domain/useCases/CreateBankUseCase';
import { VerifyBankIdUseCase } from '@/domain/useCases/VerifyBankIdUseCase';

@injectable()
export class AddProductViewModel {
  loading = false;

  submitError: string | null = null;

  submitSuccess = false;

  constructor(
    @inject(TYPES.CreateBankUseCase) private readonly createBankUseCase: CreateBankUseCase,
    @inject(TYPES.VerifyBankIdUseCase) private readonly verifyBankIdUseCase: VerifyBankIdUseCase,
  ) {
    makeAutoObservable(this);
  }

  /**
   * Submits the new bank product.
   * @returns `true` on success, `false` on error (error stored in `submitError`).
   */
  async submit(bank: Bank): Promise<boolean> {
    this.loading = true;
    this.submitError = null;

    try {
      await this.createBankUseCase.run({ bank });

      runInAction(() => {
        this.submitSuccess = true;
        this.loading = false;
      });

      return true;
    } catch (e: unknown) {
      runInAction(() => {
        this.submitError =
          e instanceof Error ? e.message : 'Error al crear el producto. Intenta nuevamente.';
        this.loading = false;
      });

      return false;
    }
  }

  /**
   * Verifies whether the given ID is available (does not exist yet).
   * @returns `true` if available, `false` if taken.
   */
  async verifyIdAvailable(id: string): Promise<boolean> {
    try {
      const exists = await this.verifyBankIdUseCase.run({ id });
      return !exists;
    } catch {
      // On network/unexpected error, assume available to avoid blocking the user
      return true;
    }
  }

  /** Resets loading/error/success state (e.g. when navigating away). */
  reset() {
    this.loading = false;
    this.submitError = null;
    this.submitSuccess = false;
  }
}
