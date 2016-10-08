module.exports = {
    entry: ['./src/app.js', 'webpack-dev-server/client?http://localhost:8080'],
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.less$/,
            loader: "style!css!less"
        }]
    }
};