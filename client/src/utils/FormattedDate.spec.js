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

import React from 'react';
import { shallow } from 'enzyme';
import '../../jest/setupTests';
import { checkProps, generateRequiredError, generateTypeError } from '../../jest/utils';
import FormattedDate from './FormattedDate';

const currentYear = new Date().getFullYear().toString();
const lastYear = Number(currentYear) - 1;
const givenDate = '01-07';
const givenHour = '21';
const givenMinutes = '14';
const givenMinutesSeconds = `:${givenMinutes}:00`;
const givenDateMinusYear = `${givenDate}T${givenHour}${givenMinutesSeconds}`;

const expectedDate = 'Jan 7';
const expectedTime = `(1[012]|[1-9]):${givenMinutes} [ap]m`;
const currentYearMatch = expect.stringMatching(`^${expectedDate}, ${expectedTime}$`);
const lastYearMatch = expect.stringMatching(`^${expectedDate}, ${lastYear}, ${expectedTime}`);

describe('FormattedDate', () => {
  describe('render', () => {
    test('renders the default date format without the year for the current year', () => {
      const dateJSX = <FormattedDate date={new Date(`${currentYear}-${givenDateMinusYear}`)} />;
      const renderedDate = shallow(dateJSX);
      expect(renderedDate.text()).toEqual(currentYearMatch);
    });
    test('renders the default date format with the year for a previous year', () => {
      const dateJSX = <FormattedDate date={new Date(`${lastYear}-${givenDateMinusYear}`)} />;
      const renderedDate = shallow(dateJSX);
      expect(renderedDate.text()).toEqual(lastYearMatch);
    });
    test('renders a different date format', () => {
      const formatProps = { date: `${currentYear}-${givenDateMinusYear}`, format: 'YYYY-MM-DD' };
      const renderedDate = shallow(<FormattedDate {...formatProps} />);
      const formattedDate = `${currentYear}-${givenDate}`;
      expect(renderedDate.text()).toEqual(formattedDate);
    });
  });
  describe('prop-types', () => {
    test('no error for correct props', () => {
      const propTypesError = checkProps(FormattedDate, { format: 'hi', date: Date() });
      expect(propTypesError).toBeFalsy();
    });
    test('error when required date is not included', () => {
      const propTypesError = checkProps(FormattedDate, { format: 'hi' });
      expect(propTypesError).toBe(generateRequiredError('date', FormattedDate));
    });
    test('error when format is not a string', () => {
      const badFormat = 123;
      const propTypesError = checkProps(FormattedDate, { format: badFormat });
      expect(propTypesError).toBe(generateTypeError('format', FormattedDate, 'string', 'number'));
    });
  });
});
