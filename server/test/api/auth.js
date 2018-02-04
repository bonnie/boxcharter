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
 * Tests for the auth API
 * @module
 * auth
 */

const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../src/app')
const { sendCredentials } = require('../utilities/auth_api')
const { userData } = require('../../../shared/test/utilities/test_data/add_user')
const { initDB } = require('../../../shared/test/utilities/db_reset')

chai.use(chaiHttp)

describe('Token generation at account creation', () => {
  const email = 'testy@test.com'
  const password = 'test123'
  let authResponse
  beforeEach('Init DB and create account', () => {
    return initDB()
    .then(() => sendCredentials('sign-up', email, password))
    .then(res => { authResponse = res })
  })
  it('should result in status of 200', () => {
    console.log('res.status', authResponse.status)
    expect(authResponse.status).to.equal(200)
  })
  it('should return a token for new user', () => {
    expect(authResponse.body).to.have.property('token')
  })
  it('should return a non-zero length token for the new user', () => {
    expect(authResponse.body.token.length).to.be.greaterThan(0)
  })
  describe('should not allow the an account to be created with duplicate email', () => {
    let duplicateAccountResponse
    beforeEach('create account with duplicate email', () => {
      // workaround for error response adapted from
      // https://github.com/chaijs/chai-http/issues/75
      return sendCredentials('sign-up', email, password)
      .catch(err => err.response)
      .then(res => { duplicateAccountResponse = res })
    })
    it('should return status 422', () => {
      expect(duplicateAccountResponse.status).to.equal(422)
    })
    it('should return error message', () => {
      expect(duplicateAccountResponse.body).to.have.property('error')
    })
    it('should return the correct error message', () => {
      expect(duplicateAccountResponse.body.error).to.equal('Email is in use')
    })
  })
  // it('should allow access to protected route', () => {
  //   let protectedRouteResponse
  //   beforeEach('access a protected route', () => {
  //     const { id } = userData
  //     return chai.request(app)
  //       .get('/api/users/1')
  //       .end((err, res) => {
  //         if (err) throw err
  //         protectedRouteResponse = res
  //       })
  //   })
  //   it('should return success status for protected route', () => {
  //     expect(protectedRouteResponse.status).to.equal(200)
  //   })
  // })
})

// describe('Log in', () => {
//   let res
//   beforeEach('Init DB and log in', () => {
//     const { email, password } = userData
//     return initDB()
//       .then(() => sendCredentials('sign-in', email, password))
//       .then(generatedToken => { token = generatedToken })
//   })

//   describe('Token generation at login for existing account', () => {

//   })

//   describe('Protected routes with token', () => {

//   })
// })


  
describe('Invalid logins', () => {

})

describe('Protected routes without token', () => {

})