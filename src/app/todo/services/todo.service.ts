import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TodoType} from '../../types/todo/todo.type';

@Injectable()
export class TodoService {
  constructor(private http: HttpClient) {
  }
  public loadTodos(): Observable<TodoType[]> {
    return this.http.get<TodoType[]>('/api/todo');
  }
}
