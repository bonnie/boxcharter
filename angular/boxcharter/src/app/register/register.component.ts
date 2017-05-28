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
import { RegistrationService} from '../registration.service';
import { StatusService } from '../status.service';
import { Input } from '../input';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ RegistrationService ]
})
export class RegisterComponent implements OnInit {

  private inputs: Input[] = Array();
  
  constructor(public registrationService: RegistrationService,
              public statusService: StatusService ) { }

  ngOnInit() {

    // clear leftover status
    this.statusService.clearStatus();

    // set inputs
    let emptyMessage = 'This field cannot be empty!';

    // email
    let emailInput = new Input();
    emailInput.label = 'Email';
    emailInput.name = emailInput.type = 'email';
    emailInput.required = true;
    emailInput.errorTooltip = emptyMessage;
    emailInput.placeholder = 'jane@boxcharter.com';
    this.inputs.push(emailInput);

    // first name
    let fnameInput = new Input();
    fnameInput.label = 'First Name';
    fnameInput.name = 'fname';
    fnameInput.type = 'text'
    fnameInput.required = false;
    fnameInput.errorTooltip = emptyMessage;
    fnameInput.placeholder = 'Jane';
    this.inputs.push(fnameInput);

    // last name
    let lnameInput = new Input();
    lnameInput.label = 'Last Name';
    lnameInput.name = 'lname';
    lnameInput.type = 'text'
    lnameInput.required = false;
    lnameInput.placeholder = 'Boxcharts';
    this.inputs.push(lnameInput);

    // password
    let passInput = new Input();
    passInput.label = 'Password';
    passInput.name = passInput.type = 'password';
    passInput.required = true;
    passInput.placeholder = '';
    passInput.errorTooltip = emptyMessage;
    this.inputs.push(passInput);

    // password confirm
    let pass2Input = new Input();
    pass2Input.label = 'Confirm password';
    pass2Input.name = 'password2';
    pass2Input.type = 'password'
    pass2Input.required = true;
    pass2Input.placeholder = '';
    pass2Input.errorTooltip = 'Passwords must match.';
    pass2Input.onChange = 'checkPassMatch()';
    this.inputs.push(pass2Input);
  }

  checkPassMatch() {
    // check to see if passwords match and display error if not
    console.log('checking passwords');
  }

  register() {

    // TOOD: is there a better way to "serialize" the form? 
    let regData = {};
    for (let i=0; i < this.inputs.length; i++ ) {
      let input = this.inputs[i];
      regData[input.name] = input.value;
    }
    
    console.log(regData);
    this.registrationService.register(regData)
      .then(userData => {
          console.log(userData)
      });
  }
}
