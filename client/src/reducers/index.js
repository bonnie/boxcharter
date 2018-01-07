import { combineReducers } from 'redux';
import authReducer from './reducer_auth'
import chartsReducer from './reducer_charts'

const rootReducer = combineReducers({
  userId: authReducer,
  charts: chartsReducer,
});

export default rootReducer;
