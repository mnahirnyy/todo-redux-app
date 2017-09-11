const passport = require('passport');
const Authentication = require('../controllers/authentication');

require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
    app.get('/', requireAuth, (req, res) => {
        console.log('Root route');
        res.send({ message: 'Authenticated request success! You are authenticated!' });
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
};
