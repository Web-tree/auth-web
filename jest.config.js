module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/src/tsconfig.spec.json',
    },
  },
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/src/setupJest.ts"]
};
