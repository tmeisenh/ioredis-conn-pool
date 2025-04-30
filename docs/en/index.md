# ioredis-conn-pool

[![npm package](https://nodei.co/npm/ioredis-conn-pool.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/ioredis-conn-pool)

[![NPM version](https://img.shields.io/npm/v/ioredis-conn-pool.svg?style=flat)](https://npmjs.org/package/ioredis-conn-pool)
[![NPM Downloads](https://img.shields.io/npm/dm/ioredis-conn-pool.svg?style=flat)](https://npmjs.org/package/ioredis-conn-pool)

`ioredis-conn-pool` is a Redis connection pool implementation based on `ioredis` and `generic-pool`, designed to simplify the management of Redis client connections in Node.js applications.

## Installation

::: code-group

```bash [npm]
npm add ioredis-conn-pool
```
```bash [pnpm]
pnpm add ioredis-conn-pool
```
```bash [yarn]
yarn add ioredis-conn-pool
```

:::

## Features

- Efficient Redis connections based on `ioredis`.
- High-performance connection pool management using `generic-pool`.

## Usage

### Creating a Connection Pool

You can create a new `RedisPool` instance by providing Redis and connection pool configuration options.

```ts
import { RedisPool } from 'ioredis-conn-pool';

const pool = new RedisPool({
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
  pool: {
    min: 2,
    max: 10,
  },
});
```

### Acquiring and Releasing Connections

Acquire a Redis connection from the pool, and release it back after operations are completed.

```ts
async function useConnection() {
  const client = await pool.getConnection();
  try {
    // Use client for Redis operations
    await client.set('key', 'value');
    const value = await client.get('key');
    console.log(value);
  } finally {
    pool.release(client);
  }
}
```

### Disconnecting a Connection

When you no longer need a specific connection, you can disconnect it directly.

```ts
await pool.disconnect(client);
```

### Closing All Connections

Ensure all resources are released when shutting down the application.

```ts
await pool.end();
```

## API Documentation

### class: RedisPool

- **Constructor** `new RedisPool(opts: Partial<RedisPoolOptions>)`
  
  Creates a new RedisPool instance.

- **getConnection(priority?: number)** => `Promise<Redis>`

  Acquires a Redis connection from the pool.

- **release(client: Redis)** => `Promise<void>`

  Releases the Redis connection back to the pool.

- **disconnect(client: Redis)** => `Promise<void>`

  Actively disconnects the specified Redis connection.

- **end()** => `Promise<void>`

  Closes all connections in the connection pool.

## TypeScript Type Definitions

```ts
export interface RedisPoolOptions {
  redis: RedisOptions;
  pool: PoolOptions;
  customLogger: ILogger;
}
