import { PostServiceService } from './../../servises/post-service.service';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../servises/user-service.service';
import { Post } from '../../clasess/Post';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {


  postText: string = '';

  photoSrc: string = 'assets/post.jpg';
  constructor(public userService: UserServiceService,
              public postService: PostServiceService
              ) { }


  ngOnInit() {

  }
  _add_post(){
    let post: Post = new Post(this.photoSrc, this.postText);
    this.postService.addPost(post).subscribe(
      res => console.log(res),
      err => console.log(err),
      () => {
        this.postService.posts.unshift(post); 
        this.postText = '';
      }
    )
  }
}
