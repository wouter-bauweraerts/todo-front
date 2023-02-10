import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatRadioChange} from '@angular/material/radio';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss']
})
export class TodoFilterComponent {
  @Input()
  showAll = true;
  @Output()
  changeShowAll: EventEmitter<boolean> = new EventEmitter<boolean>();

  onCompleteFilter(radio: MatRadioChange) {
    this.changeShowAll.next(radio.value as boolean);
  }
}
