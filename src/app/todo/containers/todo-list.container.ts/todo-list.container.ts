import {Component, OnInit} from '@angular/core';
import {map, Observable} from 'rxjs';
import {TodoSandbox} from '../../sandboxes/todo.sandbox';
import {TodoDataSource} from '../../../types/todo/todo-datasource.type';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.container.html',
  styleUrls: ['./todo-list.container.scss']
})
export class TodoListContainer implements OnInit{
  public readonly ds$: Observable<TodoDataSource> = this.todoSb.todos$.pipe(
    map(todos => {
      const ds = new TodoDataSource();
      ds.next(todos);
      return ds;
    })
  );

  constructor(private todoSb: TodoSandbox) {
  }

  ngOnInit(): void {
    this.todoSb.fetchTodos();
  }

  onComplete(todoId: number) {
    this.todoSb.completeTodo(todoId);
  }
}
