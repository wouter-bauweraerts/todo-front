import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {TodoSandbox} from './sandboxes/todo.sandbox';
import {TodoService} from './services/todo.service';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    TodoSandbox,
    TodoService
  ]
})
export class TodoModule { }
