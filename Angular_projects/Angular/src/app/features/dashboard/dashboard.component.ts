import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DebounceClickDirective } from 'src/app/shared/directives/debounce-click.directive';
import { HasRoleDirective } from 'src/app/shared/directives/has-role.directive';
import { ToInrPipe } from 'src/app/shared/pipes/to-inr.pipe';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ToInrPipe, DebounceClickDirective],
})
export class DashboardComponent {
  clicked = 0;
  onClick(e: Event) {
    this.clicked++;
  }
}
