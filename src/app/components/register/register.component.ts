import { MainService } from './../../servises/main.service';
import { HttpHeaders } from '@angular/common/http';
import { UserServiceService } from './../../servises/user-service.service';
import { User } from './../../clasess/user';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignInData } from 'angular2-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  diff_password: boolean = false;
  remember_me: boolean = false;



  constructor(
    public userService: UserServiceService,
    public router:  Router,
    public main: MainService
  ) { }

  ngOnInit() {

  }

  registerForm: FormGroup = new FormGroup({
    "email": new FormControl("",
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.maxLength(50)
      ])),
    "name": new FormControl("",
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)])
    ),
    "surname": new FormControl("",
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)])
    ),
    "nick": new FormControl("",
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)])
    ),
    "password": new FormControl("",
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50)])
    ),
    "password_confim": new FormControl("",
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
      ])
    ),

  });

  enterForm: FormGroup = new FormGroup({
    "email": new FormControl('',
      Validators.compose([
        Validators.required,
        Validators.email,
      ])
    ),
    "password": new FormControl('', Validators.required)
  });



  
  
  _register(): void {
    if (this.registerForm.invalid) { return; }
    let registerUser: User;
    registerUser = new User(
      this.registerForm.get("email").value,
      this.registerForm.get("nick").value,
      this.registerForm.get("name").value,
      this.registerForm.get("surname").value,
      this.registerForm.get("password").value,
      this.registerForm.get("password_confim").value,
    );

    if (registerUser.password != registerUser.password_confirmation) {
      this.diff_password = true;
      return;
    } else {
      this.diff_password = false;
    }


    this.userService.registerUser(registerUser)
      .subscribe(
        res => {
          this.main.loader = true;
          this.ititiall_user(res);
        },
        err => {

        },
        () => {
          this.router.navigate([`/${this.userService.user.nickname}`]);
          this.main.loader = false;
        });

  }

  _enter(): void {

    this.main.loader = true;
    let enterAccount = {
      email: this.enterForm.get('email').value,
      password: this.enterForm.get('password').value.toString(),
      remember_me: this.remember_me
    }

    let output: any;

    this.userService.enterAccount(enterAccount).subscribe(
      res => {

        output = res.headers._headers;

        let newOutput: any = [];
        
        output.forEach(element => {
          newOutput.push(element);
        });

        this.main.tokenAuth = newOutput;

        this.ititiall_user(res);

      },
      err => console.log(err),
      () => {
        
        this.router.navigate([`/${this.userService.user.nickname}`]);
        this.main.loader = false;
      
      }
    )
  }

  private ititiall_user(res: any){
    let user = JSON.parse(res._body).data;
    this.userService.user = new User(
        user.email,
        user.nickname,
        user.name,
        user.lastname
    )
  }

}
