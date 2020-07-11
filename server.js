/**
 * @name Server APP
 * @description Express JS Server
 */

// Include Configuration Values
const config = require('./config/config');
const express = require('express');
const passport = require('passport');
const sessions = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(sessions);
const redisClient = redis.createClient();

const logger = require('./utilities/logger').get('server');

// Start Database Connection
require('./utilities/db')();

const port = config.port || 3000;

const app = new express();

require('./utilities/passport')(passport);

app.use(express.json());
app.use(sessions({
  secret: config.auth.session,
  resave: false,
  cookie: {
    maxAge: 28800000
  },
  saveUninitialized: true,
  store: new redisStore({ 
    client: redisClient,
    prefix: 'notespai'
  })
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  console.log(req.user);
  console.log(req.isAuthenticated());
  return res.send("Hello World!");
});

app.use('/auth', require('./app/routes/auth'));

const server = app.listen(port, (err) => {
  if (err) {
    console.error(err);
    throw err;
  }
  logger.info(`Running on PORT ${port}`);
});

module.exports = server;
