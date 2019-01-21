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
    this.UserService.getSubscribers().subscribe(
        res => {
          this.users = this.main.get_body(res).map((user) => {
            return new User(
              user.id,
              user.name,
              user.lastname,
              user.nickname,
              'assets/user-photo.jpg'
            )
          });
          this.loader = false;
        }
    )
  }
  _navigate_user(id: number){
    this.router.navigate([`user/${id}`]);
  }
}
