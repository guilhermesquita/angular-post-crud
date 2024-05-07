import { Component } from '@angular/core';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { Post } from '../../models/Post';
import { PostService } from '../../service/post-service/post.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalService } from '../../service/modal-service/modal.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [PostListComponent, CommonModule, ModalComponent, MainComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent {
  constructor(private postService: PostService, 
    public modalService: ModalService,
  ) { }
  posts: Post[] = [];
  comments: Comment[] = [];

  OpenModalToCreate() {
    this.modalService.openModal();
    this.modalService.modalTitle = 'novo post';
    this.postService.method = 'POST';
  }

  ngOnInit(): void {
    let linked: boolean =  false
    let localPosts: string | null

    localStorage.getItem('posts') ? linked = true : linked = false
    Array.isArray(localStorage.getItem('posts')) ? linked = true : linked = false
    if(linked){
      localPosts = localStorage.getItem('posts');
      if (localPosts) {
        this.posts = JSON.parse(localPosts);
      } 
    }
    else {
      this.postApi();
    }
  }

  postApi() {
    this.postService.getPosts().subscribe(
      (response: Post[]) => {
        this.posts = response;
      },
      error => {
        console.error('Erro ao chamar a API:', error);
      }
    )
  }
}
