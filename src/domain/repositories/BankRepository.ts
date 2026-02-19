import { Bank } from '@/domain/entities/Bank';

export interface BankRepository {
  getAll(): Promise<Bank[]>;
  getById(id: string): Promise<Bank | null>;
  create(bank: Bank): Promise<Bank>;
  update(id: string, bank: Bank): Promise<Bank>;
  delete(id: string): Promise<void>;
}
