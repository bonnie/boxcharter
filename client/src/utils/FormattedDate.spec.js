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
import '../../jest/setupTests'
import FormattedDate from './FormattedDate'

describe('FormattedDate', () => {
  const currentYear = new Date().getFullYear().toString()
  test('renders the default date format without the year for the current year', () => {
    const dateJSX = <FormattedDate date={new Date(`${currentYear}-01-07T21:14:00`)} />
    const renderedDate = shallow(dateJSX)
    const formattedDate = 'Jan 7, 9:14 pm'
    expect(renderedDate.text()).toEqual(formattedDate)
  })
  test('renders the default date format with the year for a previous year', () => {
    const dateJSX = <FormattedDate date={new Date(`${currentYear - 1}-01-07T21:14:00`)} />
    const renderedDate = shallow(dateJSX)
    const formattedDate = `Jan 7, ${currentYear - 1}, 9:14 pm`
    expect(renderedDate.text()).toEqual(formattedDate)
  })
  test('renders a different date format', () => {
    const formatProps = { date: '2018-01-07T21:14:00', format: 'YYYY-MM-DD'}
    const renderedDate = shallow(<FormattedDate {...formatProps} />)
    const formattedDate = '2018-01-07'
    expect(renderedDate.text()).toEqual(formattedDate)
  })
})
