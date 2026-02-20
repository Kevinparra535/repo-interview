import { inject, injectable } from 'inversify';
import { makeAutoObservable, runInAction } from 'mobx';

import { TYPES } from '@/config/types';
import { Bank } from '@/domain/entities/Bank';
import { DeleteBankUseCase } from '@/domain/useCases/DeleteBankUseCase';
import { GetBankUseCase } from '@/domain/useCases/GetBankUseCase';
import Logger from '@/ui/utils/Logger';

type ICalls = 'bank' | 'delete';

@injectable()
export class ProductDetailViewModel {
  isBankLoading: boolean = false;
  isBankError: string | null = null;
  isBankResponse: Bank | null = null;

  isDeleteBankLoading: boolean = false;
  isDeleteBankError: string | null = null;
  isDeleteBankResponse: boolean = false;

  private logger = new Logger('ProductDetailViewModel');

  constructor(
    @inject(TYPES.GetBankUseCase) private readonly getBankUseCase: GetBankUseCase,
    @inject(TYPES.DeleteBankUseCase) private readonly deleteBankUseCase: DeleteBankUseCase,
  ) {
    makeAutoObservable(this);
  }

  get isLoaded(): boolean {
    return !this.isBankLoading && this.isBankResponse !== null;
  }

  initialize(id: string): void {
    void this.getBank(id);
  }

  async getBank(id: string): Promise<void> {
    this.updateLoadingState(true, null, 'bank');
    try {
      const result = await this.getBankUseCase.run({ id });
      runInAction(() => {
        this.isBankResponse = result;
        if (!result) this.isBankError = 'Producto no encontrado';
      });
      this.updateLoadingState(false, null, 'bank');
    } catch (e) {
      this.handleError(e, 'bank');
    }
  }

  /**
   * Deletes the product by ID.
   * @returns `true` on success, `false` if an error occurred.
   */
  async delete(id: string): Promise<boolean> {
    this.updateLoadingState(true, null, 'delete');
    try {
      await this.deleteBankUseCase.run({ id });
      runInAction(() => {
        this.isDeleteBankResponse = true;
      });
      this.updateLoadingState(false, null, 'delete');
      return true;
    } catch (e) {
      this.handleError(e, 'delete');
      return false;
    }
  }

  consumeDeleteResult(): void {
    runInAction(() => {
      this.isDeleteBankResponse = false;
    });
  }

  reset(): void {
    runInAction(() => {
      this.isBankResponse = null;
      this.isBankLoading = false;
      this.isBankError = null;
      this.isDeleteBankLoading = false;
      this.isDeleteBankError = null;
      this.isDeleteBankResponse = false;
    });
  }

  private updateLoadingState(isLoading: boolean, error: string | null, type: ICalls) {
    runInAction(() => {
      switch (type) {
        case 'bank':
          this.isBankLoading = isLoading;
          this.isBankError = error;
          break;
        case 'delete':
          this.isDeleteBankLoading = isLoading;
          this.isDeleteBankError = error;
          break;
      }
    });
  }

  private handleError(error: unknown, type: ICalls) {
    const errorMessage = `Error in ${type}: ${
      error instanceof Error ? error.message : String(error)
    }`;
    this.logger.error(errorMessage);
    this.updateLoadingState(false, errorMessage, type);
  }
}
