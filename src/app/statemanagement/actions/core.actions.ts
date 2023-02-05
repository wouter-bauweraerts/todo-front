import {createAction, props} from '@ngrx/store';

export const SetException = createAction(
  '[CORE]: Set Exception',
  props<{status: number, error: string}>()
);

export const SetLoading = createAction(
  '[CORE] Set Loading',
  props<{loading: boolean}>()
)
