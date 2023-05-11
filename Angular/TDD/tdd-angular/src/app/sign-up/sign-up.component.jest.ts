import { render, screen, waitFor } from '@testing-library/angular';
import { SignUpComponent } from './sign-up.component';
import userEvent from '@testing-library/user-event';
import { HttpClientModule } from '@angular/common/http';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

type UniqueEmailCheck = {
  email: string;
};

let requestBody: any;
let counter = 0;
const server = setupServer(
  rest.post('/api/1.0/users', (req, res, ctx) => {
    requestBody = req.body;
    counter += 1;
    return res(ctx.status(200), ctx.json({}));
  }),

  rest.post('/api/1.0/user/email', (req, res, ctx) => {
    const body = req.body as UniqueEmailCheck;
    if (body?.email === 'non-unique-email@mail.com') {
      return res(ctx.status(200), ctx.json({}));
    }
    return res(ctx.status(404), ctx.json({}));
  })
);

beforeEach(() => {
  counter = 0;
});

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

const setup = async () => {
  await render(SignUpComponent, {
    imports: [HttpClientModule, SharedModule, ReactiveFormsModule],
    declarations: [],
  });
};

describe('SignUpComponent', () => {
  describe('Layout', () => {
    it('has Sign Up header', async () => {
      await setup();
      const header = screen.getByRole('heading', { name: 'Sign Up' });
      expect(header).toBeInTheDocument();
    });

    it('has username input', async () => {
      await setup();
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
    });

    it('has email input', async () => {
      await setup();
      expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    });

    it('has password input', async () => {
      await setup();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('has password type for password input', async () => {
      await setup();
      const input = screen.getByLabelText('Password');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('has password repeat input', async () => {
      await setup();
      expect(screen.getByLabelText('Password Repeat')).toBeInTheDocument();
    });

    it('has password type for password repeat input', async () => {
      await setup();
      const input = screen.getByLabelText('Password Repeat');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('has Sign Up button', async () => {
      await setup();
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeInTheDocument();
    });

    it('disables the button initially', async () => {
      await setup();
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeDisabled();
    });
  });

  describe('Interactions', function () {
    let button: any;
    const setupForm = async () => {
      await setup();
      const username = screen.getByLabelText('Username');
      const email = screen.getByLabelText('E-mail');
      const password = screen.getByLabelText('Password');
      const passwordRepeat = screen.getByLabelText('Password Repeat');
      await userEvent.type(username, 'user1');
      await userEvent.type(email, 'user1@gmail.com');
      await userEvent.type(password, 'password');
      await userEvent.type(passwordRepeat, 'password');

      button = screen.getByRole('button', { name: 'Sign Up' });
    };

    it('enables the button when the password and password repeat fields have same value ', async () => {
      await setupForm();
      expect(button).toBeEnabled();
    });

    it('sends username, email and password to backend after clicking the button ', async () => {
      await setupForm();
      await userEvent.click(button);

      await waitFor(() => {
        expect(requestBody).toEqual({
          username: 'user1',
          password: 'password',
          email: 'user1@gmail.com',
        });
      });
    });

    it('disables button when there is an ongoing api call', async () => {
      await setupForm();
      await userEvent.click(button);
      await userEvent.click(button);
      await waitFor(() => {
        expect(counter).toBe(1);
      });
    });

    it('displays spinner after clicking the submit', async () => {
      await setupForm();

      // as we are looking for no-existent element, we cant ise getByRole, use queryByRole
      // because of aria-hidden="true" we are not able to access it, so test fails so we use hidden:true
      expect(
        screen.queryByRole('status', { hidden: true })
      ).not.toBeInTheDocument();
      await userEvent.click(button);
      expect(
        screen.queryByRole('status', { hidden: true })
      ).toBeInTheDocument();
    });

    it('displays account activation notification after successful sign up request', async () => {
      await setupForm();
      expect(
        screen.queryByText('Please check your e-mail to activate your account')
      ).not.toBeInTheDocument();

      await userEvent.click(button);

      // wait for test to appear
      const text = await screen.findByText(
        'Please check your e-mail to activate your account'
      );
      expect(text).toBeInTheDocument();
    });

    it('hides sign up form after successful sign up request', async () => {
      await setupForm();

      // as form is already there, we know that
      const form = screen.getByTestId('form-sign-up');
      await userEvent.click(button);

      await screen.findByText(
        'Please check your e-mail to activate your account'
      );
      expect(form).not.toBeInTheDocument();
    });
  });

  /*
   * ${''} gives error
   * so we use {space}{backspace}, as that's what the user does.
   * */

  describe('Validations', () => {
    it.each`
      label                | inputValue                     | message
      ${'Username'}        | ${'{space}{backspace}'}        | ${'Username is required'}
      ${'Username'}        | ${'123'}                       | ${'Username must be at least 4 characters long'}
      ${'E-mail'}          | ${'{space}{backspace}'}        | ${'E-mail is required'}
      ${'E-mail'}          | ${'wrong-format'}              | ${'Invalid e-mail address'}
      ${'Password'}        | ${'{space}{backspace}'}        | ${'Password is required'}
      ${'Password'}        | ${'password'}                  | ${'Password must have atleast 1 uppercase, 1 lowercase letter and 1 number'}
      ${'Password'}        | ${'passWORD'}                  | ${'Password must have atleast 1 uppercase, 1 lowercase letter and 1 number'}
      ${'Password'}        | ${'pas12'}                     | ${'Password must have atleast 1 uppercase, 1 lowercase letter and 1 number'}
      ${'Password'}        | ${'PASS1234'}                  | ${'Password must have atleast 1 uppercase, 1 lowercase letter and 1 number'}
      ${'Password Repeat'} | ${'pass'}                      | ${'Password mismatch'}
      ${'E-mail'}          | ${'non-unique-email@mail.com'} | ${'E-mail in use'}
    `(
      'displays $message when $label has the value "$inputValue"',
      async ({ label, inputValue, message }) => {
        await setup();
        expect(screen.queryByText(message)).not.toBeInTheDocument();
        const input = screen.getByLabelText(label);

        await userEvent.type(input, inputValue);

        await userEvent.tab();

        // expect(screen.queryByText(message)).toBeInTheDocument();
        // as the above is now dependent on async behaviour, use findByText

        const errorMessage = await screen.findByText(message);
        expect(errorMessage).toBeInTheDocument();
      }
    );
  });
});
