/* eslint-disable */
const path = require('path')


// All Plugins
const HTMLWebpackPlugin              = require('html-webpack-plugin')
const {CleanWebpackPlugin}           = require('clean-webpack-plugin')
const CopyWebpackPlugin              = require('copy-webpack-plugin')
const MiniCssExtractPlugin           = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin            = require('terser-webpack-plugin')
const autoprefixer                   = require('autoprefixer')
const postCssModulesValues           = require('postcss-modules-values')


// Options for some Plugins
const options_HTMLWebpackPlugin = {template: './index.html'}
// const options_CopyWebpackPlugin = {patterns: [{
//     from: path.resolve(__dirname, 'src/favicon.ico'),
//     to: path.resolve(__dirname, 'build')
// }]}
const options_CopyWebpackPlugin = {patterns: [
    {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'build')
    },
    {
        from: path.resolve(__dirname, 'src/assets/images'),
        to: path.resolve(__dirname, 'build/static/images')
    }
]}
const options_MiniCssExtractPlugin = {filename: 'stories.css'}
const options_postCssLoader =  {plugins: ["postcss-preset-env", autoprefixer(), postCssModulesValues]}


// System varieble
const isDevelopment = process.env.NODE_ENV === 'development'

// Settings for 'optimization' field in config
const optimization = () => {
    if(!isDevelopment) return {minimize: true, minimizer: [
        new OptimizeCssAssetsWebpackPlugin(),
        new TerserWebpackPlugin()
    ]}
    // {splitChunks: {chunks: 'all'}} // dont needed
    return {}
}


// Мarious loaders for .js extention with difference assembly mode
const loadersJS = () => isDevelopment ? 
([
    {
        loader: "babel-loader",
        options: 
        {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
        }
    },
    "eslint-loader"
]) 
    : 
({
    loader: "babel-loader",
    options: 
    {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
    }
})



// Config itself
module.exports = {
    mode: isDevelopment ? 'development' : 'production',

    context: path.resolve(__dirname, 'src'),

    entry: 
    {
        main: ['@babel/polyfill', './index.js']
    },

    output: 
    {
        filename: 'stories.js',
        path: path.resolve(__dirname, 'build'),
    },

    resolve: 
    {
        extensions: ['.js', '.json', '.png', '.jpg', '.svg', '.ttf'],
        alias: 
        {
            '@stateManager': path.resolve(__dirname, 'src/stateManager'),
            '@routeManager': path.resolve(__dirname, 'src/routeManager'),
            '@handlers': path.resolve(__dirname, 'src/handlers'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@': path.resolve(__dirname, 'src')
        }
    },

    optimization: optimization(),

    devServer: 
    {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        port: 8080,
        hot: isDevelopment,
        historyApiFallback: true
    },

    devtool: isDevelopment ? 'source-map' : false,

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
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: loadersJS()
            },
            {
                test: /\.css$/,
                use: 
                [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    }, 
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
                            localIdentName: "[name]___[local][hash:base64:5]"
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
                use: 
                {
                    loader: 'file-loader',
                    options: 
                    {
                        name: "[name].[ext]",
                        outputPath: "static/images",
                        publicPath: 'static/images',
                    }
                }
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use: 
                {
                    loader: 'file-loader',
                    options: 
                    {
                        name: "[name].[ext]",
                        outputPath: "static/fonts",
                        publicPath: 'static/fonts',
                    }
                }
            }
        ]
    }

}