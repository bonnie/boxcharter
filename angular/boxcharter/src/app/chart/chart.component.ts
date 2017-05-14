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
import { StatusService } from '../status.service';
import { Measure } from '../data-model';
import { Status } from '../status';

@Component({
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],

  // don't put statusService here -- we want to use the global app statusService, not our own
  providers: [ ChartService ],
})
export class ChartComponent implements OnInit {
  
  chart: Chart;
  status: Status;
  lyricistSame: boolean = false; // lyricist same as composer?

  constructor(
    // for getting chart data from flask
    private chartService: ChartService,
    private statusService: StatusService,

    // for getting chart ID from url
    private route: ActivatedRoute,
    private location: Location
  ) {  }

  ngOnInit() {
    this.route.params

      // get chart ID from url and pass it to the chart service getChart method
      .switchMap((params: Params) => this.chartService.getChart(+params['id']))

      // bind the response to the chart object for this page
      .subscribe(
        (response) => {

        if (response['status']['type'] != 'success') {
          this.statusService.setStatus(response['status']); 
        } else {
          // get chart data    
          this.chart = response['chart'];

          // console.log(this.chart);
        }
        (err) => {
          // this.statusService.displayError(err);
        }
    });
  }
  
  saveChart() {
    // save the chart and display a status alert
    this.chartService.updateChart(this.chart)
          .then(response => {
            this.statusService.setStatus(response['status'] as Status);
            if (response['status']['type'] == 'success') {
              this.chart.basicData['modifiedAt'] = response['modifiedAt'];
            }
          });
  }
}


