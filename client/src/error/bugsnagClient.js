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
 * ANY WARRANTY without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with BoxCharter. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * Code for bugsnag (http://www.bugsnag.com).
 * @module bugsnagClient
 */

import bugsnag from 'bugsnag-js';
import { BUGSNAG_KEY } from '../../config';

const client = bugsnag(BUGSNAG_KEY);

/**
 * adapted from https://github.com/bugsnag/bugsnag-react/blob/master/src/index.js
 * @function formatComponentStack
 * @param {string} str - Component stack to be formatted.
 * @returns {string} - Formatted component stack.
 */
const formatComponentStack = (str) => {
  const lines = str.split(/\s*\n\s*/g);
  let ret = '';
  for (let line = 0, len = lines.length; line < len; line += 1) {
    if (lines[line].length) ret += `${ret.length ? '\n' : ''}${lines[line]}`;
  }
  return ret;
};

/**
 * adapted from https://github.com/bugsnag/bugsnag-react/blob/master/src/index.js
 * uses global bugsnagClient defined above.
 * @function reportErrorToBugsnag
 * @param {Error} error - Error object to report.
 * @param {object} info - Error info object from React error boundary.
 * @param {string} info.componentStack - Component stack from error.
 * @returns {undefined}
 */
export const reportErrorToBugsnag = (error, info) => {
  const { BugsnagReport } = client;
  const handledState = { severity: 'error', unhandled: true, severityReason: { type: 'unhandledException' } };
  const report = new BugsnagReport(
    error.name,
    error.message,
    BugsnagReport.getStacktrace(error),
    handledState
  );
  const sendInfo = { ...info }; // to avoid mutating param
  if (sendInfo && sendInfo.componentStack) {
    sendInfo.componentStack = formatComponentStack(sendInfo.componentStack);
  }
  report.updateMetaData('react', sendInfo);
  client.notify(report);
};

export default client;
