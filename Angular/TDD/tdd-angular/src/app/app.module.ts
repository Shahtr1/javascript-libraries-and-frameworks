import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRouterModule } from './router/app-router.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, SignUpComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    AppRouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
