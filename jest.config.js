/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-var-requires */
const tsconfig = require('./tsconfig.json');
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig);

module.exports = {
  preset: 'jest-expo/universal',
  projects: [
    {
      preset: 'jest-expo/ios',
      setupFiles: ['./tests/jest.setup.js'],
      testEnvironment: 'jsdom',
      testTimeout: 10000,
    },
    // {
    //   preset: 'jest-expo/android',
    //   setupFiles: ['./tests/jest.setup.js'],
    //   testEnvironment: 'jsdom',
    //   testTimeout: 10000,
    // },
  ],
  testTimeout: 10000,
  transform: { '^.+\\.ts?$': 'ts-jest' },
  testRegex: '/tests/*/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper,
};
