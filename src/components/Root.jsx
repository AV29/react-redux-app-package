import React, {Component} from 'react';
import {object, bool, string} from 'prop-types';
import {Provider} from 'react-redux';
import App from './application-shell/App';

class Root extends Component {

  render() {
    const {store, ...props} = this.props;
    return (
      <Provider store={store}>
        <App {...props}/>
      </Provider>
    );
  }
}

Root.defaultProps = {
  isEmbedded: false
};

Root.propTypes = {
  store: object,
  isEmbedded: bool
};

export default Root;
