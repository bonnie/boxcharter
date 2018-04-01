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
 * Tests for the SignUp component
 * Draws heavily from https://github.com/tylercollier/redux-form-test
 * @module
 * SignUp-spec
 */

// from https://github.com/tylercollier/redux-form-test
// To test the entire component (integration tests), we're going to use Enzyme's `mount` method,
// which is the opposite of shallow rendering. To use `mount`, we need to have a DOM, so we use
// jsdom. You can alternatively run these tests in a browser to get a DOM, but that's more
// complicated to set up and usually slower.
// This setup needs to happen before React is loaded. See: http://stackoverflow.com/a/32996395/135101.
import jsdom from 'jsdom'
document = jsdom.jsdom('<!doctype html><html><body></body></html>')
window = document.defaultView
navigator = window.navigator

import React from 'react'
import { shallow } from 'enzyme'
import { SubmissionError } from 'redux-form'

import '../../jest/setupTests';
import { findWrapperNodeByTestId } from '../../jest/clientTestUtils';
import SignUp, { SignUp as SignUpComponent } from './SignUp';

describe('SignUp', () => {
  describe('SignUp Component rendering', () => {
    const handleSubmitMock = jest.fn();
    test('renders a form', () => {
      const props = {
        handleSubmit: handleSubmitMock,
      };
      const wrapper = shallow(<SignUpComponent {...props} />);
      expect(findWrapperNodeByTestId(wrapper, 'signup-form').length).toBe(1);
    });
    test('displays no error if there is no error', () => {
      const props = {
        handleSubmit: handleSubmitMock,
      };
      const wrapper = shallow(<SignUpComponent {...props} />);
      expect(findWrapperNodeByTestId(wrapper, 'error-alert').length).toBe(0);
    });
    test('displays an error if there is an error', () => {
      const props = {
        handleSubmit: handleSubmitMock,
        errorMessage: 'not good',
      };
      const wrapper = shallow(<SignUpComponent {...props} />);
      expect(findWrapperNodeByTestId(wrapper, 'error-alert').length).toBe(1);

    });
  });
  test('calls signUpUser on submit', () => {
    const handleSubmitMock = jest.fn();
    const props = {
      handleSubmit: handleSubmitMock,
    };
    const wrapper = shallow(<SignUpComponent {...props} />);
    const submitButton = findWrapperNodeByTestId(wrapper, 'signup-submit');

    submitButton.simulate('click')
    expect(handleSubmitMock.mock.calls.length).toBe(1)
  });
  //   test('throws a SubmissionError on error in the form submit handler', () => {
  //     // let promiseReturnedFromFormHandler
  //     const fields = {
  //       email: {
  //         value: '',
  //         touched: true,
  //         error: 'not good'
  //       }
  //     }

  //     const handleSubmitMock = jest.fn()

  //     // const handleSubmitMock = jest.fn((fn) => {
  //     //   return function() {
  //     //     promiseReturnedFromFormHandler = fn(arguments)
  //     //     console.log('************ promiseReturnedFromFormHandler:::', promiseReturnedFromFormHandler)
  //     //   }
  //     // })

  //     // const handleSubmitMock = jest.fn.mockImplementation(() => {
  //     //   return function() {
  //     //     // In this test, we know arguments will be empty because we
  //     //     // control it in our test when we simulate the submit, and
  //     //     // don't pass it any arguments. But it's just good practice to
  //     //     // pass them along.
  //     //     promiseReturnedFromFormHandler = fn(arguments)
  //     //   };
  //     // });

  //     const props = {
  //       handleSubmit: handleSubmitMock,
  //       fields,
  //     };
  //     const wrapper = shallow(<SignUpComponent {...props} />);
  //     // const submitButton = findWrapperNodeByTestId(wrapper, 'signup-submit');

  //     // submitButton.simulate('click')

  //     const promiseReturnedFromFormHandler = wrapper.simulate('submit', { email: 'you@you.com' })

  //     return promiseReturnedFromFormHandler.then(() => {
  //       throw new Error("Submission error should have been checked but wasn't")
  //     }).catch(error => {
  //       expect(error).toBeInstanceOf(SubmissionError)
  //     })

  //   })
  // })
})