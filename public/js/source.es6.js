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
  getIpsum(this.value);
}

function processValueChange(e) {
  e.preventDefault();
  label.innerHTML = this.value;
}

getIpsum();

range.addEventListener('change', processRangeChange , false);
range.addEventListener('input', processValueChange , false);

console.log('asd');