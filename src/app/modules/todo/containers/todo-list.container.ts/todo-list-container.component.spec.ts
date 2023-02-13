import {createComponentFactory, mockProvider, Spectator, SpyObject} from '@ngneat/spectator';
import {TodoListContainerComponent} from './todo-list-container.component';
import {TodoSandbox} from '../../sandboxes/todo.sandbox';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TodoModule} from '../../todo.module';
import {BehaviorSubject, of} from 'rxjs';
import {TodoType} from '../../../../types/todo/todo.type';
import {RouterTestingModule} from '@angular/router/testing';

describe('The TodoListContainer component', () => {
  let spectator: Spectator<TodoListContainerComponent>;
  let sandbox: TodoSandbox;
  let dialog: SpyObject<MatDialog>;

  const todo: TodoType = {
    todoId: 1,
    description: 'Write some tests',
    complete: false
  };
  const todos: TodoType[] = [todo];

  describe('when showing all todos', () => {
    const createComponent = createComponentFactory({
      component: TodoListContainerComponent,
      imports: [
        TodoModule,
        RouterTestingModule
      ],
      providers: [
        mockProvider(TodoSandbox, {
          showAll$: of(true),
          todos$: of(todos)
        }),
        mockProvider(MatDialog),
        mockProvider(MatDialogRef)
      ]
    })
    beforeEach(() => {
      spectator = createComponent();
      sandbox = spectator.inject(TodoSandbox);
      dialog = spectator.inject(MatDialog);
    })

    it('creates the component', () => {
      expect(spectator).toBeTruthy();
      expect(sandbox.fetchTodos).toHaveBeenCalled();
    });

    it('onEdit opens the dialog', () => {
      let dialogRef = spectator.inject(MatDialogRef);
      dialog.open.and.returnValue(dialogRef);
      dialogRef.afterClosed.and.returnValue(of(todo))
      spectator.component.onEdit(todo);

      expect(dialog.open).toHaveBeenCalled();
      expect(sandbox.updateTodo).toHaveBeenCalledWith(todo);
    });

    it('can add a new todo', () => {
      const newTodo = {
        todoId: -1,
        description: 'Some cool new tests',
        complete: false
      };
      let subject = new BehaviorSubject<TodoType>(undefined);

      let dialogRef = spectator.inject(MatDialogRef);

      dialogRef.afterClosed.and.returnValue(subject.asObservable())
      dialog.open.and.returnValue(dialogRef);

      spectator.component.openAddTodo();

      expect(dialog.open).toHaveBeenCalled();

      subject.next(newTodo);

      expect(sandbox.addTodo).toHaveBeenCalledWith(newTodo);
    });
  });

  describe('when showing incomplete todos', () => {
    const createComponent = createComponentFactory({
      component: TodoListContainerComponent,
      imports: [
        TodoModule,
        RouterTestingModule
      ],
      providers: [
        mockProvider(TodoSandbox, {
          showAll$: of(false),
          todos$: of(todos)
        }),
        mockProvider(MatDialog)
      ]
    })


    beforeEach(() => {
      spectator = createComponent();
      sandbox = spectator.inject(TodoSandbox);
      dialog = spectator.inject(MatDialog);
    })

    it('creates the component', () => {
      expect(spectator).toBeTruthy();
      expect(sandbox.fetchIncompleteTodos).toHaveBeenCalled();
    });

    it('onComplete calls sandbox to complete todo', () => {
      spectator.component.onComplete(4);
      expect(sandbox.completeTodo).toHaveBeenCalledWith(4);
    });

    [true, false].forEach(showAll => {
      it('showAllTodos calls sandbox with expected value', () => {
        spectator.component.showAllTodos(showAll);
        expect(sandbox.showAll).toHaveBeenCalledWith(showAll);
      })
    });
  });
});
