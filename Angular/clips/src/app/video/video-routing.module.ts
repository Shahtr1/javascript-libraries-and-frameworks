import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo('/');
// if the above data is present in route the guard will run the pipe function, it will only run if guard rejects the request

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    data: { authOnly: true, authGuardPipe: redirectUnauthorizedToHome },
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'upload',
    component: UploadComponent,
    data: { authOnly: true, authGuardPipe: redirectUnauthorizedToHome },
    canActivate: [AngularFireAuthGuard],
  },
  { path: 'manage-clips', redirectTo: 'manage' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoRoutingModule {}
