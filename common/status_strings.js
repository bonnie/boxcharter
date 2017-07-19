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

/* for status consistency from express to angular */

const adminEmail = 'admin@boxcharter.com'
const contactAdmin = `Please report this error to ${adminEmail}`

const statusStrings = {
    success: 'success',
    warning: 'warning',
    danger: 'danger',
    contactAdmin: contactAdmin, 
    badRequest: `The server did not understand this request. ${contactAdmin}`
}

module.exports = { statusStrings: statusStrings }