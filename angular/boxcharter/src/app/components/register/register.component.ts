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
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { RegistrationService} from '../../services/registration.service';
import { StatusService } from '../../services/status.service';
import { AuthService } from '../../services/auth.service';
import { LoginRegisterService } from '../../services/login-register.service';

import { Input } from '../../model/input';
import { User } from '../../model/data-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ RegistrationService ]
})
export class RegisterComponent implements OnInit {

  private inputs: Object = {};
  
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
    emailInput.blur="checkEmail()";
    this.inputs['email'] = emailInput;

    // first name
    let fnameInput = new Input();
    fnameInput.label = 'First Name';
    fnameInput.name = 'fname';
    fnameInput.type = 'text'
    fnameInput.required = false;
    fnameInput.placeholder = 'Jane';
    this.inputs['fname'] = fnameInput;

    // last name
    let lnameInput = new Input();
    lnameInput.label = 'Last Name';
    lnameInput.name = 'lname';
    lnameInput.type = 'text'
    lnameInput.required = false;
    lnameInput.placeholder = 'Boxcharts';
    this.inputs['lname'] = lnameInput;

    // password
    let passInput = new Input();
    passInput.label = 'Password';
    passInput.name = passInput.type = 'password';
    passInput.value = this.loginRegisterService.password;
    passInput.required = true;
    passInput.placeholder = '';
    passInput.change="checkPassword()";
    this.inputs['password'] = passInput;

    // password confirm
    let pass2Input = new Input();
    pass2Input.label = 'Confirm password';
    pass2Input.name = 'password2';
    pass2Input.type = 'password'
    pass2Input.required = true;
    pass2Input.placeholder = '';
    pass2Input.change="checkPassword()";
    this.inputs['password2'] = pass2Input;
  }

/******************* form validation **********************/
  
  onChange(fieldName, newValue): void {
    let input = this.inputs[fieldName];
    input.value = newValue;

    // clear previous error
    input.errMsg = null;

    // and for the other password field if it's a password field
    if (fieldName == 'password') {
      this.inputs['password2'].errMsg = null;
    } else if (fieldName == 'password2') {
      this.inputs['password'].errMsg = null;
    }

   // for required fields    
    if (input.required && !input.value) {
      input.errMsg = `${input.label} is required`;
      return
    }

    // for special validations
    switch(fieldName) {
      case 'email':
        this.checkEmail(input.value);
        break;
      case 'password':
      case 'password2':
        this.checkPassword();
        break;
    }
  }

  checkEmail(email) {
    // check to see if email already exists

    this.registrationService.checkEmail(email)
      .then(inDB => {
        if (inDB) {
          this.inputs['email'].errMsg = `${email} already has a BoxCharter user account.`
        }
      })
  }

  checkPassword() {
    // check to see if passwords match

    let p1 = this.inputs['password'];
    let p2 = this.inputs['password2'];

    if (p1.value != p2.value) {
      p1.errMsg = p2.errMsg = "Passwords much match";
    }

  }

  formIsValid() {
    // for determining whether the register button is enabled

    for ( const inputKey in this.inputs ) {
      let input = this.inputs[inputKey]
      if ((input.required && !input.value) || this.inputs[inputKey].errMsg) {
        return false;
      }
    }
    return true;
  }

/************** form validation  ****************/
/* adapted from https://angular.io/docs/ts/latest/cookbook/form-validation.html */

  // regForm: NgForm;
  // @ViewChild('regForm') currentForm: NgForm;

  // ngAfterViewChecked() {
  //   this.formChanged();
  // }

  // formChanged() {
  //   if (this.currentForm === this.regForm) { return; }
  //   this.regForm = this.currentForm;
  //   if (this.regForm) {
  //     this.regForm.valueChanges
  //       .subscribe(data => this.onValueChanged(data));
  //   }
  // }

  // onValueChanged(data?: any) {
  //   if (!this.regForm) { return; }
  //   const form = this.regForm.form;

  //   for ( const inputKey in this.inputs ) {
  //     // clear previous error message (if any)
  //     let input = this.inputs[inputKey];
  //     input.errMsg = '';
  //     let field = input.name;
  //     const control = form.get(field);

  //     if (control && control.dirty && !control.valid) {
  //       const messages = this.validationMessages[field];
  //       for (const key in control.errors) {
  //         input.errMsg += messages[key] + ' ';
  //       }
  //     }
  //   }
  // }

  // validationMessages = {
  //   'email': {
  //     'required': 'Email is required.',
  //     'taken': 'There is already an account with this email.'
  //   },
  //   'password': {
  //     'required': 'Password is required.'
  //   },
  //   'password2': {
  //     'required': 'Passwords must match.',
  //     'mismatch': 'Passwords must match.'
  //   }
  // };

/************** actual registration  ****************/

 register() {
    // TODO: is there a better way to "serialize" the form? 
    let regData = {};
    for ( const inputKey in this.inputs ) {
      // clear previous error message (if any)
      let input = this.inputs[inputKey];
      regData[input.name] = input.value;
    }
    
    this.registrationService.register(regData)
      .then(userID => {
        if (userID) {
          let user = new User();
          user.email = this.inputs['email'].value;
          user.firstName = this.inputs['fname'].value;
          user.lastName = this.inputs['lname'].value;
          user.id = userID;
          user.charts = [];

          this.authService.setUser(user);
        }
      });
  }
}
