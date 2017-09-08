const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const router = require('./server/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

router(app);

// Send all other requests to the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

module.exports = app;
