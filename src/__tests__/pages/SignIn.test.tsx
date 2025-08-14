/**
 * @jest-environment jsdom
 */
import * as nextNavigation from 'next/navigation';
import { showNotification } from '@mantine/notifications';
import { fireEvent, render, screen, waitFor } from '__tests__/utils';
import SignIn from 'app/(unauthorized)/sign-in/page';
import { RoutePath } from 'shared/constants';

const mockSinInSuccessResponse = { data: { _id: '1', email: 'test@test.com', password: 'password123' } };
const mockSinInErrorResponse = { error: { data: { error: 'The email or password you have entered is invalid' } } };

const mockSignIn = jest.fn().mockImplementation(() => Promise.resolve(mockSinInErrorResponse));

jest.mock('features/account/account.api.ts', () => ({
  useSignInMutation: () => [mockSignIn, { isLoading: false }],
  useGetAccountQuery: () => ({ data: null, isLoading: false }),
  useSignOutMutation: () => [jest.fn(), { isLoading: false }],
  accountApi: {
    reducer: () => ({}),
    middleware: () => (next: (action: unknown) => unknown) => (action: unknown) => next(action),
  },
}));

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
  usePathname: jest.fn(() => '/home'),
}));

jest.mock('@mantine/notifications', () => ({
  ...jest.requireActual('@mantine/notifications'),
  showNotification: jest.fn(),
}));

const INIT_STORE = {
  account: {
    _id: '',
    email: '',
    isWelcomeScreenHidden: true,
  },
};

describe('SignIn Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login form', () => {
    render(<SignIn />, INIT_STORE);

    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('submits the form and calls signIn', async () => {
    mockSignIn.mockResolvedValueOnce(mockSinInSuccessResponse);

    render(<SignIn />, INIT_STORE);

    const accountSuccessData = {
      email: 'test@test.com',
      password: 'password123',
    };

    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: accountSuccessData.email } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: accountSuccessData.password } });

    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: accountSuccessData.email,
        password: accountSuccessData.password,
      });
      expect(showNotification).toHaveBeenCalledWith(expect.objectContaining({ title: 'Success' }));
      expect(nextNavigation.redirect).toHaveBeenCalledWith(RoutePath.Todos);
    });
  });

  it('shows error notification on failed login', async () => {
    mockSignIn.mockResolvedValueOnce(mockSinInErrorResponse);

    render(<SignIn />, INIT_STORE);

    const accountWrongData = {
      email: 'wrong@test.com',
      password: 'wrongPass123',
    };

    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: accountWrongData.email } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: accountWrongData.password } });

    fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

    await waitFor(() => {
      expect(showNotification).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Error', message: 'The email or password you have entered is invalid' }),
      );
      expect(nextNavigation.redirect).not.toHaveBeenCalled();
    });
  });
});
