const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const port = process.env.PORT || 3000;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  contentBase: config.output.contentBase,
  historyApiFallback: true
}).listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Listening at localhost:${port}`);
});
