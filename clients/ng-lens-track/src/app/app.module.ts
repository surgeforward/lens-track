import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { routes } from './routes';
import { AppComponent } from './app.component';
import { LensTrackMaterialModule } from './shared/material.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LensCalendarComponent } from './lens-calendar/lens-calendar.component';

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
    BrowserModule,
    BrowserAnimationsModule,
    LensTrackMaterialModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
