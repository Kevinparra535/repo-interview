import { BankModel } from '@/data/models/bankModel';

describe('BankModel', () => {
  it('fromJson maps raw payload fields', () => {
    const model = BankModel.fromJson({
      id: '1',
      name: 'Cuenta 1',
      description: 'Desc',
      logo: 'https://example.com/logo.png',
      date_release: '2026-01-01',
      date_revision: '2027-01-01',
    });

    expect(model.id).toBe('1');
    expect(model.name).toBe('Cuenta 1');
    expect(model.description).toBe('Desc');
  });

  it('toJson normalizes dates', () => {
    const model = new BankModel({
      id: '1',
      name: 'Cuenta 1',
      description: 'Desc',
      logo: 'https://example.com/logo.png',
      date_release: '2026-01-01',
      date_revision: new Date('2027-01-01'),
    });

    const json = model.toJson();

    expect(json.id).toBe('1');
    expect(json.date_release).toBeInstanceOf(Date);
    expect(json.date_revision).toBeInstanceOf(Date);
  });

  it('toDomain converts into Bank entity with valid dates', () => {
    const model = new BankModel({
      id: '1',
      name: 'Cuenta 1',
      description: 'Desc',
      logo: 'https://example.com/logo.png',
      date_release: { toDate: () => new Date('2026-01-01') },
      date_revision: 'invalid-date',
    });

    const entity = model.toDomain();

    expect(entity.id).toBe('1');
    expect(entity.date_release).toBeInstanceOf(Date);
    expect(entity.date_release.getUTCFullYear()).toBe(2026);
    expect(entity.date_revision).toBeInstanceOf(Date);
  });
});
