const path = require('path');
const PUB = path.resolve(process.env.PWD, 'client', 'dist');
const SRC = path.resolve(process.env.PWD, 'client', 'src');

module.exports = {
  entry: ['@babel/polyfill', SRC + '/index.jsx'],
  output: {
    path: PUB,
    filename: 'bundle.js'
  },
  module: {
    rules: [ 
      { 
        test: /\.js/,
        use: 'babel-loader', 
        include: SRC,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};