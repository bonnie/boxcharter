/*
 * Copyright (c) 2018 Bonnie Schulkin. All Rights Reserved.
 *
 * This file is part of BoxCharter.
 *
 * BoxCharter is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * BoxCharter is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with BoxCharter. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * Reducers for the app
 * @module
 * reducers
 */

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from '../auth/authReducer';
import userChartsReducer from '../user/userChartsReducer';
import navReducer from '../nav/navReducer';
import loadingReducer from '../loading/loadingReducer';
import chartReducer from '../chart/chartReducer'

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  charts: userChartsReducer,
  nav: navReducer,
  loading: loadingReducer,
  activeChart: chartReducer,
});

export default rootReducer;
