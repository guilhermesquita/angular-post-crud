import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonMainComponent } from '../button-main/button-main.component';
import { ButtonConfirmComponent } from '../button-confirm/button-confirm.component';
import { ModalService } from '../../service/modal-service/modal.service';
import { Post } from '../../service/Post';
import { PostService } from '../../service/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent, ButtonMainComponent, ButtonConfirmComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  constructor(public modalService: ModalService, public postService: PostService, private router: Router) { }
  posts: Post[] = [];

  openModal() {
    this.modalService.openModal();
  }

  closeModal() {
    this.modalService.closeModal();
  }

  addPost(post: Post) {
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
    }else{
      this.postService.createPost(post)
    }
    this.modalService.closeModal();
    }
  }
// }
