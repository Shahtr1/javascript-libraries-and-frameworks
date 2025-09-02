import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as A from './products-ngrx.actions';
import { catchError, concatMap, exhaustMap, map, of } from 'rxjs';
import { ApiService } from '../core/api.service';

@Injectable()
export class ProductsNgrxEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.loadProducts),
      exhaustMap(() =>
        this.api.listProducts().pipe(
          map((items) => {
            console.log('Items' + items);
            return A.loadProductsSuccess({ items });
          }),
          catchError((error) => of(A.loadProductsFailure({ error }))),
        ),
      ),
    ),
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(A.saveProduct),
      concatMap(({ product }) =>
        this.api.upsertProduct(product).pipe(
          map((saved) => A.saveProductSuccess({ product: saved })),
          catchError((error) => of(A.saveProductFailure({ error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private api: ApiService,
  ) {}
}
