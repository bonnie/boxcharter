import { expect } from '../test_helper'
import { GET_USERCHARTS } from '../../src/actions/types'
import { getUserCharts } from '../../src/actions'

describe('actions', () => {
  describe('saveComment', () => {
    it('has the correct type', () => {
      const action = getUserCharts()
      expect(action.type).to.equal(GET_USERCHARTS)
    })

    it('has the correct payload', () => {
      // TODO: test this more reliably with test db data
      const charts = [{ chartId: 1, title: 'Blackbird', permissions: 0 }]
      const action = getUserCharts(1)
      return action.payload.then((returnedCharts) => {
        expect(returnedCharts.data.charts).to.eql(charts)
      })
    })
  })
})