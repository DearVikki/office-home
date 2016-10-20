module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: './dist', //path.join(_dirname, './dist')是啥？
        filename: '[name].js'
        //publicPath: 'dist'是啥
    },
    devtool:'source-map',
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
    }
};