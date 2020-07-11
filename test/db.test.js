/**
 * Mongoose Database Tests
 */

const mongoose = require('mongoose');
// Database Connection Script
const dbConnect = require('../utilities/db');

describe('Database Test', () => {
  it('Mongoose has a connection', (done) => {
    // Call Database Connection
    dbConnect();
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection Error'));
    db.once('open', () =>{ done();});
  });
});
