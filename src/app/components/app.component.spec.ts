import {AppComponent} from './app.component';
import {createComponentFactory, Spectator} from '@ngneat/spectator';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    shallow: true,
  });

  beforeEach(() => spectator = createComponent({
    detectChanges: false
  }))

  it('should create the app', () => {
    expect(spectator).toBeTruthy();
  });

  it(`should have as title 'todo-front'`, () => {
    const app = spectator.fixture.componentInstance;
    expect(app.title).toEqual('todo-front');
  });

});
