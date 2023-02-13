import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoSandbox} from '../../sandboxes/todo.sandbox';
import {map, Observable, Subscription, tap} from 'rxjs';
import {TodoType} from '../../../../types/todo/todo.type';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss']
})
export class TodoContainerComponent implements OnInit, OnDestroy {

  public readonly todo$: Observable<TodoType> = this.todoSb.selectedTodo$;
  private subscriptions: Subscription[] = [];

  constructor(private todoSb: TodoSandbox,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscriptions.push(this.route.paramMap.pipe(
      map(params => params.get('id'))
    ).subscribe(todoId => this.todoSb.fetchTodo(+todoId)));
  }

  ngOnDestroy() {
    this.todoSb.clearTodo()
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  edit(todo: TodoType) {
    this.todoSb.updateTodo(todo)
  }

  complete(todoId: number) {
    this.todoSb.completeTodo(todoId)
  }
}
