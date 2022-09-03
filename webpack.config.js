const path = require('path')
const HtmlWebpack = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')

const conf = {
    mode: 'development',
    entry: './src/index.ts',
    devServer: {
        port: 3000,
        host: '0.0.0.0',
        hot: true,
        open: true,
        contentBase: '../dist',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin(),
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ],
            },
            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                ],
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], 
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ]
            },
            {
                test: /\.(mp4|ogg|mp3|wav)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: '[hash].[ext]',
                            }
                        },
                    }
                }
            },
            {
                test: /\.(jpg|png|jpeg|gif|bmp)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: '[name].[ext]',
                                }
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            },
                        },
                    }
                ],
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpack({
            template: './public/index.html',
            filename: 'index.html',
            title: 'webpack basic',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            }
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[hash].css',
        }),
    ],
}

module.exports = conf