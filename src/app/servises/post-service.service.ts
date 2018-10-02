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
    public main: MainService
    ) { }


  addPost(post: Post): Observable<any>{
    let newPost = {
      body: post.description,
      title: '' 
    }
    console.log('df');
    
    return this.http.post(`${this.main.url}/posts`, newPost, this.main.tokenAuth);
  }

  like(i:number, active:boolean): boolean{
    if(!active){
      this.posts[i].likes_count++;
      return  true;
    }else{
      this.posts[i].likes_count--;
      return false;
    }
  }

  getPost(id: string): Observable<any>{
    return this.http.get(`${this.main.url}/posts/${id}`);
  }
}
