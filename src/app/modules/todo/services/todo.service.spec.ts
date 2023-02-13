import {createHttpFactory, HttpMethod, SpectatorHttp} from '@ngneat/spectator';
import {TodoService} from './todo.service';
import {TodoType} from '../../../types/todo/todo.type';

describe('The TodoService', () => {
  let spectator: SpectatorHttp<TodoService>;

  const createService = createHttpFactory(TodoService);

  const todo: TodoType = {
    todoId: 23,
    description: 'Test the todo-service',
    complete: false
  };

  const baseUrl = '/api/todo'

  beforeEach(() => spectator = createService());

  it('loadTodo calls expected endpoint', () => {
    spectator.service.loadTodo(todo.todoId).subscribe(res => {
      expect(res).toHaveSize(1);
      expect(res).toContain(todo);
    });
    spectator.expectOne(`${baseUrl}/${todo.todoId}`, HttpMethod.GET)
      .flush([todo]);
  });

  it('loadTodos calls expected endpoint', () => {
    spectator.service.loadTodos().subscribe(res => {
      expect(res).toHaveSize(1);
      expect(res).toContain(todo);
    });
    spectator.expectOne(baseUrl, HttpMethod.GET)
      .flush([todo]);
  });

  it('completeTodo calls expected endpoint', () => {
    spectator.service.completeTodo(todo.todoId).subscribe(res => expect(res).toEqual(todo));
    let request = spectator.expectOne(`${baseUrl}/complete/${todo.todoId}`, HttpMethod.PUT);
    expect(request.request.body).toEqual({});
    request.flush(todo);
  });

  it('loadIncompleteTodos calls expected endpoint', () => {
    spectator.service.loadIncompleteTodos().subscribe(res => {
      expect(res).toHaveSize(1);
      expect(res).toContain(todo);
    });

    spectator.expectOne(`${baseUrl}/incomplete`, HttpMethod.GET)
      .flush([todo]);
  });

  it('updateTodo calls expected endpoint with correct body', () => {
    spectator.service.updateTodo(todo.todoId, todo.description).subscribe(
      res => expect(res).toEqual(todo)
    );

    let request = spectator.expectOne(`${baseUrl}/${todo.todoId}`, HttpMethod.PUT);
    expect(request.request.body).toEqual({description: todo.description});

    request.flush(todo);
  });

  it('createTodo calls expected endpoint with expected body', () => {
    spectator.service.createTodo(todo.description).subscribe(res => {
      expect(res).toEqual(todo)
    });

    let request = spectator.expectOne(baseUrl, HttpMethod.POST);
    expect(request.request.body).toEqual({description: todo.description});

    request.flush(todo);
  })
})
;
