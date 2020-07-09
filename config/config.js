/**
 * @module Configuration
 * @description
 * Configuration Settings.
 * Load Variables from ENV file and export them as a config object where needed
 */

require('dotenv').config({path: './config/.env'});
const path = require('path');

module.exports = {
  port: process.env.PORT,
  debug: process.env.DEBUG_MODE,
  mode: process.env.NODE_ENV,
  logs: {
    baseDir: path.resolve(process.env.LOGS_DIR),
    level: process.env.LOGS_LVL
  },
  db: {
    uri: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_AUTH}`,
    options: {
      user: process.env.MONGO_USR,
      pass: process.env.MONGO_PWD,
      dbName: 'notes',
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      poolSize: 10,
      authSource: process.env.MONGO_AUTH
    }
  }
};
