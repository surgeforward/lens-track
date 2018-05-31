import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFormsModule } from './forms.module';
import { AppMaterialModule } from './material.module';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { UserProfileGuard } from './guards/user-profile.guard';
import { RoundellComponent } from './roundell/roundell.component';

const importExports = [CommonModule, AppFormsModule, AppMaterialModule];
const declarations = [AutoFocusDirective, RoundellComponent];

@NgModule({
  imports: [...importExports],
  exports: [...importExports, ...declarations],
  declarations: [...declarations],
  providers: [UserProfileGuard],
})
export class AppSharedModule {}
