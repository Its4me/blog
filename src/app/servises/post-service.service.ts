import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../clasess/Post';
import { httpOptions } from './user-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {



  posts: Post[] = [];

  current_post_id: string = '';

  constructor(
    private http: HttpClient,
    public main: MainService
    ) { }


  addPost(post: Post): Observable<any>{
    return this.http.post(this.main.url, post, httpOptions);
  }
}
