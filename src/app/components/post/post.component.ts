import { UserServiceService } from './../../servises/user-service.service';
import { Router } from '@angular/router';
import { PostServiceService } from './../../servises/post-service.service';
import { Post } from './../../clasess/Post';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MainService } from '../../servises/main.service';
import { fromEvent } from 'rxjs';
import { switchMap, debounceTime, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @ViewChild('like') likeElem: ElementRef;
  @Input() post: Post;
  @Input() i: number;


  constructor(
    public postService: PostServiceService,
    public router: Router,
    public main: MainService,
    public userService: UserServiceService
    ) { }

  ngOnInit() {
    /* like */
    fromEvent (this.likeElem.nativeElement, 'click').pipe(
      throttleTime(1200),
      switchMap(res =>this.postService.like_post(this.post.back_id)))
      .subscribe(
        res => {
          let newRes = this.main.getBody(res);
          this.postService.posts[this.post.id].likes_count = newRes.likes_count;
          this.postService.posts[this.post.id].activeLike = newRes.like_status;
        }); 
    this.post.id = this.i.toString();
  }
    

  _openPost(){
    this.postService.openPost = this.postService.posts[this.i];
    this.postService.prevOpenPostUrl = this.router.url; 

    
    this.router.navigate([
      {outlets: {'post': [`${this.postService.openPost.back_id}`]}}
    ]); 
 
    
  }
  _delete(){
    this.postService.deletePost(this.post.back_id).subscribe(
      () => {
        this.postService.posts.splice(this.i,1);
      }
    )
  }
  _navigateUser(){
    this.router.navigate([`user/${this.post.owner_id}`]);
  }
  _edit(){
    
  }
}
