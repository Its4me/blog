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

  openPost: Post;

  currentPostId: string = '';

  prevOpenPostUrl: string = '';

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

    let header: Headers = this.main.getToken();
   
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

  getNewsPosts(): Observable<any>{
    return this.token.get(`profiles/friends_posts`);
  }

  getDataPost(res: any): Post[]{
    let newPost: Post[] = [];
    
    res = this.main.getBody(res);
    if(!res){
      return newPost;
    }
    res.forEach((element,index) => {
      newPost[index] = new Post(
        element.image.url,
        element.body, 
        element.id, 
        element.user_id,
        element.created_at,
        element.likes.length
      );
      newPost[index].activeLike = this.checkLike(element);
      newPost[index].ownerNick = element.user.nickname;
      newPost[index].ownerPhoto = element.user.avatar.url || this.userService.userPhotoSrc;
    });
    
    return newPost;
  }

  public checkLike(element): boolean{
    let id = localStorage.getItem('current_user_id');
    let result = false;
    element.likes.forEach(el => {
      if(id == el.user_id){
        result =  true;
      }
    });
    return result;
  }
  deletePost(id: string): Observable<any>{
    return this.token.request({
      method: RequestMethod.Delete,
      url:    `${this.main.url}/posts/${id}`
    })
  }
}
