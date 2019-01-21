import { Angular2TokenService } from 'angular2-token';
import { MainService } from './../../servises/main.service';
import { Router, NavigationEnd } from '@angular/router';
import { PostServiceService } from './../../servises/post-service.service';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../servises/user-service.service';
import { Post } from '../../clasess/Post';
import { User } from '../../clasess/user';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {


  postText: string = '';

  photoSrc: string = 'assets/post.jpg';

  constructor(public userService: UserServiceService,
              public postService: PostServiceService,
              public router: Router,
              public main: MainService,
              public token: Angular2TokenService
              ) { }


  ngOnInit() {
    this.userService.getUser(this.router.url.slice(6)).subscribe(
      res => {
        this.userService.user = new User(
          res.email,
          res.nickname,
          res.name,
          res.lastname
        );
        this.userService.user.id = res.id;
      },
      err => {
        this.main.client_error.togle_error('Ошибка загрузки, обновите страницу');
      }
    );

    this.postService.getPosts().subscribe(
      res => {
        
        this.postService.posts = this.postService.get_data_post(res); 
        
      },
      err => this.main.client_error.togle_error('Ошибка при получении постов, обновите плиз)')
    );


    this.router.events.subscribe(
      (e) =>{
        if(e instanceof NavigationEnd && e.url == 'user'){
          this.ngOnInit();
        }
      }
    );
  } 

  _add_post(){
    let post: Post = new Post(
      this.photoSrc,
      this.postText, 
      '',
      this.userService.user.id,
      new Date()
      );

    this.postService.addPost(post).subscribe(
      res => {
        let new_res = this.main.get_body(res);
        post.back_id = new_res.id;
        post.likes_count = new_res.likes_count;
       },
      err => {},
      () => {
        this.postService.posts.unshift(post); 
        this.postText = '';
      }
    );
  }
  _subscribe(){
    this.userService.subscribe().subscribe(
      res => console.log(res)
    );
    
  }
  _navigate_subscribers(){
    this.router.navigate(['subscribers']);
  }
}
