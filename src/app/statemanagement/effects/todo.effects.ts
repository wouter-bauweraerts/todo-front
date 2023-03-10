import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AppState} from '../app-state';
import {Store} from '@ngrx/store';
import {TodoService} from '../../modules/todo/services/todo.service';
import {catchError, exhaustMap, map, of, switchMap} from 'rxjs';
import {
  CompleteTodo,
  LoadIncompleteTodos,
  LoadTodos,
  TodoFailure,
  PatchTodo,
  SetTodos, UpdateTodo, CreateTodo, LoadTodo, SetTodo, PatchSelected
} from '../actions/todo.actions';
import {SetException} from '../actions/core.actions';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class TodoEffects {
  constructor(private actions: Actions,
              private store: Store<AppState>,
              private todoService: TodoService
  ) {
  }

  todo$ = createEffect(() => this.actions.pipe(
    ofType(LoadTodo),
    exhaustMap(action => this.todoService.loadTodo(action.todoId).pipe(
        map(todo => SetTodo({todo}))
      )
    ),
    catchError((err: HttpErrorResponse) => {
      return of(TodoFailure({status: err.status, error: err.error.msg}))
    })
  ))

  todos$ = createEffect(() => this.actions.pipe(
    ofType(LoadTodos),
    exhaustMap(() => this.todoService.loadTodos().pipe(
        map(todos => SetTodos({todos}))
      )
    ),
    catchError((err: HttpErrorResponse) => {
      return of(TodoFailure({status: err.status, error: err.error.msg}))
    })
  ))


  incompleteTodos$ = createEffect(() => this.actions.pipe(
    ofType(LoadIncompleteTodos),
    exhaustMap(() => this.todoService.loadIncompleteTodos().pipe(
        map(todos => SetTodos({todos}))
      )
    ),
    catchError((err: HttpErrorResponse) => {
      return of(TodoFailure({status: err.status, error: err.error.msg}))
    })
  ))

  completeTodo$ = createEffect(() => this.actions.pipe(
    ofType(CompleteTodo),
    exhaustMap(action => this.todoService.completeTodo(action.todoId).pipe(
      switchMap(todo => of(
        PatchTodo({todo}),
        PatchSelected({todo})
      ))
    )),
    catchError((err: HttpErrorResponse) => {
      return of(TodoFailure({status: err.status, error: err.error.msg}))
    })
  ))

  updateTodo$ = createEffect(() => this.actions.pipe(
    ofType(UpdateTodo),
    exhaustMap(action => this.todoService.updateTodo(action.todoId, action.description).pipe(
      switchMap(todo => of(
        PatchTodo({todo}),
        PatchSelected({todo})
      ))
    )),
    catchError((err: HttpErrorResponse) => {
      return of(TodoFailure({status: err.status, error: err.error.msg}))
    })
  ))

  createTodo$ = createEffect(() => this.actions.pipe(
    ofType(CreateTodo),
    exhaustMap(action => this.todoService.createTodo(action.description).pipe(
      map(todo => PatchTodo({todo}))
    )),
    catchError((err: HttpErrorResponse) => {
      return of(TodoFailure({status: err.status, error: err.error.msg}))
    })
  ))

  handleError$ = createEffect(() => this.actions.pipe(
    ofType(TodoFailure),
    map(failure => SetException({...failure}))
  ))
}
