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
import { Component, Input, OnInit, ApplicationRef } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Chart } from '../data-model';
import { ChartService } from '../chart.service';
import { StatusService } from '../status.service';
import { Measure, Section } from '../data-model';
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
    private location: Location,

    // for refreshing page on measuresPerRow change
    private applicationRef: ApplicationRef
  ) {  }

  ngOnInit() {
    // clear the status
    this.statusService.clearStatus();

    this.getChart();
  }
  
  saveChart() {
    // save the chart and display a status alert
    this.chartService.updateChart(this.chart)
          .then(response => {
            this.statusService.setStatus(response['status'] as Status);
            if (response['status']['type'] == 'success') {
              this.chart.modifiedAt = response['modifiedAt'];
            }
          });
  }
  redrawChart() {
    // when measuresPerRow is changed, the redraw is not clean. Race condition?
    // Anyway, redrawing chart to make sure things look okay. Not something 
    // likely to be changed often anyway.

    // setTimeout(this.applicationRef.tick, 100);
    // this doesn't work: throws ERROR TypeError: Cannot read property 'handleError' of undefined
    // at ApplicationRef_.tick (core.es5.js:5058)

  }

  getChart() {
    // for use if the user selects "revert to saved"

    // load the data
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

          // console.log(response['chart']);
          this.chart = response['chart'] as Chart;

        }
        (err) => {
          // this.statusService.displayError(err);
        }
    });
  }

  deleteElement(elementType: string, sectionIndex: number, measureIndex) {
    // delete element from chart (or chart itself if that's what's called for)

    switch(elementType) {
        case 'chart':
          this.chart = new Chart();
          // TODO: send delete event back to server
          break;
        case 'section':
            this.chart.sections.splice(sectionIndex, 1);
            break;
        case 'measure':
            this.chart.sections[sectionIndex].measures.splice(measureIndex, 1);
        default:
            console.log(`bad delete element: ${elementType}`);
    } 
  }

  addSection(index) {
    // add a new section at the specified position

    let sect = new Section();

    // new section defaults
    sect.beatsPerMeasure = 4;
    sect.verseCount = 1;
    sect.measuresPerRow = 4;
    let meas = new Measure();
    sect.measures = Array(20).fill(meas);

    console.log(sect);

    this.chart.sections.splice(index, 0, sect);

  }
}


