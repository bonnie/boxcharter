// adapted from Kent Dodds's testing workshop repo
// https://github.com/kentcdodds/testing-workshop/blob/master/client/test/client-test-utils.js

import React from 'react'
import {Router} from 'react-router-dom'
import {mount} from 'enzyme'
import {createMemoryHistory} from 'history'
import * as generate from 'til-shared/generate'

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
  return wrapper.find(query).hostNodes()
}

// this returns a new promise and is just a simple way to
// wait until the next tick so resolved promises chains will continue
function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve))
}

function findWrapperNodeByTestId(wrapper, id) {
  return findNodes(wrapper, sel(id))
}

export {
  mountWithRouter,
  findWrapperNodeByTestId,
  sel,
  flushAllPromises,
  findNodes,
  generate,
}
