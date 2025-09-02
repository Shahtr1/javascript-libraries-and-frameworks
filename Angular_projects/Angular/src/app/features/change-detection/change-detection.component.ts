import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChildDefaultComponent } from './child-default.component';
import { ChildOnPushComponent } from './child-onpush.component';
import { ToInrPipe } from 'src/app/shared/pipes/to-inr.pipe';

type Product = { id: number; name: string; price: number };

@Component({
  standalone: true,
  selector: 'app-change-detection',
  imports: [
    CommonModule,
    ChildDefaultComponent,
    ChildOnPushComponent,
    ToInrPipe,
  ],
  templateUrl: './change-detection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeDetection {
  counter = 0;
  products: Product[] = [
    { id: 1, name: 'Widget A', price: 1299 },
    { id: 2, name: 'Widget B', price: 2599 },
  ];

  inc() {
    this.counter++;
  }

  mutate() {
    // Same array reference; OnPush child won't re-render for pure @Input reads
    this.products.push({ id: Date.now(), name: 'New (mutated)', price: 999 });
  }

  replace() {
    // New reference; OnPush child re-renders
    this.products = [
      ...this.products,
      { id: Date.now(), name: 'New (replaced)', price: 999 },
    ];
  }

  reset() {
    this.counter = 0;
    this.products = [
      { id: 1, name: 'Widget A', price: 1299 },
      { id: 2, name: 'Widget B', price: 2599 },
    ];
  }
}
