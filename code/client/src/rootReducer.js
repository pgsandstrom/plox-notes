import { combineReducers } from 'redux';

import noteReducer from './reducer';

const rootReducer = combineReducers({
  noteReducer,
});

export default rootReducer;
