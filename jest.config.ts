import { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    globals: {
      'ts-jest': {
        // 指定ts-jest使用的tsconfig配置
        tsconfig: 'tsconfig.json',
      },
    },
    preset: 'ts-jest',
    clearMocks: true,
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
      customExportConditions: ['node', 'node-addons'],
    },
    // testMatch: [
    //   '<rootDir>/tests/**/*.[jt]s?(x), **/?(*.)+(spec|test).(js|ts|tsx|vue)',
    // ],
    testTimeout: 20000,
    roots: ['<rootDir>'],
    transform: {
      '^.+\\.js?$': 'babel-jest',
      '^.+\\.ts.?$': 'ts-jest',
      '^.+\\.vue$': '@vue/vue3-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'tsx', 'vue'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/tests/$1',
    },
    coverageReporters: [
      'clover',
      'json',
      'lcov',
      [
        'text',
        {
          skipFull: true,
        },
      ],
    ],
    collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}',
      'tests/**/*.(test|spec).(ts|js|tsx|vue)',
      '!**/node_modules/**',
      '!src/*.d.ts',
    ],
    collectCoverage: true,
    modulePathIgnorePatterns: ['<rootDir>/build/'],
    testPathIgnorePatterns: ['/node_modules/', 'src/types'],
  }
}
