import { createReducer, on } from '@ngrx/store';
import { logout, setToken, setUser } from './actions';

export const tokenReducer = createReducer(
  { token: '', isLogged: false },
  on(setToken, (state, { token }) => ({ token, isLogged: true })),
  on(logout, () => ({ token: '', isLogged: false }))
);

export const userReducer = createReducer(
  '',
  on(setUser, (state, { user }) => user)
);
