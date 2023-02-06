import {byTestId, createComponentFactory, mockProvider, Spectator} from '@ngneat/spectator';
import {EditTodoComponent} from './edit-todo.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TodoDialog} from '../../../../types/todo/todo-dialog.type';

const dialog: TodoDialog = {
  todo: {
    todoId: 1,
    description: 'Todo description',
    complete: false
  },
  window: {
    title: 'Test title',
    cancel: 'Test cancel',
    confirm: 'Test confirm'
  }
}

describe('The EditTodoComponent', () => {
  let spectator: Spectator<EditTodoComponent>;

  const createComponent = createComponentFactory({
    component: EditTodoComponent,
    shallow: true,
    providers: [
      mockProvider(MatDialogRef<EditTodoComponent>),
      { provide: MAT_DIALOG_DATA, useValue: dialog}
    ],
    detectChanges: true
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  describe('checking the dialog components', () => {
    it('shows the correct title', () => {
      expect(spectator.query(byTestId('dialog-title')).textContent).toEqual(dialog.window.title);
    });

    it('shows the cancel text', () => {
      expect(spectator.query(byTestId('cancel-button')).textContent).toEqual(dialog.window.cancel);
    });

    it('shows the cancel text', () => {
      expect(spectator.query(byTestId('confirm-button')).textContent).toEqual(dialog.window.confirm);
    });
  });

  it('clicking cancel closes the dialog', () => {
    const dialog = spectator.inject(MatDialogRef);

    spectator.click(byTestId('cancel-button'));

    expect(dialog.close).toHaveBeenCalled();
  })
});
