/**
 * 
 */

import { GET_USERCHARTS } from '../../src/actions/types';
import axios from 'axios'

export default (state=[], action) => {
  switch(action.type) {
    case GET_USERCHARTS:
      return action.payload
    default:
      return state
  }
}