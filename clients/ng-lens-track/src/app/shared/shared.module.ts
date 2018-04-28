import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFormsModule } from './forms.module';
import { AppMaterialModule } from './material.module';
import { AutoFocusDirective } from './directives/auto-focus.directive';

const importExports = [
  CommonModule,
  AppFormsModule,
  AppMaterialModule
];

@NgModule({
  imports: [...importExports],
  exports: [
    ...importExports,
    AutoFocusDirective,
  ],
  declarations: [
    AutoFocusDirective,
  ]
})
export class AppSharedModule { }
