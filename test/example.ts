import { ConsoleAppender, Logger } from 'base-log-factory';

import { RedisPool } from '../src/index';

const logger = new Logger('example', { level: 'DEBUG', appenders: [new ConsoleAppender()] });

const pool = new RedisPool({
  redis: {
    // sentinels: [{
    //   host: 'localhost',
    //   port: 26379
    // }],
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
    logger.info('saved successfully', result);

    // delete something from redis
    client.del('test');
    logger.info('deleted successfully', result);
  }
  catch (e) {
    // caught an error
    logger.error(e);
  }
  finally {
    // finally release redis client to pool
    if (client) {
      await pool.release(client);
      logger.info('released');
    }
  }

  // close connection with redis
  await pool.end();
  logger.info('closed all connections');
}

todo().finally(() => {
  process.exit(0);
});
