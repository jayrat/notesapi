/**
 * @module Winston Logger Setup
 */

const config = require('../config/config');
const resolve = require('path').resolve;
const winston = require('winston');
const { File, Console } = winston.transports;
const { combine, json, timestamp, cli } = winston.format;

/**
 * Server Logger
 * @description
 * Logs to file app.log
 * and to console for all info level events
 * during debug mode logs all debug level events to console
 */
winston.loggers.add('server', {
  level: config.logs.level,
  format: combine(
    json(),
    timestamp({format: "YYYY-MM-DD HH:mm:ss"})
  ),
  transports: [
    new File({
      level: config.logs.level,
      filename: resolve(config.logs.baseDir, 'app.log'),
      maxFiles: 20,
      maxsize: 5000000
    }),
    new Console({
      level: config.debug ? 'debug' : config.logs.level,
      format: combine(
        cli(),
        timestamp({format: "YYYY-MM-DD HH:mm:ss"})
      ),
      silent: process.env.NODE_ENV === 'testing' ? true : false
    })
  ],
  silent: process.env.NODE_ENV === 'testing' ? true : false
});

/**
 * Debug Logger
 * @description
 * Optional Logger to use during Debugging
 * Logs all events to file debug.log
 */
winston.loggers.add('debugger', {
  level: 'debug',
  format: combine(
    json(),
    timestamp({format: "YYYY-MM-DD HH:mm:ss"})
  ),
  transports: [
    new File({
      level: 'debug',
      filename: resolve(config.logs.baseDir, 'debug.log'),
      maxsize: 10000000,
      maxFiles: 10
    })
  ],
  silent: process.env.NODE_ENV === 'testing' ? true : false
});

/**
 * Profile Logger
 * @description
 * Logs use strictly for profiling routes
 * logs only to file profile.log
 */
winston.loggers.add('profiler', {
  level: 'info',
  format: combine(
    json(),
    timestamp({format: "YYYY-MM-DD HH:mm:ss"})
  ),
  transports: [
    new File({
      level: 'info',
      filename: resolve(config.logs.baseDir, 'profile.log'),
      maxFiles: 10,
      maxsize: 5000000
    })
  ],
  silent: process.env.NODE_ENV === 'testing' ? true : false
});

module.exports = winston.loggers;
