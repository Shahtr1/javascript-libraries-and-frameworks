import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styles: [],
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() apiProgress = false;
  constructor() {}
}
