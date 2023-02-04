import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../statemanagement/app-state';
import {CompleteTodo, FilterTodos, LoadIncompleteTodos, LoadTodos} from '../../statemanagement/actions/todo.actions';
import {TodoType} from '../../types/todo/todo.type';

@Injectable()
export class TodoSandbox {

  public readonly todos$: Observable<TodoType[]> = this.store.select(state => state.todo.todos);
  public readonly showAll$: Observable<boolean> = this.store.select(state => state.todo.showAll);

  constructor(private store: Store<AppState>) {
  }

  public fetchTodos() {
    this.store.dispatch(LoadTodos());
  }

  public fetchIncompleteTodos() {
    this.store.dispatch(LoadIncompleteTodos());
  }

  public completeTodo(todoId: number) {
    this.store.dispatch(CompleteTodo({todoId}));
  }

  showAll(showAll: boolean) {
    this.store.dispatch(FilterTodos({showAll}));
  }

}
