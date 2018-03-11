import {fromJS} from 'immutable';
import {
  INCREASE_COUNTER,
  DECREASE_COUNTER
} from '../actions/counterActions';


const initialState = fromJS({
  counter: 0
});

function counter(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {

    case INCREASE_COUNTER: {
      const counter = state.get('counter');
      return state.set('counter', counter + 1);
    }

    case DECREASE_COUNTER: {
      const counter = state.get('counter');
      return state.set('counter', counter - 1);
    }

    default: {
      return state;
    }
  }
}

export default counter;

