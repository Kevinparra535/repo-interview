import axios from 'axios';

import { AxiosHttpManager } from '@/data/network/axiosHttpManager';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
  },
}));

describe('AxiosHttpManager', () => {
  const createAxiosInstance = () => {
    const get = jest.fn();
    const post = jest.fn();
    const put = jest.fn();
    const del = jest.fn();
    const responseUse = jest.fn();

    (axios.create as jest.Mock).mockReturnValue({
      get,
      post,
      put,
      delete: del,
      interceptors: {
        response: {
          use: responseUse,
        },
      },
    });

    const manager = new AxiosHttpManager();

    return { manager, get, post, put, del, responseUse };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates axios instance and wires interceptors', () => {
    const { responseUse } = createAxiosInstance();

    expect(axios.create).toHaveBeenCalledTimes(1);
    expect(responseUse).toHaveBeenCalledTimes(1);
  });

  it('get/post/put/delete return response data', async () => {
    const { manager, get, post, put, del } = createAxiosInstance();
    get.mockResolvedValue({ data: { foo: 'bar' } });
    post.mockResolvedValue({ data: { id: 1 } });
    put.mockResolvedValue({ data: { ok: true } });
    del.mockResolvedValue({ data: undefined });

    await expect(manager.get('/x', { q: 1 })).resolves.toEqual({ foo: 'bar' });
    await expect(manager.post('/x', { a: 1 })).resolves.toEqual({ id: 1 });
    await expect(manager.put('/x', { a: 2 })).resolves.toEqual({ ok: true });
    await expect(manager.delete('/x')).resolves.toBeUndefined();

    expect(get).toHaveBeenCalledWith('/x', expect.objectContaining({ params: { q: 1 } }));
  });

  it('error interceptor maps missing response to network-friendly error', async () => {
    const { responseUse } = createAxiosInstance();
    const errorInterceptor = responseUse.mock.calls[0][1] as (error: any) => Promise<unknown>;

    await expect(errorInterceptor({ message: 'timeout' })).rejects.toEqual({
      message: 'No response from server',
      statusCode: 0,
    });
  });

  it('success interceptor returns original response', () => {
    const { responseUse } = createAxiosInstance();
    const successInterceptor = responseUse.mock.calls[0][0] as <T>(response: T) => T;

    const response = { data: { ok: true } };
    expect(successInterceptor(response)).toBe(response);
  });

  it('error interceptor maps api response error shape', async () => {
    const { responseUse } = createAxiosInstance();
    const errorInterceptor = responseUse.mock.calls[0][1] as (error: any) => Promise<unknown>;

    const apiError = {
      message: 'fallback',
      response: {
        status: 400,
        data: { message: 'bad request' },
      },
    };

    await expect(errorInterceptor(apiError)).rejects.toEqual({
      message: 'bad request',
      statusCode: 400,
      data: { message: 'bad request' },
    });
  });
});
