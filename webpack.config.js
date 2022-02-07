const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[hash].main.js',
        clean: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[hash].main.css'
        }),
        new HTMLWebpackPlugin({
            template: 'index.html'
        })
    ],
    devServer: {
        port: 3000,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    }
};