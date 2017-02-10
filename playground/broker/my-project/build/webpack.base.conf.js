var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var PrerenderSpaPlugin = require('prerender-spa-plugin')

var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

//多页面新加
var glob = require('glob');
var entries = getEntry('./src/module/**/*.js');
function getEntry(globPath){
  var entries = {}, basename, tmp, pathname;
  glob.sync(globPath).forEach(function(entry){
    //以'./src/module/index/index.js'为例
    basename = path.basename(entry, path.extname(entry));
    //path.basename(entry, 'js') => basename = 'index'
    tmp = entry.split('/').splice(-3);
    //tmp = ['module', 'index', 'main.js']
    pathname = tmp.slice(0,1)+'/'+basename;
    //pathname = 'module/index'
    entries[pathname] = entry;
    //entries['module/index'] = './src/module/index/index.js'
  });
  return entries;
  //entries是'module/*'与'./src/module/**/*.js'对应的对象
}

module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  },
  plugins:[
    // new PrerenderSpaPlugin(
    //     path.join(__dirname,'../dist'),
    //     ['/']
    //   )
  ]
}

//多页面新加
var path = require('path');
var pages = getEntry('./src/module/**/*.html');
//pages是'module/index'与'.src/module/index/index.html'对应的对象
for(var pathname in pages){
  var conf = {
    filename: pathname +'.html', //'module/index.html'
    template: pages[pathname], //'./src/module/index/index.html'
    inject: true,
    excludeChunks: Object.keys(pages).filter(item => {
      return (item !== pathname)
    })
  }
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
  module.exports.plugins.push(new PrerenderSpaPlugin(conf));
}
