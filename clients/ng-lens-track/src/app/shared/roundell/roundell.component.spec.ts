import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundellComponent } from './roundell.component';

describe('RoundellComponent', () => {
  let component: RoundellComponent;
  let fixture: ComponentFixture<RoundellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
