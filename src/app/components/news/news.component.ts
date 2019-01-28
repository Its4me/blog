import { Post } from './../../clasess/Post';
import { MainService } from './../../servises/main.service';
import { Router } from '@angular/router';
import { PostServiceService } from './../../servises/post-service.service';
import { UserServiceService } from './../../servises/user-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';

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
    this.postService.posts = null;
    this.postService.get_news_Posts().subscribe(
      res => {
        this.postService.posts = this.postService.get_data_post(this.main.get_body(res));
      },
      err =>{
        this.main.client_error.togle_error('Кто-то схавал ваши новости...');
      }
    );
    //this.similar_height();
    
  }
  
  
  /*private similar_height(): void{
    let slides = document.getElementsByClassName('item-carousel-container');
    let max_height:number = 0;
    for (let i = 0; i < slides.length; i++) {
      console.log(slides[i].clientHeight);
      
      
    }
  }*/
}
