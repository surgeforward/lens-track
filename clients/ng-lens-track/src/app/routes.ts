import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserProfileGuard } from './shared/guards/user-profile.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: LandingPageComponent,
    canActivate: [UserProfileGuard],
    canActivateChild: [UserProfileGuard],
  },
  { path: 'landing-page', redirectTo: '/home', pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
