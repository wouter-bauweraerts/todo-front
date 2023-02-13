import {TodoTableComponent} from './todo-table.component';
import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {TodoModule} from '../../todo.module';
import {TodoType} from '../../../../types/todo/todo.type';
import {TodoDataSource} from '../../../../types/todo/todo-datasource.type';
import {RouterTestingModule} from '@angular/router/testing';
import {fakeAsync} from '@angular/core/testing';

const datasource = new TodoDataSource();

describe('TodoTableComponent', () => {
  let spectator: Spectator<TodoTableComponent>;

  const createComponent = createComponentFactory({
    component: TodoTableComponent,
    shallow: true,
    imports: [TodoModule, RouterTestingModule]
  });

    const items: TodoType[] = [
      {
        todoId: 4,
        description: 'Dance on the ceiling',
        complete: false
      }
    ]

    beforeEach(() => {
      spectator = createComponent({
        props: {
          ds: datasource
        }
      });

      datasource.next(items);
      spectator.detectChanges();
    });

    it('should create expected table', fakeAsync(() => {
      spectator.tick(1000);
      spectator.detectChanges();

      expect(spectator).toBeTruthy();
      expect(spectator.queryAll('.mat-mdc-row')).toHaveSize(1);

      let columnHeaders = spectator.queryAll('.mat-mdc-header-cell')

      expect(columnHeaders).toHaveSize(2);
      expect(columnHeaders).toContainText(['Complete', 'Description']);
    }));
});
