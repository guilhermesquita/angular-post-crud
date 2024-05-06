import { Component } from '@angular/core';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { Post } from '../../service/Post';
import { PostService } from '../../service/post.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [PostListComponent, CommonModule, ModalComponent, MainComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent {
  constructor(private postService: PostService) { }
  overlay: boolean = true;
  posts: Post[] = [];

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
      this.chamarAPI();
    }
  }

  chamarAPI() {
    this.postService.getPosts().subscribe(
      (response: Post[]) => {
        this.posts = response;
        console.log(response[100]);
      },
      error => {
        console.error('Erro ao chamar a API:', error);
      }
    )
  }

  addPost(post: Post) {
    this.posts.push(post);
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }
}
