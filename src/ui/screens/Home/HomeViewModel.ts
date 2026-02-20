import { inject, injectable } from 'inversify';
import { makeAutoObservable, observable, runInAction } from 'mobx';

import { TYPES } from '@/config/types';
import { Bank } from '@/domain/entities/Bank';
import { GetAllBankUseCase } from '@/domain/useCases/GetAllBankUseCase';
import { debounce } from '@/ui/helpers/Debouncing';
import Logger from '@/ui/utils/Logger';

type ICalls = 'banks';
@injectable()
export class HomeViewModel {
  public isBanksLoading: boolean = false;
  public isBanksError: string | null = null;
  public isBanksResponse: Bank[] | null = null;

  private logger = new Logger('HomeViewModel');

  @observable public searchQuery = '';

  constructor(
    @inject(TYPES.GetAllBankUseCase) private readonly getAllBankUseCase: GetAllBankUseCase,
  ) {
    makeAutoObservable(this);
  }

  public async searchTraces(query: string): Promise<void> {
    const fun = debounce(async (newQuery: string) => {
      try {
        console.log(newQuery);
      } catch (error) {
        console.log('HomeViewModel.searchTraces.error:', error);
      }
    }, 1000);

    fun(query);
  }

  get filteredBanks() {
    if (!this.searchQuery.trim()) return this.isBanksResponse;
    const q = this.searchQuery.toLowerCase();

    return this.isBanksResponse?.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.description?.toLowerCase().includes(q),
    );
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  async getAllBanks() {
    this.updateLoadingState(true, null, 'banks');

    try {
      const response = await this.getAllBankUseCase.run();

      runInAction(() => {
        this.isBanksResponse = response;
      });

      this.updateLoadingState(false, null, 'banks');
    } catch (error) {
      this.handleError(error, 'banks');
    }
  }

  private updateLoadingState(isLoading: boolean, error: string | null, type: ICalls) {
    runInAction(() => {
      switch (type) {
        case 'banks':
          this.isBanksLoading = isLoading;
          this.isBanksError = error;
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
