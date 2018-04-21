import {
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSelectModule,
  MatDatepickerModule,
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgModule } from '@angular/core';

const importExports = [
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSelectModule,
  MatDatepickerModule,
  MatMomentDateModule,
];

@NgModule({
  imports: [...importExports],
  exports: [...importExports],
})
export class SharedMaterialModule { }
