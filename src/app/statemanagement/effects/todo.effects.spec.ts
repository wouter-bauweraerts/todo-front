import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {TodoEffects} from './todo.effects';
import {TodoService} from '../../modules/todo/services/todo.service';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {
  CompleteTodo,
  CreateTodo,
  LoadIncompleteTodos,
  LoadTodo,
  LoadTodos,
  PatchSelected,
  PatchTodo,
  SetTodo,
  SetTodos,
  TodoFailure,
  UpdateTodo
} from '../actions/todo.actions';
import {TodoType} from '../../types/todo/todo.type';
import {HttpErrorResponse} from '@angular/common/http';
import SpyObj = jasmine.SpyObj;
import SpyObjMethodNames = jasmine.SpyObjMethodNames;
import {SetException} from '../actions/core.actions';

describe('The TodoEffects', () => {
  let actions$ = new Observable<Action>();

  let effects: TodoEffects

  let todoService: SpyObj<TodoService>;

  const todoId = 123
  const todo: TodoType = {
    todoId,
    description: 'Test the TodoEffects',
    complete: false
  };
  const todo2: TodoType = {
    todoId: todoId + 1,
    description: 'Test the TodoEffects',
    complete: false
  };

  const todos = [todo, todo2];

  beforeEach(() => {
    let todoMethodNames: SpyObjMethodNames = [
      'loadTodo',
      'loadTodos',
      'loadIncompleteTodos',
      'completeTodo',
      'updateTodo',
      'createTodo'
    ]
    todoService = jasmine.createSpyObj(todoMethodNames);

    TestBed.configureTestingModule({
      providers: [
        TodoEffects,
        {provide: TodoService, useValue: todoService},
        provideMockStore(),
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TodoEffects);
  });

  it('should be able to instantiate TodoEffects', () => {
    expect(effects).toBeTruthy();
  });

  describe('when receiving a LoadTodo effect', () => {
    beforeEach(() => {
      actions$ = of(LoadTodo({todoId}));
    });

    it('dispatches the expected SetTodo action', () => {
      todoService.loadTodo.and.returnValue(of(todo));

      effects.todo$.subscribe(result => {
        expect(todoService.loadTodo).toHaveBeenCalledWith(todoId);
        expect(result).toEqual(SetTodo({todo}))
      });
    });

    it('dispatches the expected TodoFailure action on error', () => {
      const errStatus = 418;
      const errMsg = 'BOOM!';
      let error: HttpErrorResponse = createHttpError(errStatus, errMsg);
      todoService.loadTodo.and.throwError(error);

      effects.todo$.subscribe(result => {
        expect(todoService.loadTodo).toHaveBeenCalledWith(todoId);
        expect(result).toEqual(TodoFailure({status: errStatus, error: errMsg}))
      });
    });
  });

  describe('when receiving a LoadTodos action', () => {
    beforeEach(() => {
      actions$ = of(LoadTodos());
    });

    it('dispatches the expected SetTodos action', () => {
      todoService.loadTodos.and.returnValue(of(todos));

      effects.todos$.subscribe(result => {
        expect(todoService.loadTodos).toHaveBeenCalled();
        expect(result).toEqual(SetTodos({todos}))
      });
    });

    it('dispatches the expected TodoFailure action on error', () => {
      const errStatus = 418;
      const errMsg = 'BOOM!';
      let error: HttpErrorResponse = createHttpError(errStatus, errMsg);
      todoService.loadTodos.and.throwError(error);

      effects.todos$.subscribe(result => {
        expect(todoService.loadTodos).toHaveBeenCalled();
        expect(result).toEqual(TodoFailure({status: errStatus, error: errMsg}))
      });
    });
  });

  describe('when receiving a LoadIncompleteTodos action', () => {
    beforeEach(() => {
      actions$ = of(LoadIncompleteTodos());
    });

    it('dispatches the expected SetTodos action', () => {
      todoService.loadIncompleteTodos.and.returnValue(of(todos));

      effects.incompleteTodos$.subscribe(result => {
        expect(todoService.loadIncompleteTodos).toHaveBeenCalled();
        expect(result).toEqual(SetTodos({todos}))
      });
    });

    it('dispatches the expected TodoFailure action on error', () => {
      const errStatus = 418;
      const errMsg = 'BOOM!';
      let error: HttpErrorResponse = createHttpError(errStatus, errMsg);
      todoService.loadIncompleteTodos.and.throwError(error);

      effects.incompleteTodos$.subscribe(result => {
        expect(todoService.loadIncompleteTodos).toHaveBeenCalled();
        expect(result).toEqual(TodoFailure({status: errStatus, error: errMsg}))
      });
    });
  });

  describe('when receiving a CompleteTodo action', () => {
    beforeEach(() => {
      actions$ = of(CompleteTodo({todoId}));
    });

    it('dispatches the expected SetTodos action', fakeAsync(() => {
      const expectedActions = [
        PatchTodo({todo}),
        PatchSelected({todo})
      ];

      let actualActions: Action[] = [];

      todoService.completeTodo.and.returnValue(of(todo));

      effects.completeTodo$.subscribe(action => {
        actualActions.push(action);
      });

      tick(1000);

      expect(actualActions).toEqual(expectedActions);
      expect(todoService.completeTodo).toHaveBeenCalled();
    }));

    it('dispatches the expected TodoFailure action on error', () => {
      const errStatus = 418;
      const errMsg = 'BOOM!';
      let error: HttpErrorResponse = createHttpError(errStatus, errMsg);
      todoService.completeTodo.and.throwError(error);

      effects.completeTodo$.subscribe(result => {
        expect(todoService.completeTodo).toHaveBeenCalled();
        expect(result).toEqual(TodoFailure({status: errStatus, error: errMsg}))
      });
    });
  });

  describe('when receiving a UpdateTodo action', () => {
    beforeEach(() => {
      actions$ = of(UpdateTodo({todoId, description: todo.description}));
    });

    it('dispatches the expected SetTodos action', fakeAsync(() => {
      const expectedActions = [
        PatchTodo({todo}),
        PatchSelected({todo})
      ];

      let actualActions: Action[] = [];

      todoService.updateTodo.and.returnValue(of(todo));

      effects.updateTodo$.subscribe(action => {
        actualActions.push(action);
      });

      tick(1000);

      expect(actualActions).toEqual(expectedActions);
      expect(todoService.updateTodo).toHaveBeenCalled();
    }));

    it('dispatches the expected TodoFailure action on error', () => {
      const errStatus = 418;
      const errMsg = 'BOOM!';
      let error: HttpErrorResponse = createHttpError(errStatus, errMsg);
      todoService.updateTodo.and.throwError(error);

      effects.updateTodo$.subscribe(result => {
        expect(todoService.updateTodo).toHaveBeenCalled();
        expect(result).toEqual(TodoFailure({status: errStatus, error: errMsg}))
      });
    });
  });

  describe('when receiving a CreateTodo action', () => {
    beforeEach(() => {
      actions$ = of(CreateTodo({description: todo2.description}));
    });

    it('dispatches the expected SetTodos action', () => {
      todoService.createTodo.and.returnValue(of(todo2));

      effects.createTodo$.subscribe(result => {
        expect(todoService.createTodo).toHaveBeenCalled();
        expect(result).toEqual(PatchTodo({todo: todo2}))
      });
    });

    it('dispatches the expected TodoFailure action on error', () => {
      const errStatus = 418;
      const errMsg = 'BOOM!';
      let error: HttpErrorResponse = createHttpError(errStatus, errMsg);
      todoService.createTodo.and.throwError(error);

      effects.createTodo$.subscribe(result => {
        expect(todoService.createTodo).toHaveBeenCalled();
        expect(result).toEqual(TodoFailure({status: errStatus, error: errMsg}))
      });
    });
  });

  describe('when receiving a TodoFailure action', () => {
    const failure = {
      status: 500,
      msg: '\'t is kapot'
    };

    beforeEach(() => actions$ = of(TodoFailure({status: failure.status, error: failure.msg})));

    it('dispatches the expected SetException action', () => {
      effects.handleError$.subscribe(result => {
        expect(result).toEqual(SetException({status: failure.status, error: failure.msg}))
      });
    });
  })

  const createHttpError = (status: number, msg: string): HttpErrorResponse => {
    return {
      headers: undefined, statusText: '', type: undefined, url: '',
      message: 't is kapot',
      name: 'HttpErrorResponse',
      ok: false,
      status: status,
      error: {
        msg: msg
      }
    };
  };
});
