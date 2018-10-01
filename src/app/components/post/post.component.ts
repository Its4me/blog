import { Router } from '@angular/router';
import { PostServiceService } from './../../servises/post-service.service';
import { Post } from './../../clasess/Post';
import { Component, OnInit, Input } from '@angular/core';

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
    public router: Router
    ) { }

  ngOnInit() {
    this.post.id = this.i.toString();
  }
  _like(){
    if(!this.activeLike){
      this.postService.posts[this.i].likes_count++;
      this.activeLike = true;
    }else{
      this.postService.posts[this.i].likes_count--;
      this.activeLike = false;
    }
    
  }
  _open_post(){
    this.postService.current_post_id = this.post.id;
    this.router.navigate([
      {outlets: {'post': [`${this.postService.current_post_id}`]}}
    ]); 
 
    console.log(this.postService.current_post_id);
    
  }
}
