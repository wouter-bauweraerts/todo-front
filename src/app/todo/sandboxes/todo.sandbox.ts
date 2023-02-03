import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../statemanagement/app-state';
import {LoadTodos} from '../../statemanagement/actions/todo.actions';

@Injectable()
export class TodoSandbox {
  public readonly todos$: Observable<any> = this.store.select(state => state.todo.todos);

  constructor(private store: Store<AppState>) {
  }

  public fetchTodos() {
    this.store.dispatch(LoadTodos())
  }

}
