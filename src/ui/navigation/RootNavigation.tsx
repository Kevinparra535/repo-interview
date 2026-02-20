import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';

import GradientView from '../components/GradientView';
import AddProductScreen from '../screens/AddProduct/AddProductScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import { NotFoundScreen } from '../screens/NotFound/NotFoundScreen';
import ProductDetailScreen from '../screens/ProductDetail/ProductDetailScreen';
import Colors from '../styles/Colors';

const RootStack = createNativeStackNavigator({
  screenOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: Colors.base.bgPrimary },
    headerTintColor: Colors.base.textPrimary,
    headerTitleStyle: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 17,
      color: Colors.base.textPrimary,
    },
    headerShadowVisible: false,
    headerBackground: () => (
      <GradientView
        colors={[Colors.base.bgPrimary, Colors.base.navGradientEnd]}
        style={{
          flex: 1,
          borderBottomWidth: 1,
          borderBottomColor: Colors.base.separator,
        }}
      />
    ),
    headerBackVisible: false,
    headerLeft: ({ canGoBack }: { canGoBack?: boolean }) =>
      canGoBack ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: Colors.base.bgCard,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ArrowLeft size={20} color={Colors.base.textPrimary} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40 }} />
      ),
  }),
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
    ProductDetail: {
      screen: ProductDetailScreen,
      options: {
        headerShown: true,
        title: 'Detalle del producto',
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
