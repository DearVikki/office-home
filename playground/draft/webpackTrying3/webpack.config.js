var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
    entry: {
        /*hot1: 'webpack/hot/dev-server',
        hot2:'webpack-dev-server/client?http://localhost:8080',*/
        bundle1: './src/app.js',
        bundle2: './src/app2.js',
        vendor: ['jquery']
    },
    output: {
        path: './dist',
        filename: '[name].js'
    },
    devtool:'source-map',
    plugins: [
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new CommonsChunkPlugin('vendor', 'vendor.js'),
        new CommonsChunkPlugin('common.js', ['bundle1', 'bundle2'])
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.less$/,
            loader: "style!css!less"
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }]
    }/*,
    externals:{
        'jquery':'./lib/jquery.js'
    }*/
};