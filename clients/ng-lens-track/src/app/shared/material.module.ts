import {
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSelectModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatDialogModule,
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgModule } from '@angular/core';

const importExports = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSelectModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatExpansionModule,
  MatDialogModule,
];

@NgModule({
  imports: [...importExports],
  exports: [...importExports],
})
export class AppMaterialModule {}
