const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('*', (req, res) => res.status(200).send({message: 'Welcome'}));

module.exports = app;