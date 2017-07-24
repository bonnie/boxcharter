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
import { Params }   from '@angular/router';

import { StatusService } from '../../services/status.service';
import { AuthService } from '../../services/auth.service';
import { ChartService } from '../../services/chart.service';

import { Chart } from '../../model/chart';
import { User } from '../../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})

export class UserComponent implements OnInit {

  private user: User = this.authService.currentUser;

  constructor(public statusService: StatusService,
              public authService: AuthService,
              public chartService: ChartService,

) { }

  ngOnInit() {
  }

}
