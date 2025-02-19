const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  // Keep your existing config below
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};
