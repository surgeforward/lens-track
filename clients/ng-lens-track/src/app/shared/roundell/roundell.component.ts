import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-roundell',
  templateUrl: './roundell.component.html',
  styleUrls: ['./roundell.component.scss']
})
export class RoundellComponent {
  @Input() diameter = '50px';

  @Input() backgroundColor;

  @Input() cssClasses = {};
}
