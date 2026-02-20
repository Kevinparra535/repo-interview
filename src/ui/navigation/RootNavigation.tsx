import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddProductScreen from '../screens/AddProduct/AddProductScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import { NotFoundScreen } from '../screens/NotFound/NotFoundScreen';

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeScreen,
      options: {
        headerShown: false,
      },
    },
    AddProduct: {
      screen: AddProductScreen,
      options: {
        headerShown: false,
      },
    },
    NotFound: {
      screen: NotFoundScreen,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
