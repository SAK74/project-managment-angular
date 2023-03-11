import { createReducer, on } from '@ngrx/store';
import { logout, setToken, setUser } from './actions';

const initialToken = {
  token: window.sessionStorage.getItem('token') || '',
  isLogged: JSON.parse(window.sessionStorage.getItem('logged') || 'false'),
};
export const tokenReducer = createReducer(
  // { token: '', isLogged: false },
  initialToken,
  on(setToken, (state, { token }) => ({ token, isLogged: true })),
  on(logout, () => ({ token: '', isLogged: false }))
);

const initialUser = window.sessionStorage.getItem('user') || '';
export const userReducer = createReducer(
  // '',
  initialUser,
  on(setUser, (state, { user }) => user)
);
