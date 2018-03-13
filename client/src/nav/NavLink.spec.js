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
import { connect } from 'react-redux'
import { shallow } from 'enzyme'
import { shallowWithStore } from 'enzyme-redux'
import { createMockStore } from 'redux-test-utils'
import '../../jest/setupTests'
import { NO_TAB, SIGN_IN, SIGN_UP, SIGN_OUT, USER_PROFILE } from './tabNames'
import { NAV_TAB } from './navActionTypes'
import { NavLink } from './NavLink'

describe('NavLink', () => {
  const linkRoute = "/sign-in"
  const linkText = SIGN_IN

  describe('active NavLink', () => {
    test('renders correctly', () => {
      const activeNav =
        <NavLink 
          linkRoute={linkRoute}
          linkText={linkText} 
          activeNavTab={linkText}
        />
      const renderedNav = shallow(activeNav)
      expect(renderedNav).toMatchSnapshot()
    })
    test('dispatch action upon click with the correct arg', () => {
      const setActiveNavTabMock = jest.fn()
      const inactiveNav = 
        <NavLink
          linkRoute={linkRoute}
          linkText={linkText} 
          activeNavTab={linkText}
          setActiveNavTab={setActiveNavTabMock}
        />
      const renderedNav = shallow(inactiveNav)
      renderedNav.simulate('click')
      expect(setActiveNavTabMock).toHaveBeenCalledWith(linkText)
    })
  })

  describe('inactive NavLink', () => {
    test('renders correctly', () => {
      const inactiveNav = 
        <NavLink 
          linkRoute={linkRoute}
          linkText={linkText} 
          activeNavTab={SIGN_UP}
        />
      const renderedNav = shallow(inactiveNav)
      expect(renderedNav).toMatchSnapshot()
    })
    test('dispatch action upon click with the correct arg', () => {
      const setActiveNavTabMock = jest.fn()
      const inactiveNav = 
        <NavLink
          linkRoute={linkRoute}
          linkText={linkText} 
          activeNavTab={SIGN_UP}
          setActiveNavTab={setActiveNavTabMock}
        />
      const renderedNav = shallow(inactiveNav)
      renderedNav.simulate('click')
      expect(setActiveNavTabMock).toHaveBeenCalledWith(linkText)
    })
  })

  describe('brand NavLink', () => {
    test('renders correctly', () => {
      const brandNav = 
        <NavLink 
          linkRoute="/"
          brand={true}
          activeNavTab={SIGN_UP}
        />
      const renderedNav = shallow(brandNav)
      expect(renderedNav).toMatchSnapshot()
    })
    test('dispatch action upon click with the correct arg', () => {
      const setActiveNavTabMock = jest.fn()
      const brandNav = 
        <NavLink
          linkRoute="/"
          linkText={NO_TAB}
          brand={true}
          activeNavTab={SIGN_UP}
          setActiveNavTab={setActiveNavTabMock}
        />
      const renderedNav = shallow(brandNav)
      renderedNav.simulate('click')
      expect(setActiveNavTabMock).toHaveBeenCalledWith(NO_TAB)
    })
  })
  
  // test('clicking inactive NavLink turns the link active', () => {
  //   const inactiveState = { activeNavTab: SIGN_UP }
  //   const mapStateToProps = (state) => ({state})
  //   const ConnectedNavLink = connect(mapStateToProps)(NavLink)
  //   const store = createMockStore(inactiveState)
  //   const renderedNav = shallowWithStore(<ConnectedNavLink />, store)

  //   console.log('before click', renderedNav.props())
  //   renderedNav.simulate('click')

  //   // should only need .update() here
  //   // workaround courtesy of https://github.com/airbnb/enzyme/issues/1229
  //   renderedNav.instance().forceUpdate()
  //   renderedNav.update()

  //   console.log('after click', renderedNav.props())
  //   expect(renderedNav.props().state.activeNavTab).toEqual(linkText)

  //   // console.log('store', store)

  //   // expect(store.isActionDispatched({
  //   //   type: NAV_TAB,
  //   //   payload: linkText,
  //   // })).toBe(true)
  // })
  // })
  // test('renders correctly', () => {
  //   expect(renderedNav).toMatchSnapshot()
  // })
  // describe('after click', () => {
  //   // beforeEach(() => {
  //   //   const navJSX = <NavLink linkRoute={linkRoute} linkText={linkText} />
  //   //   renderedNav = shallow(navJSX)
  //   //   renderedNav.simulate('click')
  //   // })
  //   test('links correctly when clicked', () => {
  //     console.log('renderedNavAfterClick', renderedNav)
  //   })
  //   test('becomes active when clicked', () => {
  //     // expect(renderedNav).toMatchSnapshot()
  //   })
  //   test('becomes inactive when another tab is clicked', () => {
  
  //   })
  // })
})