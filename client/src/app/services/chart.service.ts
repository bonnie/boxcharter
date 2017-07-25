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

import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Router }      from '@angular/router';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { StatusService } from './status.service';
import { ErrorService } from './error.service';

import { Chart } from '../model/chart';
import { Measure } from '../model/measure';
import { Status, statusStrings } from '../model/status';
import { APIserver } from '../app.component';

@Injectable()
export class ChartService {

  public currentChart: Chart = null;
  public measureCells: Object[]; // breaking cells into lines
  private baseURL = `${APIserver}/chart`;
  private jsonHeaders = new Headers(
    {'Content-Type': 'application/json'});

  constructor(private http: Http,
              private statusService: StatusService,
              public router: Router,
              private errorService: ErrorService
             ) { }

  loadChart(id: number): Promise<void> {
    // get an existing chart, and set currentChart to be this chart's data
    const url = `${this.baseURL}/${id}`;
    return this.http.get(url)
                    .toPromise()
                    .then(response => {
                      let status = new Status(response.json()['status']);
                      if (status.success()) {
                        this.currentChart = response.json()['chart'] as Chart;
                        this.organizeMeasures();
                        this.router.navigateByUrl('/chart');
                      } else {
                        this.statusService.setStatus(status);
                      }
                    })
                    .catch(err => this.errorService.handleError(err, this.statusService));
  }

  organizeMeasures() {
    // measures need to be pre-organized in order to split them into rows

    this.measureCells = new Array(this.currentChart.sections.length).fill({});

    for (let sIndex=0; sIndex < this.currentChart.sections.length; sIndex++) {
      let section = this.currentChart.sections[sIndex];
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

  updateChart(): Promise<Status> {
    // update the database with changes to a chart

    const url = `${this.baseURL}/${this.currentChart.chartId}`;

    return this.http
          .put(url, JSON.stringify(this.currentChart), {headers: this.jsonHeaders})
          .toPromise()
          .then(response => response.json())
          .catch(err => this.errorService.handleError(err, this.statusService));
  }

  createNewChart() {
    // create a new chart and display it for editing

    this.currentChart = new Chart();
    this.currentChart.chartId = null;
    this.currentChart.createdAt = moment().toDate();
    this.currentChart.sections = [];
    this.router.navigateByUrl('/chart');
  }

  saveNewChart(userId) {
    // save a brand new chart, and set currentChart to the new chart

    const url = `${APIserver}/chart/create`;
    const payload = {
      chartData: this.currentChart,
      userId: userId
    }

    return this.http
      .put(url, JSON.stringify(payload), {headers: this.jsonHeaders})
      .toPromise()
      .then(response => response.json())
      .catch(err => this.errorService.handleError(err, this.statusService));
  }

  clearChart() {
    // remove the saved chart from memory

    this.currentChart = null;
  }
}
