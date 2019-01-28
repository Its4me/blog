import { Router, ActivatedRoute } from '@angular/router';
import { Post } from './../../clasess/Post';
import { PostServiceService } from './../../servises/post-service.service';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/servises/user-service.service';
import { MainService } from 'src/app/servises/main.service';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.scss']
})
export class FullPostComponent implements OnInit {
  
  post: Post= new Post();

  constructor(
    public postService: PostServiceService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public userService: UserServiceService,
    public main: MainService
    ) { }

  ngOnInit() {
    if(this.postService.open_post){
      this.post = this.postService.open_post;
    }else{
      let src: string = '';
      this.activatedRoute.url.subscribe(
        res => src = res[0].path
      );
      this.postService.getPost(src).subscribe(
        res => {
          this.post = new Post(
            'assets/post.jpg',
            res.body,
            res.id,
            res.user_id,
            res.created_at,
            res.likes_count
          )
        }

      );
    }
  }

  public close(e){
    if(e.path[0].id == 'full-post'){
 
      this.router.navigate(
          [{ outlets: { post: null } }]
      );
    }
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
}
