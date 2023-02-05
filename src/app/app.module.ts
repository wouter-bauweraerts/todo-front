import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TodoModule} from './modules/todo/todo.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {initialState, reducerFactory} from './statemanagement/reducers/reducers';
import {TodoEffects} from './statemanagement/effects/todo.effects';
import {HttpClientModule} from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {MatIconModule} from '@angular/material/icon';
import {CoreModule} from './modules/core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    TodoModule,
    StoreModule.forRoot(undefined, {
      initialState,
      reducerFactory
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([TodoEffects]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
