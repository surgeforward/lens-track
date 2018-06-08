import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullProfileViewComponent } from './full-profile-view.component';

describe('FullProfileViewComponent', () => {
  let component: FullProfileViewComponent;
  let fixture: ComponentFixture<FullProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FullProfileViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
