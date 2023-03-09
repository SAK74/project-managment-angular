import { createReducer, on } from '@ngrx/store';
import { logout, setToken } from './actions';

export const tokenReducer = createReducer(
  { token: '', isLogged: false },
  on(setToken, (state, { token }) => ({ token, isLogged: true })),
  on(logout, () => ({ token: '', isLogged: false }))
);
