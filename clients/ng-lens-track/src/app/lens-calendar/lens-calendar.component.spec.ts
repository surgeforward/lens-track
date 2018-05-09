import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LensCalendarComponent } from './lens-calendar.component';

describe('LensCalendarComponent', () => {
  let component: LensCalendarComponent;
  let fixture: ComponentFixture<LensCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LensCalendarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LensCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
