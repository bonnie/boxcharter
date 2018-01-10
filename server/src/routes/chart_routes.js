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

const express = require('express')
const { statusStrings, Status } = require('../../../shared/src/model/status')
const Chart = require('../model/db_chart')
const { logger } = require('../utilities/log')
const procError = require('../utilities/err')

// create the router
const router = express.Router();

/** ****************** */
/* GET chart */
/** ****************** */
router.get('/:chartId', function(req, res, next) {
  const chartId = req.params.chartId
  Chart.getById(chartId)
    .then((chart) => {
      res.json(chart)
    })
    .catch((err) => {
      res.status(400).json(`Could not get chart id ${chartId}`)
    })
})

/** ****************** */
/* POST create chart */
/** ****************** */
router.put('/create', function (req, res, next) {
  const chartData = req.body.chartData
  const userId = req.body.userId

  Chart.createChart(userId, chartData).then((response) => {
    console.log('response', response)
    res.status(200).json(response)
  })
})


module.exports = router;
