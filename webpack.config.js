const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const plugins = [
  new HtmlWebpackPlugin({
    favicon: './public/favicon.ico',
    template: './public/index.html',
  }),
  new webpack.ProvidePlugin({
    Buffer: ['buffer', 'Buffer'],
  }),
  new webpack.ProvidePlugin({
    process: 'process/browser',
  }),
  require('tailwindcss')
];

module.exports = {
  entry: './src/main.jsx',
  mode: 'development',
  devtool: 'eval-source-map',
  plugins,
  output: {
    clean: true,
    path: path.resolve(__dirname, 'build'),
    assetModuleFilename: 'assets/[hash][ext]',
    filename: 'main.[hash:8].js',
  },
  devServer: {
    open: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 'auto',
    hot: true,
    client: {
      progress: true,
    },
  },

  module: {
    rules: [
      { test: /\.(html)$/, use: ['html-loader'] },
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },

          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "querystring": require.resolve("querystring-es3"),
      "crypto": require.resolve("crypto-browserify"),
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "url": require.resolve("url/"),
      "buffer": require.resolve("buffer/"),
      "fs": false
    }
  },
};