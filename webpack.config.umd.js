/* eslint-disable prefer-template*/
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    'react-redux-test-component': './tools/indexUmd'
  },
  output: {
    path: __dirname + '/dist/umd',
    publicPath: '/',
    filename: '[name].js',
    library: 'ReactReduxTest',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  target: 'web',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        safari10: true,
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: false,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      },
      output: {
        comments: false,
        ascii_only: true
      },
      sourceMap: true
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.less']
  },
  module: {
    rules: [
      {
        test: /(\.js$|\.jsx?$)/,
        loader: 'babel-loader',
        exclude: ['node_modules'],
        options: {
          sourceMap: true
        }
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader',
            query: {
              svgo: {
                plugins: [{removeTitle: false}],
                floatPrecision: 2
              }
            }
          }
        ]
      }
    ]
  }
};

