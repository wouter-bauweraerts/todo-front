import {TodoType} from '../types/todo/todo.type';

export type TodoState = {
  todos: TodoType[],
  showAll: boolean
}

export type AppState = {
  readonly todo: TodoState
}
