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
 * DB methods for the base model.
 * @module base_db
 */
const { db } = require('../db_connection')
const { logger } = require('../../utilities/log')
const { InstanceFactory } = require('./instance_factory')

/**
 * Get children of a particular type (e.g. get sections for a chart) and add
 * replace the appropriate property of the parent with a list of child objects
 * @param  {string} childClassName  string of the class of the child type (e.g. 'Section')
 * @param  {string} childType  singular 'type' for the child (e.g. 'section')
 * @param  {string} parentType singular 'type' for the parent (e.g. chart)
 * @param  {string} parentId   id of the parent in the db (e.g. 1)
 * @param  {string} orderBy    column to determine ordering of children (e.g. index)
 * @return {Promise}           Promise that resolves to array of children.
 *
 */
const getChildren = async function (childClassName, childType, parentType, parentId, orderBy) {
  const query = `
    SELECT *
    FROM ${childType}s
    WHERE ${parentType}Id = $1
    ORDER BY ${orderBy}`
  try {
    // clear current list of children
    const children = await db.any(query, parentId)
    // console.log('BABIES', children)
    // console.log('instance factory', InstanceFactory)
    return children.map((childData) => {
      // const newChild = InstanceFactory.getInstance(childClassName, childData)
      const newChild = childData
      newChild[`${childType}Id`] = childData[`${childType}id`]
      // console.log('BABE IS BORN', newChild)
      return newChild
    })
  } catch (e) {
    console.log('DROPPED THE BABIES!!!!')
    console.error(e)
    logger.crit(`Could not get ${childType}s for ${this}: ${e.toString()}`)
    return []
  }
}

module.exports = {
  getChildren,
}
