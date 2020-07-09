/**
 * @name Server APP
 * @description Express JS Server
 */

// Include Configuration Values
const config = require('./config/config');
const express = require('express');

const logger = require('./utilities/logger').get('server');
// Start Database Connection
require('./utilities/db');

const port = config.port || 3000;

const app = new express();

app.get('/', (req, res) => {
  return res.send("Hello World!");
});

const server = app.listen(port, (err) => {
  if (err) {
    console.error(err);
    throw err;
  }
  logger.info(`Running on PORT ${port}`);
});

module.exports = server;
