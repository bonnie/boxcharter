import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import { mount } from 'enzyme'
import { createMemoryHistory } from 'history'
// import { createStore } from 'redux';
// import App from '../src/app/App'

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { ReactWrapper } from 'enzyme';
// import { routerStateReducer } from 'redux-router';

// import * as generate from 'til-shared/generate'

// adapted from Kent Dodds's testing workshop repo
// https://github.com/kentcdodds/testing-workshop/blob/master/client/test/client-test-utils.js
function mountWithRouter(ui, {route = '/'} = {}) {
  const history = createMemoryHistory({initialEntries: [route]})
  const wrapper = mount(<Router history={history}>{ui}</Router>)
  return {
    history,
    wrapper,
    findNodes: findNodes.bind(null, wrapper),
    findNodeByTestId: findWrapperNodeByTestId.bind(null, wrapper),
  }
}

function sel(id) {
  return `[data-test="${id}"]`
}

function findNodes(wrapper, query) {
  // return wrapper.find(query).hostNodes()
  return wrapper.find(query)
}
/** end Kent dodds */

// this returns a new promise and is just a simple way to
// wait until the next tick so resolved promises chains will continue
function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve))
}

function findWrapperNodeByTestId(wrapper, id) {
  return findNodes(wrapper, sel(id))
}

// END: Kent Dodds helper functions

// adapted from 
// https://hackernoon.com/low-effort-high-value-integration-tests-in-redux-apps-d3a590bd9fd5
// function renderAppWithState(state) {
//   const store = createStore(state)
//   const wrapper = mount(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   )
//   return [store, wrapper]
// }


// adapted from 
// https://medium.freecodecamp.org/real-integration-tests-with-react-redux-and-react-router-417125212638
/* Sets up basic variables to be used by integration tests
 * Params:
 *   reducers: should be an object with all the reducers your page uses
 *   initialRouterState: an optional object to set as the initial state for the router
 * Returns:
 *   an object with the following attributes:
 *     store: the reducer store which contains the main dispatcher and the state
 *     dispatchSpy: a jest spy function to be used on assertions of dispatch action calls
 */
// export function setupIntegrationTest(reducers, initialState = {}) {

//   /******* outdated, no longer necessary...? */
//   // // creating the router's reducer
//   // function routerReducer(state = initialRouterState, action) {
//   //   // override the initial state of the router so it can be used in test.
//   //   return routerStateReducer(state, action);
//   // }
//   /********** end: outdated, no longer necessary? */

//   // creating a jest mock function to serve as a dispatch spy for asserting dispatch actions if needed
//   const dispatchSpy = jest.fn(() => ({})); 
//   const reducerSpy = (state, action) => dispatchSpy(action);
//   // applying thunk middleware to the the store
//   const emptyStore = applyMiddleware(thunk)(createStore);
//   const combinedReducers = combineReducers({
//     reducerSpy,
//     router: routerReducer,
//     ...reducers,
//   });
//   // creating the store
//   const store = emptyStore(combinedReducers);

//   return { store, dispatchSpy };
// }

export {
  mountWithRouter,
  findWrapperNodeByTestId,
  sel,
  flushAllPromises,
  findNodes,
  // generate,
}
