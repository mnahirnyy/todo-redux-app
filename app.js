const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

// const routes = require('./routes/index');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    next();
});
// app.use(routes);

app.get('*', (req, res) => res.status(200).send({message: 'Welcome'}));

module.exports = app;