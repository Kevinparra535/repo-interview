export const config = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3002',
  API_ENDPOINTS: {
    PRODUCTS: '/bp/products',
    PRODUCT_BY_ID: (id: string) => `/bp/products/${id}`,
    PRODUCT_VERIFICATION_BY_ID: (id: string) => `/bp/products/verification/${id}`,
  },
};
