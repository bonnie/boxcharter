import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer'
import chartsReducer from './usercharts_reducer'
import navReducer from './nav_reducer'

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  charts: chartsReducer,
  nav: navReducer,
});

export default rootReducer;
