'use strict';

const { stream } = require('lipsumator');
const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const PORT       = 1809;
const dictionary = require('./dictionary');
const R          = require('ramda');
const stylus     = require('stylus');

const allowCrossDomain = function(req, res, next) {
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
  let lipsum = stream({
    type: 'paragraphs',
    quantity: req.query.paragraphs?req.query.paragraphs:1,
    concentration: 1,
    dictionary: R.map(R.toLower)(dictionary)
  });  
  lipsum.pipe(res);
});

app.listen(PORT);

console.log(`listening on port ${PORT}`);