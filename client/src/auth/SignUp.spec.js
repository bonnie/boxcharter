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
 * @module
 * SignUp-spec
 */

// NOTE: see https://github.com/tylercollier/redux-form-test for more detailed
// test possibilities
// Most of his tests seemed to be testing whether react-form was working properly,
// and seemed unnecessary

// TODO: however, it might be a good idea to test that our form validation
// config is doing what we want...

import React from 'react';
import { shallow } from 'enzyme';

import '../../jest/setupTests';
import { checkProps } from '../../jest/utils';
import { findWrapperNodeByTestId } from '../../jest/clientTestUtils';
import { SignUpComponent } from './SignUp';
import { ClarityButton } from '../clarity';

const defaultProps = {
  loading: false,
  setAuthError: () => {},
  setActiveNavTab: () => {},
  signUpUser: () => {},
  handleSubmit: () => {},
};

describe('SignUp', () => {
  const handleSubmitMock = jest.fn();
  describe('SignUp Component non-error rendering', () => {
    let wrapper;
    beforeEach(() => {
      handleSubmitMock.mockClear();
      const props = {
        ...defaultProps,
        handleSubmit: handleSubmitMock,
      };
      wrapper = shallow(<SignUpComponent {...props} />);
    });
    test('renders a form', () => {
      expect(findWrapperNodeByTestId(wrapper, 'signup-form')).toHaveLength(1);
    });
    test('renders the correct fields', () => {
      const renderedFields = wrapper.find('Field').map(field => field.prop('name'));
      expect(renderedFields).toEqual(['email', 'password', 'passwordConfirm']);
    });
    test('displays no error if there is no error', () => {
      expect(findWrapperNodeByTestId(wrapper, 'alert')).toHaveLength(0);
    });
  });
  describe('SignUp Component error rendering', () => {
    test('displays an error if there is an error', () => {
      handleSubmitMock.mockClear();
      const props = {
        ...defaultProps,
        handleSubmit: handleSubmitMock,
        errorMessage: 'not good',
      };
      const wrapper = shallow(<SignUpComponent {...props} />);
      expect(findWrapperNodeByTestId(wrapper, 'alert')).toHaveLength(1);
    });
  });
  describe('SignUp component functionality', () => {
    test('calls signUpUser on submit', () => {
      handleSubmitMock.mockClear();
      const props = {
        ...defaultProps,
        handleSubmit: handleSubmitMock,
      };
      const wrapper = shallow(<SignUpComponent {...props} />);
      const ClarityButtonNode = wrapper.find(ClarityButton).dive();
      const submitButton = findWrapperNodeByTestId(ClarityButtonNode, 'signup-submit');

      submitButton.simulate('click');
      expect(handleSubmitMock.mock.calls.length).toBe(1);
    });
  });
  describe('propTypes', () => {
    const propError = checkProps(SignUpComponent, defaultProps);
    expect(propError).toBeUndefined();
  });
});

// / NOTE: can't get the below to work (modeling on mocha example here:
// https://github.com/tylercollier/redux-form-test)
// decided (conveniently?) that this is testing the inner workings
// of redux-form and can be omitted ;-)
// possibility: use mockReturnThis...?

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
