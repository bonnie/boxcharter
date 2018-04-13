/*
 * Copyright (c) 2017 Bonnie Schulkin. All Rights Reserved.
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
 * Tests for the App component
 *  Including integration tests for the application as a whole
 * @module
 * App-spec
 */


// import React from 'react';
// import { shallow } from 'enzyme';
// import App from './App';

// from https://github.com/jacek-rzrz/react-integration-tests-enzyme/blob/master/src/shopping_list/shoppingListMiddleware.test.js
// import mockStore from 'redux-mock-store';
// import { asyncFlush, mockApi } from '../../jest/testSupport';
// import { push } from 'react-router-redux';
// import { locationChange } from '../../jest/utils/locationChange';
// end: from


describe('App', () => {
  test('renders', () => {
  });
});

describe('App integration', () => {
  // let wrapper;
  beforeEach(() => {
    // wrapper = mount(<App />);
  });
  describe('store', () => {

  });
  describe('router', () => {

  });
});


// import { renderComponent , expect } from '../test_helper'

// describe('App' , () => {
//   let component

//   beforeEach(() => {
//     component = renderComponent(App)
//   })

//   it('renders something', () => {
//     expect(component).to.exist
//   })
// })


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

// describe('Integration tests', () => {
//   let store
//   let dispatchSpy
//   let wrapper
//   let inactiveLinkNode
//   const initialState = { nav: { activeNavTab: activeLinkText }, auth: { authenticated: false } }
//   beforeEach(() => {
//     // initialState = { activeNavTab: activeLinkText };
//     // ({ store, dispatchSpy } = setupIntegrationTest({ authReducer }, initialState))

//     // const mockStore = configureMockStore([]);
//     // const store = mockStore({initalState});
//     // const wrapper = mount(
//     //   <Provider store={store}>
//     //     <App />
//     //   </Provider>
//     // );


//     // const mapStateToProps = (state) => ({state})
//     // const ConnectedApp = connect(mapStateToProps)(App)
//     // const store = createMockStore(initialState)
//     // const renderedNav = shallowWithStore(<ConnectedApp />, store)
//     // wrapper = mount(
//     //   <Provider store={store}>
//     //     <ConnectedApp />
//     //   </Provider>
//     // )

//     const mapStateToProps = (state) => ({state})
//     const ConnectedNavLink = connect(mapStateToProps, { setActiveNavTab })(NavLink)
//     const store = configureMockStore(initialState)
//     // const component =  (
//     //   <MemoryRouter>
//     //         <ConnectedNavLink
//     //                       linkRoute={inactiveLinkRoute}
//     //                       linkText={inactiveLinkText}
//     //                       activeNavTab={activeLinkText}
//     //                     />
//     //   </MemoryRouter>
//     // )
//     wrapper = mount(
//       <Provider store={store}>
//         <MemoryRouter initialEntries={[activeLinkRoute]}>
//           <ConnectedNavLink
//             linkRoute={inactiveLinkRoute}
//             linkText={inactiveLinkText}
//           />
//         </MemoryRouter>
//       </Provider>
//     )
//   })
//   describe('Inactive link click', () => {
//     beforeEach(() => {
//       // inactiveLinkNode = findWrapperNodeByTestId(wrapper, `navlink-${inactiveLinkText}`)
//       console.log('state before', wrapper.instance().store.getState())
//       // console.log('context', wrapper.instance().context)
//       // console.log('children html', wrapper.children().html())

//       // const memRouter = wrapper.find('MemoryRouter')
//       // console.log('*****MemoryRouter props before', memRouter.props())

//       // console.log('**************wrapper html before', wrapper.html())

//       // from https://github.com/ReactTraining/react-router/blob/v4.0.0-alpha.6/modules/__tests__/integration-test.js
//       const leftClickEvent = {
//         defaultPrevented: false,
//         preventDefault() { this.defaultPrevented = true },
//         metaKey: null,
//         altKey: null,
//         ctrlKey: null,
//         shiftKey: null,
//         button: 0
//       }

//       // const inactiveLinkNodeWrapper = wrapper.childAt(0)
//       const inactiveLinkNodeWrapper = wrapper.find('NavLink')

//       // { className: 'nav-link nav-text ',
//       //   onClick: [Function: bound clickHandler],
//       //   to: '/sign-up',
//       //   'data-test': 'navlink-Sign Up',
//       //   children: 'Sign Up',
//       //   replace: false }

//       const anchorElement = wrapper.find('a')
//       inactiveLinkNodeWrapper.simulate('click', leftClickEvent)
//       // console.log('************ inactiveLinkNodeWrapper:::', inactiveLinkNodeWrapper.debug())

//       wrapper.instance().forceUpdate()
//       wrapper.update()
//       // console.log('inactivenodelinkWrapper debug after', inactiveLinkNodeWrapper.debug())
//       console.log('state after', wrapper.instance().store.getState())
//       console.log('**************inactivelink props after', inactiveLinkNodeWrapper.props())
//       // console.log('*****MemoryRouter props after', memRouter.props())
//       // console.log('wrapper debug', wrapper.debug())
//       // console.log('**************wrapper html after', wrapper.html())

//     })
//     test('clicking inactive NavLink turns the link active', () => {
//       expect(wrapper.hasClass('active')).toBe(true)
//     })
//   })
// })
