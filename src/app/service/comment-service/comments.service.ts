import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor() { }

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
}
