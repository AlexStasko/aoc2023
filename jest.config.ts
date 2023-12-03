import type { Config } from 'jest';

const config: Config = {
  testMatch: ['**/*.ts'],
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};

export default config;
