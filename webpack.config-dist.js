var webpack = require('webpack');
var ___dirname = __dirname + '/../../';
var package_json = require(___dirname + "package.json");

const MINIFY = process.env.MINIFY;
const uglifyJsPluginParams = MINIFY ? undefined : { beautify: true, compress: { dead_code: true, warnings: true }, mangle: false };

var entry = ___dirname + package_json.dist.entry;

var alias = {}; 
var data = package_json.vendor.entry;
for (var i = 0; i < data.length; i++) {
  alias[data[i]] = ___dirname + 'node_modules/', data[i];
}

var output = {
    path: ___dirname + package_json.dist.path,
    filename: MINIFY && package_json.dist.filenameMin ? package_json.dist.filenameMin : package_json.dist.filename,
    library: package_json.dist.library
};

module.exports = {
  entry,
  output,
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.jsx$/, exclude: /node_modules/, loaders: ['babel-loader'] }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
    }),
    new webpack.optimize.UglifyJsPlugin(uglifyJsPluginParams),
    new webpack.ProvidePlugin({
      React: 'react'
    })  
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [___dirname + 'node_modules'],
    alias: alias
  }
}
