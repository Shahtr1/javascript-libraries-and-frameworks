import { render, screen, waitFor } from '@testing-library/angular';
import { Observable, Subscriber } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { UserComponent } from './user.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';

type RouteParams = { id: string };
let subscriber!: Subscriber<RouteParams>;

const setup = async () => {
  const observable = new Observable<RouteParams>((sub) => {
    subscriber = sub;
  });
  await render(UserComponent, {
    declarations: [AlertComponent, ProfileCardComponent],
    imports: [HttpClientModule],
    providers: [{ provide: ActivatedRoute, useValue: { params: observable } }],
  });
};

let counter = 0;
const server = setupServer(
  rest.get('/api/1.0/users/:id', (req, res, ctx) => {
    counter += 1;
    if (req.params['id'] === '2') {
      return res(ctx.status(400), ctx.json({}), ctx.delay(50));
    }
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        username: 'user1',
        email: 'user1@mail.com',
      }),
      ctx.delay(50)
    );
  })
);

beforeEach(() => {
  counter = 0;
  server.resetHandlers();
});

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('User Page', () => {
  it('sends request to get user data', async () => {
    await setup();
    subscriber.next({ id: '1' });
    await waitFor(() => {
      expect(counter).toBe(1);
    });
  });

  it('displays user name on page when user is found', async () => {
    await setup();
    subscriber.next({ id: '1' });

    const username = await screen.findByRole('heading', { name: 'user1' });
    expect(username).toBeInTheDocument();
  });

  it('displays error when user not found', async () => {
    await setup();
    subscriber.next({ id: '2' });

    const message = await screen.findByText('User not found');
    expect(message).toBeInTheDocument();
  });

  it('displays spinner during user get request', async () => {
    await setup();
    subscriber.next({ id: '1' });

    const spinner = await screen.findByRole('status');

    await screen.findByText('user1');
    expect(spinner).not.toBeInTheDocument();
  });
});
