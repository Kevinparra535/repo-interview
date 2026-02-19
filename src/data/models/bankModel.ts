import { Bank } from '@/domain/entities/Bank';

export type BankModelConstructorParams = {
  id: string;
  name: string;
  desription: string;
  logo: string;
  date_release?: unknown;
  date_revision?: unknown;
  error?: string | null;
  [key: string]: any;
};

const toDate = (value: unknown): Date => {
  if (value instanceof Date) return value;

  if (value && typeof value === 'object' && 'toDate' in (value as any)) {
    try {
      return (value as any).toDate();
    } catch {
      return new Date(0);
    }
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date;
  }

  return new Date(0);
};

export class BankModel {
  [key: string]: any;

  id: string;
  name: string;
  desription: string;
  logo: string;
  date_release?: unknown;
  date_revision?: unknown;
  error?: string | null;

  constructor(params: BankModelConstructorParams) {
    this.id = params.id;
    this.name = params.name;
    this.desription = params.desription;
    this.logo = params.logo;
    this.date_release = params.date_release;
    this.date_revision = params.date_revision;
    this.error = params.error ?? null;

    Object.assign(this, params);
  }

  static fromJson(json: any): BankModel {
    return new BankModel({
      id: String(json?.id ?? ''),
      name: String(json?.name ?? ''),
      desription: String(json?.desription ?? ''),
      logo: String(json?.logo ?? ''),
      date_release: json?.date_release,
      date_revision: json?.date_revision,
      error: json?.error ?? null,
      ...json,
    });
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      desription: this.desription,
      logo: this.logo,
      date_release: this.date_release ? toDate(this.date_release) : null,
      date_revision: this.date_revision ? toDate(this.date_revision) : null,
    };
  }
}

declare module './bankModel' {
  interface BankModel {
    toDomain(): Bank;
  }
}

BankModel.prototype.toDomain = function toDomain(): Bank {
  return new Bank({
    id: this.id,
    name: this.name,
    desription: this.desription,
    logo: this.logo,
    date_release: this.date_release ? toDate(this.date_release) : undefined,
    date_revision: this.date_revision ? toDate(this.date_revision) : undefined,
    error: this.error ?? null,
  });
};
