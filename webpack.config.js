const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const port = process.env.PORT || 3000;

const env = process.env.NODE_ENV || 'development';

module.exports = {
  devtool: env === 'production' ? null : 'eval-source-maps',
  entry: {
    main: env === 'production' ? ['./src/index'] : [
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
      loaders: env === 'production' ? ['babel'] : ['react-hot', 'babel'],
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
  plugins: env === 'production' ? [
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ] : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ]
};
