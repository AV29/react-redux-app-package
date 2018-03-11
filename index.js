import 'babel-polyfill';
import {render} from 'react-dom';
import React from 'react';
import Root from './src/components/Root';
import configureStore from './src/store/configureStore';
import './src/styles/styles.less';

const store = configureStore();

const init = props => {
  render(
    <Root store={store}  {...props}/>,
    document.getElementById('application-root')
  );
};

init({startSVGFactor: 5});
