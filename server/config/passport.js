const passport = require('passport');
// const User = require('../models').User;
const config = require('./main');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Setting username field to email rather than username
const localOptions = {
    usernameField: 'email', // Setting username field to email rather than username
};

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    console.log('LocalLogin', email, password);
    return done(null, false, { error: 'Debug credentials' });

    // User.findOne({ email }, (err, user) => {
    //     if (err) { return done(err); }
    //     if (!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }
    //     user.comparePassword(password, (err, isMatch) => {
    //         if (err) { return done(err); }
    //         if (!isMatch) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }
    //         return done(null, user);
    //     });
    // });
});

// Setting JWT strategy options
const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // Telling Passport where to find the secret
    secretOrKey: config.secret,
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    console.log('JwtLogin', payload);
    done(null, false);
    // User.findById(payload._id, (err, user) => {
    //   if (err) { return done(err, false); }

    //   if (user) {
    //     done(null, user);
    //   } else {
    //     done(null, false);
    //   }
    // });
});

passport.use(jwtLogin);
passport.use(localLogin);
