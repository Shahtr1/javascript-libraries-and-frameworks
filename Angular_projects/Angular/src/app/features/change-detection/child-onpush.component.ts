import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-child-onpush',
  imports: [CommonModule],
  template: `
    <div class="p-2 border rounded mb-2">
      <h6 class="mb-1">Child OnPush</h6>
      <div>Counter: <strong>{{ counter }}</strong></div>
      <div>Products length: <strong>{{ products.length }}</strong></div>
      <small class="text-muted">Only re-renders on @Input reference change, event, or async pipe tick.</small>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildOnPushComponent {
  @Input() counter = 0;
  @Input() products: ReadonlyArray<{ id: number; name: string }> = [];
}
