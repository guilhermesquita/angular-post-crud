import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonMainComponent } from '../button-main/button-main.component';
import { ButtonConfirmComponent } from '../button-confirm/button-confirm.component';
import { ModalService } from '../../service/modal-service/modal.service';
import { Post } from '../../models/Post';
import { PostService } from '../../service/post-service/post.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent, ButtonMainComponent, ButtonConfirmComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  constructor(public modalService: ModalService, public postService: PostService) { }
  posts: Post[] = [];

  openModal() {
    this.modalService.openModal();
  }

  closeModal() {
    this.modalService.closeModal();
  }

  foundMethod(post: Post) {
    if (this.postService.method === 'POST') {
      let localPosts = new Array<Post>();
      const storedPosts = localStorage.getItem('posts');

      if (storedPosts !== null) {
        localPosts = JSON.parse(storedPosts);
        localPosts.push({
          title: post.title,
          id: localPosts.length + 1,
          body: post.body,
          userId: 101,
        });
        localStorage.setItem('posts', JSON.stringify(localPosts));
        window.location.reload();
      } else {
        this.postService.createPost(post)
      }
      this.modalService.closeModal();
    }
    if (this.postService.method === 'PUT') {
      let localPosts = new Array<Post>();
      const storedPosts = localStorage.getItem('posts');

      if (storedPosts) {
        const id = this.postService.id_post
        localPosts = JSON.parse(storedPosts);
        const itemIndex = localPosts.findIndex(function (item) {
          return item.id === Number(id)
        });

        if (itemIndex !== -1) {
          localPosts[itemIndex] = {
            id: localPosts[itemIndex].id,
            title: post.title || localPosts[itemIndex].title,
            body: post.body || localPosts[itemIndex].body
          }

          localStorage.setItem('posts', JSON.stringify(localPosts));
          this.postService.id_post = '';
          window.location.reload();
        }
      }else {
        this.postService.updatePost(post)
      }
      this.modalService.closeModal();
    }

  };
}
