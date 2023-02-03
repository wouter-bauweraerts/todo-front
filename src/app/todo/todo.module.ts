import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodoTableComponent} from './components/todo-list/todo-table.component';
import {TodoSandbox} from './sandboxes/todo.sandbox';
import {TodoService} from './services/todo.service';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {TodoListContainer} from './containers/todo-list.container.ts/todo-list.container';



@NgModule({
  declarations: [
    TodoListContainer,
    TodoTableComponent
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
