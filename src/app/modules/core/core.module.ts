import {NgModule} from '@angular/core';
import {CoreSandbox} from './sandboxes/core.sandbox';
import {SnackbarService} from './services/snackbar.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    MatSnackBarModule
  ],
  providers: [
    CoreSandbox,
    SnackbarService
  ]
})
export class CoreModule {
}
