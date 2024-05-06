import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonMainComponent } from '../button-main/button-main.component';
import { ButtonConfirmComponent } from '../button-confirm/button-confirm.component';
import { ModalService } from '../../service/modal-service/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent, ButtonMainComponent, ButtonConfirmComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  constructor(public modalService: ModalService) { }

  openModal() {
    this.modalService.openModal();
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
