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
          let new_res = this.main.get_body(res);
          this.postService.posts[this.post.id].likes_count = new_res.likes_count;
          this.postService.posts[this.post.id].activeLike = new_res.like_status;
        }); 
    this.post.id = this.i.toString();
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
  _navigate_user(){
    this.router.navigate([`user/${this.post.owner_id}`]);
  }
  _edit(){
    
  }
}
