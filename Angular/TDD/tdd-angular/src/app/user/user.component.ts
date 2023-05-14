import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/types';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [],
})
export class UserComponent implements OnInit {
  user!: User;

  status!: 'success' | 'fail' | 'inProgress';

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.status = 'inProgress';
      this.userService.getUserById$(params['id']).subscribe({
        next: (data) => {
          this.user = data as User;
          this.status = 'success';
        },
        error: () => {
          this.status = 'fail';
        },
      });
    });
  }
}
