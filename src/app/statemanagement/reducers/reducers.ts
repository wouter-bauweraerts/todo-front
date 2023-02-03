import {AppState} from '../app-state';
import {ActionReducerMap, combineReducers} from '@ngrx/store';
import {initialState as initTodo, todoReducer} from './todo.reducer';

export const initialState: AppState = {
  todo: initTodo
};

export const reducers: ActionReducerMap<AppState> = {
  todo: todoReducer
}

export const reducerFactory = () => combineReducers(reducers);
