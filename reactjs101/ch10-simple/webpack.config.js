const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/src/index.html`,
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: [
    './client/index.js',
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
    publicPath: '/static',
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'eslint-loader',
        include: `${__dirname}/app`,
        exclude: /bundle.js$/,
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'react-hmre'],
        },
      },
    ],
  },
  devServer: {
    port: 8008,
    inline: true,
  },
  plugin: [HTMLWebpackPluginConfig],
};
