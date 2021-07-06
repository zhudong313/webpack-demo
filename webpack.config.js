const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');//Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的; 16版本貌似是给vue3用的？
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolve = (filePath) => {
    return path.resolve(__dirname, filePath)
}

module.exports = env => ({
    mode: env,
    entry: {
        main: resolve('src/main.js')
    },
    output: {
        filename: 'js/[name].js',
        path: resolve('dist')
    },
    module: {
        rules: [
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            // {
            //     test:/\.css$/,
            //     use:[
            //         'style-loader',
            //         'css-loader'
            //     ]
            // }
            //,
            // 若不想webpack编译提取独立的css文件，而是想通过在<head>标签中<style>使用css，则可以不用MiniCssExtractPlugin插件，而是直接用vue-style-loader去解析
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            // 复制一个html文件，并引入
            template:'./public/index.html'
        })
    ]
})