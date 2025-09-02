import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { UserComponent } from '../user/user.component';
import { ActivateComponent } from '../activate/activate.component';
import { RxjsPracticeComponent } from '../rxjs/rxjs-practice.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'rxjs', component: RxjsPracticeComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'activate/:id', component: ActivateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
