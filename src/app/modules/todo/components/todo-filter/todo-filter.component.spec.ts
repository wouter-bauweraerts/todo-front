import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {TodoFilterComponent} from './todo-filter.component';
import {MatRadioModule} from '@angular/material/radio';
import {fakeAsync, tick} from '@angular/core/testing';
import {TodoModule} from '../../todo.module';

describe('The TodoFilterComponent', () => {
  let spectator: Spectator<TodoFilterComponent>;

  const createComponent = createComponentFactory({
    component: TodoFilterComponent,
    imports: [TodoModule],
    shallow: true
  });

  beforeEach(() => spectator = createComponent())

  it('should be rendered', () => {
    expect(spectator).toBeTruthy();
  });

  [true, false].forEach(showAll => {
    let label = showAll ? 'all' : 'incomplete';
    it(`emit ${showAll} event when filter changed`, fakeAsync(() => {
      let selectedId = showAll ? '#radio-all-input' : '#radio-incomplete-input';
      let changeEvent

      spectator.output('changeShowAll').subscribe(newVal => changeEvent = newVal);

      spectator.setInput({
        showAll: !showAll
      });
      spectator.click(selectedId)
      spectator.detectChanges();

      tick(1000)

      expect(changeEvent).toEqual(showAll);
    }));
  })
});
