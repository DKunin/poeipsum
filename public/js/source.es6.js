'use strict';

require('css/style.styl');

let request     = require('superagent');
let textField   = document.getElementById('text');
let curparvalue = document.getElementById('paragraphs');
let submit      = document.getElementById('submitupdate');

let defaultAmount = 3;
//label.innerHTML   = defaultAmount;

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
  console.log(curparvalue.value);
  getIpsum(curparvalue.value);
}

getIpsum();

submit.addEventListener('click', processRangeChange , false);

console.log('asd');