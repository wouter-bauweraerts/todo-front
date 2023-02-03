import {TodoState} from '../app-state';
import {createReducer, on} from '@ngrx/store';
import * as TodoActions from '../actions/todo.actions';

export const initialState: TodoState = {
  todos: []
}

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.SetTodos, (state, {todos}) => ({...state, todos}))
);
