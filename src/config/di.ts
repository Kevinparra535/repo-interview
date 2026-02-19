import { Container } from 'inversify';

import { HomeViewModel } from '@/ui/screens/Home/HomeViewModel';
import { NotFoundViewModel } from '@/ui/screens/NotFound/NotFoundViewModel';

import { TYPES } from './types';

const container = new Container({ defaultScope: 'Transient' });

container.bind<HomeViewModel>(TYPES.HomeViewModel).to(HomeViewModel);
container.bind<NotFoundViewModel>(TYPES.NotFoundViewModel).to(NotFoundViewModel);

export { container };
