import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

// A tiny DOM directive (ElementRef + Renderer2)
@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input('appHighlight') color: string = '#fff3cd'; // soft yellow

  constructor(
    private el: ElementRef<HTMLElement>,
    private r: Renderer2,
  ) {}

  @HostListener('mouseenter') onEnter() {
    this.r.setStyle(this.el.nativeElement, 'background', this.color);
  }
  @HostListener('mouseleave') onLeave() {
    this.r.removeStyle(this.el.nativeElement, 'background');
  }
}
