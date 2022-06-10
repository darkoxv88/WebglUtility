const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  watch: true,
  watchOptions: {
    ignored: '**/node_modules',
    aggregateTimeout: 2500,
  },
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.(glsl|frag|vert|vs|fs)$/, loader: "ts-shader-loader" },
    ],
  },
  output: {
    filename: 'webgl-utility.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'name',
    })
  ]
};
