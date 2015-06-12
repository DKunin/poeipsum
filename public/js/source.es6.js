'use strict';

require('css/style.styl');

let request       = require('superagent');
let textField     = document.getElementById('text');
let label         = document.getElementById('label');
let range         = document.getElementById('range');

let defaultAmount = 3;
label.innerHTML   = defaultAmount;

function processResult(err, res) {
  textField.innerHTML = res.text;
}

function getIpsum(paraAmaount = defaultAmount) {
  request
    .get('/poeipsum')
    .query({paragraphs: paraAmaount})
    .end(processResult);
}

function processRangeChange(e) {
  e.preventDefault();
  let val = this.value;
  getIpsum(val);
}

function processValueChange(e) {
  e.preventDefault();
  let val = this.value;
  label.innerHTML = val;
}

getIpsum();

range.addEventListener('change', processRangeChange , false);
range.addEventListener('input', processValueChange , false);

console.log('asd');