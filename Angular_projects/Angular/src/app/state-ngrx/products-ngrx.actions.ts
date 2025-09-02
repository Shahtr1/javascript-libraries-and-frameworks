import { createAction, props } from '@ngrx/store';
import { Product } from '../core/in-memory-data.service';

export const loadProducts = createAction('[NGRX Products] Load');
export const loadProductsSuccess = createAction(
  '[NGRX Products] Load Success',
  props<{ items: Product[] }>(),
);
export const loadProductsFailure = createAction(
  '[NGRX Products] Load Failure',
  props<{ error: unknown }>(),
);

export const selectProduct = createAction(
  '[NGRX Products] Select',
  props<{ id: number | null }>(),
);

export const saveProduct = createAction(
  '[NGRX Products] Save',
  props<{ product: Product }>(),
);
export const saveProductSuccess = createAction(
  '[NGRX Products] Save Success',
  props<{ product: Product }>(),
);
export const saveProductFailure = createAction(
  '[NGRX Products] Save Failure',
  props<{ error: unknown }>(),
);
