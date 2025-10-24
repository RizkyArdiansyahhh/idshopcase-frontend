import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  modulePaths: ["<rootDir>"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!**/*.types.ts",
    "!**/types/**",
    "!**/hooks/**",
    "!**/components/**",
    "!**/layout.{js,jsx,ts,tsx}",
    "!**/app/**/layout.{js,jsx,ts,tsx}",
    "!<rootDir>/.next/**",
    "!<rootDir>/*.config.js",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
