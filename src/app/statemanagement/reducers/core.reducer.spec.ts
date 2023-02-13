import {initialState, coreReducer} from './core.reducer';
import {SetException} from '../actions/core.actions';
import {CoreState} from '../app-state';

describe('The core reducers', () => {
  let state: CoreState;

  beforeEach(() => state = {...initialState});

  describe('on SetException action', () => {
    it('updates the state as expected', () => {
      let status = 418;
      let error = 'BOOM!';
      const action = SetException({status, error});

      expect(state).toEqual(initialState);

      let newState = coreReducer(state, action);
      expect(newState).toEqual({
        ...initialState,
        error: {
          status,
          msg: error,
        }
      });
    });
  });
});
