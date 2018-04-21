import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../models/user-profile';

@Component({
  selector: 'app-profile-selector',
  templateUrl: './profile-selector.component.html',
  styleUrls: ['./profile-selector.component.scss']
})
export class ProfileSelectorComponent implements OnInit {
  userProfiles: UserProfile[];
  currentUser: UserProfile;

  constructor() { }

  ngOnInit() {
    this.userProfiles = [
      { name: 'Default user' }
    ];
    this.currentUser = this.userProfiles[0];
  }
}
