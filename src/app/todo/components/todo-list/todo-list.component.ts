import { Component, OnInit } from '@angular/core';
import {TodoSandbox} from '../../sandboxes/todo.sandbox';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(private todoSb: TodoSandbox) { }

  public todos$: Observable<any> = this.todoSb.todos$;

  ngOnInit(): void {
    this.todoSb.fetchTodos();
  }

}
