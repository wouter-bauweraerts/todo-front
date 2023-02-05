import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoreSandbox} from '../modules/core/sandboxes/core.sandbox';
import {SnackbarService} from '../modules/core/services/snackbar.service';
import {filter, skip, Subscription, tap} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'todo-front';

  private subscriptions: Subscription[] = [];

  constructor(private coreSb: CoreSandbox,
              private snackbarService: SnackbarService
  ) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.coreSb.error$.pipe(
        filter(e => !!e),
      ).subscribe(e => this.snackbarService.handle(e))
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
}
