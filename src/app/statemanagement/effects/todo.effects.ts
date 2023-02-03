import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AppState} from '../app-state';
import {Store} from '@ngrx/store';
import {TodoService} from '../../todo/services/todo.service';
import {catchError, exhaustMap, map, of} from 'rxjs';
import {LoadTodos, LoadTodosFailure, SetTodos} from '../actions/todo.actions';

@Injectable()
export class TodoEffects {
  constructor(private actions: Actions,
              private store: Store<AppState>,
              private todoService: TodoService
  ) {
  }

  // @ts-ignore
  todos$ = createEffect(() => this.actions.pipe(
    ofType(LoadTodos),
    exhaustMap(action => this.todoService.loadTodos().pipe(
        map(todos => SetTodos({todos}))
      )
    ),
    catchError(err => of(LoadTodosFailure({error: err.msg})))
  ))
}
