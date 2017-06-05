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

import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService} from '../registration.service';
import { StatusService } from '../status.service';
import { AuthService } from '../auth.service';
import { LoginRegisterService } from '../login-register.service';
import { Input } from '../input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ RegistrationService ]
})
export class RegisterComponent implements OnInit, AfterViewChecked {

  private inputs: Input[] = new Array();
  
  constructor(public registrationService: RegistrationService,
              public statusService: StatusService,
              public authService: AuthService,
              public loginRegisterService: LoginRegisterService,
              private router: Router ) { }

/************** form creation  ****************/

  ngOnInit() {

    // clear leftover status
    this.statusService.clearStatus();

    // set inputs

    // email
    let emailInput = new Input();
    emailInput.label = 'Email';
    emailInput.name = emailInput.type = 'email';
    emailInput.value = this.loginRegisterService.email;
    emailInput.required = true;
    emailInput.placeholder = 'jane@boxcharter.com';
    this.inputs.push(emailInput);

    // first name
    let fnameInput = new Input();
    fnameInput.label = 'First Name';
    fnameInput.name = 'fname';
    fnameInput.type = 'text'
    fnameInput.required = false;
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
    passInput.value = this.loginRegisterService.password;
    passInput.required = true;
    passInput.placeholder = '';
    this.inputs.push(passInput);

    // password confirm
    let pass2Input = new Input();
    pass2Input.label = 'Confirm password';
    pass2Input.name = 'password2';
    pass2Input.type = 'password'
    pass2Input.required = true;
    pass2Input.placeholder = '';
    this.inputs.push(pass2Input);
  }

/************** form validation  ****************/
/* adapted from https://angular.io/docs/ts/latest/cookbook/form-validation.html */

  regForm: NgForm;
  @ViewChild('regForm') currentForm: NgForm;

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.regForm) { return; }
    this.regForm = this.currentForm;
    if (this.regForm) {
      this.regForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.regForm) { return; }
    const form = this.regForm.form;

    for ( const input of this.inputs ) {
      // clear previous error message (if any)
      input.errMsg = '';
      let field = input.name;
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          input.errMsg += messages[key] + ' ';
        }
      }
    }
  }

  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'taken': 'There is already an account with this email.'
    },
    'password': {
      'required': 'Password is required.'
    },
    'password2': {
      'required': 'Passwords must match.',
      'mismatch': 'Passwords must match.'
    }
  };

/************** actual registration  ****************/

 register() {
    // TOOD: is there a better way to "serialize" the form? 
    let regData = {};
    for (let i=0; i < this.inputs.length; i++ ) {
      let input = this.inputs[i];
      regData[input.name] = input.value;
    }
    
    this.registrationService.register(regData)
      .then(userID => {
          this.authService.isLoggedIn = true;
          this.router.navigate(['user/' + userID]);
      });
  }
}
