import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { Text, Button } from '@react-navigation/elements';
import { View } from 'react-native';

import { container } from '@/config/di';
import { TYPES } from '@/config/types';

import { NotFoundViewModel } from './NotFoundViewModel';

import { styles } from './styles';

export const NotFoundScreen = observer(() => {
  const viewModel = useMemo(() => container.get<NotFoundViewModel>(TYPES.NotFoundViewModel), []);

  useEffect(() => {
    viewModel.initialize();
  }, [viewModel]);

  return (
    <View style={styles.container}>
      <Text>404</Text>
      <Button screen="HomeTabs">Go to Home</Button>
    </View>
  );
});
