import { inject, injectable } from 'inversify';
import { makeAutoObservable, runInAction } from 'mobx';

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

  public searchQuery = '';
  private debouncedSearchQuery = '';

  constructor(
    @inject(TYPES.GetAllBankUseCase) private readonly getAllBankUseCase: GetAllBankUseCase,
  ) {
    makeAutoObservable(this);
  }

  get filteredBanks(): Bank[] {
    if (!this.debouncedSearchQuery.trim()) return this.isBanksResponse ?? [];
    const q = this.debouncedSearchQuery.toLowerCase();

    return (this.isBanksResponse ?? []).filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.description?.toLowerCase().includes(q),
    );
  }

  get hasBanks(): boolean {
    return this.filteredBanks.length > 0;
  }

  initialize(): void {
    if (!this.isBanksResponse && !this.isBanksLoading) {
      void this.getAllBanks();
    }
  }

  public setSearchQuery(query: string): void {
    this.searchQuery = query;

    if (!query.trim()) {
      this.debouncedSearchQuery = '';
      return;
    }

    this.applyDebouncedSearch(query);
  }

  public async getAllBanks(): Promise<void> {
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

  // utils
  private readonly applyDebouncedSearch = debounce((query: string) => {
    if (query !== this.searchQuery) return;

    runInAction(() => {
      this.debouncedSearchQuery = query;
    });
  }, 300);

  private updateLoadingState(isLoading: boolean, error: string | null, type: ICalls) {
    runInAction(() => {
      if (type === 'banks') {
        this.isBanksLoading = isLoading;
        this.isBanksError = error;
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
