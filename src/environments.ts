// environments.ts
import * as dotenv from 'dotenv';

export function loadEnvironment(): string {
  dotenv.config();
  return process.env.NEST_ENV;
}

export enum Environment {
  Production = 'production',
  Development = 'development',
  Test = 'test',
}
