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

import { Status } from '../../../../../common/model/status';
import { Section } from '../../model/section';
import { Measure } from '../../model/measure';
import { Chart } from '../../model/chart';
import { Key } from '../../model/note-key';

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

  // for showing user charts
  userCharts: Object[];
  userChartTotal: number;

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
    this.dirty = false;

    for (let turndown of chartDataTurndowns) {
      // expand for new chart; un-expand for existing chart
      this.expandChartData[turndown] = this.chartService.currentChart.chartId ? false : true;
    }

    this.updateUserCharts();
  }

  updateUserCharts() {
    // update user chart data for chart switch dropdown

    // update user chart data
    this.userChartTotal = this.authService.currentUser.charts.length;

    // get the charts in "last modified" order
    // TODO: figure this out with new model format
    let userChartsInModifiedOrder = this.authService.currentUser.charts
    // let userChartsInModifiedOrder
      // this.authService.currentUser.charts.sort((a, b) => { return a.modifiedAt - b.modifiedAt });
    this.userCharts = userChartsInModifiedOrder.slice(0, 5);

    // remove the current chart
    for (let i=0;i < this.userCharts.length; i++) {
      if (this.userCharts[i]['chartId'] === this.chartService.currentChart['chartId']) {
        this.userCharts.splice(i, 1);
        break;
      }
    }
  }

  loadChart(chartId: number) {
    // load a new chart selected from the drop-down

    this.chartService.loadChart(chartId)
      .then(result => this.initChart());

  }

  newChart() {
    // create and load a new chart
    this.chartService.createNewChart();
    this.initChart();
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
                let newChart = response['data'] as Chart;
                this.authService.currentUser.charts.push(newChart)
                this.chartService.currentChart = newChart;
                this.initChart();
              }
            });
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
            this.chartService.organizeMeasures();
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
    this.chartService.organizeMeasures();
  }

  addMeasures(sectionIndex, newMeasureCount) {
    // add the desired number of measures to the desired section index
    let meas = new Measure();
    let measArray = Array(+newMeasureCount).fill(meas);
    this.chartService.currentChart.sections[sectionIndex].measures.push(...measArray);
    this.chartService.organizeMeasures();
  }

  addMeasureBefore(sectionIndex, measureIndex) {
    // add measure in the section sectionIndex, before the index measureIndex
    let meas = new Measure();
    this.chartService.currentChart.sections[sectionIndex].measures.splice(measureIndex, 0, meas);
    this.chartService.organizeMeasures();
  }

  deleteEmptyMeasures(sectionIndex) {
    // delete all empty measures from the end of a section

    let measures = this.chartService.currentChart.sections[sectionIndex].measures;

    while (measures.length > 0 && this.isEmpty(measures.slice(-1)[0])) {
      measures.splice(-1, 1)
    }
    this.chartService.organizeMeasures();
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
