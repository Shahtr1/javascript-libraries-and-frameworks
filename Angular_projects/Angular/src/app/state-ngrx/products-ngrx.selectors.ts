import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, ProductsNgrxState } from './products-ngrx.reducer';

export const PRODUCTS_NGRX_FEATURE = 'productsNgrx';
export const selectFeature = createFeatureSelector<ProductsNgrxState>(
  PRODUCTS_NGRX_FEATURE,
);

const { selectAll, selectEntities } = adapter.getSelectors(selectFeature);

export const selectAllProducts = selectAll;
export const selectProductEntities = selectEntities;
export const selectSelectedId = createSelector(
  selectFeature,
  (s) => s.selectedId,
);
export const selectSelectedProduct = createSelector(
  selectProductEntities,
  selectSelectedId,
  (entities, id) => (id != null ? (entities[id] ?? null) : null),
);
export const selectLoading = createSelector(selectFeature, (s) => s.loading);
