import { TestBed, async, inject } from '@angular/core/testing';

import { UserProfileGuard } from './user-profile.guard';

describe('UserProfileGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserProfileGuard]
    });
  });

  it('should ...', inject([UserProfileGuard], (guard: UserProfileGuard) => {
    expect(guard).toBeTruthy();
  }));
});
