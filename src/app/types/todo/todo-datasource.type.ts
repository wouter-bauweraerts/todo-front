import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {TodoType} from './todo.type';
import {BehaviorSubject, Observable} from 'rxjs';

export class TodoDataSource implements DataSource<TodoType> {
  private subject = new BehaviorSubject<TodoType[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  connect(collectionViewer: CollectionViewer): Observable<TodoType[]> {
    return this.subject.asObservable();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  disconnect(collectionViewer: CollectionViewer) {
    this.subject.complete();
  }

  next(items: TodoType[]) {
    this.subject.next(items);
  }
}
