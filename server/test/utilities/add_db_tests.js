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
 * Utilities to test fields in the db.
 * @module fields
 */
const { expect } = require('chai')
const { db } = require('../../db/db_connection')
const { initDB } = require('./db_reset')

const makeItemQuery = itemType =>
  `SELECT * FROM  ${itemType}s WHERE ${itemType}Id=$1`

const addToDbSuccessTests = (type, items, fields, addItem) => {
  describe('successful addToDb()', function () {
    items.forEach(function (testData) {
      context(testData.descString, function () {
        let itemId
        let itemFromDb
        const item = testData.item
        before('Reset the DB and add the item', async function () {
          await initDB()
          itemId = await addItem(item)
          itemFromDb = await db.one(makeItemQuery(type), itemId)
        })
        it('should return a number itemId', function () {
          expect(itemId).to.be.a('number')
        })
        fields.forEach((field) => {
          it(`should set the ${field} in the db`, function () {
            const fromDb = itemFromDb[field.toLowerCase()]
            const fromItem = item[field]
            expect(fromDb).to.equal(fromItem)
          })
        })
      })
    })
  })
}

const addToDbFailTests = (itemType, items, prepare) => {
  describe('failure prototype.addToDb()', function () {
    items.forEach(function (testData) {
      context(testData.descString, function () {
        before('Reset the DB', async function () {
          await initDB()
          await prepare()
        })
        it(`should throw an error when ${testData.descString}`, function () {
          return testData.item.addToDb(...testData.args)
            .catch(err => expect(err.message.toLowerCase()).to.contain(`${itemType} not added`))
        })
      })
    })
  })
}

module.exports = {
  addToDbSuccessTests,
  addToDbFailTests,
}
