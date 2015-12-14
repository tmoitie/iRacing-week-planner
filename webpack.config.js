var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: process.env.ENV === 'production' ? null : 'eval',
  entry: process.env.ENV === 'production' ? [
    './src/index'
  ] : [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js',
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
      loaders: ['style', 'css', 'autoprefixer', 'sass']
    }, {
      test: /\.css$/,
      loaders: ['style', 'css', 'autoprefixer']
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
  sassLoader: {
    // includePaths: [path.resolve(__dirname, './some-folder')]
  },
  plugins: process.env.ENV === 'production' ? [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
  ] : [
    new webpack.HotModuleReplacementPlugin()
  ]
};
