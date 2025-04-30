# ioredis-conn-pool

[![npm package](https://nodei.co/npm/ioredis-conn-pool.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/ioredis-conn-pool)

[![NPM version](https://img.shields.io/npm/v/ioredis-conn-pool.svg?style=flat)](https://npmjs.org/package/ioredis-conn-pool)
[![NPM Downloads](https://img.shields.io/npm/dm/ioredis-conn-pool.svg?style=flat)](https://npmjs.org/package/ioredis-conn-pool)

`ioredis-conn-pool` is a Redis connection pool implementation based on `ioredis` and `generic-pool`, designed to simplify the management of Redis client connections in Node.js applications.

## Installation

```bash
npm install ioredis-conn-pool
```

## Documentation

For detailed usage instructions and API references, please visit the official documentation:

👉 [View Full Documentation](https://fengxinming.github.io/ioredis-conn-pool/)

## Features

- Efficient Redis connections based on `ioredis`.
- High-performance connection pool management using `generic-pool`.

## Quick Start

```ts
import { RedisPool } from 'ioredis-conn-pool';

const pool = new RedisPool({
  redis: {
    host: '127.0.0.1', // Redis host
    port: 6379, // Redis port
    name: 'test',
    password: 'B213547b69b13224',
    keyPrefix: 'test_'
  },
  pool: {
    // Set the pool's size
    min: 2,
    max: 10
  }
});

async function todo() {
  let client;
  try {
    // get a connection for redis
    client = await pool.getConnection();

    // save something to redis
    client.set('test', 'test redis');

    // get something from redis
    const result = await client.get('test');
    console.info('saved successfully', result);

    // delete something from redis
    client.del('test');
    console.info('deleted successfully', result);
  }
  catch (e) {
    // caught an error
    console.error(e);
  }
  finally {
    // finally release redis client to pool
    if (client) {
      await pool.release(client);
      console.info('released');
    }
  }

  // close connection with redis
  await pool.end();
  console.info('closed all connections');
}

todo();
```

## Contributing

We welcome contributions from the community! If you find a bug or want to suggest an improvement, feel free to open an issue or submit a pull request.

### How to Contribute
1. Fork the repository.
2. Create a new branch for your changes.
3. Submit a pull request with a clear description of your changes.

---

## License

This project is licensed under the [MIT License](LICENSE).