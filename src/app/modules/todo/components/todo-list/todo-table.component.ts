import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoDataSource} from '../../../../types/todo/todo-datasource.type';
import {TodoType} from '../../../../types/todo/todo.type';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent {


  @Input()
  public ds?: TodoDataSource | undefined | null;
  @Output()
  complete = new EventEmitter<number>();
  @Output()
  edit = new EventEmitter<TodoType>();
}
