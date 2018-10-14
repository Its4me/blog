import { RequestMethod } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
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

  prev_open_post_url: string = ''

  constructor(
    private http: HttpClient,
    public token: Angular2TokenService,
    public main: MainService
    ) { }


  addPost(post: Post): Observable<any>{
    let newPost = {
      body: post.description,
      title: '' 
    }
     
    return this.token.request({
      method: RequestMethod.Post,
      url: `${this.main.url}/posts`,
      body: newPost
    });

  }
  
  like_post(id: string): Observable<any>{

    return this.token.request({
      method: RequestMethod.Get,
      url:    `${this.main.url}/post/${id}/like`
       });
  }
  getPost(id: string): Observable<any>{
    return this.http.get(`${this.main.url}/posts/${id}`);
  }
  getPosts(): Observable<any>{
    return this.http.get(`${this.main.url}/posts`);
  }

  get_data_post(res: any): Post[]{
    let new_post: Post[] = [];
    res.forEach((element,index) => {
      new_post[index] = new Post(
        '',
        element.body, 
        element.id, 
        element.user_id,
        element.created_at,
        element.likes_count
      );
    });
    return new_post;
  }

}
