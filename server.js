const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js');
const app = express();
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const db = require('./db');
const rootRouter = require('./router.js');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');

const port = process.env.PORT || 2828;

app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(session({
  secret: 'alfred the dog',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use('/', express.static(__dirname + '/client/build'));

app.get('/alfredapi', function (req, res) {
  res.json({"message": "Connected to the Alfred API."})
});

app.use('/api', rootRouter);

app.listen(port);
console.log(`Server listening on port ${port}`);
