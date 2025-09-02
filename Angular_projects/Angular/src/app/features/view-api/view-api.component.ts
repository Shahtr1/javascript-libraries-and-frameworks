import { CommonModule } from '@angular/common';
import { SlotCardComponent } from './slot-card.component';
import { HighlightDirective } from 'src/app/shared/directives/highlight.directive';
import { ToInrPipe } from 'src/app/shared/pipes/to-inr.pipe';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';

type Item = { id: number; name: string; price: number };

@Component({
  standalone: true,
  selector: 'app-view-api-page',
  imports: [CommonModule, SlotCardComponent, HighlightDirective, ToInrPipe],
  templateUrl: './view-api.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewApi implements AfterContentInit, AfterViewInit {
  items: Item[] = [
    { id: 1, name: 'Alpha', price: 1299 },
    { id: 2, name: 'Bravo', price: 2599 },
  ];

  // child component instance (control it from parent)
  @ViewChild('card', { static: true }) card!: SlotCardComponent;

  // all the <li #row> references
  @ViewChildren('row', { read: ElementRef }) rows!: QueryList<
    ElementRef<HTMLLIElement>
  >;
  rowsCount = 0;

  // dynamic insertion point + template
  @ViewChild('dynamicHost', { read: ViewContainerRef, static: true })
  host!: ViewContainerRef;
  @ViewChild('banner', { read: TemplateRef, static: true })
  bannerTpl!: TemplateRef<{ count: number }>;

  ngAfterContentInit(): void {
    // Runs after content (header/footer templates) are projected into <app-slot-card>
  }

  ngAfterViewInit(): void {
    // Runs after our rows & dynamic host are in the view
    this.updateRowsCount();
    this.rows.changes.subscribe(() => this.updateRowsCount());
  }

  focusFromParent() {
    this.card.focusSearch(); // calls public method on child via ViewChild
  }

  add() {
    const id = Date.now();
    this.items = [
      ...this.items,
      { id, name: `New #${id % 10000}`, price: 999 },
    ];
  }

  prependDynamic() {
    this.host.clear();
    this.host.createEmbeddedView(this.bannerTpl, { count: this.items.length });
  }

  clearDynamic() {
    this.host.clear();
  }

  trackById = (_: number, it: Item) => it.id;

  private updateRowsCount() {
    this.rowsCount = this.rows.length;
  }
}
