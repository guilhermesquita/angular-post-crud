import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Post } from './Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor() { }

  getPosts(): Observable<Post[]> {
    return new Observable(observer => {
      axios.get<Post[]>(this.apiUrl)
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