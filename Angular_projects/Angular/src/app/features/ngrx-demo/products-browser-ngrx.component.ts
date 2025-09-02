import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/core/in-memory-data.service';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';
import {
  selectAllProducts,
  selectLoading,
  selectSelectedProduct,
} from 'src/app/state-ngrx/products-ngrx.selectors';
import * as A from 'src/app/state-ngrx/products-ngrx.actions';

@Component({
  selector: 'app-products-browser-ngrx',
  templateUrl: './products-browser-ngrx.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsBrowserNgrxComponent {
  items$ = this.store.select(selectAllProducts);
  selected$ = this.store.select(selectSelectedProduct);
  loading$ = this.store.select(selectLoading);

  form = this.fb.group({
    id: [null as number | null],
    name: ['', [Validators.required, Validators.minLength(2)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStock: [true],
  });

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    console.log('ngOnInit called');

    this.store.dispatch(A.loadProducts());
    this.selected$.subscribe((sel) => {
      if (sel) this.form.reset(sel);
      else this.form.reset({ id: null, name: '', price: 0, inStock: true });
    });
  }

  trackById = (_: number, p: Product) => p.id;

  select(p: Product) {
    this.store.dispatch(A.selectProduct({ id: p.id }));
  }

  newProduct() {
    this.store.dispatch(A.selectProduct({ id: null }));
    this.form.reset({ id: null, name: '', price: 0, inStock: true });
  }

  save() {
    if (this.form.invalid) return;
    this.store.dispatch(
      A.saveProduct({ product: this.form.getRawValue() as Product }),
    );
  }

  reset() {
    const sel = (this.store as any).source.value.productsNgrx; // quick peek if you want, or keep selected$ subscription only
    // Simpler: rely on selected$ subscription side-effect to reset when we re-dispatch select
    const current = (this as any).latestSelected as Product | null;
    if (current) this.form.reset(current);
    else this.form.reset({ id: null, name: '', price: 0, inStock: true });
  }
}
