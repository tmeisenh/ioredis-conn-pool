# ioredis-conn-pool

[![npm package](https://nodei.co/npm/ioredis-conn-pool.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/ioredis-conn-pool)

[![NPM version](https://img.shields.io/npm/v/ioredis-conn-pool.svg?style=flat)](https://npmjs.org/package/ioredis-conn-pool)
[![NPM Downloads](https://img.shields.io/npm/dm/ioredis-conn-pool.svg?style=flat)](https://npmjs.org/package/ioredis-conn-pool)

`ioredis-conn-pool` 是一个基于 `ioredis` 和 `generic-pool` 的 Redis 连接池实现，旨在简化在 Node.js 应用中对 Redis 客户端连接的管理。

## 安装

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

## 特性

- 基于 `ioredis` 提供高效的 Redis 连接。
- 使用 `generic-pool` 实现高性能连接池管理。

## 使用方法

### 创建连接池

你可以通过提供 Redis 和连接池的配置选项来创建一个新的 `RedisPool` 实例。

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

### 获取和释放连接

从连接池中获取一个 Redis 连接并操作完成后将其释放回池中。

```ts
async function useConnection() {
  const client = await pool.getConnection();
  try {
    // 使用 client 进行 Redis 操作
    await client.set('key', 'value');
    const value = await client.get('key');
    console.log(value);
  } finally {
    pool.release(client);
  }
}
```

### 断开连接

当你不再需要某个连接时，可以直接断开它。

```ts
await pool.disconnect(client);
```

### 关闭所有连接

当应用关闭时，确保释放所有资源。

```ts
await pool.end();
```

## API 文档

### class: RedisPool

- **构造函数** `new RedisPool(opts: Partial<RedisPoolOptions>)`
  
  创建一个新的 RedisPool 实例。

- **getConnection(priority?: number)** => `Promise<Redis>`

  从连接池中获取一个 Redis 连接。

- **release(client: Redis)** => `Promise<void>`

  将 Redis 连接释放回连接池。

- **disconnect(client: Redis)** => `Promise<void>`

  主动断开指定的 Redis 连接。

- **end()** => `Promise<void>`

  关闭连接池中的所有连接。

## Typescript 类型定义

```ts
export interface RedisPoolOptions {
  redis: RedisOptions;
  pool: PoolOptions;
  customLogger: ILogger;
}
```