import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, Subscription} from 'rxjs';
import {TodoSandbox} from '../../sandboxes/todo.sandbox';
import {TodoDataSource} from '../../../types/todo/todo-datasource.type';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.container.html',
  styleUrls: ['./todo-list.container.scss']
})
export class TodoListContainer implements OnInit, OnDestroy {
  public readonly showAll$: Observable<boolean> = this.todoSb.showAll$;
  public readonly ds$: Observable<TodoDataSource> = this.todoSb.todos$.pipe(
    map(todos => {
      const ds = new TodoDataSource();
      ds.next(todos);
      return ds;
    })
  );

  private subscriptions: Subscription[] = [];

  constructor(private todoSb: TodoSandbox) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.showAll$.subscribe(showAll => {
      console.log(`Fetching todos. Show all? ${showAll}`)
      if (showAll) {
        this.todoSb.fetchTodos();
      } else {
        console.log('Fetch incomplete!')
        this.todoSb.fetchIncompleteTodos();
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onComplete(todoId: number) {
    this.todoSb.completeTodo(todoId);
  }

  showAllTodos(showAll: boolean) {
    this.todoSb.showAll(showAll);
  }
}
