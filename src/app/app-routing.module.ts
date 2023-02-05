import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoListContainer} from './modules/todo/containers/todo-list.container.ts/todo-list.container';
import {TodoContainer} from './modules/todo/containers/todo-container/todo.container';

const routes: Routes = [
  {path: '', redirectTo: 'todo', pathMatch: 'full'},
  {path: 'todo', component: TodoListContainer},
  {path: 'todo/:id', component: TodoContainer}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
