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

  activeLike: boolean= false;

  constructor(
    public postService: PostServiceService,
    public router: Router,
    public main: MainService,
    public userService: UserServiceService
    ) { }

  ngOnInit() {
    this.post.id = this.i.toString();
  }
  _like(){
    this.postService.like_post(this.post.back_id).subscribe(
      res => {
        let new_res = this.main.get_body(res);
        this.post.likes_count = new_res.likes_count;
        this.activeLike = new_res.like_status;
      }
    );

    
  }

  _open_post(){
    this.postService.prev_open_post_url = this.router.url; 
    this.postService.current_post_id = this.i.toString();
    this.router.navigate([
      {outlets: {'post': [`${this.postService.current_post_id}`]}}
    ]); 
 
    
  }
  _delete(){

  }
  _edit(){
    
  }
}
