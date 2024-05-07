import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Comment } from '../../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor() { }

  id_post = ''

  private localStorageKey = 'comments';
  private apiUrl = 'http://localhost:3000/comments';

  getComments(): Observable<Comment[]> {
    const localComments = localStorage.getItem(this.localStorageKey);
    if (localComments) {
      const comments = JSON.parse(localComments);
      return new Observable(observer => {
        observer.next(comments);
        observer.complete();
      });
    } else {
      return new Observable(observer => {
        axios.get<Comment[]>(this.apiUrl)
          .then(response => {
            const comments = response.data;
            localStorage.setItem(this.localStorageKey, JSON.stringify(comments));
            observer.next(comments);
            observer.complete();
          })
          .catch(error => {
            observer.error(error);
          });
      });
    }
  }
  getCommentByID(id: number): Observable<Comment | null> {
    return new Observable(observer => {
      this.getComments().subscribe(comments => {
        const comment = comments.find(c => c.id === id);
        observer.next(comment || null);
        observer.complete();
      }, error => {
        observer.error(error);
      });
    });
  }
}
