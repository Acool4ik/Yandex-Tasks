const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const options_HTMLWebpackPlugin = {template: './index.html'}
const options_CopyWebpackPlugin = {
    patterns: [
        {
            from: path.resolve(__dirname, 'src/favicon.ico'),
            to: path.resolve(__dirname, 'build')
        }
    ]
}

module.exports = {
    mode: 'development',

    context: path.resolve(__dirname, 'src'),

    entry: 
    {
        main: './index.js'
    },

    output: 
    {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build')
    },

    resolve: 
    {
        extensions: ['.js', '.json', '.png', '.jpg', '.svg', '.ttf'],
        alias: {
            '@stateManager': path.resolve(__dirname, 'src/stateManager'),
            '@routeManager': path.resolve(__dirname, 'src/routeManager'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@': path.resolve(__dirname, 'src')
        }
    },

    optimization: 
    {
        splitChunks: 
        {
            chunks: 'all'
        }
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        port: 8080
    },

    plugins: 
    [
        new HTMLWebpackPlugin(options_HTMLWebpackPlugin),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin(options_CopyWebpackPlugin)
    ],

    module: 
    {
        rules: 
        [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use: ['file-loader']
            }
        ]
    }


}