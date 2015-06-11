'use strict';

var _require = require('lipsumator');

var stream = _require.stream;

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = 1809;
var dictionary = require('./dictionary');
var R = require('ramda');

var allowCrossDomain = function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(allowCrossDomain);

app.get('/poeipsum', function (req, res) {
  var lipsum = stream({
    type: 'paragraphs',
    quantity: req.query.paragraphs ? req.query.paragraphs : 1,
    concentration: 1,
    dictionary: R.map(R.toLower)(dictionary)
  });
  lipsum.pipe(res);
});

app.listen(PORT);
