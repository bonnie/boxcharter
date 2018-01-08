import { renderComponent, expect } from '../test_helper'
import ChartRow from '../../src/components/chart_row'
import testData from '../data'

// TODO: not sure how to test this, as I get: 
// Invariant Violation: findComponentRoot(..., .24yqof5frgu): Unable to find element. This probably means the DOM was unexpectedly mutated (e.g., by the browser), usually due to forgetting a <tbody> when using tables, nesting tags like <form>, <p>, or <a>, or using non-SVG elements in an <svg> parent. Try inspecting the child nodes ofthe element with React ID ``.

// describe('ChartRow', () => {
//   let component
//   beforeEach(() => {
//     const props = { chart: testData.userCharts[0] }
//     component = renderComponent(ChartRow, props)
//   })
  
//   it('has the correct class', () => {
//     expect(component).to.have.class('chart-row')
//   })
// })