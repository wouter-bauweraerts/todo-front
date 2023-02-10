import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodoTableComponent} from './components/todo-list/todo-table.component';
import {TodoSandbox} from './sandboxes/todo.sandbox';
import {TodoService} from './services/todo.service';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {TodoListContainerComponent} from './containers/todo-list.container.ts/todo-list-container.component';
import {TodoFilterComponent} from './components/todo-filter/todo-filter.component';
import {MatRadioModule} from '@angular/material/radio';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditTodoComponent} from './components/edit-todo/edit-todo.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {TodoContainerComponent} from './containers/todo-container/todo-container.component';
import {RouterModule} from '@angular/router';
import {TodoDetailComponent} from './components/todo-detail/todo-detail.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';



@NgModule({
  declarations: [
    TodoContainerComponent,
    TodoListContainerComponent,
    TodoTableComponent,
    TodoFilterComponent,
    EditTodoComponent,
    TodoDetailComponent
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
    RouterModule,
    MatCardModule,
    MatButtonToggleModule,
    ReactiveFormsModule
  ],
  providers: [
    TodoSandbox,
    TodoService,
    FormBuilder
  ],
  exports: [
    TodoListContainerComponent,
    TodoContainerComponent
  ]
})
export class TodoModule { }
