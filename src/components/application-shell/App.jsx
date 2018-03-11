import React, {Component} from 'react';
import classNames from 'classnames';
import {func, shape, number, bool} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createStructuredSelector} from 'reselect';
import {increaseCounter, decreaseCounter} from '../../actions/counterActions';
import {counterSelector} from '../../selectors/counterSelectors';
import Icon from '../common/icon/Icon';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      svgSizeFactor: props.startSVGFactor || 1
    };

    this.enlargeSVG = this.enlargeSVG.bind(this);
    this.reduceSVG = this.reduceSVG.bind(this);
  }

  reduceSVG() {
    if(this.state.svgSizeFactor === 0) {
      return;
    }
    this.setState(state => ({svgSizeFactor: state.svgSizeFactor - 1}));
  }

  enlargeSVG() {
    this.setState(state => ({svgSizeFactor: state.svgSizeFactor + 1}));
  }

  render() {
    const {actions: {increaseCounter, decreaseCounter}, counter, isEmbedded} = this.props;
    const {svgSizeFactor} = this.state;
    return (
      <div className={classNames("applicationShell", {isEmbedded})}>
        <div className="testBlock">
          <h1>Redux store test</h1>
          <button onClick={increaseCounter}>Increase</button>
          <h2 className="counter">{counter}</h2>
          <button onClick={decreaseCounter}>Decrease</button>
        </div>
        <div className="testBlock">
          <h1>React local state test</h1>
          <button onClick={this.enlargeSVG}>Enlarge</button>
          <button onClick={this.reduceSVG}>Reduce</button>
        </div>
        <div className="testBlock">
          <h1>SVG test</h1>
          <Icon
            icon="spinner"
            color="tomato"
            width={svgSizeFactor * 5}
            height={svgSizeFactor * 5}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  counter: number,
  startSVGFactor: number,
  isEmbedded: bool,
  actions: shape({
    increaseCounter: func,
    decreaseCounter: func
  })
};

const mapStateToProps = () => createStructuredSelector({
  counter: counterSelector()
});

const mapDispatchToProps = dispatch => {
  const actions = {
    increaseCounter,
    decreaseCounter
  };
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
