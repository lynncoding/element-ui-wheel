const path = require('path')
const express = require('express')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let getProxy = function (env) {
  let result = {}
  result[new RegExp('^/(api|)/.*', 'i')] = {
    target: env === 'development' ? 'http://192.168.150.41:8200' : 'http://192.168.150.20:12018'
  }
  return result
}

module.exports = {
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, 'example/index.js')
  },
  output: {
    publicPath: '/',
    filename: 'js/[name].js?[chunkhash]',
    chunkFilename: 'js/[name].js?[chunkhash]'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'example'),
      'src': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.js$/,
      loader: 'babel-loader'
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
      loader: 'file-loader'
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
      loader: 'file-loader',
      query: {
        name: '[name].[ext]?[hash]'
      }
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'example/index.html'
    })
  ],
  devServer: {
    port: 8081,
    host: '0.0.0.0',
    useLocalIp: true,
    staticOptions: {
    },
    compress: true,
    open: true,
    progress: true,
    setup: function (app) {
      app.use('/assets', express.static(path.resolve(__dirname, './example/assets')))
    },
    proxy: getProxy('development')
  }
}
