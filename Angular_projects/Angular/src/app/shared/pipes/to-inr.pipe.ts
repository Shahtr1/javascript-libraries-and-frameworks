import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toInr',
  standalone: true,
  pure: true,
})
export class ToInrPipe implements PipeTransform {
  private readonly fmt = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  });

  transform(value: number | null | undefined): string {
    if (value == null || Number.isNaN(value as number)) return '₹0.00';
    return this.fmt.format(Number(value));
  }
}
