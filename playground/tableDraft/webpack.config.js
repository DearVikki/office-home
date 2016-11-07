module.exports = {
  entry: {
    index:'./src/index.js'
  },
  output: {
    path: './dist',
    filename: '[name].js'
  },
  devtool:'source-map',
  resolve: {
    alias: {vue: 'vue/dist/vue.js'}
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' }
    ]
  }
};
