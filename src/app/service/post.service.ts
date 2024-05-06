import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Post } from './Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private localStorageKey = 'posts';
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor() { }

  getPosts(): Observable<Post[]> {
    const localPosts = localStorage.getItem(this.localStorageKey);
    if (localPosts) {
      const posts = JSON.parse(localPosts);
      return new Observable(observer => {
        observer.next(posts);
        observer.complete();
      });
    } else {
      return new Observable(observer => {
        axios.get<Post[]>(this.apiUrl)
          .then(response => {
            const posts = response.data;
            localStorage.setItem(this.localStorageKey, JSON.stringify(posts));
            observer.next(posts);
            observer.complete();
          })
          .catch(error => {
            observer.error(error);
          });
      });
    }
  }

  createPost(newPost: Post): Observable<Post> {
    const localPosts = localStorage.getItem(this.localStorageKey);
    if (localPosts) {
      return new Observable(observer => {
        let posts: Post[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
        posts.push(newPost);
        localStorage.setItem(this.localStorageKey, JSON.stringify(posts));
        
        observer.next(newPost);
        observer.complete();
      })
    } else {
      return new Observable(observer => {
        axios.post<Post>(this.apiUrl, newPost)
         .then(response => {
            observer.next(response.data);
            observer.complete();
          })
         .catch(error => {
            observer.error(error);
          });
      });
    }
  }
}