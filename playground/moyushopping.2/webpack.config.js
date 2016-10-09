module.exports = {
    entry: {
        index: './src/index.js',
        category: './src/category.js'
    },
    output: {
        path: './dist',
        filename: '[name].js'
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