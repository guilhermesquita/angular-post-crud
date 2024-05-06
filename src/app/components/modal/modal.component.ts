import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonMainComponent } from '../button-main/button-main.component';
import { ButtonConfirmComponent } from '../button-confirm/button-confirm.component';
import { ModalService } from '../../service/modal-service/modal.service';
import { Post } from '../../service/Post';
import { PostService } from '../../service/post.service';

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
    }else{
      this.postService.createPost(post)
    }
    this.modalService.closeModal();
      // let posts = [localPosts]
      // console.log(posts);
    }
  }
// }
