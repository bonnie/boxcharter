/**
 * 
 */

import { GET_USERCHARTS } from '../../src/actions/types';

export default (state=[], action) => {
  switch(action.type) {
    case GET_USERCHARTS:
      return action.payload.data.charts
    default:
      return state
  }
}