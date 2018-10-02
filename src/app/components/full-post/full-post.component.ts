import { Router, ActivatedRoute } from '@angular/router';
import { Post } from './../../clasess/Post';
import { PostServiceService } from './../../servises/post-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.scss']
})
export class FullPostComponent implements OnInit {
  post: Post;
  activeLike: boolean;

  constructor(
    public postService: PostServiceService,
    public router: Router,
    public activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
   this.post = this.postService.posts[parseInt(this.postService.current_post_id)];
   
  }

  public _like(){
    this.activeLike = this.postService
      .like(parseInt(this.postService.current_post_id), this.activeLike);
  }
  public close(e){
    if(e.path[0].id == 'full-post'){
 
      this.router.navigate(
          [{ outlets: { post: null } }]
      );
    }

    
  }
}
