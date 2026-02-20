import { BankModel } from '@/data/models/bankModel';
import { BankServiceImpl } from '@/data/services/BankService';

describe('BankServiceImpl', () => {
  const model = BankModel.fromJson({
    id: 'bank-1',
    name: 'Cuenta Ahorros',
    description: 'Producto de prueba',
    logo: 'https://example.com/logo.png',
    date_release: '2026-01-01',
    date_revision: '2027-01-01',
  });

  const makeService = () => {
    const httpManager = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };

    return {
      httpManager,
      service: new BankServiceImpl(httpManager as any),
    };
  };

  it('getAll unwraps wrapped payload and maps to models', async () => {
    const { service, httpManager } = makeService();
    httpManager.get.mockResolvedValue({ data: [model.toJson()] });

    const result = await service.getAll();

    expect(httpManager.get).toHaveBeenCalledWith('/bp/products');
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(BankModel);
    expect(result[0].id).toBe('bank-1');
  });

  it('getAll also supports plain array responses', async () => {
    const { service, httpManager } = makeService();
    httpManager.get.mockResolvedValue([model.toJson()]);

    const result = await service.getAll();

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('bank-1');
  });

  it('getById returns model from plain response', async () => {
    const { service, httpManager } = makeService();
    httpManager.get.mockResolvedValue(model.toJson());

    const result = await service.getById('bank-1');

    expect(httpManager.get).toHaveBeenCalledWith('/bp/products/bank-1');
    expect(result).toBeInstanceOf(BankModel);
    expect(result?.id).toBe('bank-1');
  });

  it('verifyIdExists returns boolean', async () => {
    const { service, httpManager } = makeService();
    httpManager.get.mockResolvedValue(true);

    const result = await service.verifyIdExists('bank-1');

    expect(httpManager.get).toHaveBeenCalledWith('/bp/products/verification/bank-1');
    expect(result).toBe(true);
  });

  it('create and update map wrapped responses', async () => {
    const { service, httpManager } = makeService();
    httpManager.post.mockResolvedValue({ data: model.toJson() });
    httpManager.put.mockResolvedValue({ data: model.toJson() });

    const created = await service.create(model);
    const updated = await service.update('bank-1', model);

    expect(httpManager.post).toHaveBeenCalledWith('/bp/products', expect.any(Object));
    expect(httpManager.put).toHaveBeenCalledWith('/bp/products/bank-1', expect.any(Object));
    expect(created.id).toBe('bank-1');
    expect(updated.id).toBe('bank-1');
  });

  it('create and update also map plain responses', async () => {
    const { service, httpManager } = makeService();
    httpManager.post.mockResolvedValue(model.toJson());
    httpManager.put.mockResolvedValue(model.toJson());

    const created = await service.create(model);
    const updated = await service.update('bank-1', model);

    expect(created.id).toBe('bank-1');
    expect(updated.id).toBe('bank-1');
  });

  it('delete delegates to http manager', async () => {
    const { service, httpManager } = makeService();
    httpManager.delete.mockResolvedValue(undefined);

    await service.delete('bank-1');

    expect(httpManager.delete).toHaveBeenCalledWith('/bp/products/bank-1');
  });

  it('throws normalized error when service fails', async () => {
    const { service, httpManager } = makeService();
    httpManager.get.mockRejectedValue({ message: 'network exploded', statusCode: 500 });

    await expect(service.getAll()).rejects.toThrow('network exploded');
  });

  it('normalizes native Error instances', async () => {
    const { service, httpManager } = makeService();
    httpManager.get.mockRejectedValue(new Error('native error'));

    await expect(service.getById('bank-1')).rejects.toThrow('native error');
  });

  it('normalizes unknown values via String conversion', async () => {
    const { service, httpManager } = makeService();
    httpManager.put.mockRejectedValue(404);

    await expect(service.update('bank-1', model)).rejects.toThrow('404');
  });

  it('handles failures on verify and delete paths', async () => {
    const { service, httpManager } = makeService();
    httpManager.get.mockRejectedValueOnce({ message: 'verify failed' });
    httpManager.delete.mockRejectedValueOnce({ message: 'delete failed' });

    await expect(service.verifyIdExists('bank-1')).rejects.toThrow('verify failed');
    await expect(service.delete('bank-1')).rejects.toThrow('delete failed');
  });
});
