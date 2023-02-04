import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { TodoTableComponent } from './todo-table.component';
import {TodoType} from '../../../types/todo/todo.type';
import {TodoDataSource} from '../../../types/todo/todo-datasource.type';
import {By} from '@angular/platform-browser';
import {todoReducer} from '../../../statemanagement/reducers/todo.reducer';

describe('TodoTableComponent', () => {
  let component: TodoTableComponent;
  let fixture: ComponentFixture<TodoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
