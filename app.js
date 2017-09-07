const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
  next();
});

require('./server/routes')(app);

// Send all other requests to the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

module.exports = app;
