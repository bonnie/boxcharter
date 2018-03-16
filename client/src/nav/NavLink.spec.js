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
import { connect, Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import { shallowWithStore } from 'enzyme-redux' 
import { configureMockStore, createMockStore } from 'redux-test-utils'
import { MemoryRouter } from 'react-router-dom';
import '../../jest/setupTests'
import { findWrapperNodeByTestId } from '../../jest/clientTestUtils'
import { NO_TAB, SIGN_IN, SIGN_UP, SIGN_OUT, USER_PROFILE } from './tabNames'
import { NAV_TAB } from './navActionTypes'
import authReducer from './navReducer'
import { setActiveNavTab } from './navActions'
import { NavLink } from './NavLink'
import App from '../app/App'

// adapted from enzyme-redux
function mountWithStore(Component, store) {
  const context = { store }
  return (0, mount)(Component, { context })
};
// end adapted from enzyme-redux

describe('NavLink', () => {
  const activeLinkRoute = "/sign-in"
  const inactiveLinkRoute = "/sign-up"
  const activeLinkText = SIGN_IN
  const inactiveLinkText = SIGN_UP

  describe('active NavLink', () => {
    test('renders correctly', () => {
      const activeNav =
        <NavLink 
          linkRoute={activeLinkRoute}
          linkText={activeLinkText} 
          activeNavTab={activeLinkText}
        />
      const renderedNav = shallow(activeNav)
      expect(renderedNav).toMatchSnapshot()
    })
    // test('dispatch action upon click with the correct arg', () => {
    //   const setActiveNavTabMock = jest.fn()
    //   const inactiveNav = 
    //     <NavLink
    //       linkRoute=activeL
    //       linkText={activeLinkText} 
    //       activeNavTab={activeLinkText}
    //       setActiveNavTab={setActiveNavTabMock}
    //     />
    //   const renderedNav = shallow(inactiveNav)
    //   renderedNav.simulate('click')
    //   expect(setActiveNavTabMock).toHaveBeenCalledWith(linkText)
    // })
  })

  describe('inactive NavLink', () => {
    test('renders correctly', () => {
      const inactiveNav = 
        <NavLink 
          linkRoute={inactiveLinkRoute}
          linkText={inactiveLinkText} 
          activeNavTab={activeLinkText}
        />
      const renderedNav = shallow(inactiveNav)
      expect(renderedNav).toMatchSnapshot()
    })
    test('dispatch action upon click with the correct arg', () => {
      const setActiveNavTabMock = jest.fn()
      const inactiveNav = 
        <NavLink
          linkRoute={inactiveLinkRoute}
          linkText={inactiveLinkText} 
          activeNavTab={activeLinkText}
          setActiveNavTab={setActiveNavTabMock}
        />
      const renderedNav = shallow(inactiveNav)
      renderedNav.simulate('click')
      expect(setActiveNavTabMock).toHaveBeenCalledWith(inactiveLinkText)
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
  //   //   const navJSX = <NavLink linkRoute=activeL linkText={activeLinkText} />
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

  describe('Integration tests', () => {
    let store
    let dispatchSpy
    let wrapper
    let inactiveLinkNode
    const initialState = { activeNavTab: activeLinkText, auth: { authenticated: false } }
    beforeEach(() => {
      // initialState = { activeNavTab: activeLinkText };
      // ({ store, dispatchSpy } = setupIntegrationTest({ authReducer }, initialState))

      // const mockStore = configureMockStore([]);
      // const store = mockStore({initalState});
      // const wrapper = mount(
      //   <Provider store={store}>
      //     <App />
      //   </Provider>
      // );


      // const mapStateToProps = (state) => ({state})
      // const ConnectedApp = connect(mapStateToProps)(App)
      // const store = createMockStore(initialState)
      // const renderedNav = shallowWithStore(<ConnectedApp />, store)
      // wrapper = mount(
      //   <Provider store={store}>
      //     <ConnectedApp />
      //   </Provider>
      // )

      const mapStateToProps = (state) => ({state})
      const ConnectedNavLink = connect(mapStateToProps)(NavLink)
      const store = createMockStore(initialState)
      const component =  (
        <MemoryRouter>
              <ConnectedNavLink 
                            linkRoute={inactiveLinkRoute}
                            linkText={inactiveLinkText} 
                            activeNavTab={activeLinkText}
                          /> 
        </MemoryRouter>
      )
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[activeLinkRoute]}>
            <ConnectedNavLink 
              linkRoute={inactiveLinkRoute}
              linkText={inactiveLinkText} 
              activeNavTab={activeLinkText}
              setActiveNavTab={setActiveNavTab.bind(null, inactiveLinkText)}
            /> 
          </MemoryRouter>
        </Provider>
      )
    })
    describe('Inactive link click', () => {
      beforeEach(() => {
        // inactiveLinkNode = findWrapperNodeByTestId(wrapper, `navlink-${inactiveLinkText}`)
        console.log('state before', wrapper.instance().store.getState())
        // console.log('context', wrapper.instance().context)
        // console.log('children html', wrapper.children().html())


        // console.log('**************wrapper html before', wrapper.html())
        
        // const inactiveLinkNodeWrapper = wrapper.childAt(0)
        const inactiveLinkNodeWrapper = wrapper.find('Link')
        // const anchorElement = inactiveLinkNodeWrapper.getDOMNode()
        inactiveLinkNodeWrapper.simulate('click')
        // console.log('************ inactiveLinkNodeWrapper:::', inactiveLinkNodeWrapper.debug())

        inactiveLinkNodeWrapper.instance().forceUpdate()
        // inactiveLinkNodeWrapper.update()
        // console.log('inactivenodelinkWrapper debug after', inactiveLinkNodeWrapper.debug())
        console.log('state after', wrapper.instance().store.getState())
        // console.log('wrapper debug', wrapper.debug())
        // console.log('**************wrapper html after', wrapper.html())

      })
      test('clicking inactive NavLink turns the link active', () => {
        expect(wrapper.hasClass('active')).toBe(true)
      })
    })
  })
})