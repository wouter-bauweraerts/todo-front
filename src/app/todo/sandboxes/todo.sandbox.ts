import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../statemanagement/app-state';
import {CompleteTodo, LoadTodos} from '../../statemanagement/actions/todo.actions';
import {TodoType} from '../../types/todo/todo.type';

@Injectable()
export class TodoSandbox {
  public readonly todos$: Observable<TodoType[]> = this.store.select(state => state.todo.todos);

  constructor(private store: Store<AppState>) {
  }

  public fetchTodos() {
    this.store.dispatch(LoadTodos())
  }

  public completeTodo(todoId: number) {
    this.store.dispatch(CompleteTodo({todoId}))
  }

}
