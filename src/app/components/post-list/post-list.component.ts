import { Component, Input } from '@angular/core';
import { ButtonMainComponent } from '../button-main/button-main.component';
import { ModalService } from '../../service/modal-service/modal.service';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [ButtonMainComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})

export class PostListComponent {
  constructor(public modalService: ModalService, public postService: PostService) { }

  @Input() title: string = "";
  @Input() description: string = "";
  @Input() btn_content: string = "";
  @Input() id_post: string = "";

  OpenModalToEdit() {
    this.postService.id_post = this.id_post;
    this.postService.method = 'PUT';
    this.modalService.openModal();
    this.modalService.modalTitle = 'editar post';
  }
}
