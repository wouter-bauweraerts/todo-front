import {TodoType} from '../types/todo/todo.type';

export type TodoState = {
  todos: TodoType[]
}

export type AppState = {
  readonly todo: TodoState
}
