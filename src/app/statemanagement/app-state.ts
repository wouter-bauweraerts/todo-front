import {TodoType} from '../types/todo/todo.type';
import {ErrorType} from '../types/core/error.type';

export type TodoState = {
  todos: TodoType[],
  showAll: boolean
}

export type CoreState = {
  error: ErrorType,
  loading: boolean
}

export type AppState = {
  readonly todo: TodoState,
  readonly core: CoreState
}
