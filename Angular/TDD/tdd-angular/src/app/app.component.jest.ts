import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
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
  })
);

beforeAll(() => server.listen());

beforeEach(() => server.resetHandlers());

afterAll(() => server.close());

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
    ],
    imports: [HttpClientModule, SharedModule, ReactiveFormsModule],
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
  `('has a link with title $title to $path', async ({ path, test }) => {
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
    `displays $visiblePage after clicking $clickingTo link`,
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
