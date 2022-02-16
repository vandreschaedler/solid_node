module.exports = {

  collectCoverage: true,

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  testEnviroment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  roots: ['<rootDir>/src']

}
