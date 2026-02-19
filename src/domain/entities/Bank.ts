export type BankConstructorParams = {
  id: string;
  nname: string;
  desription: string;
  logo: string;
  liberation_date?: Date;
  revision_date?: Date;
  error?: string | null;
  [key: string]: any;
};

export class Bank {
  [key: string]: any;

  id: string;
  nname: string;
  desription: string;
  logo: string;
  liberation_date: Date;
  revision_date: Date;
  error?: string | null;

  constructor(params: BankConstructorParams) {
    this.id = params.id;
    this.nname = params.nname;
    this.desription = params.desription;
    this.logo = params.logo;
    this.liberation_date = params.liberation_date ?? new Date();
    this.revision_date = params.revision_date ?? new Date();
    this.error = params.error ?? null;

    Object.assign(this, params);
  }
}
