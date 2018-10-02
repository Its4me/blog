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
    this.activeLike = this.postService.like(this.i, this.activeLike);
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
