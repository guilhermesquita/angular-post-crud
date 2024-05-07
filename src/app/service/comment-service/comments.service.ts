import { Injectable, Input } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Comment } from '../../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  @Input() method: string = '';
  constructor() { }

  id_post = ''
  id_comment = ''
      
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
        const comment = comments.find(c => c.idComment === id);
        observer.next(comment || null);
        observer.complete();
      }, error => {
        observer.error(error);
      });
    });
  }
  createComment(commentData: any): Observable<any> {
    return new Observable(observer => {
      axios.post(this.apiUrl, commentData)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error('Error creating comment: ' + error);
        });
    });
  }
  updateComment(id: number, commentData: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return new Observable(observer => {
      axios.put(url, commentData)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error('Error updating post: ' + error);
        });
    });
  }

  deleteComment(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return new Observable(observer => {
      axios.delete(url)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error('Error deleting comment: ' + error);
        });
    });
  }
}
