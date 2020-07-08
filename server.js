/**
 * @name Server APP
 * @description Express JS Server
 */

// Include Configuration Values
const config = require('./config/config');
const express = require('express');

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
  console.log(`Running on PORT ${port}`);
});

module.exports = server;
