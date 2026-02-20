import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { injectable } from 'inversify';

import { config } from '@/config/config';

export interface HttpManager {
  get<T>(
    url: string,
    params?: Record<string, unknown>,
    requestConfig?: AxiosRequestConfig,
  ): Promise<T>;
  post<T>(url: string, body?: unknown, requestConfig?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, body?: unknown, requestConfig?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, requestConfig?: AxiosRequestConfig): Promise<T>;
}

@injectable()
export class AxiosHttpManager implements HttpManager {
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: config.API_BASE_URL,
      timeout: 1000 * 60,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.http.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  async get<T>(
    url: string,
    params?: Record<string, unknown>,
    requestConfig?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.http.get<T>(url, {
      ...requestConfig,
      params,
    });

    return response.data;
  }

  async post<T>(url: string, body?: unknown, requestConfig?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.post<T>(url, body, requestConfig);

    return response.data;
  }

  async put<T>(url: string, body?: unknown, requestConfig?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.put<T>(url, body, requestConfig);

    return response.data;
  }

  async delete<T>(url: string, requestConfig?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.delete<T>(url, requestConfig);

    return response.data;
  }

  private readonly handleSuccess = <T>(response: T): T => response;

  private readonly handleError = (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject({
        message: 'No response from server',
        statusCode: 0,
      });
    }

    return Promise.reject({
      message: (error.response.data as { message?: string } | undefined)?.message ?? error.message,
      statusCode: error.response.status,
      data: error.response.data,
    });
  };
}
