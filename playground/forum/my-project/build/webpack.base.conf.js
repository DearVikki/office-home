var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// process.noDeprecation = true

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

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
 //多页面修改
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins:[]
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
}

// vux2新加
const vuxLoader = require('vux-loader');
// module.exports.plugins.push({name:'vux-ui'});
module.exports = vuxLoader.merge(module.exports, {
  options: {},
  plugins: [
    {
      name: 'vux-ui'
    }
    ]
})

