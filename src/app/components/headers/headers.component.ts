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

  seachMenu: boolean = false;

  nothingFinds: boolean = false;

  findUsers: any = [];

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
            this._closeSeach()
          }else{

            let newRes = this.main.getBody(res);
            this.findUsers = [];
            newRes.forEach(el => {
              this.findUsers.unshift({
                nickname: el.nickname,
                id: el.id
              });
              
            });
            if(this.findUsers[0]){
              this.seachMenu = true;
              this.nothingFinds = false;
            }else{
              this.nothingFinds = true;
            }
            
          }
          
        }
      )
    
    }
  
  _exit(){
    this.userService.exitAccount().subscribe(
      res =>{
        localStorage.removeItem('current_user_id');
        this.userService.currentUserId = null;
      }
    );
  }
  _closeSeach(){
    this.seachValue = '';
    this.seachMenu = false;
    this.nothingFinds = false;
  }
  _myPage(){
    if(localStorage.getItem('current_user_id')){
      this.router.navigate([`user/${localStorage.getItem('current_user_id')}`]);
    }else if(!this.token.currentUserData){
      this.router.navigate([``]);
    }
    this._closeSeach();
    
  }
  _navigate_user(user: User){
    this.router.navigate([`user/${user.id}`]);
    this._closeSeach();
  }
  _navigate_edit(){
    
    this.router.navigate(['edit-profile']);
    this._closeSeach();
    
    
  }
  _open_seach(){
    this.mobileSeach = true;
  }
  
}
 