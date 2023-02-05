import {AppState} from '../app-state';
import {ActionReducerMap, combineReducers} from '@ngrx/store';
import {initialState as initTodo, todoReducer} from './todo.reducer';
import {coreReducer, initialState as initCore} from './core.reducer';

export const initialState: AppState = {
  todo: initTodo,
  core: initCore
};

export const reducers: ActionReducerMap<AppState> = {
  todo: todoReducer,
  core: coreReducer
}

export const reducerFactory = () => combineReducers(reducers);
