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
 * Tests for the database model.
 * @module db_test
 */
const { expect } = require('chai')
const { initDB } = require('../utilities/db_reset')
const { userData } = require('../../server/db/seed/add_user')
const { User } = require('../../shared/model/user.js')

const userGetterInputs = [
  { descString: 'User.getByEmail()', method: User.getByEmail, input: userData.email },
  { descString: 'User.getById()', method: User.getById, input: 1 },
]

userGetterInputs.forEach(function (testData) {
  describe(testData.descString, function () {
    let user
    before('Reset the DB and get the user', function () {
      return initDB()
        .then(function () { user = testData.method(testData.input) })
    })
    it('should return a user object', function () {
      return user
        .then(u => expect(u).to.be.an.instanceof(User))
    })
    it('should match the seeded firstName', function () {
      return user
        .then(u => expect(u.firstName).to.equal(userData.firstName))
    })
    it('should match the seeded lastName', function () {
      return user
        .then(u => expect(u.lastName).to.equal(userData.lastName))
    })
    it('should have a userId of 1', function () {
      return user
        .then(u => expect(u.userId).to.equal(1))
    })
    it('should match the seeded password', function () {
      return user
        .then(u => expect(u.checkPassword(userData.password)).to.equal(true))
    })
    it('should not match a random password string', function () {
      return user
        .then(u => expect(u.checkPassword('a random password string')).to.equal(false))
    })
  })
})

const userUpdateInputs = [
  { field: 'email', value: 'wakkawakka@wallawalla.com' },
  { field: 'firstName', value: 'Fozzie' },
  { field: 'lastName', value: 'Bear' },
]

describe('User.prototype.update()', function () {
  let user
  before('Reset the DB and get the user', function () {
    return initDB().then(function () {
      user = User.getById(1)
    })
  })
  userUpdateInputs.forEach(function (testData) {
    describe(testData.field, function () {
      before('Run the update', function () {
        return user.then(u => u.update(testData.field, testData.value))
      })
      it(`has changed the ${testData.field} field in the db`, function () {
        return User.getById(1).then(function (u) {
          expect(u[testData.field]).to.equal(testData.value)
        })
      })
      it(`has changed the ${testData.field} property in the user obj`, function () {
        return user.then(function (u) {
          expect(u[testData.field]).to.equal(testData.value)
        })
      })
      it('has not affected user authentication for db data', function () {
        return User.getById(1).then(function (u) {
          expect(u.checkPassword(userData.password)).to.equal(true)
        })
      })
      it('has not affected user authentication for user obj data', function () {
        return user.then(function (u) {
          expect(u.checkPassword(userData.password)).to.equal(true)
        })
      })
    })
  })
})
