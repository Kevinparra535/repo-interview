export type BankConstructorParams = {
  id: string;
  name: string;
  desription: string;
  logo: string;
  date_release?: Date;
  date_revision?: Date;
  error?: string | null;
  [key: string]: any;
};

export class Bank {
  [key: string]: any;

  id: string;
  name: string;
  desription: string;
  logo: string;
  date_release: Date;
  date_revision: Date;
  error?: string | null;

  constructor(params: BankConstructorParams) {
    this.id = params.id;
    this.name = params.name;
    this.desription = params.desription;
    this.logo = params.logo;
    this.date_release = params.date_release ?? new Date();
    this.date_revision = params.date_revision ?? new Date();
    this.error = params.error ?? null;

    Object.assign(this, params);
  }
}
