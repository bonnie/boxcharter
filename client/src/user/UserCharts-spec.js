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
 * Tests for the UserCharts component
 * @module
 * UserCharts-spec
 */

 import { renderComponent, expect } from '../test_helper';
import UserCharts from '../../src/components/user_charts';
import testData from '../data'

// describe('UserCharts', () => {
//   let component
//   beforeEach(() => {
//     const props = { 
//       user: testData.users[0],
//       charts: testData.userCharts
//     }
//     component = renderComponent(UserCharts, null, props)
//   });
  
//   it('has the correct class', () => {
//     expect(component).to.have.class('user-charts')
//   });

// });