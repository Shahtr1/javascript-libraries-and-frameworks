import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRouterModule } from './router/app-router.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ActivateComponent } from './activate/activate.component';
import { RxjsPracticeComponent } from './rxjs/rxjs-practice.component';
import { UserListComponent } from './home/user-list/user-list.component';
import { UserListItemComponent } from './home/user-list-item/user-list-item.component';
import { ProfileCardComponent } from './user/profile-card/profile-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    ActivateComponent,
    RxjsPracticeComponent,
    UserListComponent,
    UserListItemComponent,
    ProfileCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    AppRouterModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
