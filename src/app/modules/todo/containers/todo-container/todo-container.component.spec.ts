import {createRoutingFactory, mockProvider, SpectatorRouting} from '@ngneat/spectator';
import {TodoContainerComponent} from './todo-container.component';
import {TodoModule} from '../../todo.module';
import {MatButtonModule} from '@angular/material/button';
import {RouterTestingModule} from '@angular/router/testing';
import {TodoSandbox} from '../../sandboxes/todo.sandbox';

describe('The TodoContainer component', () => {
  let spectator: SpectatorRouting<TodoContainerComponent>;
  let sandbox: TodoSandbox;

  const todo = {
      todoId: 1,
      description: 'Write some tests',
      complete: false
    };

  const createComponent = createRoutingFactory({
    component: TodoContainerComponent,
    imports: [
      TodoModule,
      MatButtonModule,
      RouterTestingModule
    ],
    providers: [
      mockProvider(TodoSandbox)
    ],
    params: {
      id: 1
    }
  });

  beforeEach(() => {
    spectator = createComponent();
    sandbox = spectator.inject(TodoSandbox);
  });

  it('creates the component', () => {
    expect(spectator).toBeTruthy();
    expect(sandbox.fetchTodo).toHaveBeenCalledWith(todo.todoId);
  });

  it('triggers the sandbox when editing todo', () => {
    spectator.component.edit(todo);

    expect(sandbox.updateTodo).toHaveBeenCalledWith(todo);
  });

  it('triggers the sandbox when completing a todo', () => {
    spectator.component.complete(todo.todoId);
    expect(sandbox.completeTodo).toHaveBeenCalledWith(todo.todoId);
  });

  it('clears the selected todo when destroying component', () => {
    spectator.component.ngOnDestroy();
    expect(sandbox.clearTodo).toHaveBeenCalled();
  });

});
