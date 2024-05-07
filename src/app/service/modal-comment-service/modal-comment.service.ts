import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalCommentService {
  modalCommentOpen: boolean = false;
  modalTitle: string = "";

  openModal() {
    this.modalCommentOpen = true;
  }

  closeModal() {
    this.modalCommentOpen = false;
  }
}