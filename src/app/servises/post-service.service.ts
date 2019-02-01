import { UserServiceService } from './user-service.service';
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

  prev_open_post_url: string = '';

  constructor(
    private http: HttpClient,
    public token: Angular2TokenService,
    public main: MainService,
    public userService: UserServiceService
    ) { }


  addPost(post: Post): Observable<any>{

    const formData = new FormData();
    formData.append('post[image]', 
                    post.photo, 
                    'image');
    formData.append('post[body]', post.description);
    formData.append('title', '');

    let header: Headers = this.main.get_token();
   
    return this.token.request({
      method: RequestMethod.Post,
      url: `${this.main.url}/posts`,
      body: formData,
      headers: header
    });


  }
  
  like_post(id: string): Observable<any>{

    return this.token.request({
      method: RequestMethod.Get,
      url:    `${this.main.url}/post/${id}/like`
       });
  }
  getPost(id: number): Observable<any>{
    return this.http.get(`${this.main.url}/posts/${id}`);
  }
  getPosts(id: number): Observable<any>{
    return this.token.get(`profiles/${id}/posts`);
  }

  get_news_Posts(): Observable<any>{
    return this.token.get(`profiles/friends_posts`);
  }

  get_data_post(res: any): Post[]{
    let new_post: Post[] = [];
    
    res = this.main.get_body(res);
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
        element.likes.length
      );
      new_post[index].activeLike = this.check_like(element);
      new_post[index].owner_nick = element.user.nickname;
      new_post[index].owner_photo = element.user.avatar.url || this.userService.userPhotoSrc;
    });
    
    return new_post;
  }

  public check_like(element): boolean{
    let id = localStorage.getItem('current_user_id');
    let result = false;
    element.likes.forEach(el => {
      if(id == el.user_id){
        result =  true;
      }
    });
    return result;
  }
  delete_post(id: string): Observable<any>{
    return this.token.request({
      method: RequestMethod.Delete,
      url:    `${this.main.url}/posts/${id}`
    })
  }
}
