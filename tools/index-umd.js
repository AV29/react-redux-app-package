import 'babel-polyfill';
import {render} from 'react-dom';
import React from 'react';
import Root from '../src/components/Root';
import configureStore from '../src/store/configureStore';
import '../src/styles/styles.less';

const store = configureStore();

export const init = ({id}) => {
  render(
    <Root store={store}/>,
    document.getElementById(id)
  );
};
