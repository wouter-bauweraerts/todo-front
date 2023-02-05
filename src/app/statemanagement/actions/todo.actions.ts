import {createAction, props} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {TodoType} from '../../types/todo/todo.type';

export const LoadTodos = createAction(
  '[TODO] Load todos'
)

export const LoadIncompleteTodos = createAction(
  '[TODO] Load incomplete todos'
)

export const SetTodos = createAction(
  '[TODO]: Set todos',
  props<{todos: TodoType[]}>()
);

export const TodoFailure = createAction(
  '[TODO]: Operation failed',
  props<{status: number, error: string}>()
)

export const CompleteTodo = createAction(
  '[TODO]: Complete todo',
  props<{todoId: number}>()
)

export const PatchTodo = createAction(
  '[TODO]: Patch todo',
  props<{todo: TodoType}>()
)

export const FilterTodos = createAction(
  '[TODO]: Filter todos',
  props<{showAll: boolean}>()
)

export const UpdateTodo = createAction(
  '[TODO]: Update todo',
  props<{todoId: number, description: string}>()
)

export const CreateTodo = createAction(
  '[TODO]: Create todo',
  props<{description: string}>()
)
