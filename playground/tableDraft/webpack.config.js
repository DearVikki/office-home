module.exports = {
  entry: {
    bundle1:'./src/app.js'
  },
  output: {
    path: './dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' }
    ]
  }
};
