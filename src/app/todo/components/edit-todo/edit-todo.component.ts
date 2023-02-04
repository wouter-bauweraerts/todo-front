import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TodoType} from '../../../types/todo/todo.type';
import {TodoDialog} from '../../../types/todo/todo-dialog.type';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent {
  constructor(
    public dialogRef: MatDialogRef<EditTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public dialog: TodoDialog,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
