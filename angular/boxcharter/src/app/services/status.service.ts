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

/* This service maintains a common Status object among components. */

import { Injectable } from '@angular/core';
import { Status } from '../model/status'


@Injectable()
export class StatusService {

  public status: Status;

  constructor() { }

  setStatus(statusResponse: object): void {
    // set the status based on response from Flask
    this.status = new Status();
    this.status.alertType = 'alert-' + statusResponse['type'];
    this.status.text = statusResponse['text'];
  }
  
  clearStatus(): void {
    // clear the status data
    this.status = null;
  }

  clearSuccess(): void {
    // clear the status only if it's a success status
    if (this.status && this.status.alertType == 'alert-success') {
      this.status = null;
    }
  }
}
