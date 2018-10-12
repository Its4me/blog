import { Post } from './../../clasess/Post';
import { MainService } from './../../servises/main.service';
import { Router } from '@angular/router';
import { PostServiceService } from './../../servises/post-service.service';
import { UserServiceService } from './../../servises/user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(public userService: UserServiceService,
    public postService: PostServiceService,
    public router: Router,
    public main: MainService
    ) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(
      res => {
        let new_post: Post[] = [];
        
        res.forEach((element,index) => {
          new_post[index] = new Post(
            '',
            element.body, 
            element.id, 
            element.user_id, 
            element.likes_count
          );
        });

        this.postService.posts = new_post;
        
        console.log(this.postService.posts);
        
      },
      err =>{
        
      },
      () =>{
        
      }
    );
  }
  
  ngAfterContentInit(){
 
  }
}
