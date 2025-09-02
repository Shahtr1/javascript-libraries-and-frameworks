```scss
Component → Action → Reducer & Effects → (API) → Reducer → Store → Component
```

Step 1 — Component starts up

In ngOnInit() of your ProductsBrowserNgrxComponent you have:

```ts
this.store.dispatch(A.loadProducts());
```

“Hey NgRx, tell everyone that the loadProducts event just happened.”

That “event” is your action:

```ts
export const loadProducts = createAction("[NGRX Products] Load");
```

Step 2 — Effect hears the action

Your `ProductsNgrxEffects` has:

```ts
this.actions$.pipe(
  ofType(A.loadProducts),
  exhaustMap(() => this.api.listProducts() ... )
)
```

- `actions$` is a stream of every action in your app.
- `ofType(A.loadProducts)` says: “Only react if the action is loadProducts.”
- When that happens, `exhaustMap` calls your API service method:

Step 3 — API responds

If it succeeds:

```ts
map((items) => A.loadProductsSuccess({ items }));
```

This creates a new action:

```ts
{ type: '[NGRX Products] Load Success', items: [...] }
```

NgRx automatically sends this action into your reducers.

If it fails:

```ts
catchError((error) => of(A.loadProductsFailure({ error })));
```

It sends a “failure” action instead.

Step 4 — Reducer updates state

Your `productsNgrxReducer` listens for `loadProductsSuccess`:

```ts
on(Actions.loadProductsSuccess, (state, { items }) => adapter.setAll(items, { ...state, loading: false }));
```

1.  Clears the old products list.
2.  Fills it with the new `items`.
3.  Sets `loading` to `false`.

The reducer always returns a new state object — never mutates.

Step 5 — Selectors read from state

Your component has:

```ts
items$ = this.store.select(selectAllProducts);
loading$ = this.store.select(selectLoading);
selected$ = this.store.select(selectSelectedProduct);
```

These selectors are pure functions that grab specific slices of state:

```ts
export const selectAllProducts = adapter.getSelectors(selectFeature).selectAll;
export const selectLoading = createSelector(selectFeature, (s) => s.loading);
```

Full loop

```arduino
Component dispatches action
        ↓
Effect hears it, calls API
        ↓
Effect dispatches success/fail action
        ↓
Reducer updates the store
        ↓
Selectors re-run, component gets new data
        ↓
UI updates automatically
```
