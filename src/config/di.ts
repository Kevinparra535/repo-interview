import { Container } from 'inversify';

import { AxiosHttpManager, HttpManager } from '@/data/network/axiosHttpManager';
import { BankRepositoryImpl } from '@/data/repositories/BankRepositoryImpl';
import { BankService, BankServiceImpl } from '@/data/services/BankService';
import { BankRepository } from '@/domain/repositories/BankRepository';
import { CreateBankUseCase } from '@/domain/useCases/CreateBankUseCase';
import { DeleteBankUseCase } from '@/domain/useCases/DeleteBankUseCase';
import { GetAllBankUseCase } from '@/domain/useCases/GetAllBankUseCase';
import { GetBankUseCase } from '@/domain/useCases/GetBankUseCase';
import { UpdateBankUseCase } from '@/domain/useCases/UpdateBankUseCase';
import { VerifyBankIdUseCase } from '@/domain/useCases/VerifyBankIdUseCase';
import { AddProductViewModel } from '@/ui/screens/AddProduct/AddProductViewModel';
import { HomeViewModel } from '@/ui/screens/Home/HomeViewModel';
import { NotFoundViewModel } from '@/ui/screens/NotFound/NotFoundViewModel';
import { ProductDetailViewModel } from '@/ui/screens/ProductDetail/ProductDetailViewModel';

import { TYPES } from './types';

const container = new Container({ defaultScope: 'Transient' });

container.bind<HttpManager>(TYPES.HttpManager).to(AxiosHttpManager).inSingletonScope();
container.bind<BankService>(TYPES.BankService).to(BankServiceImpl).inSingletonScope();
container.bind<BankRepository>(TYPES.BankRepository).to(BankRepositoryImpl).inSingletonScope();

container.bind<GetAllBankUseCase>(TYPES.GetAllBankUseCase).to(GetAllBankUseCase);
container.bind<GetBankUseCase>(TYPES.GetBankUseCase).to(GetBankUseCase);
container.bind<VerifyBankIdUseCase>(TYPES.VerifyBankIdUseCase).to(VerifyBankIdUseCase);
container.bind<CreateBankUseCase>(TYPES.CreateBankUseCase).to(CreateBankUseCase);
container.bind<UpdateBankUseCase>(TYPES.UpdateBankUseCase).to(UpdateBankUseCase);
container.bind<DeleteBankUseCase>(TYPES.DeleteBankUseCase).to(DeleteBankUseCase);

container.bind<HomeViewModel>(TYPES.HomeViewModel).to(HomeViewModel);
container.bind<NotFoundViewModel>(TYPES.NotFoundViewModel).to(NotFoundViewModel);
container.bind<AddProductViewModel>(TYPES.AddProductViewModel).to(AddProductViewModel);
container.bind<ProductDetailViewModel>(TYPES.ProductDetailViewModel).to(ProductDetailViewModel);

export { container };
