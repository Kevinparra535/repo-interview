import { Bank } from '@/domain/entities/Bank';

export type BankModelConstructorParams = {
  id: string;
  nname: string;
  desription: string;
  logo: string;
  liberation_date?: unknown;
  revision_date?: unknown;
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
  nname: string;
  desription: string;
  logo: string;
  liberation_date?: unknown;
  revision_date?: unknown;
  error?: string | null;

  constructor(params: BankModelConstructorParams) {
    this.id = params.id;
    this.nname = params.nname;
    this.desription = params.desription;
    this.logo = params.logo;
    this.liberation_date = params.liberation_date;
    this.revision_date = params.revision_date;
    this.error = params.error ?? null;

    Object.assign(this, params);
  }

  static fromJson(json: any): BankModel {
    return new BankModel({
      id: String(json?.id ?? ''),
      nname: String(json?.nname ?? ''),
      desription: String(json?.desription ?? ''),
      logo: String(json?.logo ?? ''),
      liberation_date: json?.liberation_date,
      revision_date: json?.revision_date,
      error: json?.error ?? null,
      ...json,
    });
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      nname: this.nname,
      desription: this.desription,
      logo: this.logo,
      liberation_date: this.liberation_date ? toDate(this.liberation_date) : null,
      revision_date: this.revision_date ? toDate(this.revision_date) : null,
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
    nname: this.nname,
    desription: this.desription,
    logo: this.logo,
    liberation_date: this.liberation_date ? toDate(this.liberation_date) : undefined,
    revision_date: this.revision_date ? toDate(this.revision_date) : undefined,
    error: this.error ?? null,
  });
};
