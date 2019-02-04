import { Router } from '@angular/router';
import { MainService } from 'src/app/servises/main.service';
import { User } from './../../clasess/user';
import { UserServiceService } from './../../servises/user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user: User = new User();

  loader: boolean = false;
  
  file: any;

  loaderSave: boolean = false;

  constructor(
    public userService: UserServiceService,
    public main: MainService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loader = true;
    let id = localStorage.getItem('current_user_id');
    this.userService.getUser(id).subscribe(
      res =>{
        this.user = new User(
          res.user.email,
          res.user.nickname,
          res.user.name,
          res.user.lastname
        );
        this.user.photoSrc = res.user.avatar.url;
        this.user.id = res.user.id;
      }, 
      err => {
        this.main.client_error.togle_error('Ошибка, обновите страницу позже')
      },
      () => {
        this.loader = false;
      }
    )
  }
  _update_photo(e){
    this.file = e.target.files[0] || e.dataTransfer.files[0];
    let file =  new FileReader();
    file.readAsDataURL(this.file)
    file.onload = () =>{
      this.user.photoSrc = file.result.toString();
    }
  }
  _edit_data(){
    this.loaderSave = true;
    this.userService.update_user(this.user, this.file).subscribe(
    
      res =>{
        this.loaderSave = false;
        this.router.navigate([`user/${this.user.id}`]);
        
      },
      err => this.main.client_error.togle_error(`Ошибка ${err}`)
    )
  }

}
