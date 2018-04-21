import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './routes';
import { AppComponent } from './app.component';
import { SharedMaterialModule } from './shared/material.module';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LensCalendarComponent } from './lens-calendar/lens-calendar.component';
import { UserProfileManagementModule } from './user-profile-management/user-profile-management.module';
import { SharedFormsModule } from './shared/forms.module';

@NgModule({
  declarations: [
    AppComponent,
    MainNavbarComponent,
    LandingPageComponent,
    LensCalendarComponent,
  ],
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: !environment.production }
    ),
    HttpModule,
    HttpClientModule,
    SharedFormsModule,
    SharedMaterialModule,
    StoreModule.forRoot(fromRoot.reducers, {
      initialState: fromRoot.initialState,
      metaReducers: fromRoot.metaReducers,
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    UserProfileManagementModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
