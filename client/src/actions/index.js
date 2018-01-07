import { Chart } from '../../../shared/model/chart'
import axios from 'axios'

import { GET_USERCHARTS } from './types'

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

module.exports = {
  getUserCharts,
}