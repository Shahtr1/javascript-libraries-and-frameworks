import { Component, OnInit } from '@angular/core';
import { first, Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-rxjs-practice',
  templateUrl: './rxjs-practice.component.html',
  styles: [],
})
export class RxjsPracticeComponent implements OnInit {
  subscriber?: Subscriber<string>;

  observable = new Observable<string>((sub) => {
    this.subscriber = sub;
  });

  message = 'No message';

  constructor() {}

  ngOnInit(): void {}

  subscribe() {
    this.observable.subscribe({
      next: (data) => {
        this.message = data;
      },
      complete: () => {
        this.message = 'Completed';
      },
      error: (err) => (this.message = err.message),
    });

    //   sometimes we only need one data to be pulled from subscription
    // this.observable.pipe(first()).subscribe((data) => (this.message = data));
  }

  publish() {
    this.subscriber?.next('' + Math.random() * 100);
  }

  complete() {
    this.subscriber?.complete();
  }

  error() {
    this.subscriber?.error(new Error('dummy error'));
  }
}
