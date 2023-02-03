import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {TodoSandbox} from '../../sandboxes/todo.sandbox';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {TodoType} from '../../../types/todo/todo.type';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  public todos$: Observable<TodoType[]> = this.todoSb.todos$;
  public ds: TodoDataSource = new TodoDataSource();
  private subscriptions: Subscription[] = [];

  constructor(private todoSb: TodoSandbox) {
  }

  ngOnInit(): void {
    this.todoSb.fetchTodos();

    this.subscriptions.push(
      this.todos$.subscribe(items => this.ds.next(items))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  complete(todoId: number) {
    this.todoSb.completeTodo(todoId)
  }

}


export class TodoDataSource implements DataSource<TodoType> {
  private subject = new BehaviorSubject<TodoType[]>([]);

  constructor() {
  }

  connect(collectionViewer: CollectionViewer): Observable<TodoType[]> {
    return this.subject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer) {
    this.subject.complete();
  }

  next(items: TodoType[]) {
    this.subject.next(items);
  }
}
