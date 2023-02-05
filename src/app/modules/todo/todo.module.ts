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
import {TodoFilterComponent} from './components/todo-filter/todo-filter.component';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {EditTodoComponent} from './components/edit-todo/edit-todo.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {TodoContainer} from './containers/todo-container/todo.container';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    TodoContainer,
    TodoListContainer,
    TodoTableComponent,
    TodoFilterComponent,
    EditTodoComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    RouterModule
  ],
  providers: [
    TodoSandbox,
    TodoService
  ],
  exports: [
    TodoListContainer,
    TodoContainer
  ]
})
export class TodoModule { }
