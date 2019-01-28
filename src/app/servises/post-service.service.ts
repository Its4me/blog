import { RequestMethod, RequestOptions, Headers } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { MainService } from './main.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../clasess/Post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  posts: Post[] = [];

  open_post: Post;

  current_post_id: string = '';

  prev_open_post_url: string = ''

  constructor(
    private http: HttpClient,
    public token: Angular2TokenService,
    public main: MainService
    ) { }


  addPost(post: Post): Observable<any>{

    const formData = new FormData();
    formData.append('post[image]', 
                    post.photo, 
                    'image');
    formData.append('post[body]', post.description);
    formData.append('title', '');

    const headers = new Headers();
    
    headers.append('access-token', this.token.currentAuthData.accessToken);
    headers.append('client', this.token.currentAuthData.client);
    headers.append('expiry', this.token.currentAuthData.expiry);
    headers.append('tokenType', this.token.currentAuthData.tokenType);
    headers.append('uid', this.token.currentAuthData.uid);
   
    return this.token.request({
      method: RequestMethod.Post,
      url: `${this.main.url}/posts`,
      body: formData,
      headers: headers
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

  get_news_Posts(): Observable<any>{
    return this.token.get(`/profiles/friends_posts`);
  }

  get_data_post(res: any): Post[]{
    let new_post: Post[] = [];
    
    if(!res){
      return new_post;
    }
    res.forEach((element,index) => {
      new_post[index] = new Post(
        element.image.url,
        element.body, 
        element.id, 
        element.user_id,
        element.created_at,
        element.likes_count
      );
    });
    return new_post;
  }


  delete_post(id: string): Observable<any>{
    return this.token.request({
      method: RequestMethod.Delete,
      url:    `${this.main.url}/posts/${id}`
    })
  }
}
