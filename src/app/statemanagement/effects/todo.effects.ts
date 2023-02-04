import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AppState} from '../app-state';
import {Store} from '@ngrx/store';
import {TodoService} from '../../modules/todo/services/todo.service';
import {catchError, exhaustMap, map, of} from 'rxjs';
import {
  CompleteTodo,
  LoadIncompleteTodos,
  LoadTodos,
  TodoFailure,
  PatchTodo,
  SetTodos, UpdateTodo, CreateTodo
} from '../actions/todo.actions';

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
    catchError(err => of(TodoFailure({error: err.msg})))
  ))


  // @ts-ignore
  incompleteTodos$ = createEffect(() => this.actions.pipe(
    ofType(LoadIncompleteTodos),
    exhaustMap(action => this.todoService.loadIncompleteTodos().pipe(
        map(todos => SetTodos({todos}))
      )
    ),
    catchError(err => of(TodoFailure({error: err.msg})))
  ))

  // @ts-ignore
  completeTodo$ = createEffect(() => this.actions.pipe(
    ofType(CompleteTodo),
    exhaustMap(action => this.todoService.completeTodo(action.todoId).pipe(
      map(todo => PatchTodo({todo}))
    ))
  ))

  // @ts-ignore
  updateTodo$ = createEffect(() => this.actions.pipe(
    ofType(UpdateTodo),
    exhaustMap(action => this.todoService.updateTodo(action.todoId, action.description).pipe(
      map(todo => PatchTodo({todo}))
    )),
    catchError(err => of(TodoFailure({error: err.msg})))
  ))

  // @ts-ignore
  createTodo$ = createEffect(() => this.actions.pipe(
    ofType(CreateTodo),
    exhaustMap(action => this.todoService.createTodo(action.description).pipe(
      map(todo => PatchTodo({todo}))
    )),
    catchError(err => of(TodoFailure({error: err.msg})))
  ))
}
