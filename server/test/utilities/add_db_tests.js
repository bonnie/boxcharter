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

/**
 * Create a query to select an item from the database by ID
 * @param  {string} itemType type of item to add (table name without the 's')
 * @return {string}          query string to get the item by ID, with a placeholder for the ID
 */
const getItemById = itemType =>
  `SELECT * FROM  ${itemType}s WHERE ${itemType}Id=$1`

/**
 * Run tests for successful adding of item to db, including field value tests
 * @param {string} type    type of item to add (table name without the 's')
 * @param {Array} items    Array of items to add, with 'descString' and 'item' keys
 *                         The 'item' value should be an instance of the class in question
 * @param {Array} fields   Array of item fields to test
 * @param {function} addItem Function to add the item to the db
 * @returns {undefined}
 */
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
          itemFromDb = await db.one(getItemById(type), itemId)
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

/**
 * Run tests when addToDb is expected to fail
 * @param {string} type    type of item to add (table name without the 's')
 * @param {Array} items    Array of items to add, with 'descString' and 'item' keys
 *                         The 'item' value should be an instance of the class in question
 * @param {function} prepare  function to run *before* adding item to db
 * @returns {undefined}
 */
const addToDbFailTests = (type, items, prepare) => {
  describe('failure prototype.addToDb()', function () {
    items.forEach(function (testData) {
      context(testData.descString, function () {
        before('Reset the DB', async function () {
          await initDB()
          await prepare()
        })
        it(`should throw an error when ${testData.descString}`, function () {
          return testData.item.addToDb(...testData.args)
            .catch(err => expect(err.message.toLowerCase()).to.contain(`${type} not added`))
        })
      })
    })
  })
}

module.exports = {
  addToDbSuccessTests,
  addToDbFailTests,
}
