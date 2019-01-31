import { Router, ActivatedRoute } from '@angular/router';
import { Post } from './../../clasess/Post';
import { PostServiceService } from './../../servises/post-service.service';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../servises/user-service.service';
import { MainService } from '../../servises/main.service';

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
      let srcPost: any = '';
      this.activatedRoute.url.subscribe(
        res => {
          
          if(this.router.url.match(/news/)){
            srcPost =  Number(this.router.url.match(/[0-9]{1,}/g)[0]);
          }else{
            srcPost =  Number(this.router.url.match(/[0-9]{1,}/g)[1]);
          }
          
        }
      );
      this.postService.getPost(srcPost).subscribe(
        res => {
          this.post = new Post(
            res.image.url,
            res.body,
            res.id,
            res.user_id,
            res.created_at,
            res.likes_count
          );
          this.post.id = this.postService.current_post_id;
          this.post.activeLike = this.postService.check_like(res);
          this.post.owner_nick = res.user.nickname;
          this.post.owner_photo = res.user.avatar.url || this.userService.userPhotoSrc;
          
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
        this.postService.posts[Number(this.post.id)].likes_count = new_res.likes_count;
        this.postService.posts[Number(this.post.id)].activeLike = new_res.like_status;
        this.post.likes_count = new_res.likes_count;
        this.post.activeLike = new_res.like_status;
      }
    );
  }
}
