import { inject, injectable } from 'inversify';
import { makeAutoObservable, runInAction } from 'mobx';

import { TYPES } from '@/config/types';
import { Bank } from '@/domain/entities/Bank';
import { CreateBankUseCase } from '@/domain/useCases/CreateBankUseCase';
import { GetBankUseCase } from '@/domain/useCases/GetBankUseCase';
import { UpdateBankUseCase } from '@/domain/useCases/UpdateBankUseCase';
import { VerifyBankIdUseCase } from '@/domain/useCases/VerifyBankIdUseCase';
import Logger from '@/ui/utils/Logger';

export type BankProductFormValues = {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release?: Date;
  date_revision?: Date;
};

type ICalls = 'loadBank' | 'createBank' | 'updateBank';
type SubmitMode = 'create' | 'update';

const DEFAULT_FORM_VALUES: BankProductFormValues = {
  id: '',
  name: '',
  description: '',
  logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
  date_release: undefined,
  date_revision: undefined,
};

@injectable()
export class AddProductViewModel {
  public isCreateBankLoading = false;
  public isCreateBankError: string | null = null;
  public isCreateBankResponse: Bank | null = null;

  public isBankLoading = false;
  public isBankError: string | null = null;
  public isBankResponse: Bank | null = null;

  public isBankUpdateLoading = false;
  public isBankUpdateError: string | null = null;
  public isBankUpdateResponse: Bank | null = null;

  public submitMode: SubmitMode = 'create';

  private logger = new Logger('AddProductViewModel');

  constructor(
    @inject(TYPES.CreateBankUseCase) private readonly createBankUseCase: CreateBankUseCase,
    @inject(TYPES.UpdateBankUseCase) private readonly updateBankUseCase: UpdateBankUseCase,
    @inject(TYPES.GetBankUseCase) private readonly getBankUseCase: GetBankUseCase,
    @inject(TYPES.VerifyBankIdUseCase) private readonly verifyBankIdUseCase: VerifyBankIdUseCase,
  ) {
    makeAutoObservable(this);
  }

  get isEditMode(): boolean {
    return this.submitMode === 'update';
  }

  get isSubmitLoading(): boolean {
    return this.isEditMode ? this.isBankUpdateLoading : this.isCreateBankLoading;
  }

  get submitError(): string | null {
    return this.isEditMode ? this.isBankUpdateError : this.isCreateBankError;
  }

  get hasSubmitSuccess(): boolean {
    return Boolean(this.isCreateBankResponse || this.isBankUpdateResponse);
  }

  get submitSuccessMessage(): string | null {
    if (this.isCreateBankResponse) {
      return 'El producto bancario ha sido creado exitosamente.';
    }
    if (this.isBankUpdateResponse) {
      return 'El producto bancario ha sido actualizado exitosamente.';
    }
    return null;
  }

  get formValues(): BankProductFormValues {
    if (!this.isBankResponse) {
      return DEFAULT_FORM_VALUES;
    }

    return {
      id: this.isBankResponse.id,
      name: this.isBankResponse.name,
      description: this.isBankResponse.description,
      logo: this.isBankResponse.logo,
      date_release: this.isBankResponse.date_release
        ? new Date(this.isBankResponse.date_release)
        : undefined,
      date_revision: this.isBankResponse.date_revision
        ? new Date(this.isBankResponse.date_revision)
        : undefined,
    };
  }

  async initialize(bankId?: string): Promise<void> {
    if (!bankId) {
      runInAction(() => {
        this.submitMode = 'create';
        this.isBankResponse = null;
        this.isBankError = null;
      });
      return;
    }

    runInAction(() => {
      this.submitMode = 'update';
    });
    await this.loadBank(bankId);
  }

  async loadBank(id: string): Promise<void> {
    this.updateLoadingState(true, null, 'loadBank');

    try {
      const bank = await this.getBankUseCase.run({ id });

      runInAction(() => {
        this.isBankResponse = bank;
      });

      this.updateLoadingState(false, bank ? null : 'Producto no encontrado', 'loadBank');
    } catch (error) {
      this.handleError(error, 'loadBank');
    }
  }

  async submit(formValues: BankProductFormValues): Promise<boolean> {
    return this.isEditMode
      ? this.updateBank(this.isBankResponse?.id ?? formValues.id, this.mapToBank(formValues))
      : this.createBank(this.mapToBank(formValues));
  }

  async createBank(bank: Bank): Promise<boolean> {
    this.updateLoadingState(true, null, 'createBank');

    try {
      await this.createBankUseCase.run({ bank });

      runInAction(() => {
        this.isCreateBankResponse = bank;
      });

      this.updateLoadingState(false, null, 'createBank');
      return true;
    } catch (error) {
      this.handleError(error, 'createBank');
      return false;
    }
  }

  async updateBank(id: string, bank: Bank): Promise<boolean> {
    this.updateLoadingState(true, null, 'updateBank');

    try {
      await this.updateBankUseCase.run({ id, bank });

      runInAction(() => {
        this.isBankUpdateResponse = bank;
      });

      this.updateLoadingState(false, null, 'updateBank');
      return true;
    } catch (error) {
      this.handleError(error, 'updateBank');
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

  consumeSubmitResult(): void {
    runInAction(() => {
      this.isCreateBankResponse = null;
      this.isBankUpdateResponse = null;
    });
  }

  reset(): void {
    runInAction(() => {
      this.isCreateBankLoading = false;
      this.isCreateBankError = null;
      this.isCreateBankResponse = null;

      this.isBankLoading = false;
      this.isBankError = null;

      this.isBankUpdateLoading = false;
      this.isBankUpdateError = null;
      this.isBankUpdateResponse = null;
    });
  }

  private updateLoadingState(isLoading: boolean, error: string | null, type: ICalls): void {
    runInAction(() => {
      switch (type) {
        case 'loadBank':
          this.isBankLoading = isLoading;
          this.isBankError = error;
          break;
        case 'createBank':
          this.isCreateBankLoading = isLoading;
          this.isCreateBankError = error;
          break;
        case 'updateBank':
          this.isBankUpdateLoading = isLoading;
          this.isBankUpdateError = error;
          break;
      }
    });
  }

  private mapToBank(values: BankProductFormValues): Bank {
    return new Bank({
      id: values.id,
      name: values.name,
      description: values.description,
      logo: values.logo,
      date_release: values.date_release,
      date_revision: values.date_revision,
    });
  }

  private handleError(error: unknown, type: ICalls): void {
    const errorMessage = error instanceof Error ? error.message : String(error);
    this.logger.error(`Error in ${type}: ${errorMessage}`);
    this.updateLoadingState(false, errorMessage, type);
  }
}
