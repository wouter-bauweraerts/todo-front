import {CoreState} from '../app-state';
import {createReducer, on} from '@ngrx/store';
import * as CoreActions from '../actions/core.actions';
import {ErrorType} from '../../types/core/error.type';

export const initialState: CoreState = {
  error: undefined,
  loading: false
}

export const coreReducer = createReducer(
  initialState,
  on(CoreActions.SetException, (state, {status, error}) => ({
      ...state,
        error: {
          status,
          msg: error
        }
    })
  )
)
