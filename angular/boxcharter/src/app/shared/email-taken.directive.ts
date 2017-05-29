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

import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';

/** Warn user if the email is already in the user database */
export function EmailTakenValidator(): ValidatorFn {
  return (control: AbstractControl): any => {
    const email = control.value;

    // this.registrationService.checkEmail(email)
    //       .then(emailExists => {
    //         console.log('email exists?', emailExists);
    //         return emailExists ? {'emailTaken': {email}} : null;
    //       })
    //       .catch(err => {
    //         console.log('could not check email.');
    //         return null;});
  };
}

@Directive({
  selector: '[emailTaken]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailTakenValidator, multi: true}]
})
export class EmailTakenValidatorDirective implements Validator, OnChanges {
  @Input() email: string;
  private valFn = Validators.nullValidator;

 constructor( private registrationService: RegistrationService ) {
    }


  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['emailTaken'];
    if (change) {
      this.valFn = EmailTakenValidator();
    } else {
      this.valFn = Validators.nullValidator;
    }
  }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }
}
