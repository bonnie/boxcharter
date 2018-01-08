import { renderComponent, expect } from '../test_helper'
import ChartRow from '../../src/components/chart_row'
import testData from '../data'

describe('ChartRow', () => {
  let component
  beforeEach(() => {

    /// NOTE: the below is for "store". Need to figure out how to pass "ownProps"
    const props = { chart: testData.userCharts[0] }
    component = renderComponent(ChartRow, null, props)
  })
  
  it('has the correct class', () => {
    expect(component).to.have.class('chart-row')
  })
})