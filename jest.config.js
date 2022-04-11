module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.spec.+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}
