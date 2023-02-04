import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TodoType} from '../../types/todo/todo.type';

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

  public loadIncompleteTodos(): Observable<TodoType[]> {
    return this.http.get<TodoType[]>('/api/todo/incomplete');
  }

  public updateTodo(todoId: number, description: string): Observable<TodoType> {
    return this.http.put<TodoType>(`/api/todo/${todoId}`, {description});
  }

  public createTodo(description: string): Observable<TodoType> {
    return this.http.post<TodoType>('/api/todo', {description});
  }
}
