import { Directive, ElementRef, Input, OnInit, HostBinding } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective implements OnInit {
  private _focus = true;
  @Input()
  @HostBinding('autofocus')
  get appAutoFocus(): any {
    return this._focus;
  }
  set appAutoFocus(focus: any) {
    this._focus = !!focus || focus === '';
  }

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
    if (this.appAutoFocus) {
      this._elementRef.nativeElement.focus();
    }
  }
}
