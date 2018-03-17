const path = require('path')
const slsw = require('serverless-webpack')

module.exports = {
  target: 'node',
  entry: slsw.lib.entries,
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  devtool: 'source-map',
  mode: 'development',
  externals: ['aws-sdk'],
  stats: slsw.lib.webpack.isLocal
    ? 'errors-only'
    : 'normal',
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
  }
}
