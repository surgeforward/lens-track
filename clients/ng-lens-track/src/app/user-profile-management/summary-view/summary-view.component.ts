import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProfileSettingsComponent } from '../profile-settings/profile-settings.component';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.scss'],
})
export class SummaryViewComponent {
  constructor(private _dialogService: MatDialog) {}

  openSettingsDialog() {
    this._dialogService.open(ProfileSettingsComponent);
  }
}
