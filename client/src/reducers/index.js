import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import authReducer from './reducer_auth'
import chartsReducer from './reducer_charts'

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  charts: chartsReducer,
});

export default rootReducer;
