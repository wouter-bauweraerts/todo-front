import {TodoState} from '../app-state';
import {createReducer, on} from '@ngrx/store';
import * as TodoActions from '../actions/todo.actions';
import {TodoType} from '../../types/todo/todo.type';
import {core} from '@angular/compiler';

export const initialState: TodoState = {
  todos: [],
  showAll: true,
  selected: undefined
}

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.SetTodos, (state, {todos}) => ({...state, todos: sort(todos)})),
  on(TodoActions.SetTodo, (state, {todo}) => ({...state, selected: todo})),
  on(TodoActions.PatchTodo, (state, {todo}) => ({...state, todos: sort(patchTodo(state, todo))})),
  on(TodoActions.FilterTodos, (state, {showAll}) => ({...state, showAll: showAll})),
  on(TodoActions.ClearTodo, state => ({...state, selected: undefined})),
  on(TodoActions.PatchSelected, (state, {todo}) => patchSelected(state, todo))
);

const patchTodo = (state: TodoState, updatedTodo: TodoType): TodoType[] => {
  const todos = state.todos.filter(todo => todo.todoId !== updatedTodo.todoId);
  todos.push(updatedTodo);

  return todos;
}

const patchSelected = (state: TodoState, updatedTodo: TodoType): TodoState => {
  if (!!state.selected) {
    return {
      ...state,
      selected: updatedTodo
    }
  } else {
    return state;
  }
}

const sort = (todos: TodoType[]): TodoType[] => {
  return todos.slice()
    .sort((a, b) => a.todoId - b.todoId)
    .reverse();
}
