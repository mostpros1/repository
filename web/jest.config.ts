import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  clearMocks: true,
  collectCoverage: true,
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(jsx|tsx|ts|js)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@aws-sdk|react-icons|uuid)/)', // Include specific packages in node_modules
  ],
  coverageDirectory: "coverage",
};

export default config;
