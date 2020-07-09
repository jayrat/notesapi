/**
 * @module Mongoose MongoDB Connection
 * @description
 * Script to Make Database Connection for Mongoose to use
 * 
 */

const { uri, options } = require('../config/config').db;
const logger = require('./logger').get('server');
const mongoose = require('mongoose');

module.exports = async () => {
  try {
    const conn = await mongoose.connect(uri, options);
    if (conn) {
      logger.info(`Database Connection Created to host ${conn.connection.host}`);
    } else {
      logger.warn('Unknown Result from Database Connection');
    }
  } catch (err) {
    logger.error(`Error Connecting to Database: ${JSON.stringify(err)}`);
    throw err;
  }
};
