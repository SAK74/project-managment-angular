import { createAction, props } from '@ngrx/store';
import { LangType } from 'src/languages';
import { UserType } from '../services/request.service';

export const setToken = createAction('[TOKEN] set', props<{ token: string }>());
export const logout = createAction('[TOKEN] logout');

export const setUser = createAction('[USER] set', props<{ user: UserType }>());

export const setLang = createAction(
  '[LANGUAGE] set',
  props<{ lang: LangType }>()
);
