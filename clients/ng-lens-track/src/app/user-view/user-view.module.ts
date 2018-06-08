import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppSharedModule } from '../shared/shared.module';
import { UserProfileManagementModule } from '../user-profile-management/user-profile-management.module';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { FullProfileViewComponent } from './full-profile-view/full-profile-view.component';
import { SummaryViewComponent } from './summary-view/summary-view.component';

const components = [
  CalendarViewComponent,
  FullProfileViewComponent,
  SummaryViewComponent,
];

@NgModule({
  imports: [CommonModule, AppSharedModule, UserProfileManagementModule],
  declarations: [...components],
  exports: [...components],
})
export class UserViewModule {}
