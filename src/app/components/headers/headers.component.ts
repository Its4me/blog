import { debounceTime, mergeMap, switchMap } from 'rxjs/operators';
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


  seachValue: string = '';

  user_menu: boolean = false;

  seach_menu: boolean = false;

  nothing_finds: boolean = false;

  find_users: any = [];

  constructor(
    public userService: UserServiceService,
    public main: MainService
    ) { }

  ngOnInit() {
    fromEvent (this.seach_element.nativeElement, 'keyup').pipe(
      debounceTime(1200),
      switchMap(res =>this.userService.findUser(this.seachValue))
    )
      .subscribe(
        res =>{
          this.find_users = [];
          res.forEach(el => {
            this.find_users.unshift({
              nickname: el.nickname,
              id: el.id
            });
            
          });
       
          if(this.find_users[0]){
            this.seach_menu = true;
          }else{
            this.nothing_finds = true;
          }
          
        }
      )}


  
  _tougle(){
    this.user_menu = this.user_menu? false:true;
  }
  _exit(){
    this.userService.exit_account().subscribe();
  }
  _close_seach(){
    this.seachValue = '';
    this.seach_menu = false;
    this.nothing_finds = false;
  }
}
 