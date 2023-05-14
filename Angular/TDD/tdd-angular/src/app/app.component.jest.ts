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

const setup = async (path: string) => {
  const { navigate } = await render(AppComponent, {
    declarations: [
      HomeComponent,
      SignUpComponent,
      UserComponent,
      UserListComponent,
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
});
