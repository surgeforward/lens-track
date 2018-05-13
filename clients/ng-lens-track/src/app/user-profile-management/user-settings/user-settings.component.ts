import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  changeFrequencyControl: FormControl = new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.min(1),
      Validators.pattern(/^\d+$/),
    ])
  );

  form: FormGroup = new FormGroup({
    changeFrequency: this.changeFrequencyControl,
  });

  constructor() {}

  ngOnInit() {}

  save() {
    // TODO: save!
  }
}
