import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent, ProjectedContentDirective } from './app.component';
import { ChildComponent } from './child/child.component';

@NgModule({
  declarations: [AppComponent, ChildComponent, ProjectedContentDirective],
  imports: [BrowserModule],
  providers: [],

  bootstrap: [AppComponent],
})
export class AppModule {}
