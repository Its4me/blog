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

  constructor(public postService: PostServiceService) { }

  ngOnInit() {
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

}
