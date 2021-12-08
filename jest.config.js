process.env.TZ = 'GMT';

module.exports = {
  // automock: false,
  // bail: 0,
  clearMocks: true,
  // collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.{css,scss,test.js}',
  ],
  coverageDirectory: 'coverage',
  // coverageProvider: "babel",
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],
  // coverageThreshold: undefined,
  // dependencyExtractor: undefined,
  // errorOnDeprecated: false,
  // forceCoverageMatch: [],
  // globalSetup: undefined,
  // globalTeardown: undefined,
  // globals: {},
  // maxWorkers: "50%",
  // moduleDirectories: [
  //   "node_modules"
  // ],
  // moduleFileExtensions: [
  //   "js",
  //   "json",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "node"
  // ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  // modulePathIgnorePatterns: [],
  // notify: false,
  // notifyMode: "failure-change",
  // preset: undefined,
  // projects: undefined,
  // reporters: undefined,
  // resetMocks: false,
  // resetModules: false,
  // resolver: undefined,
  // restoreMocks: false,
  // rootDir: undefined,
  // roots: [
  //   "<rootDir>"
  // ],
  // runner: "jest-runner",
  // setupFiles: [],
  setupFilesAfterEnv: ['./__mocks__/client.js', 'jest-extended/all', '<rootDir>/test/setup.js'],
  // slowTestThreshold: 5,
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'jsdom',
  // testEnvironmentOptions: {},
  // testLocationInResults: false,
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],
  // testPathIgnorePatterns: [
  //   "/node_modules/"
  // ],
  // testRegex: [],
  // testResultsProcessor: undefined,
  // testRunner: "jasmine2",
  testURL: 'http://localhost',
  // timers: "real",
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  // transformIgnorePatterns: [
  //   "/node_modules/",
  //   "\\.pnp\\.[^\\/]+$"
  // ],
  // unmockedModulePathPatterns: undefined,
  // verbose: undefined,
  // watchPathIgnorePatterns: [],
  // watchman: true,
};
