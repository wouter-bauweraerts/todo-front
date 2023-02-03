import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {TodoSandbox} from './sandboxes/todo.sandbox';
import {TodoService} from './services/todo.service';



@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    TodoSandbox,
    TodoService
  ]
})
export class TodoModule { }
