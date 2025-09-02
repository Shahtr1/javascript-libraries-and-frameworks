import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/angular';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './router/app-router.module';
import userEvent from '@testing-library/user-event';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ActivateComponent } from './activate/activate.component';
import { UserListComponent } from './home/user-list/user-list.component';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { getPage } from './home/user-list/test-helper';
import { UserListItemComponent } from './home/user-list-item/user-list-item.component';
import { ProfileCardComponent } from './user/profile-card/profile-card.component';
import { LoggedInUser } from './shared/types';

let logoutCounter = 0;

const server = setupServer(
  rest.post('/api/1.0/users/token/:token', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get('/api/1.0/users', (req, res, ctx) => {
    let size = Number(req.url.searchParams.get('size'));
    let page = Number(req.url.searchParams.get('page'));
    if (Number.isNaN(size)) {
      size = 5;
    }
    if (Number.isNaN(page)) {
      page = 0;
    }

    return res(ctx.status(200), ctx.json(getPage(page, size)));
  }),

  rest.get('/api/1.0/users/:id', (req, res, ctx) => {
    const id = Number(req.params['id']);
    return res(
      ctx.status(200),
      ctx.json({
        id,
        username: `user${id}`,
        email: `user${id}@mail.com`,
      })
    );
  }),

  rest.post('/api/1.0/auth', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        username: `user1`,
      })
    );
  }),
  rest.post('/api/1.0/logout', (req, res, ctx) => {
    logoutCounter += 1;
    return res(ctx.status(200));
  })
);

beforeAll(() => server.listen());

beforeEach(() => {
  logoutCounter = 0;
  server.resetHandlers();
});

afterAll(() => server.close());

afterEach(() => localStorage.clear());

const setup = async (path: string) => {
  const { navigate } = await render(AppComponent, {
    declarations: [
      HomeComponent,
      SignUpComponent,
      UserComponent,
      UserListComponent,
      UserListItemComponent,
      LoginComponent,
      ActivateComponent,
      ProfileCardComponent,
    ],
    imports: [HttpClientModule, SharedModule, ReactiveFormsModule, FormsModule],
    routes: routes,
  });

  await navigate(path);
};

describe('Routing', () => {
  it.each`
    path               | pageId
    ${'/'}             | ${'home-page'}
    ${'/signup'}       | ${'sign-up-page'}
    ${'/login'}        | ${'login-page'}
    ${'/user/1'}       | ${'user-page'}
    ${'/user/2'}       | ${'user-page'}
    ${'/activate/123'} | ${'activation-page'}
    ${'/activate/456'} | ${'activation-page'}
  `('displays $pageId when path is $path', async ({ path, pageId }) => {
    await setup(path);

    const page = screen.queryByTestId(pageId);
    expect(page).toBeInTheDocument();
  });

  it.each`
    path         | test
    ${'/'}       | ${'home-link'}
    ${'/signup'} | ${'sign-up-link'}
    ${'/login'}  | ${'login-link'}
  `('has a link with test $test to $path', async ({ path, test }) => {
    await setup(path);

    const anchorElement: HTMLAnchorElement = await screen.findByTestId(test);

    expect(anchorElement.href.replace(window.location.origin, '')).toBe(path);
  });

  it.each`
    initialPath  | test              | visiblePage
    ${'/signup'} | ${'home-link'}    | ${'home-page'}
    ${'/'}       | ${'sign-up-link'} | ${'sign-up-page'}
    ${'/'}       | ${'login-link'}   | ${'login-page'}
  `(
    `displays $visiblePage after clicking anchor tag with test $test `,
    async ({ initialPath, test, visiblePage }) => {
      await setup(initialPath);

      const anchorElement: HTMLAnchorElement = await screen.findByTestId(test);

      await userEvent.click(anchorElement);
      const page = await screen.findByTestId(visiblePage);
      expect(page).toBeInTheDocument();
    }
  );

  it('navigates to user page when clicking to username on user list', async () => {
    await setup('/');
    const userListItem = await screen.findByText('user1');
    await userEvent.click(userListItem);
    const page = await screen.findByTestId('user-page');
    expect(page).toBeInTheDocument();
  });
});

describe('Login', () => {
  let button: any;
  const setupForm = async () => {
    await setup('/login');
    await userEvent.type(screen.getByLabelText('E-mail'), 'user1@gmail.com');
    await userEvent.type(screen.getByLabelText('Password'), 'P4ssword');

    button = screen.getByRole('button', { name: 'Login' });
  };
  it('redirects to home page after successful login', async () => {
    await setupForm();
    await userEvent.click(button);
    const homePage = await screen.findByTestId('home-page');
    expect(homePage).toBeInTheDocument();
  });

  it('hides Login and Sign Up from nav bar after successful login', async () => {
    await setupForm();
    const loginLink = screen.getByRole('link', { name: 'Login' });
    const signUpLink = screen.getByRole('link', { name: 'Sign Up' });
    await userEvent.click(button);
    await waitForElementToBeRemoved(loginLink);
    expect(signUpLink).not.toBeInTheDocument();
  });

  it('displays My Profile link on nav bar after successful login', async () => {
    await setupForm();
    expect(
      screen.queryByRole('link', { name: 'My Profile' })
    ).not.toBeInTheDocument();
    await userEvent.click(button);
    const myProfileLink = await screen.findByRole('link', {
      name: 'My Profile',
    });
    expect(myProfileLink).toBeInTheDocument();
  });

  it('displays Logout link on nav bar after successful login', async () => {
    await setupForm();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    await userEvent.click(button);
    const myProfileLink = await screen.findByText('Logout');
    expect(myProfileLink).toBeInTheDocument();
  });

  it('displays User Page with logged in user id in url after clicking My Profile', async () => {
    await setupForm();
    await userEvent.click(button);
    const myProfileLink = await screen.findByRole('link', {
      name: 'My Profile',
    });
    await userEvent.click(myProfileLink);
    await screen.findByTestId('user-page');
    const header = await screen.findByRole('heading', { name: 'user1' });
    expect(header).toBeInTheDocument();
  });

  it('stores logged in state in local storage', async () => {
    await setupForm();
    await userEvent.click(button);
    await screen.findByTestId('home-page');

    const state = JSON.parse(localStorage.getItem('auth')!) as LoggedInUser;
    expect(state.isLoggedIn).toBe(true);
  });

  it('displays layout of logged in user', async () => {
    localStorage.setItem('auth', JSON.stringify({ isLoggedIn: true }));
    await setup('/');
    const myProfileLink = await screen.findByRole('link', {
      name: 'My Profile',
    });
    expect(myProfileLink).toBeInTheDocument();
  });

  it('displays Login and Sign Up after clicking Logout', async () => {
    await setupForm();
    await userEvent.click(button);

    const logoutLink = await screen.findByText('Logout');
    await userEvent.click(logoutLink);

    const loginLink = await screen.findByRole('link', {
      name: 'Login',
    });
    expect(loginLink).toBeInTheDocument();

    const signUpLink = await screen.findByRole('link', {
      name: 'Sign Up',
    });
    expect(signUpLink).toBeInTheDocument();
  });

  it('clears the storage after user logs out', async () => {
    await setupForm();
    await userEvent.click(button);

    const logoutLink = await screen.findByText('Logout');
    await userEvent.click(logoutLink);

    await screen.findByRole('link', {
      name: 'Login',
    });
    const state = localStorage.getItem('auth');
    expect(state).toBeNull();
  });

  it('sends logout request to backend', async () => {
    await setupForm();
    await userEvent.click(button);

    const logoutLink = await screen.findByText('Logout');
    await userEvent.click(logoutLink);

    await screen.findByRole('link', {
      name: 'Login',
    });
    expect(logoutCounter).toBe(1);
  });
});
