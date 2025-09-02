import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Product } from '../core/in-memory-data.service';
import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import {
  LoadProducts,
  SaveProduct,
  SelectProduct,
} from './products-ngxs.actions';
import { patch, updateItem } from '@ngxs/store/operators';
import { tap } from 'rxjs';

export interface ProductsModel {
  items: Product[];
  selectedId: number | null;
}

@State<ProductsModel>({
  name: 'products',
  defaults: { items: [], selectedId: null },
})
@Injectable()
export class ProductsState {
  constructor(private api: ApiService) {}

  @Selector() static items(s: ProductsModel) {
    return s.items;
  }
  @Selector() static selected(s: ProductsModel) {
    return s.items.find((i) => i.id === s.selectedId);
  }

  @Action(LoadProducts)
  load({ patchState }: StateContext<ProductsModel>) {
    return this.api.listProducts().pipe(tap((items) => patchState({ items })));
  }

  @Action(SelectProduct)
  select({ patchState }: StateContext<ProductsModel>, { id }: SelectProduct) {
    patchState({ selectedId: id });
  }

  @Action(SaveProduct)
  save(ctx: StateContext<ProductsModel>, { product }: SaveProduct) {
    return this.api.upsertProduct(product).pipe(
      tap((saved) => {
        const state = ctx.getState();
        const exists = state.items.some((i) => i.id === saved.id);
        ctx.setState(
          patch<ProductsModel>({
            items: exists
              ? updateItem<Product>((i) => i.id === saved.id, saved as Product)
              : [...state.items, saved],
            selectedId: saved.id ?? state.selectedId,
          }) as any,
        );
      }),
    );
  }
}
