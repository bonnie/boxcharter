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

import { StatusService } from './status.service'
import { ErrorService } from './error.service'

import { Chart } from '../model/data-model';
import { Status } from '../model/status'
import { flaskServer } from '../app.component'

@Injectable()
export class ChartService {

  public currentChart: Chart = null;
  private baseURL = `${flaskServer}/chart`;
  private jsonHeaders = new Headers(
    {'Content-Type': 'application/json'});

  constructor(private http: Http,
              private statusService: StatusService,
              public router: Router,
              private errorService: ErrorService) { }

  loadChart(id: number): Promise<void> {
    // get an existing chart, and set currentChart to be this chart's data
    const url = `${this.baseURL}/${id}`;
    return this.http.get(url)
                    .toPromise()
                    .then(response => {
                      let status = response.json()['status'];
                      if (status['type'] == 'success') {
                        this.currentChart = response.json()['chart'] as Chart;
                        this.router.navigateByUrl('/chart');
                      } else {
                        this.statusService.setStatus(status);
                      }
                    })
                    .catch(err => this.errorService.handleError(err, this.statusService));
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
    this.currentChart.sections = [];
    this.router.navigateByUrl('/chart');
  }

  saveNewChart(chart: Chart) {
    // save a brand new chart, and set currentChart to the new chart
  }

  clearChart() {
    // remove the saved chart from memory

    this.currentChart = null;
  }
}

