var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    //也就是改成app:['./build/dev-client','./src/main.js']这样咯
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
module.exports = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap
        })
    },
    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        /*new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })*/
    ]
})

//多页面新加
var glob = require('glob');
var path = require('path');
var pages = getEntry('./src/module/**/*.html');
//pages是'module/index'与'.src/module/index/index.html'对应的对象
function getEntry(globPath) {
    var entries = {},
        basename, tmp, pathname;
    glob.sync(globPath).forEach(function(entry) {
        basename = path.basename(entry, path.extname(entry));
        tmp = entry.split('/').splice(-3);
        pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
        entries[pathname] = entry;
    });
    //console.log(entries);
    return entries;
}
for(var pathname in pages){
  var conf = {
    filename: pathname +'.html', //'module/index.html'
    template: pages[pathname], //'./src/module/index/index.html'
    inject: true,
    chunks: Object.keys(pages).filter(item => {
      return (item == pathname)
    })
  }
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}