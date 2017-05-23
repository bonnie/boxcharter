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
import 'rxjs/add/operator/toPromise';
import { Chart } from './data-model';
import { Status } from './status'
import { flaskServer } from './app.component'
import { StatusService } from './status.service'
import { ErrorService } from './error.service'

@Injectable()
export class ChartService {

  private baseURL = `${flaskServer}/chart`;
  private jsonHeaders = new Headers(
    {'Content-Type': 'application/json'});

  constructor(private http: Http,
              private statusService: StatusService,
              private errorService: ErrorService) { }

  getChart(id: number): Promise<object> {
    // console.log(`id: ${id}`);
    const url = `${this.baseURL}/${id}`;
    return this.http.get(url)
                    .toPromise()
                    .then(response => response.json())
                    .catch(err => this.errorService.handleError(err, this.statusService));
  }

  updateChart(chart: Chart): Promise<Status> {
    const id = chart.chartId;
    const url = `${this.baseURL}/${id}`;

    return this.http  
          .put(url, JSON.stringify(chart), {headers: this.jsonHeaders})
          .toPromise()
          .then(response => response.json())
          .catch(err => this.errorService.handleError(err, this.statusService));
  }
}