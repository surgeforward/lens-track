import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AutoFocusDirective } from './auto-focus.directive';
import { By } from 'protractor';

@Component({
  selector: 'app-test-component',
  template: '<input appAutoFocus>',
})
class TestComponent {
}

describe('AutoFocusDirective', () => {
  let directive: AutoFocusDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutoFocusDirective, TestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(TestComponent);
    const directiveEl = fixture.debugElement.query(By.directive(AutoFocusDirective));

    expect(directiveEl).toBeTruthy();

    directive = directiveEl.injector.get(AutoFocusDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
