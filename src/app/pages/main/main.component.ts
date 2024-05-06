import { Component } from '@angular/core';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { Post } from '../../service/Post';
import { PostService } from '../../service/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [PostListComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent {
  constructor(private postService: PostService) { }
  posts: Post[] = [];

  ngOnInit(): void {
    this.chamarAPI();
  }

  chamarAPI() {
    this.postService.getPosts().subscribe(
      (response: Post[]) => {
        this.posts = response;
        console.log(response[0]);
      },
      error => {
        console.error('Erro ao chamar a API:', error);
      }
    )
  }
}
