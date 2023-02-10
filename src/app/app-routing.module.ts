import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoListContainerComponent} from './modules/todo/containers/todo-list.container.ts/todo-list-container.component';
import {TodoContainerComponent} from './modules/todo/containers/todo-container/todo-container.component';

const routes: Routes = [
  {path: '', redirectTo: 'todo', pathMatch: 'full'},
  {path: 'todo', component: TodoListContainerComponent},
  {path: 'todo/:id', component: TodoContainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
