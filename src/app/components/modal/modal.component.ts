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
      this.createOrUpdatePost(post, true);
    } else if (this.postService.method === 'PUT') {
      this.createOrUpdatePost(post, false);
    }
  }

  private createOrUpdatePost(post: Post, isNew: boolean) {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      const localPosts: Post[] = JSON.parse(storedPosts);
      const id = this.postService.id_post;
      const existingPostIndex = localPosts.findIndex(item => item.id === Number(id));

      if (existingPostIndex !== -1) {
        localPosts[existingPostIndex] = {
          id: localPosts[existingPostIndex].id,
          title: post.title || localPosts[existingPostIndex].title,
          body: post.body || localPosts[existingPostIndex].body
        };

        localStorage.setItem('posts', JSON.stringify(localPosts));
      } else {
        if (isNew) {
          localPosts.push({
            title: post.title,
            id: localPosts.length + 1,
            body: post.body,
            userId: 101,
          });
          localStorage.setItem('posts', JSON.stringify(localPosts));
        }
      }
    } else {
      if (isNew) {
        localStorage.setItem('posts', JSON.stringify([{
          title: post.title,
          id: 1,
          body: post.body,
          userId: 101,
        }]));
      }
    }
    this.postService.method === 'POST' ? this.postService.createPost(post) : this.postService.updatePost(post);
    this.postService.id_post = '';
    this.modalService.closeModal();
    window.location.reload();
  }
}
