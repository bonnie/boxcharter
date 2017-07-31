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

var express = require('express');
var statusStrings = require('../model/status').statusStrings
var Status = require('../model/status').Status
var Chart = require('../model/chart')
var logger = require('../utilities/log').logger
var procError = require('../utilities/err')

// create the router
var router = express.Router();

/*********************/
/* POST create chart */
/*********************/
router.put('/create', function(req, res, next) {

  const chartData = req.body.chartData
  const userId = req.body.userId

  const response = Chart.createChart(userId, chartData)
  res.status(200).json(response)
})


module.exports = router;
