/*
 * Copyright (c) 2018 Bonnie Schulkin. All Rights Reserved.
 *
 * This file is part of BoxCharter.
 *
 * BoxCharter is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * BoxCharter is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with BoxCharter. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * Tests for the ChartRow component
 * @module
 * ChartRow-spec
 */

import ChartRow from './ChartRow'

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