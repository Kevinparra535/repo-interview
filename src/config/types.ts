export const TYPES = {
  BankService: Symbol.for('BankService'),
  BankRepository: Symbol.for('BankRepository'),
  GetAllBankUseCase: Symbol.for('GetAllBankUseCase'),
  GetBankUseCase: Symbol.for('GetBankUseCase'),
  CreateBankUseCase: Symbol.for('CreateBankUseCase'),
  UpdateBankUseCase: Symbol.for('UpdateBankUseCase'),
  DeleteBankUseCase: Symbol.for('DeleteBankUseCase'),
  HomeViewModel: Symbol.for('HomeViewModel'),
  NotFoundViewModel: Symbol.for('NotFoundViewModel'),
} as const;
