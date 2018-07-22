var webpack = require('webpack');
var path = require('path');

var ___dirname = __dirname + '/../../';
var package_json = require(___dirname + "package.json");

var entry = ___dirname + package_json.dist.entry;
var output = {
    path: ___dirname + package_json.dist.path,
    filename: package_json.dist.filename,
    library: package_json.dist.library
};

module.exports = {
  entry,
  output,
  devServer: {
    contentBase: 'dist',
    host: '0.0.0.0',
    hot: true
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot-loader/webpack', 'babel-loader'] },
      { test: /\.jsx$/, exclude: /node_modules/, loaders: ['react-hot-loader/webpack', 'babel-loader'] }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [___dirname + 'node_modules']
  }
}
