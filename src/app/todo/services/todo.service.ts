import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TodoType} from '../../types/todo/todo.type';
import {TodoSandbox} from '../sandboxes/todo.sandbox';

@Injectable()
export class TodoService {
  constructor(private http: HttpClient) {
  }
  public loadTodos(): Observable<TodoType[]> {
    return this.http.get<TodoType[]>('/api/todo');
  }

  public completeTodo(todoId: number): Observable<TodoType> {
    return this.http.put<TodoType>(`/api/todo/complete/${todoId}`, {});
  }
}
