import { inject, injectable } from 'inversify';

import { config } from '@/config/config';
import { TYPES } from '@/config/types';
import { BankModel } from '@/data/models/bankModel';
import { HttpManager } from '@/data/network/axiosHttpManager';

export interface BankService {
  getAll(): Promise<BankModel[]>;
  getById(id: string): Promise<BankModel | null>;
  create(model: BankModel): Promise<BankModel>;
  update(id: string, model: BankModel): Promise<BankModel>;
  delete(id: string): Promise<void>;
}

type Params = Record<string, unknown>;

@injectable()
export class BankServiceImpl implements BankService {
  constructor(@inject(TYPES.HttpManager) private readonly httpManager: HttpManager) {}

  async getAll(): Promise<BankModel[]> {
    const response = await this.httpManager.get<Params[]>(config.API_ENDPOINTS.PRODUCTS);

    return response.map((item) => BankModel.fromJson(item));
  }

  async getById(id: string): Promise<BankModel | null> {
    const response = await this.getAll();
    const item = response.find((product) => product.id === id);

    if (!item) {
      return null;
    }

    return item;
  }

  async create(model: BankModel): Promise<BankModel> {
    const payload = model.toJson();
    const response = await this.httpManager.post<Params>(config.API_ENDPOINTS.PRODUCTS, payload);

    return BankModel.fromJson(response);
  }

  async update(id: string, model: BankModel): Promise<BankModel> {
    const payload = {
      ...model.toJson(),
      id,
    };
    const response = await this.httpManager.put<Params>(
      config.API_ENDPOINTS.PRODUCT_BY_ID(id),
      payload,
    );

    return BankModel.fromJson(response);
  }

  async delete(id: string): Promise<void> {
    await this.httpManager.delete(config.API_ENDPOINTS.PRODUCT_BY_ID(id));
  }
}
