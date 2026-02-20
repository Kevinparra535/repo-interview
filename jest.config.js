module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/__test__'],
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/**/styles.ts'],
};