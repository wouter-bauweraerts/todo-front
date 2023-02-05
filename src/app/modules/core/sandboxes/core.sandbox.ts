import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../statemanagement/app-state';

@Injectable()
export class CoreSandbox {
  public readonly loading$ = this.store.select(state => state.core.loading);
  public readonly error$ = this.store.select(state => state.core.error);

  constructor(private store: Store<AppState>) {
  }
}
