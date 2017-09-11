const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const User = require('../models').User;
const config = require('../config/main');

const localOptions = {
    usernameField: 'email',
};

// Create local strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    // verify email / pass, call done
    console.log('LocalLogin - LocalStrategy');
    return done(null, {});
    // User
    //     .findOne({ email })
    //     .then(user => {
    //         if (!user) {
    //             return done(null, false);
    //         }
    //         // compare passwords
    //         user.comparePassword(password, (err, isMatch) => {
    //             if (err) {
    //                 return done(err);
    //             } else if (!isMatch) {
    //                 return done(null, false);
    //             }

    //             return done(null, user);
    //         });
    //     })
    //     .catch(err => done(err, false));
});


// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret,
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // check if user ID in payload exists in DB
    console.log('jwtLogin - JwtStrategy');
    return done(null, {});
    // User
    //     .findById(payload.sub)
    //     .then(user => {
    //         return (user) ? done(null, user) : done(null, false);
    //     }).catch(err => done(err, false));
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
