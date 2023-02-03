import {TodoState} from '../app-state';
import {createReducer, on} from '@ngrx/store';
import * as TodoActions from '../actions/todo.actions';
import {TodoType} from '../../types/todo/todo.type';

export const initialState: TodoState = {
  todos: []
}

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.SetTodos, (state, {todos}) => ({...state, todos: sort(todos)})),
  on(TodoActions.PatchTodo, (state, {todo}) => ({...state, todos: sort(patchTodo(state, todo))}))
);

const patchTodo = (state: TodoState, updatedTodo: TodoType): TodoType[] => {
  const todos = state.todos.filter(todo => todo.todoId !== updatedTodo.todoId);
  todos.push(updatedTodo);

  return todos;
}

const sort = (todos: TodoType[]): TodoType[] => {
  return todos.slice()
    .sort((a, b) => a.todoId - b.todoId)
    .reverse();
}
