const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');

passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  async (username, password, done) => {
    const q = await User
      .findOne({ email: username })
      .exec();

    if (!q) { // DB returned no records
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!q.validPassword(password)) { // Validate password
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, q); // Everything is a-OK
  }
));
