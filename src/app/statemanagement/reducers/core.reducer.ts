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

export const setException = (error: {status: number, msg: string}): ErrorType => {
  console.log(JSON.stringify(error))
  let err = {
    status: error.status,
    msg: error.msg
  }

  console.log(JSON.stringify(err))
  return err;
}
