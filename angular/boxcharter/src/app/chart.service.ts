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
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
import { Chart } from './chart';

@Injectable()
export class ChartService {

  constructor(private http: Http) { }

  getChart(id: number): Promise<Chart> {
    // console.log(`id: ${id}`);
    const url = `http://localhost:5050/chart/${id}`
    return this.http.get(url)
                    .toPromise()
                    .then(response => response.json() as Chart)
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // TODO: really handle errors here, not just console.log
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}