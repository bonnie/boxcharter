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

/* Create loggers to use with the express server. */
/* winston express logging with winston log rotation */
/* References: 
 *     https://github.com/winstonjs/winston/blob/master/docs/transports.md#file-transport
 *     https://github.com/bithavoc/express-winston
 */

var winston = require('winston')
var expressWinston = require('express-winston')
var log = require('./log.js')

// express errors
const errorLogger = expressWinston.errorLogger({
    transports: [ 
        log.errorLogTransport
    ]
})

// express access
const accessLogger = expressWinston.logger({
    transports: [ 
        new winston.transports.File ({
            filename: `${log.logRoot}/access_log`,  
            colorize: false,
            timestamp: true,
            json: false,
            maxsize: '1024',
            maxFiles: 10,
            tailable: true,
            zippedArchive: true
        })
    ]
})

// general errors


module.exports = {
    errorLogger: errorLogger,
    accessLogger: accessLogger,
}