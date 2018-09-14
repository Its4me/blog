import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../clasess/Post';
import { httpOptions } from './user-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  url: string = 'https://frozen-citadel-55909.herokuapp.com/';

  posts: Post[] = [];

  current_post_id: string = '';

  constructor(private http: HttpClient) { }


  addPost(post: Post): Observable<any>{
    return this.http.post(this.url, post, httpOptions);
  }
}
