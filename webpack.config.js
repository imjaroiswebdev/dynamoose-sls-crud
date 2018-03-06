const path = require('path')
const slsw = require('serverless-webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  target: 'node',
  entry: slsw.lib.entries,
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [__dirname],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },
  externals: ['aws-sdk'],
  plugins: [
    new UglifyJsPlugin()
  ]
}
