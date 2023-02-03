import {createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {TodoType} from '../../types/todo/todo.type';

export const LoadTodos = createAction(
  '[TODO] Load todos'
)

export const SetTodos = createAction(
  '[TODO]: Set todos',
  props<{todos: TodoType[]}>()
);

export const LoadTodosFailure = createAction(
  '[TODO]: Failed to load todos',
  props<{error: HttpErrorResponse}>()
)

export const CompleteTodo = createAction(
  '[TODO]: Complete todo',
  props<{todoId: number}>()
)

export const PatchTodo = createAction(
  '[TODO]: Patch todo',
  props<{todo: TodoType}>()
)
