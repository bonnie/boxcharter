import { expect } from '../test_helper'
import { GET_USERCHARTS } from '../../src/actions/types'
import { getUserCharts } from '../../src/actions'
import testData from '../data'

describe('actions', () => {
  describe('getUserCharts', () => {
    it('has the correct type', () => {
      const action = getUserCharts()
      expect(action.type).to.equal(GET_USERCHARTS)
    })

    it('has the correct payload', () => {
      // TODO: mock out axios here...
      const expectedKeys = new Set(Object.keys(testData.userCharts[0]))
      const action = getUserCharts(1)
      return action.payload.then((returnedCharts) => {
        const returnedKeys = new Set(Object.keys(returnedCharts.data.charts[0]))
        expect(returnedKeys).to.eql(expectedKeys)
      })
    })
  })
})