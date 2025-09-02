import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { Product } from './in-memory-data.service';

export type Id = number | string;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private refreshProducts$ = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  searchProducts(query: string): Observable<Product[]> {
    const params = new HttpParams().set('name', query);

    return this.http.get<Product[]>('/api/products', { params }).pipe(
      // in-memory-web-api doesn't support "name like" out of the box,
      // so filter on client to show RxJS usage
      map((list) =>
        list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
      ),
      shareReplay(1),
      catchError(() => of([])),
    );
  }

  listProducts(): Observable<Product[]> {
    return this.refreshProducts$.pipe(
      switchMap(() => this.http.get<Product[]>('/api/products')),
      shareReplay(1),
    );
  }

  upsertProduct(p: Product): Observable<Product> {
    return (
      p.id
        ? this.http.put<Product>(`/api/products/${p.id}`, p)
        : this.http.post<Product>('/api/products', p)
    ).pipe(
      tap(() => this.refreshProducts$.next()), // Trigger refresh after update
    );
  }

  submitContact(payload: any) {
    return this.http.post('/api/contacts', payload);
  }
}

// How shareReplay Works with Caching
// The shareReplay(1) operator is used to cache the latest result of the observable and share it with all subscribers. Here's how it works in this context:

// Caching the Latest Result:

// When the HTTP request completes, shareReplay(1) stores the result (the list of products).
// If another subscriber subscribes to listProducts() before a refresh is triggered, they receive the cached result immediately.
// Clearing the Cache:

// The cache is not explicitly cleared by shareReplay. Instead, it is replaced whenever the source observable (refreshProducts$) emits a new value.
// When refreshProducts$.next() is called (e.g., after adding or updating a product), switchMap triggers a new HTTP request, and shareReplay(1) updates its cache with the new result.
// Avoiding Redundant HTTP Requests:

// If multiple components or services subscribe to listProducts() at the same time, shareReplay(1) ensures that only one HTTP request is made. All subscribers share the same cached result.
