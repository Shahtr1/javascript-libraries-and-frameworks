import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime, fromEvent, Subject, takeUntil, tap } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';

@Component({
  standalone: true,
  selector: 'app-template-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './template-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateFormComponent implements AfterViewInit, OnDestroy {
  model = { name: '', email: '', topic: '', message: '' };
  submitting = false;
  submitted = false;

  private destroy$ = new Subject<void>();

  constructor(private api: ApiService) {}

  ngAfterViewInit(): void {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
        tap(() => {}),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  submit(form: NgForm) {
    if (form.invalid) return;
    this.submitting = true;
    this.api.submitContact(this.model).subscribe({
      next: () => {
        this.submitting = false;
        this.submitted = true;
        form.resetForm();
      },
      error: () => {
        this.submitting = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
