import axios from 'axios'
// import Chart from '../../../shared/src/model/chart'

import { 
  GET_USERCHARTS, 
  GET_CHART,
} from './types'

const serverHost = 'localhost'
const serverPort = '5000'
const baseUrl = `http://${serverHost}:${serverPort}/api`

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
  getUserCharts,
  getChart,
}