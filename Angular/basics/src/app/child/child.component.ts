import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ProjectedContentDirective } from '../app.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  // In the component you want to project content into, use @ContentChild to get the template of the projected content.
  @ContentChild(ProjectedContentDirective) content!: ProjectedContentDirective;

  @Input() post = '';

  constructor() {
    console.log('constructor called');
  }

  ngOnChanges(): void {
    console.log('ngOnChanges called');
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    // whenever changes are done in our component, its guaranteed to run once
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called');
    //   after a change detection cycle has occurred
    //   it performs updates when angular misses it or doesn't want to
    //   it runs whenever change detection occurs
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
  }

  ngOnDestroy() {
    console.log('destroy called');
  }
}
