import React, {Component} from 'react';
import classNames from 'classnames';
import {func, shape, number, bool, string} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createStructuredSelector} from 'reselect';
import {increaseCounter, decreaseCounter} from '../../actions/counterActions';
import {counterSelector} from '../../selectors/counterSelectors';
import Icon from '../common/icon/Icon';
import SelectInput from '../common/select-input/SelectInput';

class App extends Component {
  constructor(props) {
    super(props);

    this.passedParams = ['svgColor', 'startSVGFactor'];
    this.state = {
      svgSizeFactor: props.startSVGFactor || 10
    };

    this.enlargeSVG = this.enlargeSVG.bind(this);
    this.reduceSVG = this.reduceSVG.bind(this);
  }

  reduceSVG() {
    if (this.state.svgSizeFactor === 0) {
      return;
    }
    this.setState(state => ({svgSizeFactor: state.svgSizeFactor - 1}));
  }

  enlargeSVG() {
    this.setState(state => ({svgSizeFactor: state.svgSizeFactor + 1}));
  }

  render() {
    const {actions: {increaseCounter, decreaseCounter}, counter, isEmbedded, svgColor} = this.props;
    const {svgSizeFactor} = this.state;
    return (
      <div className={classNames("applicationShell", {isEmbedded})}>
        {
          this.passedParams.map((param, index) => (
            this.props[param] ?
            <div key={index} className="testBlock">
              <h1>{`You have passed ${param} param and it equals`}</h1>
              <h2>{this.props[param]}</h2>
            </div> : null
          ))
        }
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
            color={svgColor || "tomato"}
            width={svgSizeFactor * 5}
            height={svgSizeFactor * 5}
          />
        </div>
        <div className="testBlock">
          <h1>Input Component</h1>
          <SelectInput
            name="available-layers-list-type"
            className="layerTypesSelect"
            label="Test Label"
            value={1}
            onChange={() => {}}
            options={[{value: 1, label: 'First'}, {value: 2, label: 'Second'}, {value: 3, label: 'Third'}]}
            searchable={false}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  counter: number,
  svgColor: string,
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
