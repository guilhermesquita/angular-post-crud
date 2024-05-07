import { Injectable, Input } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Post } from './Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private localStorageKey = 'posts';
  apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  @Input() method: string = '';

  id_post: string = '';

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

  updatePost(updatedPost: Post): Observable<Post> {
    const localPosts = localStorage.getItem(this.localStorageKey);
    if (localPosts) {
      return new Observable(observer => {
        let posts: Post[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
        const index = posts.findIndex(post => post.id === updatedPost.id);
        if (index !== -1) {
          posts[index] = updatedPost;
          localStorage.setItem(this.localStorageKey, JSON.stringify(posts));
          observer.next(updatedPost);
        } else {
          observer.error('Post not found in local storage');
        }
        observer.complete();
      });
    } else {
      return new Observable(observer => {
        axios.put<Post>(`${this.apiUrl}/${updatedPost.id}`, updatedPost)
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

  deletePost(postId: number): Observable<void> {
    const localPosts = localStorage.getItem(this.localStorageKey);
    if (localPosts) {
      return new Observable(observer => {
        let posts: Post[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
        const index = posts.findIndex(post => post.id === postId);
        if (index !== -1) {
          posts.splice(index, 1);
          localStorage.setItem(this.localStorageKey, JSON.stringify(posts));
          observer.next();
        } else {
          observer.error('Post not found in local storage');
        }
        observer.complete();
      });
    } else {
      return new Observable(observer => {
        axios.delete<void>(`${this.apiUrl}/${postId}`)
         .then(() => {
            observer.next();
            observer.complete();
          })
         .catch(error => {
            observer.error(error);
          });
      });
    }
  }
}