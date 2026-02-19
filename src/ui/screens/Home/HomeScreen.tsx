import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { Text } from 'react-native';

import { container } from '@/config/di';
import { TYPES } from '@/config/types';

import { HomeViewModel } from './HomeViewModel';

export const HomeScreen = observer(() => {
  const viewModel = useMemo(() => container.get<HomeViewModel>(TYPES.HomeViewModel), []);

  useEffect(() => {
    viewModel.initialize();
  }, [viewModel]);

  return <Text>Hello</Text>;
});
