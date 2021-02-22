const path = require('path')


const HTMLWebpackPlugin              = require('html-webpack-plugin')
const {CleanWebpackPlugin}           = require('clean-webpack-plugin')
const CopyWebpackPlugin              = require('copy-webpack-plugin')
const MiniCssExtractPlugin           = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin            = require('terser-webpack-plugin')
const autoprefixer                   = require('autoprefixer')
const postCssModulesValues           = require('postcss-modules-values')


const options_HTMLWebpackPlugin = {template: './index.html'}
const options_CopyWebpackPlugin = {patterns: [{
    from: path.resolve(__dirname, 'src/favicon.ico'),
    to: path.resolve(__dirname, 'build')
}]}
const options_MiniCssExtractPlugin = {filename: 'stories.css'}
const options_postCssLoader =  {plugins: ["postcss-preset-env", autoprefixer(), postCssModulesValues]}


const isDevelopment = process.env.NODE_ENV === 'development'
const optimization = () => {
    if(!isDevelopment) return {minimize: true, minimizer: [
        new OptimizeCssAssetsWebpackPlugin(),
        new TerserWebpackPlugin()
    ]}
    // {splitChunks: {chunks: 'all'}} // dont needed
    return {}
}


module.exports = {
    mode: isDevelopment ? 'development' : 'production',

    context: path.resolve(__dirname, 'src'),

    entry: 
    {
        main: './index.js'
    },

    output: 
    {
        filename: 'stories.js',
        path: path.resolve(__dirname, 'build')
    },

    resolve: 
    {
        extensions: ['.js', '.json', '.png', '.jpg', '.svg', '.ttf'],
        alias: 
        {
            '@stateManager': path.resolve(__dirname, 'src/stateManager'),
            '@routeManager': path.resolve(__dirname, 'src/routeManager'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@': path.resolve(__dirname, 'src')
        }
    },

    optimization: optimization(),

    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        port: 8080,
        hot: isDevelopment
    },

    plugins: 
    [
        new HTMLWebpackPlugin(options_HTMLWebpackPlugin),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin(options_CopyWebpackPlugin),
        new MiniCssExtractPlugin(options_MiniCssExtractPlugin)
    ],

    module: 
    {
        rules: 
        [
            {
                test: /\.css$/,
                use: 
                [
                    MiniCssExtractPlugin.loader, 
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: 
                        {
                            postcssOptions: options_postCssLoader
                        },
                    }
                ]
            },
            {
                test: /\.modules.css$/,
                use: 
                [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: 
                        {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: "[name]__[local]___[hash:base64:5]"
                        }
                    }, 
                    {
                        loader: "postcss-loader",
                        options: 
                        {
                            postcssOptions: options_postCssLoader
                        },
                    }
                ]
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