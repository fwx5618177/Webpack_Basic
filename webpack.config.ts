import type { Configuration } from 'webpack'
import devServer from 'webpack-dev-server'
import path from 'path'
import HtmlWebpack from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin'
import TerserWebpackPlugin from 'terser-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader/dist/index'
import tsImportPluginFactory from 'ts-import-plugin'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import notifier from 'node-notifier'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
// import SpeedMeasurePlugin from "speed-measure-webpack-plugin";

const icon = path.join(__dirname, 'public/icon.jpg')
// const smp = new SpeedMeasurePlugin();

const config: Configuration & {
  devServer: devServer.Configuration
} = {
  mode: 'development',
  entry: {
    main: './src/main.ts',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.tsx', '.ts', '.vue'],
  },
  target: 'web',
  cache: false,
  context: process.cwd(),
  devServer: {
    server: 'http',
    allowedHosts: ['all'],
    historyApiFallback: true,
    port: 3000,
    host: 'localhost',
    open: true,
    hot: true,
    liveReload: true,
    client: {
      logging: 'info',
      overlay: {
        warnings: false,
        errors: true,
      },
      progress: true,
      reconnect: 4,
    },
    https: false,
    headers: {
      Authorization: '1',
    },
    proxy: {
      secure: false,
    },
    compress: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        commons: {
          chunks: 'all',
          name: 'commons',
          minSize: 0,
          maxInitialRequests: 5,
          minChunks: 2,
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  output: {
    filename: '[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/.vue$/],
              compilerOptions: {
                module: 'es2015',
              },
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory({
                    libraryName: 'vant',
                    libraryDirectory: 'es',
                    style: (name) => `${name}/style/less`,
                  }),
                ],
              }),
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
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
              },
            },
          },
        },
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
                },
              },
            },
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
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        notifier.notify({
          title: '编译失败',
          message: `${severity} ${errors as string}`,
          subtitle: errors as string,
          icon,
        })
      },
    }),
    new HtmlWebpack({
      template: './public/index.html',
      filename: 'index.html',
      title: 'webpack basic',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsWebpackPlugin() as any,
    new MiniCssExtractPlugin({
      filename: '[contenthash].css',
    }),
    new VueLoaderPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      analyzerPort: 'auto',
      statsFilename: 'stats.json',
      openAnalyzer: true,
      logLevel: 'info',
    }),
  ],
}

export default config
