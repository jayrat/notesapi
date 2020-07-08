/**
 * @module Configuration
 * @description
 * Configuration Settings.
 * Load Variables from ENV file and export them as a config object where needed
 */

require('dotenv').config();
const path = require('path');

module.exports = {
  port: process.env.PORT,
  debug: process.env.DEBUG_MODE,
  mode: process.env.NODE_ENV,
  logs: {
    baseDir: path.resolve(process.env.LOGS_DIR),
    level: process.env.LOGS_LVL
  }
};
