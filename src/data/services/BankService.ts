import { injectable } from 'inversify';

import { BankModel } from '@/data/models/bankModel';

export interface BankService {
  getAll(): Promise<BankModel[]>;
  getById(id: string): Promise<BankModel | null>;
  create(model: BankModel): Promise<BankModel>;
  update(id: string, model: BankModel): Promise<BankModel>;
  delete(id: string): Promise<void>;
}

@injectable()
export class BankServiceImpl implements BankService {
  private readonly storage = new Map<string, Record<string, unknown>>();

  async getAll(): Promise<BankModel[]> {
    return Array.from(this.storage.values()).map((item) => BankModel.fromJson(item));
  }

  async getById(id: string): Promise<BankModel | null> {
    const item = this.storage.get(id);

    if (!item) {
      return null;
    }

    return BankModel.fromJson(item);
  }

  async create(model: BankModel): Promise<BankModel> {
    const payload = model.toJson();
    this.storage.set(model.id, payload);

    return BankModel.fromJson(payload);
  }

  async update(id: string, model: BankModel): Promise<BankModel> {
    const payload = {
      ...model.toJson(),
      id,
    };

    this.storage.set(id, payload);

    return BankModel.fromJson(payload);
  }

  async delete(id: string): Promise<void> {
    this.storage.delete(id);
  }
}
