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

/* adapted from https://scotch.io/tutorials/mean-app-with-angular-2-and-the-angular-cli */

// Get dependencies
const path = require('path')
const http = require('http')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const router = require('./routes')

// logging
const expressLog = require('./utilities/express_log')

// intantiate app
const app = express();

// logging incoming requests for debugging
if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('combined'))
}

// CORS for react app
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}))

// Parser for POST data
app.use(bodyParser.json({ type: '*/*' }));

// access log: before routes
app.use(expressLog.accessLogger)

// Set our api routes
router(app)

// Catch all other routes and return not found
app.get('*', (req, res) => {
  res.status(404).json({"message": "Route not found"})
});

// error log: after routes
app.use(expressLog.errorLogger)

// Get port from environment and store in Express.
const port = process.env.PORT || '3090';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`Server running on localhost:${port}`));

module.exports = server