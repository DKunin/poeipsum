'use strict';

let request     = require('superagent');
let textField   = document.getElementById('text');
let curparvalue = document.getElementById('paragraphs');
let submit      = document.getElementById('submitupdate');

let defaultAmount = 3;

function processResult(err, res) {
  textField.innerHTML = res.text;
}

function getIpsum(paraAmaount = defaultAmount) {
  textField.innerHTML = 'dreaming...';
  request
    .get('/poeipsum')
    .query({paragraphs: paraAmaount})
    .end(processResult);
}

function processRangeChange(e) {
  e.preventDefault();
  getIpsum(curparvalue.value);
}

getIpsum();

submit.addEventListener('click', processRangeChange , false);
console.log('Nosey little bugger, aren\'t you, mate?');