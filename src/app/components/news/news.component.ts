import { User } from './../../clasess/user';
import { forkJoin } from 'rxjs';
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

  usersRecommendation: User[] = [];
  sub_string: string[] = [];
  

  constructor(public userService: UserServiceService,
    public postService: PostServiceService,
    public router: Router,
    public main: MainService
    ) { }

  ngOnInit() {
    this.postService.posts = null;
    forkJoin(
      this.postService.get_news_Posts(),
      this.userService.getRecommendation()
    )
    .subscribe(
      ([res1,res2]) => {
        this.postService.posts = this.postService.get_data_post(res1);
        let i = 0;
        this.main.get_body(res2).forEach(el => {
          let newUser =  new User(
            el.email,
            el.nickname,
            el.name,
            el.lastname
          );
          newUser.id = el.id;
          newUser.photoSrc = el.avatar.url;
          this.sub_string[i] = 'Подписаться';
          this.usersRecommendation.push(newUser);
          i++;
        })
      },
      err =>{
        this.main.client_error.togle_error('Кто-то схавал ваши новости...');
      }
    );
    
  }
  navigate_user(e,id){
    if(e.path[0].id != 'subscribe-button' && e.path[1].id != 'subscribe-button'){
      this.router.navigate([`user/${id}`]);
    }
  }
  _subscribe(id,i){
    if(this.sub_string[i] == 'Подписаться'){
      this.userService.subscribe(id).subscribe(
        res => {
          this.sub_string[i] = 'Отписка';
        },
        err => this.main.client_error.togle_error('Ошибка, увы')
      );
    }else{
      this.userService.unsubscribe(id).subscribe(
        res => {
         this.sub_string[i] = 'Подписаться';
        },
        err => this.main.client_error.togle_error('Снова ошибка, простите')
      )
    }
  }
  
  
  /*private similar_height(): void{
    let slides = document.getElementsByClassName('item-carousel-container');
    let max_height:number = 0;
    for (let i = 0; i < slides.length; i++) {
      console.log(slides[i].clientHeight);
      
      
    }
  }*/
}
