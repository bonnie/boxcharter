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
import { Params }   from '@angular/router';

import { ChartService } from '../../services/chart.service';
import { StatusService } from '../../services/status.service';
import { DialogService } from '../../services/dialog.service';
import { AuthService } from '../../services/auth.service';

import { Measure, Section } from '../../model/data-model';
import { Status } from '../../model/status';
import { Chart } from '../../model/data-model';

const chartDataTurndowns: string[] = [
    'authors',
    'keys',
    'pdf',
    'dates',
    'sectionData']

@Component({
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],

  // don't put statusService here -- we want to use the global app statusService, not our own
  providers: [ DialogService ],
})
export class ChartComponent implements OnInit {

  status: Status;
  dirty: Boolean = false; // tracking whether chart has been edited since open / save
  expandChartData: Object = {}; // for tracking whether each tree is open or closed
  lyricistSame: boolean = false; // lyricist same as composer?
  measureCells: Object[]; // for tracking when to show measure dropdown

  constructor(
    // for getting chart data from flask
    private chartService: ChartService,
    private statusService: StatusService,
    public dialogService: DialogService,
    public authService: AuthService
 
  ) {  }

  ngOnInit() {
    // clear the status
    this.statusService.clearStatus();
    if (this.chartService.currentChart) {
      this.initChart();
    }
 }
  
  initChart() {
    // to be done whenever this.chartService.currentChart changes
    this.organizeMeasures();
    this.dirty = false;

    for (let turndown of chartDataTurndowns) {
      // expand for new chart; un-expand for existing chart
      this.expandChartData[turndown] = this.chartService.currentChart.chartId ? false : true;
    }
  }

  saveChart() {
    // save the chart and display a status alert

    if (this.chartService.currentChart.chartId) {
      // updating an existing chart
      this.chartService.updateChart()
            .then(response => {
              this.statusService.setStatus(response['status'] as Status);
              if (response['status']['type'] == 'success') {
                this.chartService.currentChart.modifiedAt = response['modifiedAt'];
                this.dirty = false;
              }
            });
    } else {
      // creating a new chart
        this.chartService.saveNewChart(this.authService.currentUser.userId)
            .then(response => {
              console.log(response);
              this.statusService.setStatus(response['status'] as Status);
              if (response['status']['type'] == 'success') {
                this.chartService.currentChart = response['data'] as Chart;
                this.initChart();
              }
            });
      }
  }

  organizeMeasures() {
    // measures need to be pre-organized in order to split them into rows

    this.measureCells = new Array(this.chartService.currentChart.sections.length).fill({});

    for (let sIndex=0; sIndex < this.chartService.currentChart.sections.length; sIndex++) {
      let section = this.chartService.currentChart.sections[sIndex];
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

  deleteElement(elementType: string, sectionIndex: number, measureIndex) {
    // delete element from chart (or chart itself if that's what's called for)

    switch(elementType) {
        case 'chart':
          this.chartService.currentChart = new Chart();
          // TODO: send delete event back to server
          break;
        case 'section':
            this.chartService.currentChart.sections.splice(sectionIndex, 1);
            break;
        case 'measure':
            this.chartService.currentChart.sections[sectionIndex].measures.splice(measureIndex, 1);
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
    this.chartService.currentChart.sections.splice(index, 0, sect);
    this.addMeasures(index, 20);
    this.organizeMeasures();
  }

  addMeasures(sectionIndex, newMeasureCount) {
    // add the desired number of measures to the desired section index
    let meas = new Measure();
    let measArray = Array(+newMeasureCount).fill(meas);
    this.chartService.currentChart.sections[sectionIndex].measures.push(...measArray);
    this.organizeMeasures();
  }

  addMeasureBefore(sectionIndex, measureIndex) {
    // add measure in the section sectionIndex, before the index measureIndex
    let meas = new Measure();
    this.chartService.currentChart.sections[sectionIndex].measures.splice(measureIndex, 0, meas);
    this.organizeMeasures();
  }

  deleteEmptyMeasures(sectionIndex) {
    // delete all empty measures from the end of a section

    let measures = this.chartService.currentChart.sections[sectionIndex].measures;

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

  canDeactivate(): Promise<boolean> | boolean {
    // if the page is "dirty", display warning dialog before allowing user to 
    // leave page

    if (this.dirty === false) {
      return true;
    } else {
      return this.dialogService.confirm('Discard changes?');
    } 
  }

  revertChart() {
    // revert chart to saved state
    this.chartService.loadChart(this.chartService.currentChart.chartId);
  }
}


