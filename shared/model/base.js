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
 * Base class for model classes.
 * @module base
 */

/**
 * Base object
 * @class
 */
class Base {
  /**
   * Constructor, to be inherited by other clases
   * @param {object} data - Object containing data for new class instance.
   * @param {array} fields  Fields for the object in question (keys in the 'data' object).
   *                        The constructor checks for both lower case and
   *                        camel case key names, since pg-promise returns
   *                        lower-case, but the programmer prefers camel case
   *
   */
  constructor(data, fields) {
    let value
    for (const field of fields) {
      // assign non-null / non-undefined values
      value = data[field] || data[field.toLowerCase()]

      // sadly, 0 and '' are non-null, but also 'falsy'
      if (data[field] === 0 || data[field.toLowerCase()] === 0) value = 0
      if (data[field] === '' || data[field.toLowerCase()] === '') value = ''
      if (value || value === 0 || value === '') this[field] = value
    }
  }
}

module.exports = {
  Base,
}
