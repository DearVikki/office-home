var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
module.exports = {
    entry: {
        bundle1: './src/app.js',
        bundle2: './src/app2.js'
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