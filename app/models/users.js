/**
 * User Model
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleID: {
    type: String,
    required: true
  },
  profile: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      require: true
    },
    avatar: {
      type: String,
      required: false
    }
  },
  tokens: {
    access: {
      type: String,
      require: false
    },
    refresh: {
      type: String,
      require: false
    },
    lastUpdated: {
      type: Date,
      required: false
    }
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
  lastLogin: {
    type: Date,
    required: false
  }
});

module.exports = mongoose.model('User', UserSchema);
