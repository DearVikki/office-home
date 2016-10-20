module.exports = {
    entry: './src/main.js',
    output: {
        path: './dist',
        filename: 'build.js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    module: {
        loaders: [{
            // Ask webpack to check: If this file ends with .js, then apply some transforms
            test: /\.js$/,
            // Transform it with babel
            loader: 'babel',
            // don't transform node_modules folder (which don't need to be compiled)
            exclude: /node_modules/
        }, {
            test: /\.vue$/,
            loader: 'vue'
        }]
    }/*,
    vue: {
        loaders: {
            js: 'babel'
        }
    }*///这里加了会报错诶
}