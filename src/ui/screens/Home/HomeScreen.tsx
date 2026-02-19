import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { Text } from 'react-native';

import { container } from '@/config/di';
import { TYPES } from '@/config/types';

import { HomeViewModel } from './HomeViewModel';

const HomeScreen = () => {
  const viewModel = useMemo(() => container.get<HomeViewModel>(TYPES.HomeViewModel), []);

  useEffect(() => {
    viewModel.run();
  }, [viewModel]);

  return <Text>Hello</Text>;
};

export default observer(HomeScreen);
