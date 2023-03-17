import { createAction, props } from '@ngrx/store';
import { UserType } from '../services/request.service';

export const setToken = createAction('[TOKEN] set', props<{ token: string }>());
export const logout = createAction('[TOKEN] logout');

export const setUser = createAction('[USER] set', props<{ user: UserType }>());
