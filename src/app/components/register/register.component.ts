import { UserServiceService } from './../../servises/user-service.service';
import { User } from './../../clasess/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  ngOnInit() {

  }



  loginForm: boolean = false;

  constructor(
    public userService: UserServiceService
  ) { }

  registerUser: User;

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
        Validators.maxLength(50)])
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



  _switchForm(bool: boolean) {
    this.loginForm = bool;

  }
  _register(): void {
    this.registerUser = new User(
      this.registerForm.get("email").value,
      this.registerForm.get("nick").value,
      this.registerForm.get("name").value,
      this.registerForm.get("surname").value,
      this.registerForm.get("password").value,
      this.registerForm.get("password_confim").value,
    );

    let object = JSON.stringify({ user: this.registerUser });


    this.userService.registerUser(object)
      .subscribe(
        () => {
          console.log('done');
        });

  }

  _enter(): void {
    let enterAcc = {
      email: this.enterForm.get('email').value,
      password: this.enterForm.get('password').value
    }
    this.userService.enterAccount( JSON.stringify({user: enterAcc})).subscribe(
      () => {
        console.log('Лох на парах');
        
      }
      
    )
    

  }



}
