const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const ecsFormat = require('@elastic/ecs-winston-format');
require('dotenv').config();

const { NODE_ENV, LOG_DIR } = process.env;

const dirname = LOG_DIR || 'logs';

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.combine(
    ecsFormat(),
    format.splat(),
    format.json(),
    format.prettyPrint()),
  transports: [
    new DailyRotateFile({
      dirname,
      filename: 'bakul-api-%DATE%.log',
      // datePattern: 'YYYY-MM-DD-HH:mm',
      zippedArchive: true,
      maxSize: '100m',
      maxFiles: '14d',
      json: true,
      format: format.combine(
        format.json(),
        format.prettyPrint(),
        ecsFormat()
      ),
    }),
  ],
});
if (NODE_ENV === 'development') {
  logger.add(new transports.Console({
    format: format.combine(
      ecsFormat(),
      format.colorize(),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf(({ level, message, timestamp }) => {
        return `${timestamp} | ${level} | ${message}`;
      })
    ),
  }));
} else if (NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.json(),
      ecsFormat()
    ),
  }));
}

module.exports = logger;
