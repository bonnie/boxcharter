import axios from 'axios'
import  from 'redux-thunk'
// import Chart from '../../../shared/src/model/chart'

import { 
  GET_USERCHARTS, 
  GET_CHART,
} from './types'

const serverHost = 'localhost'
const serverPort = '5000'
const baseUrl = `http://${serverHost}:${serverPort}/api`

const signinUser = ({ email, password }) => {
  // submit email/password to server

  // if request is good...
  // - update state to indicate user is authenticated
  // - save the JWT token
  // - redirect to the route "/users/{user_id}"

  // if request is bad...
  // - Show an error to the user

}

const getUserCharts = (userId) => {
  if (!userId) {
    return { type: GET_USERCHARTS }
  }
  const request = axios.get(`${baseUrl}/users/${userId}/charts`)
  return {
    type: GET_USERCHARTS,
    payload: request
  }
}

const getChart = (chartId) => {
  if (!chartId) {
    return { type: GET_CHART }    
  }
  const request = axios.get(`${baseUrl}/charts/${chartId}`)
  return {
    type: GET_CHART,
    payload: request
  }
}

module.exports = {
  signinUser,
  getUserCharts,
  getChart,
}