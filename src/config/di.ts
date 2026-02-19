import { Container } from 'inversify';

import { ExploreViewModel } from '@/ui/screens/Explore/ExploreViewModel';
import { HomeViewModel } from '@/ui/screens/Home/HomeViewModel';
import { NotFoundViewModel } from '@/ui/screens/NotFound/NotFoundViewModel';

import { TYPES } from './types';

const container = new Container({ defaultScope: 'Transient' });

container.bind<HomeViewModel>(TYPES.HomeViewModel).to(HomeViewModel);
container.bind<ExploreViewModel>(TYPES.ExploreViewModel).to(ExploreViewModel);
container.bind<NotFoundViewModel>(TYPES.NotFoundViewModel).to(NotFoundViewModel);

export { container };
