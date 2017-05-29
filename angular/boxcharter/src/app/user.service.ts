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
import { ErrorService } from './error.service';
import { StatusService } from './status.service';
import { flaskServer } from './app.component'

@Injectable()
export class UserService {

  private userURL = `${flaskServer}/user`;
  private jsonHeaders = new Headers(
  {'Content-Type': 'application/json'});

  constructor(private http: Http,
              private statusService: StatusService,
              private errorService: ErrorService ) { }

  getUser(id: number): Promise<any> {
    // send registration info to flask server and return userID of new user
    return this.http.post(`${this.userURL}/id`, {headers: this.jsonHeaders})
                    .toPromise()
                    .then(response => {
                                      let status = response.json()['status'];
                                      this.statusService.setStatus(status);
                                      if (status['type'] == 'success') {
                                        return response.json()['user'];
                                      }
                                    })
                    .catch(err => this.errorService.handleError(err, this.statusService));
  }

}
