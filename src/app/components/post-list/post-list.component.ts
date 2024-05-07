import { Component, Input } from '@angular/core';
import { ButtonMainComponent } from '../button-main/button-main.component';
import { ModalService } from '../../service/modal-service/modal.service';
import { PostService } from '../../service/post.service';
import { Post } from '../../service/Post';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [ButtonMainComponent, CommentsComponent],
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

  deletePost() {
    let localPosts = new Array<Post>();
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      this.postService.id_post = this.id_post;
      const id = this.postService.id_post 
      localPosts = JSON.parse(storedPosts);
      const filtered = localPosts.filter(item => item.id !== Number(id));
      localStorage.setItem('posts', JSON.stringify(filtered));
      window.location.reload();
    }else{
      this.postService.deletePost(Number(this.id_post));
    }
  }
}
