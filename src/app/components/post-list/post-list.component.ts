import { Component, Input } from '@angular/core';
import { ButtonMainComponent } from '../button-main/button-main.component';
import { ModalService } from '../../service/model-service/modal.service';

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


  OpenModalToEdit() {
    this.modalService.openModal();
    this.modalService.modalTitle = 'editar post';
  }
}
