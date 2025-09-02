import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-child-default',
  imports: [CommonModule],
  template: `
    <div class="p-2 border rounded mb-2">
      <h6 class="mb-1">Child Default</h6>
      <div>
        Counter: <strong>{{ counter }}</strong>
      </div>
      <div>
        Products length: <strong>{{ products.length }}</strong>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ChildDefaultComponent {
  @Input() counter = 0;
  @Input() products: ReadonlyArray<{ id: number; name: string }> = [];
}
