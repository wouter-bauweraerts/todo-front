import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoListContainer} from './todo/containers/todo-list.container.ts/todo-list.container';

const routes: Routes = [
  {path: '', redirectTo: 'todo', pathMatch: 'full'},
  {path: 'todo', component: TodoListContainer}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
