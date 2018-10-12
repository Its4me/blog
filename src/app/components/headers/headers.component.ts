import { MainService } from './../../servises/main.service';
import { UserServiceService } from './../../servises/user-service.service';
import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements OnInit {

  seachValue: string = '';

  user_menu: boolean = false;

  seach_menu: boolean = false;

  find_users: any = [];

  constructor(
    public userService: UserServiceService,
    public main: MainService
    ) { }

  ngOnInit() {
  }


  _seach(){
  
    if(this.seachValue.length < 2 ){
      this.seach_menu = false;  
      return;
    }
    this.find_users = [];
    this.userService.findUser(this.seachValue).pipe(
      
    ).subscribe(
      res => {

        res.forEach(el => {
          this.find_users.unshift(el.nickname);
        });

      },
      err => console.error(err),
      () => {
        if(this.find_users[0]){
          this.seach_menu = true;
        }
        
      }
    );

  }
  _tougle(){
    this.user_menu = this.user_menu? false:true;
  }
  _exit(){
    this.userService.exit_account().subscribe();
  }
  _close_seach(){
    this.seachValue = '';
    this.seach_menu = false;

  }
}
