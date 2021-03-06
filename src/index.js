import React from 'react';
import Root from './components/Root';
import configureStore from './store/configureStore';
import '../styles.css';

const store = configureStore();

const TestComponent = props => (
  <Root
    store={store}
    isEmbedded
    {...props}
  />
);

export default TestComponent;
