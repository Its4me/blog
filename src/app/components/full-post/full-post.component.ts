import { Router, ActivatedRoute } from '@angular/router';
import { Post } from './../../clasess/Post';
import { PostServiceService } from './../../servises/post-service.service';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/servises/user-service.service';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.scss']
})
export class FullPostComponent implements OnInit {
  
  post: Post= new Post();
  activeLike: boolean;



  constructor(
    public postService: PostServiceService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public userService: UserServiceService
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
}
