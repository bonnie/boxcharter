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
import { Observable } from 'rxjs/Observable';
import { flaskServer } from './app.component'
import { ErrorService } from './error.service';
import { StatusService } from './status.service';
import { LoginRegisterService } from './login-register.service'
import { Status } from './status'
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegistrationService {

  private regURL = `${flaskServer}/user/add`;
  private verifyURL = `${flaskServer}/user/check`;
  isLoggedIn: boolean = false;
  private jsonHeaders = new Headers(
  {'Content-Type': 'application/json'});

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: Http,
              private statusService: StatusService,
              private errorService: ErrorService,
              private loginRegisterService: LoginRegisterService ) { }

  register(regData: object):  Promise<any> {
    // send registration info to flask server and return userID of new user
    return this.http.post(this.regURL, JSON.stringify(regData), {headers: this.jsonHeaders})
                    .toPromise()
                    .then(response => {
                                      let status = response.json()['status'];
                                      this.statusService.setStatus(status);
                                      if (status['type'] == 'success') {
                                        this.loginRegisterService.clearData();
                                        return response.json()['userID'];
                                      }
                                    })
                    .catch(err => this.errorService.handleError(err, this.statusService));
  }

  checkEmail(email): Promise<any> {
    // check to see if email already has account; return boolean

    return this.http.get(this.verifyURL, {params: {'email': email}, headers: this.jsonHeaders})
                    .toPromise()
                    .then(response => {
                                      let status = response.json()['status'];
                                      this.statusService.setStatus(status);
                                      if (status['type'] == 'success') {
                                        return response.json()['inDB'];
                                      }
                                    })
                    .catch(err => this.errorService.handleError(err, this.statusService));

    
  }

}
