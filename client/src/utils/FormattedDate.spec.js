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
 * Tests for the FormattedDate component
 * @module
 * FormattedDate-spec
 */

import React from 'react'
import { shallow } from 'enzyme'
import FormattedDate from './FormattedDate'

describe('FormattedDate', () => {
  test('renders the default date format without the year for the current year', () => {
    const currentYear = new Date().getFullYear().toString()
    const dateJSX = <FormattedDate date={new Date(`${currentYear}-01-07T21:14:00`)} />
    const renderedDate = shallow(dateJSX)
    expect(renderedDate).toMatchSnapshot()
  })
})

// import { renderComponent, expect } from '../test_helper'
// import FormattedDate from '../../src/components/formatted_date'
// import testData from '../data'

// describe('FormattedDate', () => {
//   it('has the correct class', () => {
//     const component = renderComponent(FormattedDate)
//     expect(component).to.have.class('formatted-date')
//   })

//   it('renders the default date format without the year for the current year', () => {
//     const currentYear = new Date().getFullYear().toString()
//     const props = { date: new Date(`${currentYear}-01-07T21:14:00`) }
//     const formattedDate = `Jan 7, `
//     const component = renderComponent(FormattedDate, props)
//     expect(component).to.contain(formattedDate)
//   })

//   it('renders the default date format with the year for a previous year', () => {
//     const currentYear = (new Date().getFullYear() - 1).toString()
//     const props = { date: new Date(`${currentYear}-01-07T21:14:00`) }
//     const formattedDate = `Jan 7, ${currentYear}`
//     const component = renderComponent(FormattedDate, props)
//     expect(component).to.contain(formattedDate)
//   })

//   it('renders the default time format', () => {
//     const formattedTime = '9:14 pm'
//     const component = renderComponent(FormattedDate, { date: '2018-01-07T21:14:00' })
//     expect(component).to.contain(formattedTime)
//   })

//   it('renders a different date format', () => {
//     const formatProps = { date: '2018-01-07T21:14:00', format: 'YYYY-MM-DD'}
//     const formattedDate = '2018-01-07'
//     const component = renderComponent(FormattedDate, formatProps)
//     expect(component).to.contain(formattedDate)
//   })
// })