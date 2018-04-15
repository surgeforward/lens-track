import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatDatepickerModule,
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgModule } from '@angular/core';

const importExports = [
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatMomentDateModule,
];

@NgModule({
  imports: [...importExports],
  exports: [...importExports],
})
export class LensTrackMaterialModule { }
