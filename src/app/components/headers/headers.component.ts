import { MainService } from './../../servises/main.service';
import { UserServiceService } from './../../servises/user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements OnInit {

  seachValue: string = '';

  constructor(
    public userService: UserServiceService,
    public main: MainService
    ) { }

  ngOnInit() {
  }


  _seach(){
    if(this.seachValue == ''){return;}
    this.userService.findUser(this.seachValue).subscribe(
      res => console.log(res),
      err => console.error(err),
    );
  }
}
