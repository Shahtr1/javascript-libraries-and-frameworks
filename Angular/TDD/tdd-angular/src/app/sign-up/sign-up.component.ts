import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  username = '';
  email = '';
  password = '';
  passwordRepeat = '';
  apiProgress = false;
  signUpSuccess = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onChangeUsername(event: Event) {
    this.username = (event.target as HTMLInputElement).value;
  }

  onChangeEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
  }

  onChangePassword(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
  }

  onChangePasswordRepeat(event: Event) {
    this.passwordRepeat = (event.target as HTMLInputElement).value;
  }

  isDisabled() {
    return this.password ? this.password !== this.passwordRepeat : true;
  }

  onClickSignUp() {
    this.apiProgress = true;
    this.userService
      .signUp({
        username: this.username,
        password: this.password,
        email: this.email,
      })
      .subscribe(() => {
        this.signUpSuccess = true;
      });
  }
}
