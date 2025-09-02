import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-slot-card',
  templateUrl: './slot-card.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlotCardComponent implements AfterContentInit {
  // projected templates (parent provides via <ng-template #headerTpl> etc.)
  @ContentChild('headerTpl', { read: TemplateRef })
  headerTpl?: TemplateRef<unknown>;

  @ContentChild('footerTpl', { read: TemplateRef })
  footerTpl?: TemplateRef<unknown>;

  // What It Does:

  // Looks for <ng-template> elements in the parent component with the #headerTpl and #footerTpl template references.
  // If found, these templates are assigned to headerTpl and footerTpl.
  // Why It's Useful:

  // It allows the parent component to customize the header and footer of the card by providing its own templates.

  // local view references
  @ViewChild('searchInput', { static: false })
  searchInput?: ElementRef<HTMLInputElement>;
  // The @ViewChild decorator is used to get a reference to the search input field in the component's own template:
  //  What It Does:

  // Finds the <input> element with the #searchInput template reference in the component's HTML.
  // Stores a reference to it in the searchInput property as an ElementRef.
  // Why It's Useful:

  // Allows the component to programmatically interact with the input field (e.g., focus on it).

  ngAfterContentInit(): void {
    // here you could validate that header/footer were provided
    // console.log('has header?', !!this.headerTpl, 'has footer?', !!this.footerTpl);
  }

  focusSearch() {
    this.searchInput?.nativeElement?.focus();
  }
}
