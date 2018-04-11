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
 * Tests for the NavLink component
 * @module
 * NavLink-spec
*/

import React from 'react'
// import { connect, Provider } from 'react-redux'
import { shallow } from 'enzyme'
// import { shallowWithStore } from 'enzyme-redux' 
// import { configureMockStore, createMockStore } from 'redux-test-utils'
// import { MemoryRouter } from 'react-router-dom';
import '../../jest/setupTests'
import { findWrapperNodeByTestId } from '../../jest/clientTestUtils'
import { NO_TAB, SIGN_IN, SIGN_UP, SIGN_OUT, USER_PROFILE } from './tabNames'
// import { NAV_TAB } from './navActionTypes'
// import navReducer from './navReducer'
// import rootReducer from '../app/reducers'
// import { setActiveNavTab } from './navActions'
import { NavLink } from './NavLink'
// import App from '../app/App'

// adapted from enzyme-redux
// function mountWithStore(Component, store) {
//   const context = { store }
//   return (0, mount)(Component, { context })
// };
// end adapted from enzyme-redux

const activeLinkRoute = "/sign-in"
const inactiveLinkRoute = "/sign-up"
const activeLinkText = SIGN_IN
const inactiveLinkText = SIGN_UP

describe('NavLink component', () => {

  describe('active NavLink', () => {
    describe('renders correctly', () => {
      const activeNav =
        <NavLink 
          linkRoute={activeLinkRoute}
          linkText={activeLinkText} 
          activeNavTab={activeLinkText}
        />
      const renderedNav = shallow(activeNav)
      test('component includes a Link', () => {
        expect(renderedNav.find('Link').length).toBe(1)
      })
      test('component Link should include the correct "to" prop', () => {
        expect(renderedNav.find('Link').prop('to')).toBe(activeLinkRoute)
      })
      test('component Link should include the correct text', () => {
        // Don't think there's any way around childAt(0) here...
        expect(renderedNav.find('Link').childAt(0).text()).toBe(activeLinkText)
      })
      test('component includes active class', () => {
        expect(renderedNav.hasClass('active')).toBe(true)
      })
    })
  })

  describe('inactive NavLink', () => {
    describe('renders correctly', () => {
      let renderedNav
      beforeEach(() => {
        const inactiveNav = 
          <NavLink 
            linkRoute={inactiveLinkRoute}
            linkText={inactiveLinkText} 
            activeNavTab={activeLinkText}
          />
        renderedNav = shallow(inactiveNav)
      })
      // no need to re-test stuff that was tested with the active link
      test('component does not include active class', () => {
        expect(renderedNav.hasClass('active')).toBe(false)
      })
    })
  })

  describe('brand NavLink', () => {
    describe('renders correctly', () => {
      let renderedNav
      const linkDisplay = <span className="linkDisplay">Brand</span>
      beforeEach(() => {
        const brandNav = 
          <NavLink 
            linkRoute="/" 
            linkText={NO_TAB} 
            linkDisplay={linkDisplay}
            brand={true}
          />
        renderedNav = shallow(brandNav)
      })
      test('component includes a Link', () => {
        expect(renderedNav.find('Link').length).toBe(1)
      })
      test('expect link html to be display prop', () => {
        // If you try to look at the renderedNav.find('Link').html(), you get this error: 
        //     Invariant Violation: You should not use <Link> outside a <Router>

        const renderedLinkHtml = renderedNav.find('Link').find('.linkDisplay').html()
        const expectedLinkHtml = shallow(linkDisplay).html()
        expect(renderedLinkHtml).toBe(expectedLinkHtml)
      })
    })
    test('dispatch action upon click with the correct arg', () => {
      const setActiveNavTabMock = jest.fn()
      const brandNav = 
        <NavLink 
          linkRoute="/" 
          linkText={NO_TAB} 
          linkDisplay="<span>Brand</span>" 
          brand={true}
          setActiveNavTab={setActiveNavTabMock}
        />
      const renderedNav = shallow(brandNav)
      renderedNav.simulate('click')
      expect(setActiveNavTabMock).toHaveBeenCalledWith("")
    })
  })
})
