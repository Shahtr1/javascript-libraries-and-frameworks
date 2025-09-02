import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TrackByFunction,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/core/in-memory-data.service';
import { ToInrPipe } from 'src/app/shared/pipes/to-inr.pipe';
import {
  LoadProducts,
  SaveProduct,
  SelectProduct,
} from 'src/app/state-ngxs/products-ngxs.actions';
import { ProductsState } from 'src/app/state-ngxs/products-ngxs.state';

@Component({
  standalone: true,
  selector: 'app-products-browser',
  templateUrl: './products-browser-ngxs.component.html',
  imports: [CommonModule, ReactiveFormsModule, ToInrPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsBrowserComponent implements OnInit {
  // Selectors
  @Select(ProductsState.items) items$!: Observable<Product[]>;
  @Select(ProductsState.selected) selected$!: Observable<Product | null>;

  selectedName$ = this.selected$.pipe(map((s) => s?.name ?? '—'));

  form = this.fb.group({
    id: [null as number | null],
    name: ['', [Validators.required, Validators.minLength(2)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStock: [true],
  });

  saving = false;
  saved = false;

  trackById: TrackByFunction<Product> = (_i, p) => p.id;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    // Load once on first visit
    this.store.dispatch(new LoadProducts());

    // Keep form in sync with selected entity
    this.selected$.subscribe((sel) => {
      if (sel) {
        this.form.reset(sel); // patch full entity
        this.saved = false;
      } else {
        this.form.reset({ id: null, name: '', price: 0, inStock: true });
      }
    });
  }

  select(p: Product) {
    this.store.dispatch(new SelectProduct(p.id));
  }

  newProduct() {
    this.store.dispatch(new SelectProduct(null));
    this.form.reset({ id: null, name: '', price: 0, inStock: true });
  }

  save() {
    if (this.form.invalid) return;
    this.saving = true;
    this.store
      .dispatch(new SaveProduct(this.form.getRawValue() as Product))
      .subscribe({
        next: () => {
          this.saving = false;
          this.saved = true;
        },
        error: () => {
          this.saving = false;
        },
      });
  }

  reset() {
    const sel = this.store.selectSnapshot(ProductsState.selected);
    if (sel) this.form.reset(sel);
    else this.form.reset({ id: null, name: '', price: 0, inStock: true });
    this.saved = false;
  }
}
