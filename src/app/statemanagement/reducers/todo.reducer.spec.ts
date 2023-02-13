import {initialState, todoReducer} from './todo.reducer';
import {TodoState} from '../app-state';
import {TodoType} from '../../types/todo/todo.type';
import {ClearTodo, FilterTodos, PatchSelected, PatchTodo, SetTodo, SetTodos} from '../actions/todo.actions';

describe('the todo reducers', () => {
  let state: TodoState;

  const todo1: TodoType = {
    todoId: 1,
    description: 'Test the todo reducers',
    complete: false
  };
  const todo2: TodoType = {
    todoId: 2,
    description: 'Implement the todo reducers',
    complete: false
  };
  const todo3: TodoType = {
    todoId: 3,
    description: 'Use the todo reducers',
    complete: true
  };

  const sortedTodos = [todo3, todo2, todo1];

  beforeEach(() => state = {...initialState});

  describe('on SetTodos', () => {
    beforeEach(() => checkState(state, true, undefined, []));

    it('updates the state as expected', () => {
      const action = SetTodos({todos: [todo3, todo1, todo2]});
      const newState = todoReducer(state, action);

      checkState(newState, true, undefined, sortedTodos);
    });
  });

  describe('on SetTodo', () => {
    beforeEach(() => checkState(state, true, undefined, []));
    sortedTodos.forEach(todo => {
      it('sets then expected todo as selected', () => {
        const action = SetTodo({todo});
        let newState = todoReducer(state, action);

        checkState(newState, true, todo, []);
      });
    });
  });

  describe('on PatchTodo', () => {
    beforeEach(() => {
      state = {...state, todos: sortedTodos};
      checkState(state, true, undefined, sortedTodos)
    });

    [1, 2, 3].forEach(todoId => {
      const newDescription = 'This is new';
      const todoToUpdate = {...sortedTodos.find(todo => todo.todoId === todoId), description: newDescription};

      it('updates the expected todo', () => {
        let updatedAndSorted = sortedTodos.filter(todo => todo.todoId !== todoId);
        updatedAndSorted.push(todoToUpdate);
        updatedAndSorted = updatedAndSorted.slice()
          .sort((a, b) => a.todoId - b.todoId)
          .reverse();

        const action = PatchTodo({todo: todoToUpdate});
        const newState = todoReducer(state, action);

        checkState(newState, true, undefined, updatedAndSorted);
      });
    });
  });

  describe('on FilterTodos', () => {
    [true, false].forEach(showAll => {
      it('updates the state as expected', () => {
        const action = FilterTodos({showAll});
        state = {...state, showAll: !showAll};
        checkState(state, !showAll, undefined, []);

        checkState(todoReducer(state, action), showAll, undefined, []);
      })
    });
  });

  describe('on ClearTodo', () => {
    beforeEach(() => {
      state = {...state, selected: todo3};
    });

    it('clears the selected todo', () => {
      expect(state.selected).not.toBeUndefined();
      const action = ClearTodo();

      checkState(todoReducer(state, action), true, undefined, []);
    });
  });

  describe('on PatchSelected', () => {
    describe('when there is a selected todo', () => {
      beforeEach(() => {
        state = {...state, selected: todo1}
      });

      it('updates the expected todo', () => {
        const todoToUpdate = {...todo1, description: 'This has been completed', complete: true}
        const action = PatchSelected({todo: todoToUpdate});
        const newState = todoReducer(state, action);

        checkState(newState, true, todoToUpdate, []);
      });
    });

    describe('when there is no selected todo', () => {
      it('nothing changes', () => {
        const todoToUpdate = {...todo1, description: 'This has been completed', complete: true}
        const action = PatchSelected({todo: todoToUpdate});
        const newState = todoReducer(state, action);

        checkState(newState, true, undefined, []);
      });
    });
  });

  const checkState = (state: TodoState, showAll: boolean, selected: TodoType, todos: TodoType[]) => {
    expect(state.todos).toEqual(todos);
    expect(state.showAll).toEqual(showAll);
    expect(state.selected).toEqual(selected);
  }
});
