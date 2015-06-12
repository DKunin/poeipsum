'use strict';

var webpack     = require('webpack');
var argv        = require('yargs').argv;
var path        = require('path');
var assets_path = path.join('public', 'js');

var plugins = [
    new webpack.NoErrorsPlugin()
];

if(argv.s) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

var webPacker = {
  context : path.resolve(assets_path),
  entry: {
    main  : path.resolve(assets_path + '/source.es6.js')
  },
  output: {
    path: './public/js',
    filename: '[name].bundle.js',
    publicPath: './public'
  },
  plugins: plugins,
  resolve : {
    extensions: ['', '.js', '.es6.js'],
    alias : {
      'css': path.resolve('public/css')
    }
  },
  module: {
    loaders: [
      {test: /\.js$/, loaders: []},
      {test: /\.es6\.js$/, loader: 'babel-loader'},
      {test: /\.styl$/,loader: 'style-loader!css-loader!stylus-loader'},
      { test: /\.png$/, loader: 'url-loader?limit=1000000' },
      { test: /\.jpg$/, loader: 'file-loader' }
    ]
  }
};

module.exports = webPacker;
