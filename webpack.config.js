const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  target: isProd ? 'browserslist' : 'web',
  devtool: isProd ? false : 'inline-source-map',
  context: path.resolve(__dirname, 'src'),
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext]',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Eldritch Horror Helper',
      template: './index.html',
      favicon: './assets/favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new EslintPlugin({ extensions: 'js' }),
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: ['/node_modules/'],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpe?g|svg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
      {
        test: /\.(mp[34]|wav|ogg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/audio/[name][ext]'
        }
      },
    ],
  },
  devServer: {
    open: true,
    hot: false,
    historyApiFallback: true,
    port: 8080,
    static: path.resolve(__dirname, './dist'),
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              'imagemin-gifsicle',
              'imagemin-mozjpeg',
              'imagemin-pngquant',
              'imagemin-svgo',
            ],
          },
        },
        loader: false,
      }),
    ],
  },
};
