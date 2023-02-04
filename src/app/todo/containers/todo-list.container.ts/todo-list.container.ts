import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, Subscription} from 'rxjs';
import {TodoSandbox} from '../../sandboxes/todo.sandbox';
import {TodoDataSource} from '../../../types/todo/todo-datasource.type';
import {MatDialog} from '@angular/material/dialog';
import {TodoType} from '../../../types/todo/todo.type';
import {EditTodoComponent} from '../../components/edit-todo/edit-todo.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.container.html',
  styleUrls: ['./todo-list.container.scss']
})
export class TodoListContainer implements OnInit, OnDestroy {
  public readonly showAll$: Observable<boolean> = this.todoSb.showAll$;
  public readonly ds$: Observable<TodoDataSource> = this.todoSb.todos$.pipe(
    map(todos => {
      const ds = new TodoDataSource();
      ds.next(todos);
      return ds;
    })
  );

  private subscriptions: Subscription[] = [];

  constructor(private todoSb: TodoSandbox,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.showAll$.subscribe(showAll => {
      console.log(`Fetching todos. Show all? ${showAll}`)
      if (showAll) {
        this.todoSb.fetchTodos();
      } else {
        console.log('Fetch incomplete!')
        this.todoSb.fetchIncompleteTodos();
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onEdit(todo: TodoType) {
    const editDialog = this.dialog.open(
      EditTodoComponent,
      {
        data: {
          window: {
            title: 'Edit todo',
            cancel: 'Cancel',
            confirm: 'Update'
          },
          todo: {...todo}
        }
      }
    );

    this.subscriptions.push(editDialog.afterClosed().subscribe(todo => {
      if (!!todo) {
        this.todoSb.updateTodo(todo)
      }
    }));
  }

  onComplete(todoId: number) {
    this.todoSb.completeTodo(todoId);
  }

  showAllTodos(showAll: boolean) {
    this.todoSb.showAll(showAll);
  }

  openAddTodo() {
    const addTodoDialog = this.dialog.open(
      EditTodoComponent,
      {
        data: {
          window: {
            title: 'Add todo',
            cancel: 'Cancel',
            confirm: 'Submit'
          },
          todo: {
            todoId: -1,
            description: '',
            complete: false
          }
        }
      }
    );

    this.subscriptions.push(addTodoDialog.afterClosed().subscribe(todo => {
      if (!!todo) {
        this.todoSb.addTodo(todo)
      }
    }));
  }
}
