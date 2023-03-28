import { createReducer, on } from '@ngrx/store';
import { logout, setLang, setToken, setUser } from './actions';

const initialToken = {
  // token: window.sessionStorage.getItem('token') || '',
  // isLogged: JSON.parse(window.sessionStorage.getItem('logged') || 'false'),
  token: '',
  isLogged: false,
};
export const tokenReducer = createReducer(
  initialToken,
  on(setToken, (state, { token }) => ({ token, isLogged: true })),
  on(logout, () => ({ token: '', isLogged: false }))
);

const initialUser = {
  login: '',
  _id: '',
  name: '',
};
export const userReducer = createReducer(
  initialUser,
  on(setUser, (state, { user }) => user)
);

export const langReducer = createReducer(
  'en',
  on(setLang, (state, { lang }) => lang)
);
