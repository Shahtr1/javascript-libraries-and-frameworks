import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { Product } from 'src/app/core/in-memory-data.service';
import { ToInrPipe } from 'src/app/shared/pipes/to-inr.pipe';

// Operators used: startWith, map, debounceTime, distinctUntilChanged, filter,
// switchMap, catchError, shareReplay, combineLatest, withLatestFrom, tap, takeUntil.

function nonNegative(ctrl: AbstractControl): ValidationErrors | null {
  return ctrl.value != null && ctrl.value >= 0 ? null : { nonNegative: true };
}

@Component({
  standalone: true,
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, ToInrPipe],
})
export class ReactiveFormComponent implements OnDestroy {
  searchCtrl = this.fb.control('', { nonNullable: true });
  form: FormGroup = this.fb.group({
    id: [],
    name: ['', [Validators.required, Validators.minLength(2)]],
    price: [0, [Validators.required, nonNegative]],
    inStock: [true],
  });

  private selected$ = new BehaviorSubject<Product | null>(null);
  private destroy$ = new Subject<void>();
  saving = false;
  saved = false;

  // live search stream
  results$ = this.searchCtrl.valueChanges.pipe(
    startWith(''),
    map((v) => v.trim()),
    debounceTime(250),
    distinctUntilChanged(),
    filter((v) => v.length >= 0), // allow empty to show all
    switchMap((query) =>
      query ? this.api.searchProducts(query) : this.api.listProducts(),
    ),
    catchError(() => of([] as Product[])),
    shareReplay(1),
  );

  vm$ = combineLatest([this.results$, this.selected$])
    .pipe(
      withLatestFrom(this.form.valueChanges.pipe(startWith(this.form.value))),
      tap(([[results, selected], _formValue]) => {
        if (selected) this.form.patchValue(selected, { emitEvent: false });
      }),
      takeUntil(this.destroy$),
    )
    .subscribe();

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
  ) {}

  select(p: Product) {
    this.selected$.next(p);
    this.saved = false;
  }

  save() {
    if (this.form.invalid) return;
    this.saving = true;
    const value = this.form.getRawValue() as Product;
    this.api
      .upsertProduct(value)
      .pipe(
        tap(() => {
          this.saving = false;
          this.saved = true;
        }),
        catchError(() => {
          this.saving = false;
          return of(null);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.vm$.unsubscribe();
  }
}
