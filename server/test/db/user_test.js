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
 * Tests for the user db functions.
 * @module user_test
 */
const { expect } = require('chai')
const { initDB } = require('../utilities/db_reset')
const { userData } = require('../../db/seed/add_user')
const { User } = require('../../db/model/user_db')
const { Chart } = require('../../db/model/chart_db')
const { db } = require('../../db/db_connection.js')

const userGetterInputs = [
  { descString: 'User.getByEmail()', method: User.getByEmail, input: userData.email },
  { descString: 'User.getById()', method: User.getById, input: 1 },
]

userGetterInputs.forEach(function (testData) {
  describe(testData.descString, function () {
    let user
    before('Reset the DB and get the user', async function () {
      await initDB()
      user = await testData.method(testData.input)
    })
    it('should return a user object', function () {
      expect(user).to.be.an.instanceof(User)
    })
    it('should match the seeded firstName', function () {
      expect(user.firstName).to.equal(userData.firstName)
    })
    it('should match the seeded lastName', function () {
      expect(user.lastName).to.equal(userData.lastName)
    })
    it('should have a userId of 1', function () {
      expect(user.userId).to.equal(1)
    })
    it('should match the seeded password', function () {
      expect(user.checkPassword(userData.password)).to.equal(true)
    })
    it('should not match a random password string', function () {
      expect(user.checkPassword('a random password string')).to.equal(false)
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
  before('Reset the DB and get the user', async function () {
    await initDB()
    user = await User.getById(1)
  })
  userUpdateInputs.forEach(function (testData) {
    describe(testData.field, function () {
      before('Run the update', async function () {
        await user.update(testData.field, testData.value)
      })
      it(`has changed the ${testData.field} field in the db`, async function () {
        const u = await User.getById(1)
        expect(u[testData.field]).to.equal(testData.value)
      })
      it(`has changed the ${testData.field} property in the user obj`, function () {
        expect(user[testData.field]).to.equal(testData.value)
      })
      it('has not affected user authentication for db data', async function () {
        const u = await User.getById(1)
        expect(u.checkPassword(userData.password)).to.equal(true)
      })
      it('has not affected user authentication for user obj data', function () {
        expect(user.checkPassword(userData.password)).to.equal(true)
      })
    })
  })
})

describe('User.prototype.addChart() success', function () {
  let record
  let chart
  const permissions = 0
  const userId = 1
  before('Reset the DB and create a chart', async function () {
    await initDB()
    chart = new Chart('new chart')
    await chart.addToDb()
    const user = await User.getById(userId)
    await user.addChart(chart, permissions)
    record = await db.one('SELECT userId, chartId, permissions FROM usercharts WHERE userId = 1')
  })
  it('should add userId properly', function () {
    expect(record.userid).to.equal(userId)
  })
  it('should add chartId properly', function () {
    expect(record.chartid).to.equal(chart.chartId)
  })
  it('should add permissions properly', function () {
    expect(record.permissions).to.equal(permissions)
  })
})

describe('User.prototype.addChart() failures', function () {
  const failString = 'Chart not added to user.'
  beforeEach('Reset the DB', () => initDB())
  it('should fail if user does not have a userId', async () => {
    const chart = new Chart('new chart')
    const user = new User()
    await chart.addToDb()
    await user.addChart(chart)
      .catch(err => expect(err.message).to.contain(failString))
  })
  it('should fail if chart does not have a chartId', async () => {
    const chart = new Chart('new chart')
    const user = await User.getById(1)
    await user.addChart(chart)
      .catch(err => expect(err.message).to.contain(failString))
  })
})
