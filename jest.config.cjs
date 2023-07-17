module.exports = {
  preset: 'ts-jest/presets/default-esm',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.spec.+(ts|tsx|js)'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        useESM: true,
      }
    ],
  }
}
