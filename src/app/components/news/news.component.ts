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
  subString: string[] = [];
  loader: boolean = false;


  constructor(public userService: UserServiceService,
    public postService: PostServiceService,
    public router: Router,
    public main: MainService
    ) { }

  ngOnInit() {
    
    this.loader = true;
    this.postService.posts = null;
    forkJoin(
      this.postService.getNewsPosts(),
      this.userService.getRecommendation()
    )
    .subscribe(
      ([res1,res2]) => {
        this.postService.posts = this.postService.getDataPost(res1);
        let i = 0;
        this.main.getBody(res2).forEach(el => {
          let newUser =  new User(
            el.email,
            el.nickname,
            el.name,
            el.lastname
          );
          newUser.id = el.id;
          newUser.photoSrc = el.avatar.url;
          this.subString[i] = 'Подписаться';
          this.usersRecommendation.push(newUser);
          i++;
        })
        this.loader = false;
        
      },
      err =>{
        this.main.clientError.togleError('Кто-то схавал ваши новости...');
        this.loader = false;
      }
    );
    
  }
  navigate_user(e,id){
    if(e.path[0].id != 'subscribe-button' && e.path[1].id != 'subscribe-button'){
      this.router.navigate([`user/${id}`]);
    }
  }
  _subscribe(id,i){
    if(this.subString[i] == 'Подписаться'){
      this.userService.subscribe(id).subscribe(
        res => {
          this.subString[i] = 'Отписка';
        },
        err => this.main.clientError.togleError('Ошибка, увы')
      );
    }else{
      this.userService.unsubscribe(id).subscribe(
        res => {
         this.subString[i] = 'Подписаться';
        },
        err => this.main.clientError.togleError('Снова ошибка, простите')
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
