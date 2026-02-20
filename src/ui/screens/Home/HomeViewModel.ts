import { inject, injectable } from 'inversify';
import { makeAutoObservable, runInAction } from 'mobx';

import { TYPES } from '@/config/types';
import { Bank } from '@/domain/entities/Bank';
import { GetAllBankUseCase } from '@/domain/useCases/GetAllBankUseCase';

@injectable()
export class HomeViewModel {
  banks: Bank[] = [];

  loading = false;

  error: string | null = null;

  searchQuery = '';

  constructor(
    @inject(TYPES.GetAllBankUseCase) private readonly getAllBankUseCase: GetAllBankUseCase,
  ) {
    makeAutoObservable(this);
  }

  get filteredBanks(): Bank[] {
    if (!this.searchQuery.trim()) return this.banks;
    const q = this.searchQuery.toLowerCase();

    return this.banks.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.desription?.toLowerCase().includes(q),
    );
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  async load() {
    this.loading = true;
    this.error = null;

    try {
      const result = await this.getAllBankUseCase.run();

      runInAction(() => {
        this.banks = result;
        this.loading = false;
      });
    } catch {
      runInAction(() => {
        this.error = 'No se pudieron cargar los productos.';
        this.loading = false;
      });
    }
  }

  /** @deprecated use load() */
  run() {
    this.load();
  }
}
