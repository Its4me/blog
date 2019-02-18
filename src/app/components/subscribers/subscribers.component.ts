import { Router } from '@angular/router';
import { MainService } from './../../servises/main.service';
import { UserServiceService } from './../../servises/user-service.service';
import { Component, OnInit } from '@angular/core';

class User {
  constructor(
    public id: number,
    public name: string,
    public lastname: string,
    public nickname: string,
    public imageSrc: string
  ){}
 

}

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit {

  users: User[] = [];
  loader: boolean = false;

  constructor(
    public UserService: UserServiceService,
    public main: MainService,
    public router: Router
    ) { }

  ngOnInit() {
    this.loader = true;
    let url = this.router.url;
    let id: string = url.match(/\d{1,}/)[0];
    if(url.match( /following/ )){
      this.UserService.getSubscribers(id).subscribe(
        res => {
          this.users = this.main.getBody(res).map((user) => {
            return new User(
              user.id,
              user.name,
              user.lastname,
              user.nickname,
              user.avatar.url || this.UserService.userPhotoSrc
            )
          });
          this.loader = false;
        },
        err => {
          this.main.clientError.togleError('Что-то пошло не так...')
          this.loader = false;
        }
        
      )
    }else if(url.match( /followers/ )){
      this.UserService.getFollowing(id).subscribe(
        res => {
          this.users = this.main.getBody(res).map((user) => {
            return new User(
              user.id,
              user.name,
              user.lastname,
              user.nickname,
              user.avatar.url || this.UserService.userPhotoSrc
            )
          });
          this.loader = false;
        },
        err => {
          this.main.clientError.togleError('Что-то пошло не так...')
          this.loader = false;
        }
      );
    }
    
  }
  _navigate_user(id: number){
    this.router.navigate([`user/${id}`]);
  }
  _unsubscribe(id: number, i: number){
    this.UserService.unsubscribe(id).subscribe(
      res => {
         this.users.splice(i,1);
      },
      err => {
        this.main.clientError.togleError(`Ошибка, хз что случилось, вот сам посмотри: ${err}`)
      }
    );
  }
}
