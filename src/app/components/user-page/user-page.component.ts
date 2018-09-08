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

  constructor(public userService: UserServiceService,
              public postService: PostServiceService
              ) { }


  ngOnInit() {

  }
  _add_post(){
    let post: Post = new Post('', this.postText);
    this.postService.posts.unshift(post); 
    
    console.log(this.postService.posts);
    this.postText = '';
    
  }
  

}
