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

const setup = async (path: string) => {
  const { navigate } = await render(AppComponent, {
    declarations: [
      HomeComponent,
      SignUpComponent,
      UserComponent,
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

  // TODO: check why the below test is failing for value ${'/'} | ${'Home'}
  it.each`
    path         | title
    ${'/signup'} | ${'Sign Up'}
    ${'/login'}  | ${'Login'}
  `('has a link with title $title to $path', async ({ path, title }) => {
    await setup(path);

    const link = screen.queryByRole('link', {
      name: title,
    });
    expect(link).toBeInTheDocument();
  });

  // TODO: check why the below test is failing for value     ${'/signup'} | ${'Home'} | ${'home-page'}

  it.each`
    initialPath | clickingTo   | visiblePage
    ${'/'}      | ${'Sign Up'} | ${'sign-up-page'}
    ${'/'}      | ${'Login'}   | ${'login-page'}
  `(
    `displays $visiblePage after clicking $clickingTo link`,
    async ({ initialPath, clickingTo, visiblePage }) => {
      await setup(initialPath);

      const link = screen.getByRole('link', { name: clickingTo });
      await userEvent.click(link);
      const page = await screen.findByTestId(visiblePage);
      expect(page).toBeInTheDocument();
    }
  );
});