const webpack = require('webpack')
const config = require(process.env.WEBPACK_CONFIG)

module.exports = {
  // Example setup for your project:
  // The entry module that requires or imports the rest of your project.
  // Must start with `./`!
  entry: './src/entry.js',
  // Place output files in `./dist/app.js`
  output: {
    path: __dirname + '/dist',
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'USER_POOL_ID': JSON.stringify(config.USER_POOL_ID),
      'USER_POOL_CLIENT_ID': JSON.stringify(config.USER_POOL_CLIENT_ID),
      'AWS_REGION': JSON.stringify(config.AWS_REGION),
      'IDENTITY_POOL_ID': JSON.stringify(config.IDENTITY_POOL_ID),
      'FILE_BUCKET_NAME': JSON.stringify(config.FILE_BUCKET_NAME),
    })
  ]
};