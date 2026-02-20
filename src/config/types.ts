export const TYPES = {
  HttpManager: Symbol.for('HttpManager'),
  BankService: Symbol.for('BankService'),
  BankRepository: Symbol.for('BankRepository'),
  GetAllBankUseCase: Symbol.for('GetAllBankUseCase'),
  GetBankUseCase: Symbol.for('GetBankUseCase'),
  VerifyBankIdUseCase: Symbol.for('VerifyBankIdUseCase'),
  CreateBankUseCase: Symbol.for('CreateBankUseCase'),
  UpdateBankUseCase: Symbol.for('UpdateBankUseCase'),
  DeleteBankUseCase: Symbol.for('DeleteBankUseCase'),
  HomeViewModel: Symbol.for('HomeViewModel'),
  NotFoundViewModel: Symbol.for('NotFoundViewModel'),
  AddProductViewModel: Symbol.for('AddProductViewModel'),
} as const;
