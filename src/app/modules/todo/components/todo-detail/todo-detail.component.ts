import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TodoType} from '../../../../types/todo/todo.type';
import {FloatLabelType} from '@angular/material/form-field';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit, OnChanges {
  @Input()
  todo: TodoType;
  @Output()
  editTodo = new EventEmitter<TodoType>();
  @Output()
  complete = new EventEmitter<number>();

  detailForm: FormGroup;
  readonly floatLabel = 'auto' as FloatLabelType
  locked: boolean = true

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.buildForm()
  }

  private buildForm() {
    if (!!this.todo) {
      this.detailForm = this.fb.group({
        description: [
          `${this.todo.description}`, {}
        ]
      })
    }
  }

  setLocked(value: boolean) {
    this.locked = value;
  }

  sendEdit() {
    if (this.detailForm.dirty) {
      this.editTodo.next({
        ...this.todo,
        description: this.detailForm.get('description').value
      })
    }
  }
}
