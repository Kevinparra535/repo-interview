module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/__test__'],
  testMatch: ['**/*.test.{ts,tsx}'],
  testPathIgnorePatterns: ['<rootDir>/backend/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/__test__/setupTests.ts'],
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/styles.ts',
    '!src/ui/utils/Logger.ts',
  ],
  coveragePathIgnorePatterns: ['<rootDir>/backend/'],
};
