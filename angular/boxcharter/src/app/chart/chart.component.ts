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
  measureCells: Object[]; // for tracking when to show measure dropdown

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
  organizeMeasures() {
    // measures need to be pre-organized in order to split them into rows

    for (let sIndex=0; sIndex < this.chart.sections.length; sIndex++) {
      let section = this.chart.sections[sIndex];
      let rowWidth = section.measuresPerRow;
      let measureCount = section.measures.length;
      let rowCount = Math.ceil( measureCount / rowWidth);
      section.rows = [];
      for (let rIndex=0; rIndex < rowCount; rIndex++ ) {
        let row = new Array();
        for (let cIndex=0; cIndex < rowWidth; cIndex++) {
          let mIndex = (rIndex * rowWidth) + cIndex;
          if (mIndex >= measureCount) {
            break;
          }
          let measure = section.measures[mIndex];
          measure.index = mIndex;
          row.push(measure);
        }
        section.rows.push(row);
      }
    }
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
          this.measureCells = new Array(this.chart.sections.length).fill({});
          this.organizeMeasures();
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
            this.organizeMeasures();
            break;
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
    sect.measures = Array();
    this.chart.sections.splice(index, 0, sect);
    this.addMeasures(index, 20);
    this.organizeMeasures();
  }

  addMeasures(sectionIndex, newMeasureCount) {
    // add the desired number of measures to the desired section index
    let meas = new Measure();
    let measArray = Array(+newMeasureCount).fill(meas);
    this.chart.sections[sectionIndex].measures.push(...measArray);
    this.organizeMeasures();
  }

  addMeasureBefore(sectionIndex, measureIndex) {
    // add measure in the section sectionIndex, before the index measureIndex
    let meas = new Measure();
    this.chart.sections[sectionIndex].measures.splice(measureIndex, 0, meas);
    this.organizeMeasures();
  }

  deleteEmptyMeasures(sectionIndex) {
    // delete all empty measures from the end of a section

    let measures = this.chart.sections[sectionIndex].measures;

    while (measures.length > 0 && this.isEmpty(measures.slice(-1)[0])) {
      measures.splice(-1, 1)
    }
    this.organizeMeasures();
  }
  isEmpty(measure) {
    // return boolean indicating whether the measure is empty

    return Object.keys(measure.chords).length === 0 && 
           Object.keys(measure.lyrics).length === 0;
  }
}


