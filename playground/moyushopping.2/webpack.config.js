module.exports = {
    entry: {
        index: './src/index.js',
        category: './src/category.js',
        usercenter: './src/usercenter.js',
        set:'./src/set.js',
        login:'./src/login.js',
        signup:'./src/signup.js',
        forgetPw:'./src/resetPw.js',
        order:'./src/order.js',
        goodsType:'./src/goodsType.js',
        searchPage:'./src/searchPage.js',
        good:'./src/good.js',
        cart:'./src/cart.js'
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
    },
    resolve:{
        alias:{
            js:'./js/',
            css:'./css/',
            lib:'./lib/',
            img:'./img/',
            public: './css/public.less',
            headerfooter:'./css/headerfooter.less',
            initial:'./js/initial.js',
            ajax:'./js/ajax.js'
        }
    }
};