import { inspect } from 'node:util';

import { Level, LogEvent, Logger, PatternLayout, TPatternConverter } from 'base-log-factory';
import { DebugAppender } from 'blf-debug-appender';

import { name } from '../package.json';

function createConverter(specifier: string): TPatternConverter | undefined {
  if (specifier === 'm') {
    return (event: LogEvent): string => {
      return event.message.map((msg) => {
        switch (typeof msg) {
          case 'object':
            return inspect(msg);
          case 'symbol':
            return msg.toString();
          default:
            return msg;
        }
      }).join(' ');
    };
  }
}

export const logger = new Logger(name, {
  level: Level.INFO,
  appenders: [
    new DebugAppender({
      layout: new PatternLayout(
        '%d{HH:mm:ss} [%p] - %m',
        createConverter
      )
    })
  ]
});
