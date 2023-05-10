import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SharedModule } from '../shared/shared.module';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [HttpClientTestingModule, SharedModule],
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
    let button: any;
    let httpTestingController: HttpTestingController;
    let signUp: HTMLElement;
    const setupForm = () => {
      httpTestingController = TestBed.inject(HttpTestingController);

      signUp = fixture.nativeElement as HTMLElement;

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

      button = signUp.querySelector('button');
    };

    it('enables the button when the password and password repeat fields have same value ', function () {
      setupForm();
      expect(button?.disabled).toBeFalsy();
    });

    it('sends username, email and password to backend after clicking the button ', function () {
      setupForm();
      button.click();

      const req = httpTestingController.expectOne('/api/1.0/users');
      const requestBody = req.request.body;

      expect(requestBody).toEqual({
        username: 'user1',
        password: 'password',
        email: 'user1@gmail.com',
      });
    });

    it('disables button when there is an ongoing api call', () => {
      setupForm();
      button.click();
      fixture.detectChanges(); // make sure ui is updated
      button.click();
      httpTestingController.expectOne('/api/1.0/users');
      expect(button.disabled).toBeTruthy();
    });

    it('displays spinner after clicking the submit', () => {
      setupForm();
      expect(signUp.querySelector('span[role="status"]')).toBeFalsy();

      button.click();
      fixture.detectChanges();
      expect(signUp.querySelector('span[role="status"]')).toBeTruthy();
    });

    it('displays account activation notification after successful sign up request', () => {
      setupForm();
      expect(signUp.querySelector('.alert-success')).toBeFalsy(); // should be visible after clicking the button
      button.click();
      const req = httpTestingController.expectOne('/api/1.0/users');
      req.flush({}); // set response body as an empty object
      fixture.detectChanges();
      const message = signUp.querySelector('.alert-success');
      expect(message?.textContent?.trim()).toBe(
        'Please check your e-mail to activate your account'
      );
    });

    it('hides sign up form after successful sign up request', () => {
      setupForm();
      expect(
        signUp.querySelector('div[data-testid="form-sign-up"]')
      ).toBeTruthy();
      button.click();
      const req = httpTestingController.expectOne('/api/1.0/users');
      req.flush({}); // set response body as an empty object
      fixture.detectChanges();
      expect(
        signUp.querySelector('div[data-testid="form-sign-up"]')
      ).toBeFalsy();
    });
  });
});
