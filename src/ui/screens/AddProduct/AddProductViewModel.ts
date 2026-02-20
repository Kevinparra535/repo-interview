import { inject, injectable } from 'inversify';
import { makeAutoObservable, observable, runInAction } from 'mobx';

import { TYPES } from '@/config/types';
import { Bank } from '@/domain/entities/Bank';
import { CreateBankUseCase } from '@/domain/useCases/CreateBankUseCase';
import { GetBankUseCase } from '@/domain/useCases/GetBankUseCase';
import { UpdateBankUseCase } from '@/domain/useCases/UpdateBankUseCase';
import { VerifyBankIdUseCase } from '@/domain/useCases/VerifyBankIdUseCase';
import Logger from '@/ui/utils/Logger';

type ICalls = 'bank' | 'submit' | 'update';

@injectable()
export class AddProductViewModel {
  public isCreateBankLoading = false;
  public isCreateBankError: string | null = null;
  public isCreateBankResponse: Bank | null = null;

  @observable bankData: Bank | null = null;

  bankLoading = false;
  bankError: string | null = null;
  bank: Bank | null = null;

  private logger = new Logger('AddProductViewModel');

  constructor(
    @inject(TYPES.CreateBankUseCase) private readonly createBankUseCase: CreateBankUseCase,
    @inject(TYPES.UpdateBankUseCase) private readonly updateBankUseCase: UpdateBankUseCase,
    @inject(TYPES.GetBankUseCase) private readonly getBankUseCase: GetBankUseCase,
    @inject(TYPES.VerifyBankIdUseCase) private readonly verifyBankIdUseCase: VerifyBankIdUseCase,
  ) {
    makeAutoObservable(this);
  }

  async getBank(id: string): Promise<void> {
    this.updateLoadingState(true, null, 'bank');

    try {
      const bank = await this.getBankUseCase.run({ id });

      runInAction(() => {
        this.bank = bank;
      });

      this.updateLoadingState(false, bank ? null : 'Producto no encontrado', 'bank');
    } catch (error) {
      this.handleError(error, 'bank');
    }
  }

  /**
   * Submits the new bank product.
   * @returns `true` on success, `false` on error (error stored in `submitError`).
   */
  async sendData(bank: Bank): Promise<boolean> {
    this.updateLoadingState(true, null, 'submit');

    try {
      const response = await this.createBankUseCase.run({ bank });

      runInAction(() => {
        this.isCreateBankResponse = response;
      });

      this.updateLoadingState(false, null, 'submit');
      return true;
    } catch (error) {
      this.handleError(error, 'submit');
      return false;
    }
  }

  async update(id: string, bank: Bank): Promise<boolean> {
    this.updateLoadingState(true, null, 'update');

    try {
      const updated = await this.updateBankUseCase.run({ id, bank });

      runInAction(() => {
        this.bank = updated;
      });

      this.updateLoadingState(false, null, 'update');
      return true;
    } catch (error) {
      this.handleError(error, 'update');
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
  reset(): void {
    runInAction(() => {
      this.bankData = null;
    });
  }

  private updateLoadingState(isLoading: boolean, error: string | null, type: ICalls): void {
    runInAction(() => {
      switch (type) {
        case 'submit':
          this.isCreateBankLoading = isLoading;
          this.isCreateBankError = error;
      }
    });
  }

  private handleError(error: unknown, type: ICalls): void {
    const errorMessage = error instanceof Error ? error.message : String(error);
    this.logger.error(`Error in ${type}: ${errorMessage}`);
    this.updateLoadingState(false, errorMessage, type);
  }
}
