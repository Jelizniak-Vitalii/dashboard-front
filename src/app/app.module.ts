import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { effects, reducers } from './shared/state/app.states';
import { ErrorInterceptor } from './shared/interceptors';
import { AuthFacade } from './shared/state/facades';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './modules/auth/auth.module';

export function initAuth(authFacade: AuthFacade) {
  return () => authFacade.init();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument(),
    NgbModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [AuthFacade],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
