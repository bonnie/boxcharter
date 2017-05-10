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

import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Chart } from '../data-model';
import { ChartService } from '../chart.service';
import { Measure } from '../data-model';

@Component({
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [ ChartService ],
})
export class ChartComponent implements OnInit {
  
  // chart object for this page
  chart: Chart;

  // information about success or failure
  message: object;

  // alert vars
  clrAlertClosed: boolean;
  alertType: string;

  constructor(
    // for getting chart data from flask
    private chartService: ChartService,

    // for getting chart ID from url
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params

      // get chart ID from url and pass it to the chart service getChart method
      .switchMap((params: Params) => this.chartService.getChart(+params['id']))

      // bind the response to the chart object for this page
      .subscribe(chart => {

        // get chart data    
        this.chart = chart;
      
        console.log(this.chart);

    });
  }
  
  saveChart() {
    console.log(this.chart);

    this.chartService.updateChart(this.chart)
          .then(response => {
            console.log(response);
            this.message = response['message'];

            // set alert class
            this.alertType = 'alert-' + this.message['type'];
          });
  }

  onAlertClose() {
    
    // reset message
    this.message = null;

    // reset alert closed state
    this.clrAlertClosed = false;

  }
}


