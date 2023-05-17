import { Component, Directive, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}

@Directive({
  selector: '[conditionallyProjectedContent]',
})
export class ProjectedContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
