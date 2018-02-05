import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import authReducer from './reducer_auth'
import chartsReducer from './reducer_charts'

const rootReducer = combineReducers({
  form,
  user: authReducer,
  charts: chartsReducer,
});

export default rootReducer;
