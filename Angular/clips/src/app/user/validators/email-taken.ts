import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';

// To inject services in a class
@Injectable({ providedIn: 'root' })
export class EmailTaken implements AsyncValidator {
  constructor(private auth: AngularFireAuth) {}

  validate = (control: AbstractControl): Promise<ValidationErrors | null> =>
    this.auth
      .fetchSignInMethodsForEmail(control?.value)
      .then((response) => (response.length ? { emailTaken: true } : null));
}
