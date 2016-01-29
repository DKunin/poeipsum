'use strict';

var lipsumator = require('lipsumator');
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var PORT       = 1809;
var dictionary = require('./dictionary');
var R          = require('ramda');
var stylus     = require('stylus');

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(stylus.middleware({
  src: __dirname + '/public',
  dest: __dirname + '/public',
  debug: true,
  force: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use(express.static('./public'));

app.get('/poeipsum', function(req,res){
  var lipsum = lipsumator.stream({
    type: 'paragraphs',
    quantity: req.query.paragraphs?req.query.paragraphs:1,
    concentration: 1,
    dictionary: R.map(R.toLower)(dictionary)
  });  
  lipsum.pipe(res);
});

app.get('/shwifty', function(req,res){
  res.send('<img src="/assets/show.png" />');
});

app.listen(PORT);

console.log('listening on port ' +  PORT);