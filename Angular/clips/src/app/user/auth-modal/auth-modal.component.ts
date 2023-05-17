import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
})
export class AuthModalComponent implements OnInit, OnDestroy {
  private modalId = 'auth';

  constructor(public modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.register(this.modalId);
  }

  ngOnDestroy() {
    this.modalService.unregister(this.modalId);
  }
}
