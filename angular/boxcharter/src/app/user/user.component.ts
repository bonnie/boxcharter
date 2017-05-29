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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { StatusService } from '../status.service';
import { UserService } from '../user.service';
import { Chart, User } from '../data-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ UserService ]
})

export class UserComponent implements OnInit {

  private user: User;

  constructor(public statusService: StatusService,
              public userService: UserService,
              
              // for getting chart ID from url
              private route: ActivatedRoute,
              private location: Location,
) { }

  ngOnInit() {
    this.statusService.clearStatus();
    this.getUser();
  }

  getUser(): void {
    // for use if the user selects "revert to saved"

    // load the data
    this.route.params

      // get chart ID from url and pass it to the chart service getChart method
      .switchMap((params: Params) => this.userService.getUser(+params['id']))

      // bind the response to the chart object for this page
      .subscribe(
        (response) => {

        if (response['status']['type'] != 'success') {
          this.statusService.setStatus(response['status']); 
        } else {
          // get user data    

          // console.log(response['chart']);
          this.user = response as User;
        }
        (err) => {
          // this.statusService.displayError(err);
        }
    });
  }

}
