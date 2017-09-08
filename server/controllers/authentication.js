const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/').User;
const config = require('../config/main');

// Generate JWT
function generateToken(user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 604800, // in seconds
    });
}

function setUserInfo(request) {
    const getUserInfo = {
        _id: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        email: request.email,
        role: request.role,
    };
    return getUserInfo;
};

// Login Route
exports.login = function (req, res, next) {
    console.log('Login', req.body);

    // const userInfo = setUserInfo(req.user);

    // res.status(200).json({
    //     token: `JWT ${generateToken(userInfo)}`,
    //     user: userInfo
    // });
};

// Registration Route
exports.register = function (req, res, next) {
    // Check for registration errors
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    // Return error if no email provided
    if (!email) {
        return res.status(422).send({
            error: 'You must enter an email address.'
        });
    }

    // Return error if full name not provided
    if (!firstName || !lastName) {
        return res.status(422).send({
            error: 'You must enter your full name.'
        });
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({
            error: 'You must enter a password.'
        });
    }

    User.find({
            where: {
                email: email,
            }
        })
        .then(existingUser => {
            console.log('Found user', existingUser);

            if (existingUser) {
                return res.status(422).send({ error: 'That email address is already in use.' });
            }

            // If email is unique and password was provided, create account
            const _userData = new User({
                email,
                password,
                firstName,
                lastName,
            });

            User.create(_userData)
                .then(user => {
                    const userInfo = setUserInfo(user);

                    res.status(201).json({
                        token: `JWT ${generateToken(userInfo)}`,
                        user: userInfo
                    });
                })
                .catch(ex => Promise.reject(ex));
        })
        .catch(err => next(err));
};