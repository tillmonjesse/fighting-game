const path = require('path');

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"]
  },
	mode: 'development',
  entry: {
    main: './src/js/index.js',
    tooling: './src/tooling/index.jsx'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
  	contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
          /*options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }*/
        }
      }
    ]
  }
};