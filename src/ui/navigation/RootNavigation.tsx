import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

import { HomeScreen } from '../screens/Home/HomeScreen';
import { NotFoundScreen } from '../screens/NotFound/NotFoundScreen';

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        headerShown: false,
        // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
      },
    },
  },
  screenOptions: {
    headerShown: false,
    tabBarStyle: Platform.OS === 'ios' ? { position: 'absolute' as const } : undefined,
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
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
