const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const port = process.env.PORT || 3000;

module.exports = {
  devtool: process.env.ENV === 'production' ? null : 'eval-source-maps',
  entry: {
    main: process.env.ENV === 'production' ? ['./src/index'] : [
      `webpack-dev-server/client?http://localhost:${port}`,
      'webpack/hot/only-dev-server',
      './src/index'
    ],
    ie8: ['./src/ie8']
  },
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: '[name].js',
    publicPath: '/dist/',
    contentBase: path.join(__dirname, 'public')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: process.env.ENV === 'production' ? ['babel'] : ['react-hot', 'babel'],
      include: [path.join(__dirname, 'src')]
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'postcss', 'sass']
    }, {
      test: /\.css$/,
      loaders: ['style', 'css', 'postcss']
    }, {
      test: /\.(png|gif)$/,
      loader: 'file'
    },
    { test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
    { test: /\.json$/, loader: 'json' }]
  },
  postcss: () => [autoprefixer],
  sassLoader: {
  },
  plugins: process.env.ENV === 'production' ? [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
  ] : [
    new webpack.HotModuleReplacementPlugin()
  ]
};
