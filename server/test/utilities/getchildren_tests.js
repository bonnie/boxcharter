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
 * Utilities to test getting children of objects
 * @module getchildren_tests
 */
const { expect } = require('chai')
const { db } = require('../../src/model/utilities/db_connection')
const { instanceFactory } = require('../../src/model/utilities/instance_factory')
const { initDB } = require('../../../shared/test/utilities/db_reset')

const getChildrenSuccessTests = (testData) => {
  describe(`successful ${testData.parentType} prototype.getChildren() ${testData.childType} for ${testData.idQueryArgs}`, function () {
    let item
    before('Reset the DB, add chart, and get the children', async function () {
      await initDB()
      const parentId = await testData.idQueryFunc(...testData.idQueryArgs)
      const itemData = await db.one(`
        SELECT *
        FROM ${testData.parentType}s
        WHERE ${testData.parentType}Id = $1`, parentId[`${testData.parentType}id`])
      item = instanceFactory.getInstance(testData.parentClass, itemData)
      await item[testData.childFunc](testData.childClass, testData.childType,
        testData.parentType, testData.orderBy)
      if (testData.parentType === 'chart') console.log(item)
    })
    it(`should add ${testData.expectedChildCount} ${testData.childType}(s)`, function () {
      expect(item[`${testData.childType}s`].length).to.equal(testData.expectedChildCount)
    })
    it(`should add the first child as type ${testData.childClass.name}`, function () {
      if (item[`${testData.childType}s`].length > 0) {
        let testItem = item[`${testData.childType}s`][0]
        console.log('************ testItem:::', testItem)
        if (testData.childType === 'user') testItem = testItem.user
        expect(testItem).to.be.an.instanceof(testData.childClass)
      }
    })
  })
}

module.exports = {
  getChildrenSuccessTests,
}
