import {combineReducers} from 'redux';
import counter from './counterReducers';

const rootReducer = combineReducers({
  counter
});

export default rootReducer;
