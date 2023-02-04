import {TodoType} from './todo.type';

export type TodoDialog = {
  todo: TodoType,
  window: Dialog
}

export type Dialog = {
  title: string,
  cancel: string,
  confirm: string
}
