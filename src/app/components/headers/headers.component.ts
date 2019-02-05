import { User } from './../../clasess/user';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { debounceTime, mergeMap, switchMap, filter } from 'rxjs/operators';
import { MainService } from './../../servises/main.service';
import { UserServiceService } from './../../servises/user-service.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements OnInit {
  @ViewChild('seach') seach_element: ElementRef;

  mobileSeach: boolean = false;

  seachValue: string = '';

  user_menu: boolean = false;

  seach_menu: boolean = false;

  nothing_finds: boolean = false;

  find_users: any = [];

  constructor(
    public userService: UserServiceService,
    public main: MainService,
    public token: Angular2TokenService,
    public router: Router
    ) { }

  ngOnInit() {      

    fromEvent (this.seach_element.nativeElement, 'keyup').pipe(
      debounceTime(400),
      //filter(x => this.seachValue != ''),
      switchMap(res =>  this.userService.findUser(this.seachValue))
    )
      .subscribe(
        res =>{
          if(!this.seachValue){
            this._close_seach()
          }else{

            let newRes = this.main.get_body(res);
            this.find_users = [];
            newRes.forEach(el => {
              this.find_users.unshift({
                nickname: el.nickname,
                id: el.id
              });
              
            });
            if(this.find_users[0]){
              this.seach_menu = true;
              this.nothing_finds = false;
            }else{
              this.nothing_finds = true;
            }
            
          }
          
        }
      )
    
    }
  _tougle_menu(){
    this.user_menu = this.user_menu? false:true;
  }
  public close(e){
    if(e.path[0].id != 'user_menu_button' ){
      this.user_menu = false;
    }
  }
  _exit(){
    this.userService.exitAccount().subscribe(
      res =>{
        localStorage.removeItem('current_user_id');
        this._tougle_menu();
      }
    );
  }
  _close_seach(){
    this.seachValue = '';
    this.seach_menu = false;
    this.nothing_finds = false;
  }
  _my_page(){
    if(localStorage.getItem('current_user_id')){
      this.router.navigate([`user/${localStorage.getItem('current_user_id')}`]);
    }else if(!this.token.currentUserData){
      this.router.navigate([``]);
    }
    this._close_all();
    
  }
  _navigate_user(user: User){
    this.router.navigate([`user/${user.id}`]);
    this._close_seach();
    this.user_menu = false;
  }
  _navigate_edit(){
    this.router.navigate(['edit-profile']);
    this._close_all();
  }
  public _close_all(){
    this._close_seach();
    this.user_menu = false;
  }
  _open_seach(){
    this.user_menu = false;;
    this.mobileSeach = true;
  }
  
}
 