import { RouterModule, Routes } from '@angular/router';

import { LensCalendarComponent } from './lens-calendar/lens-calendar.component';

export const routes: Routes = [
  { path: 'lens-calendar', component: LensCalendarComponent },
  { path: '', redirectTo: '/lens-calendar', pathMatch: 'full' }
];
