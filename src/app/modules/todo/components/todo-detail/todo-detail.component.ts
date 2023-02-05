import {Component, Input} from '@angular/core';
import {TodoType} from '../../../../types/todo/todo.type';
import {FloatLabelType} from '@angular/material/form-field';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent {
  @Input()
  todo: TodoType

  readonly floatLabel = 'auto' as FloatLabelType
  locked: boolean = true

  json(o: any): string {
    return JSON.stringify(o, null, 1)
  }
}
