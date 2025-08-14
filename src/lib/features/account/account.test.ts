import { accountReducer, AccountState, setAccount, setIsWelcomeScreenHidden } from './index';

describe('accountSlice', () => {
  let initialState: AccountState;

  beforeEach(() => {
    initialState = {
      id: '',
      email: '',
      isWelcomeScreenHidden: false,
    };

    localStorage.clear();
  });

  it('should return the initial state', () => {
    const state = accountReducer(undefined, { type: '@@INIT' });

    expect(state.id).toBe('');
    expect(state.email).toBe('');
    expect(typeof state.isWelcomeScreenHidden).toBe('boolean');
  });

  it('should set account id and email', () => {
    const state = accountReducer(initialState, setAccount({ id: '123', email: 'test@example.com' }));

    expect(state.id).toBe('123');
    expect(state.email).toBe('test@example.com');
  });

  it('should set isWelcomeScreenHidden and update localStorage', () => {
    const state = accountReducer(initialState, setIsWelcomeScreenHidden({ isWelcomeScreenHidden: true }));

    expect(state.isWelcomeScreenHidden).toBe(true);
    expect(localStorage.getItem('isWelcomeScreenHidden')).toBe('true');
  });

  it('should handle setting isWelcomeScreenHidden to false', () => {
    localStorage.setItem('isWelcomeScreenHidden', 'true');

    const state = accountReducer(initialState, setIsWelcomeScreenHidden({ isWelcomeScreenHidden: false }));

    expect(state.isWelcomeScreenHidden).toBe(false);
    expect(localStorage.getItem('isWelcomeScreenHidden')).toBe('false');
  });

  it('should not fail if isWelcomeScreenHidden is undefined', () => {
    const state = accountReducer(initialState, setIsWelcomeScreenHidden({ isWelcomeScreenHidden: undefined }));

    expect(state.isWelcomeScreenHidden).toBeUndefined();
    expect(localStorage.getItem('isWelcomeScreenHidden')).toBe('undefined');
  });

  it('should maintain previous id and email when setting isWelcomeScreenHidden', () => {
    const modifiedState = accountReducer(initialState, setAccount({ id: 'abc', email: 'a@b.com' }));

    const state = accountReducer(modifiedState, setIsWelcomeScreenHidden({ isWelcomeScreenHidden: true }));

    expect(state.id).toBe('abc');
    expect(state.email).toBe('a@b.com');
  });
});
