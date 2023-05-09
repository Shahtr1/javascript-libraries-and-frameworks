import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Layout', () => {
    it('has Sign Up header', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const h1 = signUp.querySelector('h1');
      expect(h1?.textContent?.trim()).toBe('Sign Up');
    });

    it('has username input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="username"]');
      const input = signUp.querySelector('input[id="username"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent?.trim()).toContain('Username');
    });

    it('has email input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="email"]');
      const input = signUp.querySelector('input[id="email"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent?.trim()).toContain('E-mail');
    });

    it('has password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="password"]');
      const input = signUp.querySelector('input[id="password"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent?.trim()).toContain('Password');
    });

    it('has password type for password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const input = signUp.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;
      expect(input.type).toBe('password');
    });

    it('has password repeat input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="passwordRepeat"]');
      const input = signUp.querySelector('input[id="passwordRepeat"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent?.trim()).toContain('Password Repeat');
    });

    it('has password type for password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const input = signUp.querySelector(
        'input[id="passwordRepeat"]'
      ) as HTMLInputElement;
      expect(input.type).toBe('password');
    });

    it('has Sign Up button', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button?.textContent?.trim()).toBe('Sign Up');
    });

    it('disables the button initially', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button?.disabled).toBeTruthy();
    });
  });

  describe('Interactions', function () {
    it('enables the button when the password and password repeat fields have same value ', function () {
      const signUp = fixture.nativeElement as HTMLElement;
      const passwordInput = signUp.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;
      const passwordRepeatInput = signUp.querySelector(
        'input[id="passwordRepeat"]'
      ) as HTMLInputElement;

      // mimic the user behaviour
      passwordInput.value = 'password';
      passwordInput.dispatchEvent(new Event('input'));

      passwordRepeatInput.value = 'password';
      passwordRepeatInput.dispatchEvent(new Event('input'));

      // angular detects changes delayed
      fixture.detectChanges();

      const button = signUp.querySelector('button');
      expect(button?.disabled).toBeFalsy();
    });

    it('sends username, email and password to backend after clicking the button ', function () {
      const httpTestingController = TestBed.inject(HttpTestingController);

      const signUp = fixture.nativeElement as HTMLElement;

      const usernameInput = signUp.querySelector(
        'input[id="username"]'
      ) as HTMLInputElement;

      const emailInput = signUp.querySelector(
        'input[id="email"]'
      ) as HTMLInputElement;

      const passwordInput = signUp.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;

      const passwordRepeatInput = signUp.querySelector(
        'input[id="passwordRepeat"]'
      ) as HTMLInputElement;

      // mimic the user behaviour
      usernameInput.value = 'user1';
      usernameInput.dispatchEvent(new Event('input'));

      emailInput.value = 'user1@gmail.com';
      emailInput.dispatchEvent(new Event('input'));

      passwordInput.value = 'password';
      passwordInput.dispatchEvent(new Event('input'));

      passwordRepeatInput.value = 'password';
      passwordRepeatInput.dispatchEvent(new Event('input'));

      // angular detects changes delayed
      fixture.detectChanges();

      const button = signUp.querySelector('button');
      button?.click();

      const req = httpTestingController.expectOne('/api/1.0/users');
      const requestBody = req.request.body;

      expect(requestBody).toEqual({
        username: 'user1',
        password: 'password',
        email: 'user1@gmail.com',
      });
    });
  });
});
