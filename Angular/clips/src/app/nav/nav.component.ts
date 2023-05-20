import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  constructor(public modalService: ModalService, public auth: AuthService) {}

  openModal($event: Event) {
    $event.preventDefault();
    this.modalService.toggleModal('auth');
  }
}
