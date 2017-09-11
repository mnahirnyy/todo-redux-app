const jwt = require('jwt-simple');
const config = require('../config/main');
const User = require('../models').User;

const tokenForUser = user => {
    const timestamp = new Date().getTime();
    // subject = user id, issued at time
    return jwt.encode({
        sub: user.id,
        iat: timestamp,
    }, config.secret);
};

exports.signin = function (req, res, next) {
    console.log('Login route', req.body);
    // User is auth, just need to give it a token
    res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
    console.log('Register route', req.body);
    const { email, password } = req.body;

    // Check if email exists in database
    User.findOne({ email }, (err, existingUser) => {
        if (err) {
            return next(err);
        }

        if (!email || !password) {
            return res
                .status(422)
                .send({ error: 'Must provide email and password' });
        }

        // If email already exists return error
        if (existingUser) {
            return res
                .status(422)
                .send({ error: 'Email is in use' });
        }

        // If a new user add to database
        const user = new User({ email, password });

        user.save(ex => {
            if (ex) {
                return next(ex);
            }
            // Respond to request
            res.json({ token: tokenForUser(user) });
        });
    });
};
