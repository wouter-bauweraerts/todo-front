import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {TodoType} from './todo.type';
import {BehaviorSubject, Observable} from 'rxjs';

export class TodoDataSource implements DataSource<TodoType> {
  private subject = new BehaviorSubject<TodoType[]>([]);

  connect(collectionViewer: CollectionViewer): Observable<TodoType[]> {
    return this.subject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer) {
    this.subject.complete();
  }

  next(items: TodoType[]) {
    this.subject.next(items);
  }
}
