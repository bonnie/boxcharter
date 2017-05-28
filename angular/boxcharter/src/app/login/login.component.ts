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

import { Component, OnInit }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth.service';
import { StatusService } from '../status.service';
import { Status } from '../status';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = null;
  password: string = null;
  message: string;

  constructor(public authService: AuthService, 
              public router: Router,
              public statusService: StatusService) {}
  ngOnInit() { 
    this.statusService.clearStatus();
  }
  login() {
    this.authService.login(this.email, this.password)
      .then(userID => {
        this.router.navigate(['user/' + userID]);
      });
      
   }
  logout() {
    this.authService.logout();
  }
}

// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
