import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {TodoDetailComponent} from './todo-detail.component';
import {FormBuilder} from '@angular/forms';
import {TodoType} from '../../../../types/todo/todo.type';
import {TodoModule} from '../../todo.module';
import {fakeAsync} from '@angular/core/testing';

const testTodo: TodoType = {
  todoId: 1,
  description: 'Lorem ipsum',
  complete: false
}

describe('The TodoDetailComponent', function () {
  const buttonsSelectedClass = 'mat-button-toggle-checked';
  let spectator: Spectator<TodoDetailComponent>;

  const createComponent = createComponentFactory({
    component: TodoDetailComponent,
    // shallow: true,
    imports: [TodoModule],
    providers: [
      FormBuilder
    ],
    detectChanges: true
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        todo: testTodo
      }
    })
  });

  it('should be created', function () {
    expect(spectator).toBeTruthy();
  });

  it('should show the closed lock icon as selected', function () {
    expect(spectator.query('#lock-toggle').getAttribute('ng-reflect-value')).toEqual('true');
    expect(spectator.query('#locked-button')).toHaveClass(buttonsSelectedClass);
    expect(spectator.query('#unlocked-button')).not.toHaveClass(buttonsSelectedClass);
  });

  it('should show the textbox as readonly', () => {
    expect(spectator.query('#description-input').getAttribute('readonly')).toBeTruthy();
  });

  it('should not show edit button', function () {
    expect(spectator.query('#btn-edit')).toBeFalsy();
  });

  it('should show the complete button', () => {
    expect(spectator.query('#btn-complete')).toBeTruthy();
  });

  it('should show the incomplete icon', () => {
    expect(spectator.query('#incomplete-icon')).toBeTruthy();
    expect(spectator.query('#complete-icon')).toBeFalsy();

  });

  describe('with an complete todo', () => {
    const complete = {
      ...testTodo,
      complete: true
    };

    beforeEach(() => {
      spectator.setInput({
        todo: complete
      })
    });

    it('should show not the complete button', () => {
      expect(spectator.query('#btn-complete')).toBeFalsy();
    });

    it('should show the complete icon', () => {
      expect(spectator.query('#complete-icon')).toBeTruthy();
      expect(spectator.query('#incomplete-icon')).toBeFalsy();
    });
  });

  describe('when clicking the open lock', () => {
    beforeEach(() => {
      spectator.click('#unlocked-button');
      spectator.detectChanges();
    });

    it('the open lock should be selected', () => {
      expect(spectator.query('#lock-toggle').getAttribute('ng-reflect-value')).toEqual('false');
      expect(spectator.query('#unlocked-button')).toHaveClass(buttonsSelectedClass);
      expect(spectator.query('#locked-button')).not.toHaveClass(buttonsSelectedClass);
    });

    it('the textbox should be editable', () => {
      expect(spectator.query('#description-input')).not.toHaveAttribute('readonly');
    });

    it('the edit button should be visible', () => {
      expect(spectator.query('#btn-edit')).toBeTruthy();
    });

    describe('when changing the description and clicking edit', () => {
      const newDescription = 'Some great new description';
      beforeEach(() => {
        spectator.typeInElement(newDescription, '#description-input')
      })

      it('should emit the expected event', fakeAsync(() => {
        let event;
        spectator.output('editTodo').subscribe(e => event = e);

        expect(spectator.component.detailForm.get('description').value).toEqual(newDescription);
        expect(spectator.component.detailForm.dirty).toBeTruthy();

        spectator.click('#btn-edit');

        spectator.tick(1000);

        expect(event).toEqual({
          ...testTodo,
          description: newDescription
        });
      }));
    });

    describe('after clicking the lock again', () => {
      beforeEach(() => {
        spectator.click('#locked-button');
        spectator.detectChanges();
      });

      it('should return to it\'s original state', () =>{
        expect(spectator.query('#lock-toggle').getAttribute('ng-reflect-value')).toEqual('true');
        expect(spectator.query('#locked-button')).toHaveClass(buttonsSelectedClass);
        expect(spectator.query('#unlocked-button')).not.toHaveClass(buttonsSelectedClass);
      });
    });
  });

  describe('when clicking the complete button', () => {
    it('emits the expected event', fakeAsync(() => {
      let event;
      spectator.output('completeTodo').subscribe(e => event = e);

      spectator.click('#btn-complete');
      spectator.detectChanges();

      spectator.tick(1000);

      expect(event).toEqual(testTodo.todoId);
    }));
  });
});
