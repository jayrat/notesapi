/**
 * @module Passport Login System
 */

const { auth } = require('../config/config');
const Google = require('passport-google-oauth20').Strategy;
const JWT = require('passport-jwt').Strategy;
const mongoose = require('mongoose');
const User = require('../app/models/users');
const { ExtractJwt } = require('passport-jwt');
const logger = require('./logger').get('server');

module.exports = (passport) => {
  passport.use(new Google({
    clientID: auth.client,
    clientSecret: auth.secret,
    callbackURL: '/auth/google/done'
  }, async (access, refresh, profile, done) => {
    let user;
    try {
      user = await User.findOne({googleID: profile.id})
      if (user) {
        user.tokens.access = access;
        user.tokens.refresh = refresh;
        user.save();
      } else {
        user = await User.create({
          googleID: profile.id,
          profile: {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            displayName: profile.displayName,
            avatar: profile.photos[0].value
          },
          tokens: {
            access: access,
            refresh: refresh,
            lastUpdated: new Date()
          },
          lastLogin: new Date()
        });
      }
      done(null, user);
    } catch (err) {
      logger.error(`Error Logging in User: ${JSON.stringify(err)}`);
      done(err, null);

    }
  }));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  });
}

