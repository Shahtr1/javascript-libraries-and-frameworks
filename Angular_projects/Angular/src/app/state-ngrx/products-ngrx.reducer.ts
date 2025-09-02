import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from '../core/in-memory-data.service';
import { createReducer, on } from '@ngrx/store';
import * as Actions from './products-ngrx.actions';

export interface ProductsNgrxState extends EntityState<Product> {
  selectedId: number | null;
  loading: boolean;
}

export const adapter = createEntityAdapter<Product>({ selectId: (p) => p.id });
export const initialState: ProductsNgrxState = adapter.getInitialState({
  selectedId: null,
  loading: false,
});

export const productsNgrxReducer = createReducer(
  initialState,
  on(Actions.loadProducts, (s) => ({ ...s, loading: true })),
  on(Actions.loadProductsSuccess, (s, { items }) =>
    adapter.setAll(items, { ...s, loading: false }),
  ),
  on(Actions.loadProductsFailure, (s) => ({ ...s, loading: false })),
  on(Actions.selectProduct, (s, { id }) => ({ ...s, selectedId: id })),
  on(Actions.saveProductSuccess, (s, { product }) =>
    adapter.upsertOne(product, s),
  ),
);
