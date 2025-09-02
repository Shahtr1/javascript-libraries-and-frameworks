import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService, Role } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'resume-ng';

  roles: Role[][] = [
    ['user'],
    ['user', 'manager'],
    ['admin'],
    ['user', 'admin'],
  ];

  selectedRoles: Role[] = this.roles[0];

  constructor(public auth: AuthService) {}
}
