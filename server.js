var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

const port = process.env.PORT || 3000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  contentBase: config.output.contentBase,
  historyApiFallback: true
}).listen(port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log(`Listening at localhost:${port}`);
});
