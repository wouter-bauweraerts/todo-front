import {createServiceFactory, mockProvider, SpectatorService} from '@ngneat/spectator';
import {TodoSandbox} from './todo.sandbox';
import {
  ClearTodo,
  CompleteTodo, CreateTodo,
  FilterTodos,
  LoadIncompleteTodos, LoadTodo,
  LoadTodos,
  UpdateTodo
} from '../../../statemanagement/actions/todo.actions';
import {Store} from '@ngrx/store';
import {TodoType} from '../../../types/todo/todo.type';

describe('The TodoSandbox', () => {
  let spectator: SpectatorService<TodoSandbox>;
  let store: Store;

  const createSandbox = createServiceFactory({
    service: TodoSandbox,
    providers: [
      mockProvider(Store),
    ]
  });

  const todo: TodoType = {
    todoId: 23,
    description: 'Test the store',
    complete: false
  };

  beforeEach(() => {
    spectator = createSandbox();
    store = spectator.inject(Store);
  });

  it('can be created', () => {
    expect(spectator).toBeTruthy();
  });

  it('fetchTodos dispatches the expected action', () => {
    spectator.service.fetchTodos();
    expect(store.dispatch).toHaveBeenCalledWith(LoadTodos());
  });

  it('fetchIncompleteTodos dispatches the expected action', () => {
    spectator.service.fetchIncompleteTodos();
    expect(store.dispatch).toHaveBeenCalledWith(LoadIncompleteTodos());
  });

  it('completeTodo dispatches the expected action', () => {
    spectator.service.completeTodo(todo.todoId);
    expect(store.dispatch).toHaveBeenCalledWith(CompleteTodo({todoId: todo.todoId}));
  });

  [true, false].forEach((showAll) => {
    it('showAll dispatches the expected action', () => {
      spectator.service.showAll(showAll);
      expect(store.dispatch).toHaveBeenCalledWith(FilterTodos({showAll}));
    });
  });

  it('updateTodo dispatches the expected action', () => {
    spectator.service.updateTodo(todo);
    expect(store.dispatch).toHaveBeenCalledWith(UpdateTodo({todoId: todo.todoId, description: todo.description}));
  });

  it('addTodo dispatches the expected action', () => {
    spectator.service.addTodo(todo);
    expect(store.dispatch).toHaveBeenCalledWith(CreateTodo({description: todo.description}));
  });

  it('fetchTodo dispatches the expected action', () => {
    spectator.service.fetchTodo(todo.todoId);
    expect(store.dispatch).toHaveBeenCalledWith(LoadTodo({todoId: todo.todoId}));
  });

  it('clearTodo dispatches the expected action', () => {
    spectator.service.clearTodo();
    expect(store.dispatch).toHaveBeenCalledWith(ClearTodo());
  });
});
