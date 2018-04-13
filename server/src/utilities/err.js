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

/* Handle express errors */

const { statusStrings, Status } = require('../../../shared/src/model/status');
const { logger } = require('../utilities/log');

const procError = function (error, msg) {
  let errString = msg;

  if (error) {
    errString += `: ${error.toString()}`;
    if (error.stack) {
      const secondLine = error.stack.split('\n')[1];
      if (error.toString() != error.secondLine) {
        errString += `\n\t${error.toString()}`;
      }
    }
  }

  logger.crit(`${msg}: ${error}`);
  const response = {
    status: new Status(
      statusStrings.danger,
      `${msg}. ${statusStrings.contactAdmin}`
    ),
  };
  return response;
};

module.exports = procError;
