import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import * as fromRoot from './reducers';
import { routes } from './routes';
import { AppSharedModule } from './shared/shared.module';
import { UserProfileManagementModule } from './user-profile-management/user-profile-management.module';

@NgModule({
  declarations: [AppComponent, MainNavbarComponent, LandingPageComponent],
  imports: [
    RouterModule.forRoot(routes, { enableTracing: !environment.production }),
    HttpClientModule,
    StoreModule.forRoot(fromRoot.reducers, {
      initialState: fromRoot.initialState,
      metaReducers: fromRoot.metaReducers,
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    UserProfileManagementModule,
    AppSharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
