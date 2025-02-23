const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development', // Pastikan ini ada dan benar
  entry: './src/script.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '/src/index.html',
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8080,
    open: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
};