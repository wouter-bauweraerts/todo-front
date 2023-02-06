import {NgModule} from '@angular/core';
import {CoreSandbox} from './sandboxes/core.sandbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    MatSnackBarModule
  ],
  providers: [
    CoreSandbox
  ]
})
export class CoreModule {
}
