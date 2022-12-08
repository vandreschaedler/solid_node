/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  roots: ["<rootDir>/src"],
  coverageProvider: "v8",
  coverageDirectory: "coverage",
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
