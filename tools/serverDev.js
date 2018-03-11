/* eslint-disable import/default */
/* eslint-disable no-console */
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import * as consts from './constants';

const app = express();

const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

// Everything else will return the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, consts.DEV_FALLBACK_INDEX_POINT));
});

app.listen(consts.DEV_PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(consts.DEV_APP_ENTRY_POINT);
  }
});
