import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSelectorComponent } from './profile-selector/profile-selector.component';
import { SharedMaterialModule } from '../shared/material.module';
import { SharedFormsModule } from '../shared/forms.module';

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    SharedFormsModule,
  ],
  declarations: [ProfileSelectorComponent],
  exports: [ProfileSelectorComponent]
})
export class UserProfileManagementModule { }
