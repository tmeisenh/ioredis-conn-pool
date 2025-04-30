import type { Options as PoolOptions } from 'generic-pool';
import type { RedisOptions } from 'ioredis';

export interface RedisPoolOptions {
  redis: RedisOptions;
  pool: PoolOptions;
  customLogger: ILogger;
}

export interface ILogger {
  error(...args: any[]): void;
  warn(...args: any[]): void;
  info(...args: any[]): void;
  debug(...args: any[]): void;
}

export {
  PoolOptions,
  RedisOptions
};
