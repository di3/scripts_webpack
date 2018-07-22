var webpack = require('webpack');
var ___dirname = __dirname + '/../../';
var package_json = require(___dirname + 'package.json');

const MINIFY = process.env.MINIFY;
const uglifyJsPluginParams = MINIFY ? undefined : { beautify: true, compress: { dead_code: true, warnings: true }, mangle: false };

var entry = ___dirname + package_json.feature.entry;

var alias = {}; 
var data = package_json.vendor.entry;
for (var i = 0; i < data.length; i++) {
  alias[data[i]] = ___dirname + 'node_modules/' + data[i];
}

var output = {
    path: ___dirname + package_json.feature.path,
    filename: MINIFY && package_json.feature.filenameMin ? package_json.feature.filenameMin : package_json.feature.filename,
    library: package_json.feature.library
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
    }),
    new webpack.DllReferencePlugin({            
      context: ___dirname,
      manifest: require(__dirname + '/' + package_json.vendor.manifest)
    })  
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [___dirname + 'node_modules'],
    alias: alias
  }
}
