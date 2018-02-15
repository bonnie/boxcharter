import { expect } from '../test_helper'
import { GET_USERCHARTS, GET_CHART } from '../../src/actions/types'
import { getUserCharts, getChart } from '../../src/actions'
import testData from '../data'

// describe('actions', () => {
//   describe('getUserCharts', () => {
//     it('has the correct type', () => {
//       const action = getUserCharts()
//       expect(action.type).to.equal(GET_USERCHARTS)
//     })

//     it('has the correct payload', () => {
//       // TODO: mock out axios here...
//       const expectedKeys = Object.keys(testData.userCharts[0]).sort()
//       const action = getUserCharts(1)
//       return action.payload.then((returnedCharts) => {
//         const returnedKeys = Object.keys(returnedCharts.data.charts[0]).sort()
//         expect(returnedKeys).to.eql(expectedKeys)
//       })
//     })
//   })

//   describe('getChart', () => {
//     it('has the correct type', () => {
//       const action = getChart()
//       expect(action.type).to.equal(GET_CHART)
//     })

//     it('has the correct payload', () => {
//       // TODO: mock out axios here...
//       const expectedKeys = Object.keys(testData.charts[0]).sort()
//       const action = getChart(1)
//       return action.payload.then((returnedCharts) => {
//         const returnedKeys = Object.keys(returnedCharts.data).sort()
//         expect(returnedKeys).to.eql(expectedKeys)
//       })
//     })
//   })
// })