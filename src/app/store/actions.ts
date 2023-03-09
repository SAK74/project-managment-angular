import { createAction, props } from '@ngrx/store';

export const setToken = createAction('[TOKEN] set', props<{ token: string }>());
export const logout = createAction('[TOKEN] logout');
