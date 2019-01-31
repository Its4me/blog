import { UserServiceService } from './../../servises/user-service.service';
import { Router } from '@angular/router';
import { PostServiceService } from './../../servises/post-service.service';
import { Post } from './../../clasess/Post';
import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../../servises/main.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() i: number;


  constructor(
    public postService: PostServiceService,
    public router: Router,
    public main: MainService,
    public userService: UserServiceService
    ) { }

  ngOnInit() {
    
    this.post.id = this.i.toString();
    console.log(this.post );
    
  }
  _like(){
    this.postService.like_post(this.post.back_id).subscribe(
      res => {
        let new_res = this.main.get_body(res);
        this.postService.posts[this.post.id].likes_count = new_res.likes_count;
        this.postService.posts[this.post.id].activeLike = new_res.like_status;
      }
    );

    
  }

  _open_post(){
    this.postService.open_post = this.postService.posts[this.i];
    this.postService.prev_open_post_url = this.router.url; 

    
    this.router.navigate([
      {outlets: {'post': [`${this.postService.open_post.back_id}`]}}
    ]); 
 
    
  }
  _delete(){
    this.postService.delete_post(this.post.back_id).subscribe(
      () => {
        this.postService.posts.splice(this.i,1);
      }
    )
  }
  _edit(){
    
  }
}
