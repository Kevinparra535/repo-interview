import { Platform } from 'react-native';

const defaultApiHost = Platform.select({
  android: '10.0.2.2',
  ios: '192.168.1.8',
  default: 'localhost',
});

const defaultApiBaseUrl = `http://${defaultApiHost}:3002`;

export const config = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL ?? defaultApiBaseUrl,
  API_ENDPOINTS: {
    PRODUCTS: '/bp/products',
    PRODUCT_BY_ID: (id: string) => `/bp/products/${id}`,
    PRODUCT_VERIFICATION_BY_ID: (id: string) => `/bp/products/verification/${id}`,
  },
};
