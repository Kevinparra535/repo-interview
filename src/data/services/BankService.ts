import { inject, injectable } from 'inversify';

import { config } from '@/config/config';
import { TYPES } from '@/config/types';
import { BankModel } from '@/data/models/bankModel';
import { HttpManager } from '@/data/network/axiosHttpManager';
import Logger from '@/ui/utils/Logger';

export interface BankService {
  getAll(): Promise<BankModel[]>;
  getById(id: string): Promise<BankModel | null>;
  verifyIdExists(id: string): Promise<boolean>;
  create(model: BankModel): Promise<BankModel>;
  update(id: string, model: BankModel): Promise<BankModel>;
  delete(id: string): Promise<void>;
}

type Params = Record<string, unknown>;

type ApiResponse<T> = {
  data: T;
  message?: string;
};

type HttpError = {
  message?: string;
  statusCode?: number;
};

@injectable()
export class BankServiceImpl implements BankService {
  private logger = new Logger('BankServiceImpl');

  constructor(@inject(TYPES.HttpManager) private readonly httpManager: HttpManager) {}

  async getAll(): Promise<BankModel[]> {
    try {
      const response = await this.httpManager.get<Params[] | ApiResponse<Params[]>>(
        config.API_ENDPOINTS.PRODUCTS,
      );
      const data = this.unwrapData<Params[]>(response);

      return data.map((item) => BankModel.fromJson(item));
    } catch (error: unknown) {
      throw this.toError(error, 'getAll');
    }
  }

  async getById(id: string): Promise<BankModel | null> {
    try {
      const response = await this.httpManager.get<Params>(config.API_ENDPOINTS.PRODUCT_BY_ID(id));

      return BankModel.fromJson(response);
    } catch (error: unknown) {
      throw this.toError(error, 'getById');
    }
  }

  async verifyIdExists(id: string): Promise<boolean> {
    try {
      return await this.httpManager.get<boolean>(
        config.API_ENDPOINTS.PRODUCT_VERIFICATION_BY_ID(id),
      );
    } catch (error: unknown) {
      throw this.toError(error, 'verifyIdExists');
    }
  }

  async create(model: BankModel): Promise<BankModel> {
    try {
      const payload = model.toJson();
      const response = await this.httpManager.post<Params | ApiResponse<Params>>(
        config.API_ENDPOINTS.PRODUCTS,
        payload,
      );
      const data = this.unwrapData<Params>(response);

      return BankModel.fromJson(data);
    } catch (error: unknown) {
      throw this.toError(error, 'create');
    }
  }

  async update(id: string, model: BankModel): Promise<BankModel> {
    try {
      const payload = {
        ...model.toJson(),
        id,
      };
      const response = await this.httpManager.put<Params | ApiResponse<Params>>(
        config.API_ENDPOINTS.PRODUCT_BY_ID(id),
        payload,
      );
      const data = this.unwrapData<Params>(response);

      return BankModel.fromJson(data);
    } catch (error: unknown) {
      throw this.toError(error, 'update');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.httpManager.delete(config.API_ENDPOINTS.PRODUCT_BY_ID(id));
    } catch (error: unknown) {
      throw this.toError(error, 'delete');
    }
  }

  /**
   * Unwraps data from an API response or returns the data as-is if it's not wrapped.
   *
   * @template T - The type of the unwrapped data.
   * @param response - The response object that may be wrapped in an {@link ApiResponse} or already unwrapped.
   * @returns The unwrapped data of type T.
   *
   * @remarks
   * This method checks if the response is an object with a 'data' property (indicating it's an ApiResponse wrapper).
   * If so, it extracts and returns the inner data. Otherwise, it returns the response as-is.
   */
  private unwrapData<T>(response: T | ApiResponse<T>): T {
    if (
      response !== null &&
      typeof response === 'object' &&
      'data' in (response as Record<string, unknown>)
    ) {
      return (response as ApiResponse<T>).data;
    }

    return response as T;
  }

  /**
   * Handles errors that occur during storage operations.
   * @param error The error that occurred.
   * @param context The context in which the error occurred.
   * @returns An Error object with a descriptive message.
   */
  private toError(error: unknown, context: string): Error {
    const httpError = error as HttpError | undefined;
    const message =
      error instanceof Error
        ? error.message
        : typeof httpError?.message === 'string' && httpError.message.trim().length > 0
          ? httpError.message
          : String(error);

    this.logger.error(`Error in the data layer (${context}): ${message}`);

    return new Error(message);
  }
}
