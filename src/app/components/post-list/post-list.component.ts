import { Component, Input } from '@angular/core';
import { ButtonMainComponent } from '../button-main/button-main.component';
import { ModalService } from '../../service/modal-service/modal.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [ButtonMainComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})

export class PostListComponent {
  constructor(public modalService: ModalService) { }

  @Input() title: string = "";
  @Input() description: string = "";
  @Input() btn_content: string = "";


  abrirModal() {
    this.modalService.openModal();
  }
}
